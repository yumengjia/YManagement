import { message } from 'antd'
import jsonp from 'jsonp'


import ajax from './ajax.js'

const BASE = '/api'

//登录
export const regLogin = (username,password)=> ajax(BASE+'/login',{username,password},'POST')

//添加用户
export const regAddUser = (user) => ajax(BASE+'/manage/user/add',{user},'POST')

//获取分类列表GET
export const reqCategory = (parentId) => ajax(BASE + '/manage/category/list',{parentId})

//添加分类
export const reqAddCategory = (categoryName,parentId) => ajax(BASE + '/manage/category/add',{categoryName,parentId},'POST')

//更新分类
export const reqUpdateCategory = (categoryName,categoryId) => ajax(BASE + '/manage/category/update',{categoryName,categoryId},'POST')

//获取商品分页列表
export const reqProducts = (pageNum,pageSize) => ajax(BASE + '/manage/product/list',{pageNum,pageSize})

//获取所有商品列表
export const reqAllProducts = () => ajax(BASE + '/manage/product/all')

//搜索商品分页列表
export const reqSearchProducts = ({pageNum,pageSize,searchText,searchType}) => ajax(BASE + '/manage/product/search',{pageNum,pageSize,[searchType]:searchText})

//根据分类ID获取分类
export const reqCategoryName = ((categoryId)=> ajax(BASE + '/manage/category/info',{categoryId}))

//对商品进行上架/下架处理
export const reqUpdateStatus = (productId,status) => ajax(BASE + '/manage/product/updateStatus',{productId,status},'PSOT')

//获取一级或某个二级分类列表
export const reqCategorys = (parentId) => ajax(BASE + '/manage/category/list',{parentId})

//删除图片
export const reqDeleteImg = (name) => ajax(BASE + '/manage/img/delete',{name},'POST')

//添加/修改商品
export const reqAddOrUpdateProduct = (product) => ajax(BASE + '/manage/product/'+(product._id? 'update':'add'),product,'POST')

//修改商品
// export const reqUpdateProduct = (product) => ajax(BASE + '/manage/product/update',product,'POST')

//获取所有角色的列表
export const reqRoles = () => ajax(BASE + '/manage/role/list')

//添加角色
export const reqAddRole = (roleName) => ajax(BASE + '/manage/role/add',{roleName},'POST')

//设置角色权限
export const reqUpdateRole = (_id,menus,auth_time,auth_name) => ajax(BASE + '/manage/role/update',{_id,menus,auth_time,auth_name},'POST')

//获取所有用户列表
export const reqUsers = () => ajax(BASE + '/manage/user/list')

//删除用户
export const reqDeleteUser = (userId) => ajax(BASE + '/manage/user/delete',{userId},'POST')

//添加用户
export const reqAddOrUpdateUser = (user) => ajax(BASE + ('/manage/user/'+(user._id?'update':'add')),user,'POST')

//jsonp请求的接口请求函数
export const reqWhether = ()=>{
    return new Promise((resolve,reject)=>{
        const url = 'https://restapi.amap.com/v3/weather/weatherInfo?key=26e45e5276a28c34f135fb77301ef026&city=110000'

    jsonp(url,{},(error,data)=>{
        if(data.status === "1"){
            const {weather} = data.lives[0]
            resolve({weather})
        }else{
            message.error('获取天气失败')
        }
    })
    })

    
}

