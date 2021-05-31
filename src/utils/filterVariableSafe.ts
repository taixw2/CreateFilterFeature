export default (filterName: string) => {
  //
  return filterName.replace(/[\s\\\/]/g, '_')
}
