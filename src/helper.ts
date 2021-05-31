import $ from 'jquery'

/**
 * 根据 filter 的特征， 判断是否一个有效的元素
 */
export function isFilterElement(element: Element) {
  const block = $(element).closest('.flex-form-block')
  if (!block.length) {
    return false
  }
  const tn = block.data('tn')
  return Boolean(tn)
}

export function getFilterName(element: Element) {
  const block = $(element).closest('.flex-form-block')
  if (!block.length) {
    return false
  }
  const tn = block.data('tn')
  return tn
}

export function isCheckboxGroup(element: Element) {
  const groupElement = $(element).closest('.uc-checkboxGroup-group')
  return Boolean(groupElement.length)
}

export function getCheckboxGroupValue(element: Element) {
  const groupElement = $(element).closest('.uc-checkboxGroup-group')
  const checkedElements = groupElement.find('input:checked')
  return checkedElements
    .map((i, currentCheckbox) => {
      return $(currentCheckbox).parent().text()
    })
    .toArray()
}
