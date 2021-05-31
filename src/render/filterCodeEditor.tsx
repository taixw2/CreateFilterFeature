import type { Monaco } from '@monaco-editor/react'
import classNames from 'classnames'
import React from 'react'
import { filterNode } from '../delegate'
import CloseIcon from './icons/closeIcon'
import MenuIcon from './icons/menuIcon'
import MonacoEditor from './monacoEditor'

type Props = {
  data: Record<
    string,
    filterNode & {
      apiState: Record<string, any>
    }
  >
}

export default function Render(props: Props) {
  const featureRef = React.useRef<Monaco['editor']>(null)

  const [showEditor, setShowEditor] = React.useState(false)

  function onClose() {
    setShowEditor(false)
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
        <select className="h-8 w-52 outline-none border-gray-400 border border-solid rounded-md px-3 text-sm">
          <option value=""></option>
          <option value="CheckboxDateInputFilter">CheckboxDateInputFilter</option>
          <option value="CheckboxDateRangeFilter">CheckboxDateRangeFilter</option>
          <option value="CheckboxFilter">CheckboxFilter</option>
          <option value="CheckboxGroupFilter">CheckboxGroupFilter</option>
          <option value="CompositeRadiusSearchFilter">CompositeRadiusSearchFilter</option>
          <option value="DateInputFilter">DateInputFilter</option>
          <option value="DateRangeFilter">DateRangeFilter</option>
          <option value="DateSelectFilter">DateSelectFilter</option>
          <option value="DescWithCodeTypeaheadFilter">DescWithCodeTypeaheadFilter</option>
          <option value="DownshiftTypeaheadFilter">DownshiftTypeaheadFilter</option>
          <option value="MinMaxInputFilter">MinMaxInputFilter</option>
          <option value="MinMaxPriceFilter">MinMaxPriceFilter</option>
          <option value="MultiListFilter">MultiListFilter</option>
          <option value="MultiSelectFilter">MultiSelectFilter</option>
          <option value="MultiSelectWithTextInputFilter">MultiSelectWithTextInputFilter</option>
          <option value="NestedCheckFilter">NestedCheckFilter</option>
          <option value="NumericInputFilter">NumericInputFilter</option>
          <option value="PartialSearchTypeaheadFilter">PartialSearchTypeaheadFilter</option>
          <option value="RadioGroupFilter">RadioGroupFilter</option>
          <option value="RadioGroupLogicFilter">RadioGroupLogicFilter</option>
          <option value="RadiusSearchFilter">RadiusSearchFilter</option>
          <option value="SingleSelectFilter">SingleSelectFilter</option>
          <option value="TextInputFilter">TextInputFilter</option>
          <option value="TextListFilter">TextListFilter</option>
          <option value="TitleFilter">TitleFilter</option>
          <option value="TokenizedTextInputFilter">TokenizedTextInputFilter</option>
          <option value="SearchSuggestTypeaheadFilter">SearchSuggestTypeaheadFilter</option>
          <option value="SuggestTypeaheadFilter">SuggestTypeaheadFilter</option>
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
