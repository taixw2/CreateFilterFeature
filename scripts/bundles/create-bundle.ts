/* eslint-disable import/no-extraneous-dependencies */
import path from 'path'
import chalk from 'chalk'
import { rollup, watch } from 'rollup'
import loadPlugins from 'rollup-load-plugins'
import { JSONLoad } from './util'
import React from 'react'
import ReactDom from 'react-dom'

const plugins = loadPlugins()

export const enum ENV {
  PRODUCTION = 'production',
  DEVELOPMENT = 'development',
}

export interface Bundler {
  entry: string
  external: string[]
}

export interface Options {
  bundle: Bundler
  extensions: string[]
  define: { [key: string]: unknown }
  env: ENV
  output: string
}

function genFullName(name: string, env: ENV) {
  if (env === ENV.PRODUCTION) {
    return `${name}.${ENV.PRODUCTION}.min.js`
  }
  return `${name}.${ENV.DEVELOPMENT}.js`
}

function getBunderFileName(entry: string, env: ENV): string {
  const pkg = JSONLoad(path.join(process.cwd(), entry, 'package.json'))
  if (typeof pkg.name !== 'string') {
    throw new Error('miss entry name')
  }
  const paths = pkg.name.split('/')

  if (!paths.length) {
    throw new Error('miss entry')
  }
  if (paths.length > 1) {
    return genFullName(paths[paths.length - 1], env)
  }
  return genFullName(pkg.name, env)
}

export default async function createBundler(options: Options, env: ENV) {
  const tag = chalk.white.bold(options.bundle.entry)
  console.log(chalk.bgYellow.white('BUDING'), tag)

  const entryJoin = [process.cwd(), options.bundle.entry]
  if (options.bundle.entry === '.') {
    entryJoin.push('src')
  }

  const bundleOption = {
    input: path.join(...entryJoin),
    external: options.bundle.external,
    watch: { buildDelay: 1000 },
    plugins: [
      plugins.replace(options.define),
      plugins.commonjs({
        include: 'node_modules/**',
        namedExports: {
          react: Object.keys(React),
          'react-dom': Object.keys(ReactDom),
        },
      }),
      plugins.nodeResolve({
        extensions: options.extensions,
        preferBuiltins: false,
      }),
      plugins.typescript2(),
      plugins.json(),
      plugins.postcss(),
      env === ENV.PRODUCTION && plugins.terser.terser(),
    ],
  }

  const bundle = await rollup(bundleOption)
  await bundle.write({
    file: path.join(process.cwd(), options.output, getBunderFileName(options.bundle.entry, env)),
    format: 'cjs',
    name: '',
    sourcemap: env === ENV.PRODUCTION ? 'hidden' : true,
  })
  console.log(chalk.white.bgGreen('SUCCESS'), tag)
  // return bundler

  watch({
    ...bundleOption,
    output: {
      file: path.join(process.cwd(), options.output, getBunderFileName(options.bundle.entry, env)),
      format: 'cjs',
      name: '',
      sourcemap: env === ENV.PRODUCTION ? 'hidden' : true,
    },
    watch: {
      buildDelay: 300,
    },
  }).on('change', () => {
    console.log('on file change')
  })
}
