<template>
    <div>
        <div class="alert" v-if="showError">
            {{message}}
        </div>
        <cube-form
        :model="model"
        :schema="schema"
        @validate="validateHandler"
        @submit="submitHandler"
        >

        </cube-form>
    </div>
</template>

<script>
export default {
    name: 'Login',
    data(){
        return {
            showError:false,
            message:'',
            model:{
                username: '',
                passwd: ''
            },
            usercheckMessage:'用户名不存在',
            schema:{
                fields:[
                    {
                        type: 'input',
                        modelKey: 'username',
                        label: "用户名",
                        props:{
                            type: 'string',
                            placeholder:'请输入用户名'
                        },
                        rules:{
                            required:true,
                            min:3,
                            max:15,
                            usercheck:v=>{
                                return async (resolve)=>{
                                    const ret = await this.$axios.get('/api/check?username='+v)
                                    // if(ret.data.code != 0)
                                    console.log('ret',ret)
                                    // this.usercretheckMessage = ret.data.message
                                    resolve(ret.code == 0)
                                }
                            }
                        },
                        trigger:'blur',
                        messages:{
                            required:'用户名必填',
                            min:'用户名长度不能小于3',
                            max:'用户名长度不能大于15',
                            usercheck:'用户名不存在'
                        }
                    },
                    {
                        type:'input',
                        modelKey: 'passwd',
                        label: '密码',
                        props:{
                            type:'password',
                            placeholder:'密码必填',
                            eye:{
                                open:false
                            }
                        },
                        rules:{
                            required:true
                        },
                        trigger:'blur'
                    },
                    {
                        type: 'submit',
                        label:'登录'
                    }
                ]
            }
        }
    },
    methods:{
        validateHandler(e){
            // console.log(e)
        },
        async submitHandler(e){
            const obj = {
                username: this.model.username,
                passwd: this.model.passwd
            }
            e.preventDefault()
            const ret = await this.$axios.get('/api/login',{params:obj})
            // console.log(ret.status)
            if(ret.code == 0){
                    this.$store.commit('setToken',ret.token)
                    localStorage.setItem('token',ret.token)
                    // console.log( !!this.$store.state.token)

                    const toast = this.$createToast({
                        duration: 2000,
                        type:'correct',
                        txt:'登陆成功'
                    })
                    toast.show()
                }else{
                    // const toast = this.$createToast({
                    //     duration: 2000,
                    //     type:'error',
                    //     txt: ret.message || '未知错误'
                    // })
                    // toast.show()
                    this.showError = true
                    this.message=ret.message||'Unknown errors'
                }
            }
        }
    }
</script>

<style lang="stylus">
.alert
    color red
</style>
