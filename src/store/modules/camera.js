import allData from '@/utils/detail.json'

const state = {
  allData: {
    auto: allData,
    night: allData,
    user: allData,
  },
  currentModeType: 'auto',
}
const getters = {
  currentModeType: (state) => state.currentModeType,
  allData: (state) => state.allData,
}
const mutations = {}
const actions = {}
export default { state, getters, mutations, actions }
