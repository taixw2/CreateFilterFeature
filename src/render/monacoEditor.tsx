import React from 'react'
import Editor from '@monaco-editor/react'

type Props = {
  editorRef?: { current: any }
  onMount?: (editor: any) => void
  language: string
}

export default function MonacoEditor({ editorRef, onMount, language = 'typescript' }: Props) {
  return React.useMemo(() => {
    return (
      <Editor
        language={language}
        onMount={(editor) => {
          editorRef.current = editor
          editor.updateOptions({
            renderLineHighlight: 'none',
            scrollbar: {
              verticalScrollbarSize: 0,
              horizontalSliderSize: 0,
              verticalSliderSize: 0,
              horizontalScrollbarSize: 0,
              arrowSize: 0,
            },
            lineNumbers: 'on',
            lineDecorationsWidth: 0,
            lineNumbersMinChars: 0,
            minimap: {
              enabled: false,
            },
          })
          onMount?.(editor)
        }}
      />
    )
  }, [editorRef, language])
}
