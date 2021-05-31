import $ from 'jquery'
import { getCheckboxGroupValue, getFilterName, isCheckboxGroup, isFilterElement } from './helper'

export type filterNode = { filterName: string; value: string | string[] }

type onChange = (value: filterNode) => void

export default (onChange: onChange) => {
  $(document).on('change', '.cx-checkboxField', function () {
    if (!isFilterElement(this)) {
      return
    }

    if (isCheckboxGroup(this)) {
      const value = getCheckboxGroupValue(this)
      const filterName = getFilterName(this)
      onChange({ filterName, value })
    }
  })
}
