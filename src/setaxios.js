import axios from 'axios'
import store from './store'
// eslint-disable-next-line
/* eslint-disable */
export default function setAxios(){
    axios.interceptors.request.use(config=>{
        if(!!store.state.token){
            config.headers.token = store.state.token
        }
        return config
    })

    axios.interceptors.response.use(response=> {
        // console.log(response)
        if(response.status == 200){
            const data = response.data
            if(data.code == 0){
                return data
            }else if (data.code == -1){
                // 已注销
                store.commit('setToken','')
                localStorage.removeItem('token')
            }
        }
        return response
    })

}
