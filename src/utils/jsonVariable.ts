const encodeFlag = '_________###__xx##__'

export const stringify = (value: string) => {
  return encodeFlag + value
}

export const parse = (jsonString: string) => {
  return jsonString.replace(new RegExp(`"${encodeFlag}(.*?)"`, 'g'), '$1')
}
