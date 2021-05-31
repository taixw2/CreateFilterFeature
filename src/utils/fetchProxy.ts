type Body = {
  query: string
  variables: {
    uiSource: string
    uiQueryMap: {
      [key: string]: {
        status: string[]
        areas: string[]
      }
    }
    generalQuery: {
      listingDetailFieldsRequired: string[]
      sortByListingDetails: string[]
      facetFieldNames: string[]
      listingTypes: number[]
      sortOrder: number
      start: number
      num: number
      listingFeeds: string[]
      geographies: string[]
    }
    debugMode: boolean
    listingDetailQuery: string[]
  }
}

type OnFetchRequestBodyChange = (body: Body) => void

export default (onFetchRequestBodyChange: OnFetchRequestBodyChange) => {
  const _fetch = window.fetch

  window.fetch = function (input: RequestInfo, init?: RequestInit) {
    const body = init.body
    if (!input.toString().includes('/graphql/mls-search')) {
      return _fetch(input, init)
    }
    if (!body || typeof body !== 'string') {
      return _fetch(input, init)
    }
    onFetchRequestBodyChange(JSON.parse(body))
    return _fetch(input, init)
  }
}
