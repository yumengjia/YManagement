import { SET_HEAD_TITLE, CATEGORYS, SHOW_ERROR_MSG} from "../constant"
import { reqCategory } from "../../api"


//设置头部标题的action(同步)
export const setHeaadTitle = (headTitle) => {
    return {
        type:SET_HEAD_TITLE,
        data:headTitle
    }
}

//分类的同步action
export const categorys = (category) => {
    return {
        type:CATEGORYS,
        category
    }
}

//显示错误信息的同步action
export const showErrorMsg = (msg) => {
    return {
        type:SHOW_ERROR_MSG,
        msg
    }
}



//获取分类的action
export function getCategorys(parentId){
    return async dispatch => {
        const result = await reqCategory(parentId)
        if(result.status===0){
            const category = result.data
            dispatch(categorys(category))
        }else{
            const msg = result.msg
            dispatch(showErrorMsg(msg))
        }
    }
}