import React,{useEffect, useState} from 'react'
import {Card,Form,Input,Cascader,Button, message} from 'antd'
import {ArrowLeftOutlined} from '@ant-design/icons'

import LinkButton from '../../components/LinkButton'
import { useNavigate,useLocation } from 'react-router-dom'
import {reqCategorys} from '../../api/index'
import PicturesWall from './pictures-wall.jsx'
import RichTextEditor from './rich-text-editor'
import { reqAddOrUpdateProduct } from '../../api/index'

function ProductAddUpdate() {
    
    let Item = Form.Item
    
    const location = useLocation()
    const navigate = useNavigate()
    const [options, setOptions] = useState([]);
    const [nameList,setNameList] = useState([])
    const [textDetail,setDetail] = useState('')

    let isUpdate = false
    let product = {}
    let categoryIds = []
    if(location.state){
        //有值，为真，则为修改商品
        isUpdate = true
        product = location.state.product
        if(product.pCategoryId===0){
          categoryIds.push(product.categoryId)
        }else{
          categoryIds.push(product.pCategoryId)
          categoryIds.push(product.categoryId)
    
        }
    }

    const {pCategoryId,imgs,detail} =product

    const onFinish = async(values) => {
        getImgName()
        getTextDetail()
        const {name,desc,price,category} = values
        let pCategoryId = ''
        let categoryId = ''
        if(category.length===1){
            pCategoryId = '0'
            categoryId = category[0]
        }else{
            pCategoryId = category[0]
            categoryId = category[1]
        }
        let detail = textDetail
        let imgs = nameList
        const productObj = {name,desc,price,imgs,detail,pCategoryId,categoryId}
        // console.log(productObj);
        if(isUpdate){
            productObj._id = product._id
        }

        const result = await reqAddOrUpdateProduct(productObj)
        if(result.status===0){
            message.success(`${isUpdate? '更新':'添加'}商品成功`)
            navigate(-1)
        }else{
            message.error(`${isUpdate? '更新':'添加'}商品失败`)
            console.log(result);
        }
    }
        //检查输入的金额必须大于0
        const checkPrice = (_, value) => {
            if (Number(value) > 0) {
            return Promise.resolve();
            }
            return Promise.reject(new Error('价格必须大于0'));
    };

     //获取分类数据 [动态加载数据]
    const loadData = async selectedOptions => {
        // console.log(selectedOptions);
        const targetOption = selectedOptions[selectedOptions.length - 1];
        targetOption.loading = true;
        //根据选中的分类，请求获取二级分类列表
        const subCategorys = await getCategorys(targetOption.value)
        targetOption.loading = false;
        targetOption.children = (
        subCategorys.map((c)=>({
            label:c.name,
            value:c._id,
            key:c._id
        }))
        )
        setOptions([...options]);
    };

     //生成options数组
    const initOptions =async (categorys)=>{
        const options = categorys.map((c)=>({
        value: c._id,
        label: c.name,
        isLeaf: false,
        key:c._id
        }))
        //如果是一个二级分类的更新
        if(isUpdate && pCategoryId !== '0'){
        //获取对应的二级分类列表
        const subCategorys = await getCategorys(pCategoryId)
        //生成二级分类列表的options
        const childOptions = subCategorys.map((c)=>({
            value: c._id,
            label: c.name,
            isLeaf: true,
            key:c._id
        }))
        const targetOption = options.find(option => option.value===pCategoryId)
        //关联到对应的一级option上
        targetOption.children = childOptions

        }
        setOptions(options)
    }

    //获取一级/二级分类列表
    const getCategorys = async(parentId) =>{
        const result = await reqCategorys(parentId)
        if(result.status===0){
        const categorys = result.data
        if(parentId===0){
            //如果是一级分类
            initOptions(categorys)
        }else{
            //二级列表
            return categorys
        }
        
        }
    }

     //获取图片名字
    const getImgName = (namelist) =>{
        setNameList(namelist)

    }
    const getTextDetail = (detail) =>{
        setDetail(detail)
    }

    useEffect(()=>{
        getCategorys(0)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const formItemLayout =
    {
      labelCol: {
        span: 2, //指定左侧label的宽度
      },
      wrapperCol: {
        span: 8, //指定右侧包裹的宽度
      },
    }
    

    const title = (
        <span>
        <LinkButton>
        <ArrowLeftOutlined  style={{marginRight:'10px',fontSize:'20px'}} onClick={()=>navigate(-1)}/>
        </LinkButton>
        <span style={{fontSize:'20px'}}>{isUpdate? "修改商品":'添加商品'}</span>
        </span>
    )

    
    return ( 
        <Card title={title}> 
            <Form 
            {...formItemLayout}  
            onFinish={onFinish}
            >
    
                <Form.Item 
                label="商品名称"
                name="name"
                initialValue={product.name}
                rules={[
                    {
                    required: true,
                    message: '必须输入商品名称',
                    },
                ]}
                >
                    <Input placeholder='请输入商品名称' />
                </Form.Item>
        
                <Form.Item 
                label="商品描述"
                initialValue={product.desc}
                name='desc'
                rules={[
                    {
                    required: true,
                    message: '必须输入商品描述',
                    },
                ]}
                >
                    <Input.TextArea  placeholder='请输入商品描述' autoSize={{minRows:1,maxRows:6}}/>
                </Form.Item>
                
                <Form.Item 
                label="商品价格"
                initialValue={product.price}
                name='price'
                rules={[
                    {
                    required: true,
                    message: '必须输入商品价格',
                    },
                    {
                    validator: checkPrice
                    }
                ]}
                >
                    <Input type="number"  placeholder='请输入商品价格' addonAfter='元'/>
                </Form.Item>
        
                <Form.Item
                label="商品分类"
                    name='category'
                    initialValue={categoryIds}
                    rules={[
                    {
                        required: true,
                        message: '必须输入商品分类',
                    },
                    ]}
                    >
                    <Cascader options={options} loadData={loadData} />
                </Form.Item>
        
                <Form.Item label="商品图片" > 
                    <PicturesWall getImgName={getImgName} imgs={imgs}/>  
                </Form.Item>
                <Form.Item label="商品详情"
                labelCol={{span: 2}}
                wrapperCol={{span:20}}
                >
                    <RichTextEditor getTextDetail={getTextDetail} detail={detail}/>
                </Form.Item>
                <Item ></Item>
        
                <Form.Item >
                    <Button type='primary' htmlType="submit" >提交</Button>
                </Form.Item>
            </Form>
        </Card>
     );
}

export default ProductAddUpdate;