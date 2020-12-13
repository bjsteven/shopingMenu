import allData from '@/utils/detail.json'
import lodash from 'lodash'

const state = {
  allData: {
    auto: lodash.cloneDeep(allData),
    night: lodash.cloneDeep(allData),
    user: lodash.cloneDeep(allData),
  },
  currentModeType: 'auto',
}
const getters = {
  currentModeType: (state) => state.currentModeType,
  allData: (state) => state.allData,
}
const mutations = {
  setCurrentModeType(state, val) {
    state.currentModeType = val
  },
}
const actions = {}
export default { state, getters, mutations, actions }
