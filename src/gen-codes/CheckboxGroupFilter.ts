// Record<string, filterNode & { apiState: Record<string, any> }>

import filterVariableSafe from '../utils/filterVariableSafe'

const prefix = `
import {GeneralStringListFixture, toFixtureTable} from 'integration-tests/fixtures/common';
import {defaultApiState} from './common';
`

function fixtures(data: filterMap) {
  return (
    Object.keys(data).reduce((code, key) => {
      const item = data[key]
      return `
      ${code}
      const ${filterVariableSafe(item.filterName)}Fixture: GeneralStringListFixture = {
        filterName: '${item.filterName}',
        setValue: ${JSON.stringify(item.value)},
        apiState: ${JSON.stringify(item.apiState)},
      }
    `
    }, prefix) +
    `
  export const checkboxGroupTests = toFixtureTable<GeneralStringListFixture>(
    [
      ${Object.keys(data).map(filterVariableSafe).join(',')}
    ],
    {defaultApiState}
  );
  `
  )
}

export default {
  fixtures,
}
