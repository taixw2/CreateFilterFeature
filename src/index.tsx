import React from 'react'
import ReactDOM from 'react-dom'
import fetchProxy from './utils/fetchProxy'
import diffQuery from './utils/diffQuery'
import delegate from './delegate'
import './index.css'
import FilterCodeEditor from './render/filterCodeEditor'
import DefaultApiStateRender from './render/defaultApiStateEditor'

function App() {
  const localDefaultApiState = localStorage.getItem('default_api_state')

  const defaultApiStateRef = React.useRef<apiState>(localDefaultApiState ? JSON.parse(localDefaultApiState) : {})

  const apiStateRef = React.useRef<apiState>({})

  const filterRef = React.useRef<filterNode>({ filterName: '', value: '' })
  const filterMapRef = React.useRef<filterMap>({})

  // const [render, seRender] = React.useState(false)

  React.useEffect(() => {
    fetchProxy((body) => {
      const [[, query]] = Object.entries(body.variables.uiQueryMap)
      // queryMap.current
      const patch = diffQuery({ ...apiStateRef.current, ...defaultApiStateRef.current }, query)
      apiStateRef.current = query

      const { filterName } = filterRef.current
      const filterNode = filterMapRef.current[filterName]

      patch.forEach((item) => {
        // 状态已经变回了默认值，则不需要处理这个 filter
        const defaultQueryValue = defaultApiStateRef.current[item.key]
        if (defaultQueryValue && JSON.stringify(defaultQueryValue) === JSON.stringify(item.currentQueryValue)) {
          delete filterMapRef.current[filterName]
          return
        }

        if (item.type === 'replace') {
          filterMapRef.current[filterName] = {
            ...filterRef.current,
            apiState: {
              [item.key]: item.currentQueryValue,
            },
          }
          return
        }

        if (item.type === 'remove' && filterNode) {
          delete filterNode.apiState[item.key]
        }

        if (!filterNode || !Object.keys(filterNode).length) {
          delete filterMapRef.current[item.key]
        }
      })
    })

    // 识别 filter component
    delegate((value) => {
      filterRef.current = value
    })
  }, [])

  return (
    <div className="flex flex-col justify-center items-center">
      <DefaultApiStateRender
        data={defaultApiStateRef.current}
        onChange={(value) => {
          if (value) {
            localStorage.setItem('default_api_state', JSON.stringify(value))
          }
          defaultApiStateRef.current = value
        }}
      />
      <FilterCodeEditor data={filterMapRef.current} />
    </div>
  )
}

const root = document.createElement('div')
root.className = 'fixed right-6 bottom-6 z-999'
root.id = 'create_fixture_tampermonkey'
document.body.appendChild(root)
ReactDOM.render(<App />, root)

const n = {
  status: ['Active', 'New', 'Back on Market', 'Contingent With Kickout', 'Pending Approval'],
}
