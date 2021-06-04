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

export function hasLogic(element: Element) {
  const block = $(element).closest('.flex-form-block')
  if (!block.length) {
    return false
  }
  const tn = block.data('tn')
  const logicBlock = block.next(`[data-tn=${tn}Logical]`)
  return Boolean(logicBlock.length)
}

/**
 * Checkbox Group
 */
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

/**
 * DownshiftTypeahead
 */
export function mutationElementIsDownshiftTypeahead(element: Element) {
  return element.className.includes('uc-downshiftTypeahead-valueContainer')
}

export function getDownshiftTypeaheadValue(element: Element) {
  const items = $(element).find('.uc-downshiftTypeahead-valueItem')
  return items.map((_, v) => v.textContent).toArray()
}
