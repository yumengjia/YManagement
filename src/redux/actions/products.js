import { reqAllProducts } from '../../api/index'
import { ALL_PRODUCTS, SHOW_ERROR_MSG } from '../constant'


//获取全部商品的同步action
export const allProducts = (products) => {
    return {
        type:ALL_PRODUCTS,
        products
    }
}

//显示错误信息的同步action
export const showErrorMsg = (msg) => {
    return {
        type:SHOW_ERROR_MSG,
        msg
    }
}


//获取所有商品的action
export function getAllProducts(){
    return async dispatch => {
        const result = await reqAllProducts()
        if(result.status===0){
            const products = result.data
            dispatch(allProducts(products))
        }else{
            const msg = result.msg
            dispatch(showErrorMsg(msg))
        }
    }
}