<template>
  <div class="home">
    <k-header>
      <i class="cubeic-tag" @click="showCatg"></i>
    </k-header>
    <cube-slide
    :data="slider">
      <cube-slide-item v-for="(item,index) in slider" :key="index">
        <img :src="item.img" class="slider-item" alt="" srcset="">
      </cube-slide-item>
    </cube-slide>
    <!-- <cube-button @click="showCatg">
      选择分类
    </cube-button> -->
    <cube-drawer
      ref="drawer1"
      :data="[drawList]"
      title="请选择分类"
      @select="selectHandler">

    </cube-drawer>
      <div class="ball-wrap">
        <transition
        @before-enter="beforeEnter"
        @enter="enter"
        @afterEnter="afterEnter">
            <div class="ball" v-show="ball.show">
              <div class="inner">
                加
              </div>
            </div>
        </transition>
      </div>

    <goods-list @addcart="onAddcart" :data="all()">

    </goods-list>
  </div>
</template>

<script>
// @ is an alias to /src
let labels = {
  'fe':'前端',
  'python':'Python',
  'java':'Java',
  'bigdata':'大数据',
  'ai':'人工智能'
}
import GoodsList from '@/components/GoodsList'
import KHeader from '@/components/KHeader'

export default {
  name: 'home',
  components:{
    GoodsList,
    KHeader
  },
  data(){
    return {
      slider:[],
      keys:[],
      selectKeys:[],
      data:[],
      ball:{
        show:false,
        el:null
      }
    }
  },
  async created(){
    const ret = await this.$axios.get('/api/goods')
    if(ret.code == 0){
      this.slider = ret.slider
      this.keys = ret.keys
      this.data = ret.data
      this.selectKeys  = this.keys
    }
  },
  methods:{
    all(){
      let ret = []
      this.selectKeys.forEach(v=>{
        // console.log(v)
        ret = ret.concat(this.data[v])
      })

      return ret
    },
    showCatg(){
      // console.log("refs",this.$refs)
      this.$refs.drawer1.show()
    },
    selectHandler(e){
      // console.log(e.toString())
      this.selectKeys = [...e]
    },
    onAddcart(el){
      this.ball.show = true
      this.ball.el = el
    },

    beforeEnter(el){
      // 小球移动到点击的位置
      // 获取点击的DOM
      const dom = this.ball.el
      const rect = dom.getBoundingClientRect()
      // console.log(rect.top,rect.left)

      const x = rect.left - window.innerWidth/2
      const y = -(window.innerHeight - rect.top - 30)
      el.style.display = ''
      el.style.transform = `translate3d(0,${y}px,0)`

      const inner = el.querySelector('.inner')
      inner.style.transform = `translate3d(${x}px,0,0)`
    },
    enter(el,done){
      // 强制进行一次重绘
      this._reflow = document.body.offsetHeight
      // 小球移动到初始位置
      // 小球移动到购物车位置
      el.style.transform = `translate3d(0,0,0)`
      const inner = el.querySelector('.inner')
      inner.style.transform = `translate3d(0,0,0)`
      el.addEventListener('transitionend',done)

    },
    afterEnter(el){
      this.ball.show = false
      el.style.display = 'none'
    }
  },
  computed:{
    drawList(){
      return this.keys.map(v=>{
        return {
          value:v,
          text: labels[v]
        }
      })

      // console.log('drawerList',ret)

      // return ret
    }
  }
}
</script>
<style lang="stylus">
.slider-item
  width 100%
.cubeic-tag
  top 0
  right 0
  position absolute
  padding 0 15px

.ball-wrap
  .ball
    position fixed
    left 50%
    bottom 10px
    z-index 200
    color red
    transition all 1s cubic-bezier(0.49, -0.29, 0.75, 0.41)
    .inner
      width 16px
      height 16px
      transition all 1s linear
</style>
