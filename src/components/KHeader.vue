<template>
    <div class="header"> 
        <div class="back">
            <i class="cubeic-back" @click="back()"></i>
        </div>
        <div class="title">开课吧</div>
        <slot></slot>
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
    background lightgray
    position relative
    .back 
        position absolute
        left 0px 
        top 0px
        padding 0 15px
</style>
