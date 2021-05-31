type Patch = {
  type: 'remove' | 'replace'
  key: string
  prevQueryValue: any
  currentQueryValue: any
}

export default (prevQuery, currentQuery) => {
  const patchs: Patch[] = []

  Object.keys(prevQuery).forEach((key) => {
    const prevQueryValue = prevQuery[key]
    const currentQueryValue = currentQuery[key]
    if (!currentQueryValue) {
      patchs.push({ type: 'remove', prevQueryValue, currentQueryValue, key })
    }
  })

  Object.keys(currentQuery).forEach((key) => {
    const prevQueryValue = prevQuery[key]
    const currentQueryValue = currentQuery[key]
    if (JSON.stringify(prevQueryValue) !== JSON.stringify(currentQueryValue)) {
      patchs.push({ type: 'replace', currentQueryValue, prevQueryValue, key })
      return
    }
  })

  return patchs
}
