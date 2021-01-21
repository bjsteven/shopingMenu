import allData from '@/utils/detail.json'
import lodash from 'lodash'

const state = {
  allData: {
    auto: lodash.cloneDeep(allData),
    night: lodash.cloneDeep(allData),
    user: lodash.cloneDeep(allData),
  },
  currentModeType: 'auto',
  isDesktop: false,
}
const getters = {
  currentModeType: (state) => state.currentModeType,
  allData: (state) => state.allData,
  isDesktop: (state) => state.isDesktop,
}
const mutations = {
  setCurrentModeType(state, val) {
    state.currentModeType = val
  },
  setDesktop(state, status) {
    state.isDesktop = status
  },
  // setAllData(state, data) {
  //   state.allData = data
  // },
}
const actions = {}
export default { state, getters, mutations, actions }
