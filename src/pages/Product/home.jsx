import React,{useState,useEffect} from 'react'
import {Card, Select, Input, Button,Table, message} from "antd"
import {PlusOutlined} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import LinkButton from '../../components/LinkButton'
import {reqProducts,reqSearchProducts,reqUpdateStatus} from '../../api'
import {PAGE_SIZE} from '../../utils/constants.js'


function ProductHome() {

    const navigate = useNavigate()

    const [products,setProducts] = useState([])  //产品列表
    const [total,setTotal] = useState(0) //产品总数
    const [loading,setLoading] = useState(false) //是否显示加载中
    const [searchType,setType] = useState('productName')  //搜索类型
    const [searchText,setText] = useState('')  //搜索文本
    const [pageNum,setpageNum] = useState(1) //保存当前页码

    const columns = [
        {
          title: '商品名称',
          dataIndex: 'name',
        },
        {
          title: '商品描述',
          dataIndex: 'desc',
         
        },
        {
          width:'100px',
          title: '价格',
          dataIndex: 'price',
          render:(price)=>"￥" + price
         
        },
        {
          width:'100px',
          title: '状态',
          //dataIndex: 'status',
          render:(product)=>{
            const {status,_id} = product
            return (
              <span>
                <Button type="primary" onClick={()=>updateStatus(_id,status===1? 2:1)}>{status===1? '下架':'上架'}</Button>
                <span>{status===1? '在售':'已下架'}</span>
              </span>
            )
          }
         
        },
        {
          width:'100px',
          title: '操作',
          render:(product)=>{
            return (
              <span>
                {/* 编程式路由导航 */}
                <LinkButton onClick={()=>navigate('/product/detail',{state:{product:product}})}>详情</LinkButton>
                <LinkButton onClick={()=>navigate('/product/addupdate',{state:{product:product}})}>修改</LinkButton>
              </span>
            )
          }
         
        },
    ]

    //获取商品列表
    const getProducts = async(pageNum) => {
        setpageNum(pageNum)
        let result
        setLoading(true)
        if(searchType){
            result = await reqSearchProducts({pageNum,pageSize:PAGE_SIZE,searchText,searchType})
        }else{
            result = await reqProducts(pageNum,PAGE_SIZE)
        }
        // console.log(result);
        setLoading(false)
        if(result.status===0){
            const {list,total} = result.data
            list.forEach(item => {
                item.key = item._id
            })
            setProducts(list)
            setTotal(total)
        }
    }
     //更新指定商品的状态
    const updateStatus = async(productId,status) => {
        const result = await reqUpdateStatus(productId,status)
        if(result.status===0){
          message.success('更新商品成功')
          getProducts(pageNum)
        }
    }

    useEffect(()=>{
        getProducts(pageNum)
        // eslint-disable-next-line
    },[])

    //左侧
    const title = (
        <span>
          <Select style={{width:'120px'}} value={searchType} onChange={value=>setType(value)}>
              <Select.Option value='productName'>按名称搜索</Select.Option>
              <Select.Option value='productDesc'>按描述搜索</Select.Option>
          </Select>
          <Input 
          placeholder='关键字' 
          style={{width:'120px',margin:'0 15px'}} 
          value={searchText} 
          onChange={event=>setText(event.target.value)}/>
          <Button type='primary' onClick={()=>{getProducts(1)}}>搜索</Button>
        </span>
            
      )
      //右侧
      const extra = (
        <Button type='primary' icon={<PlusOutlined/>} onClick={()=> navigate('/product/addupdate')}>添加商品</Button>
      )
    

    return ( 
        <Card title={title} extra={extra}>
            <Table 
            dataSource={products} 
            columns={columns} 
            rolKey='_id'
            bordered
            loading={loading}
            pagination={{
                current:pageNum,
                defaultPageSize:PAGE_SIZE,
                showQuickJumper:true,
                total,
                onChange:(pageNum)=>{
                getProducts(pageNum)
                },
            }}
            />
        </Card>
     );
}

export default ProductHome;