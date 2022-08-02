

/* 
用来管理头部标题
*/

import { CATEGORYS, SET_HEAD_TITLE, SHOW_ERROR_MSG } from "../constant";
const initTitle = '首页'
export function headTitle(state=initTitle, action){
    // console.log(state);
    switch (action.type) {
        case SET_HEAD_TITLE:
            return action.data
        default:
            return state
    }

}

/* 
获取商品分类
*/
const initCategorys = []
export function categorys(state=initCategorys,action){
    switch (action.type) {
        case CATEGORYS:
            return action.category
        case SHOW_ERROR_MSG:
            return [...state,action.msg]    
        default:
            return state
    }
}