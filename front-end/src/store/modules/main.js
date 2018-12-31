const state = {
  address: '',
  agent: '',
  manager: '',
  username: '',
  resourcesCount: 0
}

const getters = {}

const actions = {}

const mutations = {
  login (state, val) {
    if (val.status) {
      state.login = true
      state.token = val.token
    } else {
      state.login = false
      state.token = ''
    }
  },
  setAddress (state, val) {
    state.address = val.address
  },
  setAgent (state, val) {
    state.agent = val.agent
  },
  setManager (state, val) {
    state.manager = val.manager
  },
  setResourcesCount (state, val) {
    state.resourcesCount = val.total
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
