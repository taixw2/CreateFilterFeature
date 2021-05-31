import legacy from '@vitejs/plugin-legacy'
import reactRefresh from '@vitejs/plugin-react-refresh'

export default {
  plugins: [
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
    reactRefresh({
      parserPlugins: ['classProperties', 'classPrivateProperties'],
    }),
  ],
}
