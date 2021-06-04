import $ from 'jquery'
import {
  getCheckboxGroupValue,
  getDownshiftTypeaheadValue,
  getFilterName,
  hasLogic,
  isCheckboxGroup,
  isFilterElement,
  mutationElementIsDownshiftTypeahead,
} from './helper'

// export type filterNode = { filterName: string; value: string | string[] }

type onChange = (value: filterNode) => void

export default (onChange: onChange) => {
  const $doc = $(document)

  $doc.on('change', '.cx-checkboxField', function () {
    if (!isFilterElement(this)) {
      return
    }

    if (isCheckboxGroup(this)) {
      const value = getCheckboxGroupValue(this)
      const filterName = getFilterName(this)
      onChange({ filterName, value })
    }
  })

  const observer = new MutationObserver(function (mutationsList, observer) {
    mutationsList.forEach((record) => {
      const target = record.target as HTMLElement

      if (mutationElementIsDownshiftTypeahead(target)) {
        const value = getDownshiftTypeaheadValue(target)
        const filterName = getFilterName(target)
        const logic = hasLogic(target)
        onChange({ filterName, value: value, logic })
      }
    })
  })

  observer.observe($doc[0], { subtree: true, childList: true })
}
