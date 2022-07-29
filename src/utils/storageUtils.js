/* 
进行local数据存储管理的工具模块
*/
// import store from 'store'
// const USER_KEY = 'user_key'

const storage = {
    saveUser(key,value){
        // store.set(USER_KEY,user)
        localStorage.setItem(key,JSON.stringify(value))
    },
    getUser(key){
        // return store.get(USER_KEY) || {}
        return JSON.parse(localStorage.getItem(key)) || {}
    },
    removeUser(key){
        // store.remove(USER_KEY)
        // console.log(key);
        localStorage.removeItem(key)
    }
}

export default storage
