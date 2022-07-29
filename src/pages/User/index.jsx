import React, {useEffect, useState} from 'react'
import {Card,Button,Table, Modal, message} from 'antd'

import formateDate from '../../utils/dateUtils'
import LinkButton from '../../components/LinkButton'
import {PAGE_SIZE} from '../../utils/constants'
import {reqDeleteUser, reqUsers ,reqAddOrUpdateUser} from '../../api/index'
import UserForm from './user-form'


function User() {

    const [users, setUsers] = useState([]) //所有用户列表
    const [roles, setRoles] = useState([]) //所有角色列表
    const [isShow, setIsShow] = useState(false)  //控制模态框的显示与隐藏
    const [roleNameObj ,setRoleNameObj] = useState({})
    const [userObj, setUserObj] = useState({})  //当前点击的用户
  
     //添加或更新用户
    const addOrUpdateUser =async (values) =>{
        // console.log(values);
        const {username,password,phone,email,role_id} = values
        let user = {username,password,phone,email,role_id}
        if(userObj.username){
            let _id = userObj._id
            user = {_id,username,phone,email,role_id}
        }
        const result = await reqAddOrUpdateUser(user)
        if(result.status===0){
            message.success(`${userObj.username? '修改':'添加'}用户成功`)
        }else{
            message.error(`${userObj.username? '修改':'添加'}用户失败，${result.msg}`)
        }
        setIsShow(false)
        getUsers()
    }

    // 根据roles数组生成新的对象{id:name}
    const initRoleNames = (roles) =>{
        const roleNames = roles.reduce((pre,role) => {
        pre[role._id] = role.name
        return pre
        },{})
        setRoleNameObj(roleNames)
    }

    //获取所有用户列表
    const getUsers = async() =>{
        const result = await reqUsers()
        // console.log(result);
        if(result.status===0){
        const {users,roles} = result.data
        initRoleNames(roles)
        setUsers(users)
        setRoles(roles)
        }
    }

      //显示修改
    const showUpdate = (user) =>{
        setUserObj(user)
        setIsShow(true)
        
    }

    //显示添加
    const showAdd = () =>{
        setUserObj({})
        setIsShow(true)
    }

      //删除用户
    const deleteUser = (user) =>{
        // console.log(user);
        Modal.confirm({
        title:`确认删除${user.username}吗？`,
        onOk : async() => {
                const result = await reqDeleteUser(user._id)
                if(result.status===0){
                    message.success('删除用户成功')
                    getUsers()
                }else{
                    message.error('删除失败')
                }

            }
        })
       
    }
    
    useEffect(()=>{
        getUsers()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    
    const columns = [
        {
            title:'用户名',
            dataIndex:'username'
        },
        {
            title:'邮箱',
            dataIndex:'email'
        },
        {
            title:'电话',
            dataIndex:'phone'
        },
        {
            title:'注册时间',
            dataIndex:'create_time',
            render: formateDate
        },
        {
            title:'所属角色',
            dataIndex:'role_id',
            render:(role_id) =>roleNameObj[role_id]
        },
        {
            title:'操作',
            render: (user) =>(
                <span>
                    <LinkButton onClick={()=>{showUpdate(user)}}>修改</LinkButton>
                    <LinkButton onClick={()=>{deleteUser(user)}}>删除</LinkButton>
                </span>
            )
        }
    ]

    const title = <Button type='primary' onClick={showAdd}>创建用户</Button>

    return ( 
        <Card title={title}>
            <Table className='table'
                columns={columns} 
                dataSource={users}
                bordered
                rowKey="_id"
                pagination={{defaultPageSize:PAGE_SIZE,showQuickJumper:true}}
            >
            </Table>
            <UserForm
            user={userObj}
            roles={roles}
            visible={isShow}
            onCreate={addOrUpdateUser}
            onCancel={()=>{
            setIsShow(false)
            }}
         />
     </Card>
     );
}

export default User;