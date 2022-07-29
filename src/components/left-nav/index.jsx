import { Link,useLocation, useNavigate} from 'react-router-dom'
import { useEffect, useState } from 'react';
import { Menu} from 'antd';
import _ from 'lodash'

import './index.css'
import logo from '../../assets/images/logo.png'
import menuList from '../../config/menuConfig.js'
import storage from '../../utils/storageUtils'

function LeftNav() {

   
    const navigate = useNavigate()
    const [list,setList] = useState([])
    let location = useLocation()
    let path = location.pathname
    let openKey = ''
 
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
    const onClick = (e) => {
        navigate(e.key)
    }

    useEffect(()=>{
        let newList = userMenuList()
        setList(newList)
    },[])

    return ( 
        <div className="left-nav">
            <Link to='/home' className='left-nav-header'>
                <img src={logo} alt='logo'/>
                <h1>xxx超市后台</h1>
            </Link>

            {/* 菜单 */}
            <Menu
                onClick={onClick}
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

export default LeftNav;