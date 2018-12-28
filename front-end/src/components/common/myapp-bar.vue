<template>
<template>
  <mu-appbar id="bar" text-color="#FFE300" color="#1C1E22">
    <a href="#/"><span id="#title" >SWAPI</span></a>
    <a slot="right" href="#/login" v-if="login === false" style="background-color: #1C1E22;color: #FFFFFF;font-size: 18px;padding: 8px 8px;margin-right: 30px;">LOGIN</a>
    <mu-button slot="right" @click="logout" v-if="login === true" style="background-color: #1C1E22;color: #FFFFFF;font-size: 15px;margin-right: 30px;">Logout</mu-button>
  </mu-appbar>
</template>

<script type="text/javascript">
export default {
  props: ['login'],
  name: 'page-header',
  data () {
    return {

    }
  },
  methods: {
    async logout () {
      let res = await this.$http({
        url: '/api/logout',
        method: 'GET',
        headers: {
          'SW_TOKEN': this.$store.state.main.token
        }
      })
      this.$alert('logout finished!', 'alert')
      console.log('response:', res)
      this.$store.commit('login', {
        status: false
      })
      console.log('cur token:', this.$store.state.main.token)
      console.log('cur login:', this.$store.state.main.login)
    }
  }
}
</script>

<style scoped>
#bar {
  width: 100%;
  height: 40px;
  padding-left: 15px;
  padding-top: 35px;
  padding-bottom: 30px;
  margin-bottom: 20px;
}
#title {
  color: #FFE300;
  font-size: 30px;
  font-weight: bold;
}
</style>

</template>

<script type="text/javascript">
export default {
  props: ['login'],
  name: 'page-header',
  data () {
    return {

    }
  },
  methods: {
    async logout () {
      let res = await this.$http({
        url: '/api/logout',
        method: 'GET',
        headers: {
          'SW_TOKEN': this.$store.state.main.token
        }
      })
      this.$alert('logout finished!', 'alert')
      console.log('response:', res)
      this.$store.commit('login', {
        status: false
      })
      console.log('cur token:', this.$store.state.main.token)
      console.log('cur login:', this.$store.state.main.login)
    }
  }
}
</script>

<style scoped>
#bar {
  width: 100%;
  height: 40px;
  padding-left: 15px;
  padding-top: 35px;
  padding-bottom: 30px;
  margin-bottom: 20px;
}
#title {
  color: #FFE300;
  font-size: 30px;
  font-weight: bold;
}
</style>
