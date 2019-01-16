import Notification from './notification'

let msgInstance 

function getInstance(){
    msgInstance = msgInstance || Notification.newInstance()
    return msgInstance
}

function info({durtion= 2,content=""}){

}

export default{
    info(options){
        return notice(options)
    }
}