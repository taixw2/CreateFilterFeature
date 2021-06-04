import { jsonVariable } from '../utils'
import filterVariableSafe from '../utils/filterVariableSafe'

const prefix = `
import {LogicType} from '@uc/thrift2npme/dist/common/utils';
import {LOGIC_LABEL_NOT} from 'integration-tests/constants';
import {toFixtureTable, GeneralStringListFixture} from 'integration-tests/fixtures/common';
import {defaultApiState} from './common';

type GeneralTypeAHeadFixture = GeneralStringListFixture & {
  logic?: string;
  logicFilterName?: string;
};
`

function fixtures(data: filterMap) {
  return Object.keys(data).reduce((code, key) => {
    const item = data[key]
    const apiStateWithoutLogic = item.apiState
    const apiKey = Object.keys(apiStateWithoutLogic)[0]
    const apiState = {
      ...apiStateWithoutLogic,
    }
    let logicTypeFields = ''

    if (item.logic) {
      apiState[`${apiKey}LogicType`] = jsonVariable.stringify('LogicType.NOT')
      logicTypeFields = `
      logic: LOGIC_LABEL_NOT,
      `
    }

    return `
      ${code}
      const ${filterVariableSafe(item.filterName)}Fixture: GeneralTypeAHeadFixture = {
        filterName: '${item.filterName}',
        ${logicTypeFields}
        setValue: ${JSON.stringify(item.value)},
        apiState: ${JSON.stringify(apiState)},
      }
    `
  }, '')
}

function exportTests(data: filterMap) {
  return `
  export const typeaheadFixturesTests = toFixtureTable<GeneralTypeAHeadFixture>(${JSON.stringify(
    Object.keys(data).map((v) => jsonVariable.stringify(`${filterVariableSafe(v)}Fixture`)),
  )}, {defaultApiState});
  `
}

function generate(data: filterMap) {
  return jsonVariable.parse(prefix + fixtures(data) + exportTests(data))
}

export default {
  generate,
}
