import React, { useEffect,useState } from 'react'
import { useNavigate,useLocation} from 'react-router-dom'
import {Card,List} from 'antd'
import {ArrowLeftOutlined} from '@ant-design/icons'

import './product.css'
import LinkButton from '../../components/LinkButton'
import { BASE_IMG_URL } from '../../utils/constants'
import { reqCategoryName } from '../../api'

function ProductDetail() {

    const navigate = useNavigate()
    const location = useLocation()
    const {name,desc,price,detail,imgs} =  location.state.product
    // console.log('detail',location.state.product);

    const [cName1,setcName1] = useState() //一级分类名称
    const [cName2,setcName2] = useState() //二级分类名称

    const getCategoryName = async ()=>{
        const {pCategoryId,categoryId} =  location.state.product
        if(pCategoryId ==='0'){
        const result = await reqCategoryName(categoryId)
        setcName1(result.data.name)
        }else{
        const result1 = await reqCategoryName(pCategoryId)
        const result2 = await reqCategoryName(categoryId)
        setcName1(result1.data.name)
        setcName2(result2.data.name)
        /* const results = await Promise.all([reqCategoryName(pCategoryId),reqCategoryName(categoryId)])
        setcName1( results[0].data.name)
        setcName2( results[1].data.name) */
        // console.log(result1,result2);

        }
    }

    useEffect(()=>{
        getCategoryName()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const title = (
        <span>
          <LinkButton>
            <ArrowLeftOutlined  style={{marginRight:'10px',fontSize:'20px'}} onClick={()=>navigate(-1)}/>
          </LinkButton>
          <span>商品详情</span>
        </span>
    )

    return ( 
        <Card title={title} className='product-detail'>
        <List>
          <List.Item style={{justifyContent:'left'}}>
            <span className='left'>商品名称:</span>
            <span>{name}</span>
          </List.Item>
          <List.Item style={{justifyContent:'left'}}>
            <span className='left'>商品描述:</span>
            <span>{desc}</span>
          </List.Item>
          <List.Item style={{justifyContent:'left'}}>
            <span className='left'>商品价格:</span>
            <span>{price}元</span>
          </List.Item>
          <List.Item style={{justifyContent:'left'}}>
            <span className='left'>所属分类:</span>
            <span>{cName1}{cName2 ? '-->'+cName2 : ''}</span>
          </List.Item>
          <List.Item style={{justifyContent:'left'}}>
            <span className='left'>商品图片:</span>
            {
              imgs.map((img)=> (
                <img className='img' src={BASE_IMG_URL+img} alt="img" key={img}/>
              ))
            }
            
          </List.Item>
          <List.Item style={{justifyContent:'left'}}>
            <span className='left'>商品详情:</span>
            <span dangerouslySetInnerHTML={{__html:detail}}></span>
          </List.Item>
        </List>
  
      </Card>
     );
}

export default ProductDetail;