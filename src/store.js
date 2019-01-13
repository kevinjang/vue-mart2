import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    token:'',
    cart: JSON.parse(localStorage.getItem('cart')) || []
  },
  mutations: {
    setToken(state,token){
      state.token = token
    },
    addCart(state,good){
      let gooditem = state.cart.find(v=>v.title == good.title)
      if(gooditem){
        gooditem.cartCount++
      }else{
        state.cart.push({
          ...good,
          cartCount:1
        })
      }
    },
    removeCart(state,good){
      let goodItem = state.cart.find(v=>v.title== good.title)
      if(goodItem){
        if(goodItem.cartCount > 1){
          goodItem.cartCount--
        }else{
          const index = state.cart.findIndex(v=>v.title == good.title)
          state.cart.splice(index,1)
        }
      }
    },
    cartadd(state,index){
      state.cart[index].cartCount++
    },
    cartremove(state,index){
      if(state.cart[index].cartCount > 1){
        state.cart[index].cartCount--
      }else{
        state.cart.splice(index,1)
      }
    }
  },
  actions: {

  },
  getters:{
    count:state=>{
      let num = 0
      state.cart.forEach(v=>{
        num += v.cartCount
      })

      return num
    },
    totalPrice:state=>{
      let num = 0
      state.cart.forEach(v=>{
        num = v.cartCount * v.price
      })
      return num
    }
  }
})

store.subscribe((mutations,state)=>{
  localStorage.setItem('cart',JSON.stringify(state.cart))
})
export default store