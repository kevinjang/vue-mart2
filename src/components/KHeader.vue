<template>
    <div class="header"> 
        <div class="back">
            <i class="cubeic-back" @click="back()"></i>
        </div>
        <div class="title">开课吧</div>
        <slot style="margin-top:44px;"></slot>
    </div>
</template>

<script>
export default {
    name: 'KHeader',
    methods:{
        back(){
            this.$router.back()
        }
    }
}
</script>

<style lang="stylus">
.header
    height 44px
    line-height 44px
    text-align center
    background whitesmoke
    position relative
    top 0 
    left 0 
    position  fixed
    width 100%
    z-index  100
    .back 
        position absolute
        left 0px 
        top 0px
        padding 0 15px
</style>
