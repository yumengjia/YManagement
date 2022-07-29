import axios from 'axios'
import {message} from 'antd'

/*  
ajax请求的返回值是Promise对象，只有Promise对象才可以.then
【new一个自己的P肉mise，axios自己的Promise】
new Promise(执行器函数)
执行器函数中的任务：
    1、执行异步ajax请求
    2、调用请求成功的回调
    3、请求失败，提示异常信息

*/

export default function ajax(url,data={},type='GET'){
    return new Promise((resolve,reject)=>{
        let promise
        if(type === 'GET'){
            promise = axios.get(url,{params:data})
        }else{
            promise = axios.post(url,data)
        }
        //如果请求成功了，调用resolve(value)
        promise.then(response =>{
            resolve(response.data)
        //如果请求失败了，不调用reject(reason),而是提示异常信息
        }).catch(error =>{
            message.error('请求出错了:'+ error.message)
        })
    }) 
}