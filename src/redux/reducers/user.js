
/* 
用来管理当前登录用户
*/
import { RECEIVE_USER, SHOW_ERROR_MSG, RESET_USER } from '../constant'
import storage from '../../utils/storageUtils'
const initUser = storage.getUser('user')
export default function user(state = initUser, action){
    // console.log(state);
    switch (action.type) {
        case RECEIVE_USER:
            return action.user
        case SHOW_ERROR_MSG:
            const errorMsg = action.msg
            return {...state,errorMsg}
        case RESET_USER:
            return {}
        default:
            return state
    }
}