<template>
    <div >
        <div class="item" v-for="(item,index) in data" :key="index">
            <router-link :to="`/detail/${index}`">
                <div class="left">
                    <img :src="item.img" alt="" @click.stop.prevent="imgPreview(item.img)" srcset="">
                </div>
                <div class="right">
                    <div class="title">
                        {{item.title}}
                    </div>
                    <div class="content">
                        <i class="cubeic-remove"  @click.stop.prevent="removeCart(item)"></i>
                        <span>{{item.count}}人购买</span>
                        <i class="cubeic-add" @click.stop.prevent="addCart(item)"></i>
                    </div>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    props:["data"],
    created(){
        // console.log(this.data)
    },
    methods:{
        addCart(item){
            this.$store.commit('addCart',item)
            // console.log(this.$store.state.cart)
        },
        removeCart(item){
            this.$store.commit('removeCart',item)
            // console.log(this.$store.state.cart)
        },
        imgPreview(img){
            this.$createImagePreview({
                imgs:[img]
            }).show()
        }
    }
}
</script>

<style lang="stylus">
.item 
    width 100%
    overflow hidden
    .left
        padding 10px
        width 100px
        float left 
        img 
            width 100%
    .right 
        padding-right 20px
        text-align right
        .title 
            line-height 40px
</style>
