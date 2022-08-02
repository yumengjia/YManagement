import { Link,useLocation, useNavigate} from 'react-router-dom'
import { useEffect, useRef, useState } from 'react';
import { Menu} from 'antd';
import _ from 'lodash'
import {connect} from 'react-redux'

import './index.css'
import logo from '../../assets/images/logo.png'
import menuList from '../../config/menuConfig.js'
import storage from '../../utils/storageUtils'
import { setHeaadTitle } from '../../redux/actions/categorys';

function LeftNav(props) {

    const navigate = useNavigate()
    const menu = useRef()
    const [list,setList] = useState([])
    let location = useLocation()
    let path = location.pathname
    let openKey = ''

    //获取当前选择菜单标题
    const getTitle = (key) => {
        let title = ''
        menuList.forEach(item => {
            if(item.key === key){
                title = item.title
            }
            if(item.children){
                item.children.forEach(i => {
                    if(i.key===key){
                        title = i.title
                    }
                })
            }
        })
        return title
    }

    
    //获取当前登录用户的菜单权限
    const userMenuList = () => {
        let user = storage.getUser('user') 
        let list = _.cloneDeep(menuList)
        let newList
        if(user.username==='admin'){
            newList = list
        }else{
            let userMenus = user.role?.menus || []
            newList = list.filter(item => {
                if(item.ispublic==='true') return item
                if(userMenus.indexOf(item.key)!==-1) return item
                if(item.children){
                    let newChildren = item.children.filter(i => {
                        if(userMenus.indexOf(i.key)!==-1){
                            return i
                        }
                        return 0
                    })
                   
                    item.children = newChildren
                    if(item.children.length!==0){
                        return item
                    }
                }  
                return  0
            })
        }
        return newList
    } 
    
    const getOpenKey = () => {
        menuList.forEach(item =>{
            if(item.children){
                item.children.forEach(i => {
                    if(i.key === path){
                        openKey = item.key
                    }
                })
            }
        }) 
    }
    getOpenKey()   
    const onclick = ({ item, key }) => {
        // console.log(item.props.title);
        // console.log(selectedKeys);
        // console.log(key,path);
        
        navigate(key)
        props.setHeaadTitle(item.props.title)
    }

    useEffect(()=>{
        let menuSelect = menu.current?.props.defaultSelectedKeys[0]
        let newList = userMenuList()
        setList(newList)
        if(menuSelect === path || path.indexOf(menuSelect) ===0){
            props.setHeaadTitle(getTitle(menuSelect))
        } 
     
    },[])

    return ( 
        <div className="left-nav">
            <Link to='/home' className='left-nav-header'>
                <img src={logo} alt='logo'/>
                <h1>xxx超市后台</h1>
            </Link>

            {/* 菜单 */}
            <Menu
                ref={menu}
                onSelect={onclick}
                style={{ width: 200 }}
                defaultSelectedKeys={[path]} //初始选中的菜单项key数组
                defaultOpenKeys={[openKey]} //初始展开的submenu菜单项key数组  
                mode='inline'
                theme='dark'
                items={list}
            >
            </Menu>
        </div>
     );
}

export default connect(
    state => ({}),
    {
        setHeaadTitle
    }
)(LeftNav);