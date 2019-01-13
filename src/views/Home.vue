<template>
  <div class="home">
    <cube-slide 
    :data="slider">
      <cube-slide-item v-for="(item,index) in slider" :key="index">
        <img :src="item.img" class="slider-item" alt="" srcset="">
      </cube-slide-item>
    </cube-slide>
    <cube-button @click="showCatg">
      选择分类
    </cube-button>
    <cube-drawer 
      ref="drawer1"
      :data="[drawList]"
      title="请选择分类"
      @select="selectHandler">

    </cube-drawer>

    <goods-list :data="all()">

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
export default {
  name: 'home',
  components:{
    GoodsList
  },
  data(){
    return {
      slider:[],
      keys:[],
      selectKeys:[],
      data:[]
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
</style>
