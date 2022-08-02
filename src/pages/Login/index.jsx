import { Navigate, useNavigate } from 'react-router-dom';
import { Form, Input, Button, message} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import { login } from '../../redux/actions/user';

import './index.css'
import logo from '../../assets/images/logo.png'
// import {regLogin} from '../../api/index.js'
// import memory from '../../utils/memoryUtils';
import storage from '../../utils/storageUtils';

function Login(props) {
    
    // console.log(props);
    const navigate = useNavigate();
    const user = storage.getUser('user')
    if(user._id){
    return  <Navigate to='/' replace={true}/>
    }
    const errorMsg = props.user.errorMsg 


    const onFinish = (values) => {
        const {username,password} = values
        props.login(username,password)
      
        // const result = await regLogin(username,password)
        // console.log('请求成功',response.data);
        // const result = response.data
        // if(result.status === 0){
        //   message.success('登录成功');
        //   const user = result.data
        //   memory.user = user//保存在内存中
        //   storage.saveUser('user',user)//保存在local中
          //跳转到管理界面[编程式路由]
        //   navigate('/',{replace:true})
        // }else{
        //   message.error(result.msg);
        // } 
    }


    const  validatePwd = (_,value)=>{
        if(!value){
          return Promise.reject('请输入密码')
        }else if(value.length<4){
         return Promise.reject('密码长度不能小于4位')
        }else if(value.length>12){
         return Promise.reject('密码长度不能大于12位')
        }else if(!(/^[1-9a-zA-Z_]+$/.test(value))){
         return Promise.reject('密码必须由数组字母或下划线组成')
        }else{
         return Promise.resolve()
        }
    }


    return (
        <div className='login'>
            <header className='login-header'>
                <img src={logo} alt="" />
                <h1>React项目：后台管理系统</h1>
            </header>
            <section className='login-content'>
            <div  className={errorMsg?'error show':'error'}>{errorMsg}</div>
                <h2>用户登录</h2>
            

                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[
                            { required: true, message: '请输入用户名' },
                            { min: 4, message: '用户名至少4位' },
                            { max: 12, message: '用户名至多12位' },
                            { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须由数组字母或下划线组成' },
                        ]}
                        initialValue='admin'
                    >
                        <Input prefix={<UserOutlined style={{ color: 'rgba(0,0,0,0.5)' }} className="site-form-item-icon" />} placeholder="用户名" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                validator: validatePwd
                            },
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined style={{ color: 'rgba(0,0,0,0.5)' }} className="site-form-item-icon" />}
                            type="password"
                            placeholder="密码"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            登录
                        </Button>
                    </Form.Item>
                </Form>
            </section>
        </div>
    );
}

export default connect(
    state => ({user:state.user}),
    {
        login
    }
)(Login);