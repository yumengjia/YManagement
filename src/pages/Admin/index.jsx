import { Layout } from 'antd';
import { Navigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom';
import {connect} from 'react-redux'


// import storage from "../../utils/storageUtils";
import LeftNav from '../../components/left-nav';
import Header from '../../components/header';

const {Footer, Sider, Content } = Layout;

function Admin(props) {
  
    // const user = storage.getUser('user')
    const user = props.user
    // console.log('hhh',user);
    if(!user || !user._id){
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

export default connect(
    state => ({user:state.user})
)(Admin);