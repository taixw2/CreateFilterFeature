type filterNode = { filterName: string; value: string | string[]; logic?: boolean }

type apiState = Record<string, any>

type filterMap = Record<string, filterNode & { apiState: apiState }>
