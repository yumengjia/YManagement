import { Layout } from 'antd';
import { Navigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom';


import storage from "../../utils/storageUtils";
import LeftNav from '../../components/left-nav';
import Header from '../../components/header';

const {Footer, Sider, Content } = Layout;

function Admin() {

    const user = storage.getUser('user')
    if(!user){
        return <Navigate to={"/login"} replace={true}/>
    }

    return ( 
        <Layout style={{minHeight:'100%'}}>
            <Sider>
                <LeftNav/>
            </Sider>
            <Layout>
                <Header/>
                <Content style={{backgroundColor:'#fff',margin:'20px'}}>
                    <Outlet/>
                </Content>
                <Footer style={{textAlign:'center',color:'#ccc'}}>
                    推荐使用谷歌浏览器，可以获得更佳页面操作体验
                </Footer>
            </Layout>
        </Layout>
     );
}

export default Admin;