import type { Monaco } from '@monaco-editor/react'
import classNames from 'classnames'
import React from 'react'
import CloseIcon from './icons/closeIcon'
import MenuIcon from './icons/menuIcon'
import MonacoEditor from './monacoEditor'
import * as generators from '../generator'
import prettier from 'prettier/standalone'
import plugin from 'prettier/parser-babel'

type Props = {
  data: filterMap
}

export default function Render(props: Props) {
  const featureRef = React.useRef<Monaco['editor']>(null)

  const [showEditor, setShowEditor] = React.useState(false)

  const onClose = () => {
    setShowEditor(false)
  }

  const onSelectComponent = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const generator = generators[e.target.value]

    if (!generator) {
      featureRef.current.setValue('// not implemented ' + e.target.value)
      return
    }
    const code = prettier.format(generator.generate(props.data), {
      parser: 'babel',
      plugins: [plugin],
      singleQuote: true,
    })
    console.log('code', code)

    featureRef.current.setValue(code)
  }


  return (
    <div>
      <div
        className={classNames(
          'fixed z-9999 w-3/4 bg-white shadow-xl h-3/4 left-0 right-0 bottom-0 top-0 m-auto p-5 flex-col',
          {
            hidden: !showEditor,
            flex: showEditor,
          },
        )}
      >
        <span className="absolute right-5 top-5 cursor-pointer" onClick={onClose}>
          <CloseIcon />
        </span>
        <select
          className="h-8 w-52 outline-none border-gray-400 border border-solid rounded-md px-3 text-sm"
          onChange={onSelectComponent}
        >
          <option value=""></option>
          <option value="CheckboxDateInput">CheckboxDateInput</option>
          <option value="CheckboxDateRange">CheckboxDateRange</option>
          <option value="Checkbox">Checkbox</option>
          <option value="CheckboxGroup">CheckboxGroup</option>
          <option value="CompositeRadiusSearch">CompositeRadiusSearch</option>
          <option value="DateInput">DateInput</option>
          <option value="DateRange">DateRange</option>
          <option value="DateSelect">DateSelect</option>
          <option value="DescWithCodeTypeahead">DescWithCodeTypeahead</option>
          <option value="DownshiftTypeahead">DownshiftTypeahead</option>
          <option value="MinMaxInput">MinMaxInput</option>
          <option value="MinMaxPrice">MinMaxPrice</option>
          <option value="MultiList">MultiList</option>
          <option value="MultiSelect">MultiSelect</option>
          <option value="MultiSelectWithTextInput">MultiSelectWithTextInput</option>
          <option value="NestedCheck">NestedCheck</option>
          <option value="NumericInput">NumericInput</option>
          <option value="PartialSearchTypeahead">PartialSearchTypeahead</option>
          <option value="RadioGroup">RadioGroup</option>
          <option value="RadioGroupLogic">RadioGroupLogic</option>
          <option value="RadiusSearch">RadiusSearch</option>
          <option value="SingleSelect">SingleSelect</option>
          <option value="TextInput">TextInput</option>
          <option value="TextList">TextList</option>
          <option value="TokenizedTextInput">TokenizedTextInput</option>
          <option value="SearchSuggestTypeahead">SearchSuggestTypeahead</option>
          <option value="SuggestTypeahead">SuggestTypeahead</option>
        </select>
        <div className="flex flex-1 py-4 justify-between">
          <MonacoEditor editorRef={featureRef} language="typescript" />
        </div>
      </div>

      <div
        onClick={() => setShowEditor(true)}
        className="w-14 h-14 rounded-full overflow-hidden border border-solid shadow-md flex items-center justify-center cursor-pointer bg-gray-50"
      >
        <MenuIcon />
      </div>
    </div>
  )
}
