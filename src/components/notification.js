import Notice from './Notice'
import Vue from 'vue'
// 手动创建Notice组件，加载到body里，不受父组件影响
Notice.newInstance = props=>{
    const Instance = new Vue({
        data:props,
        render(h){
            // h就是类似react 里的createElement
            return h(Notice,{
                props
            })
        }
    })

    const comp = Instance.$mount()
    // 挂载在body之上，而不是组件内部
    document.body.appendChild(comp.$el)

    const alert = Instance.$children[0]

    return {
        add(options){
            alert.add(options)
        },
        del(id){
            alert.del(id)
        }
    }
}