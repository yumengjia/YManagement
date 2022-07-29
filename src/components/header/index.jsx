import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Modal} from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import './index.css'
import storage from '../../utils/storageUtils';
import menuList from '../../config/menuConfig';
import formateDate from '../../utils/dateUtils'
import LinkButton from '../LinkButton';
import { reqWhether } from '../../api'


function Header() {

    const [currentTime,setTime] = useState(formateDate(Date.now()))
    const [weather,setWeather] = useState()

    const { confirm } = Modal;

    const location = useLocation()
    const navigate = useNavigate()
    const user = storage.getUser('user')
    let path = location.pathname
    let timer = null


    const logOut = () => {
        confirm({
            title: '确定退出吗？',
            icon: <ExclamationCircleOutlined />,
            onOk() {
              //删除保存的user数据，并跳转到登录界面
              storage.removeUser('user')
              navigate('/login',{replace:true})
            },
        });
    }
    const getTitle = (menuList) => {
        let title = ''
        menuList.forEach(item => {
            if(item.key === path){
                title = item.label
            }else if(item.children){
                const cItem = item.children.find(cItem=>path.indexOf(cItem.key)===0)
                if(cItem){
                    title = cItem.label
                }
            }
        })
        return title
    }
    const getTime = () => {
        timer = setInterval(()=>{
            const currentTime = formateDate(Date.now())
            setTime(currentTime)
        },1000)  //每隔1s请求一次
    }
    const getState =async ()=>{
        const {weather} = await reqWhether()
        setWeather(weather)
      }
    useEffect(()=>{
        getState()
    },[]) //组件挂载时请求一次

    useEffect(()=>{
        getTime()
        // getState()
        return () => {
            clearInterval(timer)
        }
    })

    const title = getTitle(menuList)


    return ( 
        <div className='header'>
            <div className='header-top'>
                <span>欢迎，{user.username}</span>
                <LinkButton onClick={logOut}>退出</LinkButton>
            </div>
            <div className='header-bottom'>
                <div className='header-bottom-left'>{title}</div>
                <div className='header-bottom-right'>
                    <span>{currentTime}</span>
                    <span>{weather}</span>
                </div>
            </div>
        </div>
     );
}

export default Header;