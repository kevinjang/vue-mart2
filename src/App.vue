<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/login">Login</router-link> 
      <span v-if="isLogin" @click="logout">退出</span>
    </div> -->
    
    <router-view/>
    <cube-tab-bar 
      v-model="selectLabel"
      :data="tabs"
      show-slider
      @change="changeHandler">
      <cube-tab v-for="(item,index) in tabs" 
        :label="item.value" 
        :key="index" 
        :icon="item.icon">
        {{item.label}}
        <span class="badge" v-if="item.label=='Cart'">{{count}}</span>
      </cube-tab>
      
    </cube-tab-bar>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  data(){
    return {
      selectLabel:'/',
      tabs: [{
        label:'Home',
        value:'/',
        icon:'cubeic-home'
      },{
        label:'Cart',
        value:'/cart',
        icon:'cubeic-mall'
      },{
        label:'Me',
        value:'/login',
        icon: 'cubeic-person'
      }]
    }
  },
  computed:{
    isLogin(){
      return !!this.$store.state.token
    },
    ...mapGetters({
      count:'count'
    })
    // count(){
    //   // this.$store.state.cart.
    // }
  },

  created(){
    // console.log(!!this.$store.state.token)
  },
  methods:{
    logout(){
      const ret = this.$axios.get('/api/logout')
    },
    changeHandler(e){
      // console.log(e)
      this.$router.push({
        path:e
      })
    }
  }
}
</script>

<style lang="stylus">
#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  height 750px

#nav
  padding 30px
  a
    font-weight bold
    color #2c3e50
    &.router-link-exact-active
      color #42b983
.badge 
  background orange 
  padding: 5px
  border-radius 45%
  color white
.cube-tab-bar
  position fixed
  left 0
  bottom  0
  right 0
  background #edf0f4
</style>
