<template>
    <div>
        <div class="item" v-for="(item,index) in data" :key="index">
            <div class="left">
                <img :src="item.img" alt="" srcset="">
            </div>
            <div class="right">
                <div class="title">{{item.title}}</div>
                <div class="content">
                    <i class="cubeic-remove" @click.stop.prevent="cartremove(index)"></i>
                    <span>{{item.cartCount}}</span>
                    <i class="cubeic-add" @click.stop.prevent="cartadd(index)"></i>
                </div>
            </div>
        </div>
        <cube-button :disabled="true" v-if="totalPrice < minTotal">
            还差{{minTotal - totalPrice}}可以购买
        </cube-button>
        <cube-button v-if="totalPrice >= minTotal">
            ￥{{totalPrice}}，下单
            <span v-if="!token">(需要登录)</span>
        </cube-button>

    </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
    name:'Cart',
    data(){
        return {
            data:[],
            minTotal: 1000
            // totalPrice: 0
        }
    },
    created(){
        this.data = this.$store.state.cart || []        
    },
    methods:{
        cartadd(index){
            this.$store.commit('cartadd',index)
        },
        cartremove(index){
            this.$store.commit('cartremove',index)
        }
    },
    computed:{
        ...mapGetters({
            totalPrice:'totalPrice',
            token:'token'
        })
    }
}
</script>

<style lang="stylus">
.totalCount
    text-align center
    color gray
</style>
