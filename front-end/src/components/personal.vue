<template>
  <el-container direction="vertical">
    <el-header>
      <el-button type="primary" @click="getAcc">获取默认账户</el-button>
      <el-button type="primary" @click="newManager">获取资源中心合约</el-button>
      <el-button type="primary" @click="newAgent">创建代理合约</el-button>
      <el-button type="primary" @click="registerAgent">登记代理合约</el-button>
    </el-header>
    <el-main direction="vertical">
      <el-container>我的账户地址:{{this.$store.state.main.address}}</el-container>
      <el-container>代理合约地址:{{this.$store.state.main.agent}}</el-container>
      <el-container>资源中心地址:{{this.$store.state.main.manager}}</el-container>
    </el-main>
  </el-container>
</template>

<script type="text/javascript">
export default {
  name: 'personal',
  data () {
    return {
      form: {
        agent: this.$store.state.main.agent,
        manager: this.$store.state.main.manager
      }
    }
  },
  methods: {
    async getAcc () {
      let res = await this.$http({
        url: '/api/getAccounts',
        method: 'GET'
      }).catch((err) => {
        console.log(err)
      })
      console.log(res)
      this.$store.commit('setAddress', {address: res.data[0]})
    },
    async registerAgent () {
      this.$http({
        url: '/api/contracts/ResourceManager/registerAgent',
        method: 'POST',
        data: {
          sender: this.$store.state.main.address,
          address: this.$store.state.main.manager,
          agent: this.$store.state.main.agent
        }
      }).then((res) => {
        console.log(res)
        this.$message({
          showClose: true,
          message: '登记成功',
          type: 'success'
        })
      }).catch((err) => {
        console.log(err)
      })
    },
    async newAgent () {
      if (this.$store.state.main.agent === '') {
        let tx = await this.$http({
          url: '/api/contracts/Agent/newAgent',
          method: 'post',
          data: {
            sender: this.$store.state.main.address
          }
        })
        console.log(tx)
        this.$store.commit('setAgent', {agent: tx.data.data.address})
        this.$message({
          showClose: true,
          message: '创建成功',
          type: 'success'
        })
      } else {
        this.$message({
          showClose: true,
          message: '合约只需部署一次'
        })
      }
    },
    async newManager () {
      if (this.$store.state.main.manager === '') {
        let txManager = await this.$http({
          url: '/api/contracts/ResourceManager/getDeployedManager',
          method: 'GET'
        })
        console.log(txManager)
        console.log('manager addr', txManager.data.data.address)
        this.$store.commit('setManager', {manager: txManager.data.data.address})
        this.$message({
          showClose: true,
          message: '创建成功',
          type: 'success'
        })
      } else {
        this.$message({
          showClose: true,
          message: '合约只需部署一次'
        })
      }
    }
  }
}
</script>

<style type="text/css">

</style>
