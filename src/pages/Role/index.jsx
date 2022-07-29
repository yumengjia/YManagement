import React, { useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import {Card, Button, Table, Form,message} from 'antd'

import {PAGE_SIZE} from '../../utils/constants'
import { reqRoles, reqAddRole, reqUpdateRole } from '../../api'
import AddForm from './add-form'
import UpdateForm from './update-form.jsx'
import storage from '../../utils/storageUtils'
import formateDate from '../../utils/dateUtils'


function Role() {

    const [form] = Form.useForm();
    const navigate = useNavigate()

    const [roles,setRoles] = useState([]) //所有角色的列表
    // const [loading,setLoading]= useState(false)  //标识是否正在加载中
    const [role,setRole] = useState({})  //选中的role
    const [isShowAdd,setIsShowAdd] = useState(false)
    const [isShowAuth,setIsShowAuth] = useState(false)
    const [menus,setMenus] = useState([])

    //初始化列的数组
    const columns = [
        {
        title: '角色名称',
        dataIndex: 'name',
        },
        {
        title: '创建时间',
        dataIndex:'create_time',
        },
        {
        title: '授权时间',
        dataIndex:'auth_time',
        },
        {
        title: '授权人',
        dataIndex:'auth_name',
        },
    ];

    const onRow = (role) =>{
        return {
          onClick: event =>{
            // console.log('role',role);
            setRole(role)
          }
        }
    }

    //获取角色列表
    const getRoles = async() =>{
        const result = await reqRoles()
        if(result.status===0){
        const roles = result.data
        // console.log(roles);
        roles.forEach(item => {
            item.create_time = formateDate(item.create_time)
            item.auth_time = formateDate(item.auth_time)
        })
        setRoles(roles)
        }
    }

    //显示添加角色确认框
    const showAdd = () =>{
        setIsShowAdd(true)
    }
    //添加角色
    const onAddForm = async(values) => {
        // console.log('Received values of form: ', values);
        const {roleName} = values
        const result = await reqAddRole(roleName)
        // console.log(result);
        if(result.status===0){
          message.success('添加成功')
        }else{
          message.error('添加失败')
        }
        setIsShowAdd(false)
        getRoles()
    };

    const showUpdate = () =>{
        setIsShowAuth(true)
    }

    const getMenus = (menusList) =>{
        setMenus(menusList)
    }

    
    //更新角色
    const onUpdateForm =async ()=> {
        getMenus()
        let {_id,auth_time} = role
        auth_time = formateDate(auth_time)
        // console.log(auth_time);
        let user = storage.getUser('user')
        let auth_name = user.username
        const result = await reqUpdateRole(_id,menus,auth_time,auth_name)
        if(result.status===0){
          if(role._id===user.role_id){
            storage.removeUser('user')
            navigate('/login',{replace:true})
            message.success('当前用户角色权限修改了，请重新登录')
          }else{
            message.success('更新成功')
          }
        }else{
          message.error('更新失败')
        }
        setIsShowAuth(false)
        getRoles()
      }

    useEffect(()=>{
        getRoles()
    },[])

    const title = (
        <span>
          <Button type='primary' onClick={showAdd}>创建角色</Button> &nbsp;
          <Button type='primary'disabled={!role._id} onClick={showUpdate}>设置角色权限</Button>
        </span>
    )

    return ( 
        <Card title={title}>
            <Table
            columns={columns} 
            dataSource={roles}
            bordered
            rowKey="_id"
            pagination={{defaultPageSize:PAGE_SIZE}}
            rowSelection={{type:'radio',
            selectedRowKeys:[role._id],
            onSelect:(role) =>{
                setRole(role)
            }
            }}
            onRow = {onRow}
            >
            </Table>

            <AddForm 
                form={form}
                initiaValues = ''
                visible={isShowAdd}
                onCreate={onAddForm}
                onCancel={() => {
                setIsShowAdd(false);
                // form.resetFields('');//为什么没用？
            }}/>

            <UpdateForm 
            form={form}
            role={role}
            getMenus={getMenus}
            initiaValues = ''
            visible={isShowAuth}
            onCreate={onUpdateForm}
            onCancel={() => {
            setIsShowAuth(false);
            }}/>

        </Card>
     );
}

export default Role;