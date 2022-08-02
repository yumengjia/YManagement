import {regLogin}from '../../api/index'
import { RECEIVE_USER, SHOW_ERROR_MSG, RESET_USER } from '../constant'
import storage from '../../utils/storageUtils'


//退出登录的同步action
export const logout = () => {
    storage.removeUser('user')
    return {
        type:RESET_USER
    }
}

//接受用户的同步action
export const receiveUser = (user) => {
    return {
        type:RECEIVE_USER,
        user
    }
}

//显示错误信息的同步action
export const showErrorMsg =(msg) => {
    return {
        type:SHOW_ERROR_MSG,
        msg
    }
}

//登录的action
export function login(username,password){
    return async dispatch => {
        const result = await regLogin(username,password)
        if(result.status===0){
            const user = result.data
            storage.saveUser('user',user)
            dispatch(receiveUser(user))
        }else{
            const msg = result.msg
            dispatch(showErrorMsg(msg))
        }
    }
}