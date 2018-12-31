
module.exports = {
  setTimeout: async (timeout) => {
    // timeout in seconds
    return this.$http({
      url: '/api/contracts/Agent/setTimeout',
      method: 'POST',
      data: {
        sender: this.$store.state.main.address,
        address: this.$store.state.main.agent,
        timeout: Number(timeout)
      }
    }).then((res) => {
      console.log(res)
      return res
    }).catch((err) => {
      console.log(err)
    })
  },
  pulse: async () => {
    return this.$http({
      url: '/api/contracts/Agent/pulse',
      method: 'POST',
      data: {
        sender: this.$store.state.main.address,
        address: this.$store.state.main.agent
      }
    }).then((res) => {
      console.log(res)
      return res
    }).catch((err) => {
      console.log(err)
    })
  },
  checkStatus: async () => {
    return this.$http({
      url: '/api/contracts/Agent/checkStatus',
      method: 'GET',
      params: {
        sender: this.$store.state.main.address,
        address: this.$store.state.main.agent
      }
    }).then((res) => {
      console.log(res)
      return res
    }).catch((err) => {
      console.log(err)
    })
  }
}
