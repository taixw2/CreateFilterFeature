import React, { useEffect } from 'react'
import DefaultApiStateIcon from './icons/defaultApiStateIcon'
import type { Monaco } from '@monaco-editor/react'
import type { filterNode } from '../delegate'
import CloseIcon from './icons/closeIcon'
import MonacoEditor from './monacoEditor'
import classNames from 'classnames'

type Props = {
  data: Record<string, any>
  onChange: (data: Record<string, any>) => void
}

export default function DefaultApiStateInput(props: Props) {
  const featureRef = React.useRef<any>(null)

  const [showEditor, setShowEditor] = React.useState(false)

  const dataStringify = JSON.stringify(props.data, null, 2)
  function onClose() {
    setShowEditor(false)
    const editorValue = featureRef.current?.getValue()
    props.onChange(new Function(`return ${editorValue}`)())
  }

  return (
    <div className="mb-3">
      <div
        className={classNames(
          'fixed z-9999 w-2/4 bg-white shadow-xl h-2/4 left-0 right-0 bottom-0 top-0 m-auto p-8 flex-col',
          {
            hidden: !showEditor,
            flex: showEditor,
          },
        )}
      >
        <span className="absolute right-5 top-5 cursor-pointer" onClick={onClose}>
          <CloseIcon />
        </span>
        <div className="flex flex-1 py-4 justify-between">
          <MonacoEditor
            onMount={(editor) => {
              if (dataStringify) {
                editor.setValue(dataStringify)
              }
            }}
            editorRef={featureRef}
            language="javascript"
          />
        </div>
      </div>
      <div
        className="w-10 h-10 rounded-full overflow-hidden border border-solid shadow-md flex items-center justify-center cursor-pointer bg-gray-50"
        onClick={() => setShowEditor(true)}
      >
        <DefaultApiStateIcon />
      </div>
    </div>
  )
}
