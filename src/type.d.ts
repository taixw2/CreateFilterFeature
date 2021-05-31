type filterNode = { filterName: string; value: string | string[] }

type apiState = Record<string, any>

type filterMap = Record<string, filterNode & { apiState: apiState }>
