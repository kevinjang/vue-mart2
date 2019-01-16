<template>
    <div class="alert">
        <div class="alert-container" v-for="item in alerts" :key="item.id">
            <div class="alert-content">
                {{item.content}}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            alerts:[]
        }
    },
    created(){
        this.id = 0
    },
    methods:{
        add(option){
            const id = 'id_'+(this.id++)
            const _alert = {id:id,...option}
            this.alerts.push(_alert)

            const duration = option.duration

            setTimeout(()=>{
                this.del(id)
            })
        },
        del(id){
            for(let i =0;i<this.alerts.length;i++){
                if(this.alerts[i].id == id){
                    this.alerts.splice(i,1)
                    break;
                }
            }
        }
    }
}
</script>

<style lang="stylus">

</style>
