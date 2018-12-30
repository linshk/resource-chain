const state = {
  token: '',
  login: false,
  tokenName: 'sw_token',
  address: '0xa81fb8a19514fc56e40eb42127b79271240f687d',
  agent: '0x0C87A44080f2c95aae3452A2145B6650Dd6f5588',
  manager: '0xf81565c8Df53E0468527f2893B56200032bF917f',
  username: ''
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
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
