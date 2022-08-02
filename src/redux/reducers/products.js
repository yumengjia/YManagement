/* 
用来管理所有商品
*/

import { ALL_PRODUCTS, SHOW_ERROR_MSG } from "../constant";
const initProducts = []
export function allProducts(state=initProducts,action){
    switch (action.type) {
        case ALL_PRODUCTS:
            return action.products
        case SHOW_ERROR_MSG:
            const errorMsg = action.msg
            return [...state,errorMsg]
        default:
            return state;
    }
}