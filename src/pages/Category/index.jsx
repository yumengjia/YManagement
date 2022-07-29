import { useEffect, useState } from 'react';
import { Card, Table, Button,Space, message} from 'antd'
import {PlusOutlined, ArrowRightOutlined} from '@ant-design/icons';

import './index.css'
import LinkButton from '../../components/LinkButton'
import { reqCategory,reqUpdateCategory,reqAddCategory} from '../../api';
import AddForm from './add-form';
import UpdateForm from './update-form';

function Category() {

    const [categoryData, setData] = useState([])  //一级分类列表
    const [subCategoryData, setSubData] = useState([]) //二级分类列表
    const [loading,setLoading]= useState(false)  //标识是否正在加载中
    const [parentId,setparentId] = useState(0) //当前需要显示的分类列表的父分类ID
    const [parentName,setparentName] = useState('') //当前需要显示的分类列表的父分类名称
    const [status,setStatus] = useState(0) //0：都不显示，1：显示添加 2：显示更新
    const [categoryItem,setItem] = useState({}) //保存当前点击的是哪一个category
    const [currentPage, setPage] = useState()

    //初始化列的数组
    const columns = [
        {
        title: '分类的名称',
        dataIndex: 'name',
        },
        {
        title: '操作',
        width:'300px',
        render: (category) => (
                <Space>
                    <LinkButton onClick={()=>showUpdate(category)}>修改分类</LinkButton>
                    {parentId === 0? <LinkButton onClick={()=>showSbuCategorys(category)}>查看子分类</LinkButton>:null}  
                </Space>
            ),
        },
    ];

    //发送ajax请求，获取一级/二级分类列表
    const getCategory = async(parentid)=>{
        setLoading(true)
        let Id = parentid || parentId
        const result = await reqCategory(Id)
        setLoading(false)
        // console.log('reqCategory',result);
        //取出分类数组【可能是一级或二级】
        if(result.status ===0){
          const categorys = result.data
          if(Id === 0){
            //更新一级分类列表
            setData(categorys)
            // console.log('一级',categoryData);
          }else{
            //更新二级分类列表
            setSubData(categorys)
            // console.log('二级',subCategoryData);
          }
         
        }else{
          message.error('获取分类列表失败')
        }
      }
    

    const showUpdate = (category) => {
        //更新状态
        setStatus(2)
        //保存分类
        setItem(category)
    }

    const showAdd = () => {
        setStatus(1)

    }
    //显示指定一级对象的二级列表
    const showSbuCategorys = (category) => {
        setparentId(category._id)
        setparentName(category.name)
        setPage(1)
    }
    //回退到一级分类列表
    const showCategroys = () => {
        setparentId(0)
        setparentName('')
        setSubData([])
    }

    const onAddForm = async(values) => {
        // console.log('Received values of form: ', values);
        const {parentid,categoryName} = values
        const result =await reqAddCategory(categoryName,parentid)
        if(result.status===0){
        getCategory(parentId)
        }
        setStatus(0);

    }

    const onUpdateForm = async(values) => {
        // console.log('Received values of form: ', values,categoryItem);
        const  categoryId = categoryItem._id
        const {categoryName} = values
        const result = await reqUpdateCategory(categoryName,categoryId)
        //  console.log(result);
        if(result.status===0){
            //重新显示列表
            if(categoryItem.parentId==='0')  
            {
                getCategory(0)
            }else{
                getCategory(categoryItem.parentId)
            }
        }
        //隐藏确定框
        setStatus(0) 
    }

    const changePage = (currentPage) => {
        setPage(currentPage)
    }


    useEffect(()=>{
        getCategory(parentId) //当分类ID发生变化时，发送请求获取分类列表
        // eslint-disable-next-line 
    },[parentId])

    //card的左侧
    const title = (parentId===0? '一级分类列表':(
        <span>
            <LinkButton onClick={showCategroys}>一级分类列表</LinkButton>
            <ArrowRightOutlined  style={{marginRight:"5px"}}/>
            <span>{parentName}</span>
        </span>
    ))

     //card右侧
    const extra = (
        <Button onClick={showAdd} type='primary' icon={<PlusOutlined />}>添加</Button>
    )

    return ( 
        <Card className='card' title={title} extra={extra}>
            <Table className='table'
                columns={columns} 
                dataSource={parentId===0? categoryData: subCategoryData}
                bordered
                loading={loading}
                rowKey="_id"
                pagination={{defaultPageSize:5,showQuickJumper:true, current:currentPage,onChange:changePage}}
            >
            </Table>
            <AddForm 
            categoryData={categoryData}
            visible={status===1}
            onCreate={onAddForm}
            onCancel={() => {
            setStatus(0);
            }}/>

            <UpdateForm 
            categoryName={categoryItem.name || ''}
            visible={status===2}
            onCreate={onUpdateForm}
            onCancel={() => {
            setStatus(0);
            }}/>
        </Card>
     );
}

export default Category;