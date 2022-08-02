import React, { useState, useEffect} from 'react'
import { Card, Button ,message} from 'antd'
import ReactEcharts from 'echarts-for-react'

import {connect} from 'react-redux'
import { getAllProducts } from '../../redux/actions/products.js'
import { getCategorys } from '../../redux/actions/categorys.js'

// import {reqCategory} from '../../api/index.js'

function Line(props) {
    const [products,setProducts] = useState([])
    const [categorys,setCategorys] = useState([])
    const [list, setList] = useState([])
    const [count,setCount] = useState([])
  
    const update = () =>{
      message.info('该功能正在开发中！请稍后哟');
    }
    // console.log('props',props);

    //获取所有一级分类的二级分类数量
    const getCategoryCount = () => {
      products.forEach(product => {
        categorys.forEach(category => {
          if(product.pCategoryId===category._id){
            category.count = category.count+1
          }
        })
      })
      // console.log(categorys);
      let count = []
      categorys.forEach(item => {
        count.push(item.count)
      })
      // console.log(count);
      setCount(count)

    }

    useEffect(()=>{
      setProducts(props.allProducts) 
      // eslint-disable-next-line 
    },[props.allProducts])

    useEffect(() => {
      let list = []
      props.categorys.forEach(item => {
        item.count = 0
        list.push(item.name)
      })
      setCategorys(props.categorys)
      setList(list)
      // eslint-disable-next-line 
    },[props.categorys])

    useEffect(()=> {
      getCategoryCount()
      // eslint-disable-next-line 
    },[products,categorys])

    useEffect(()=>{
      props.getAllProducts()  //获取所有商品
      props.getCategorys(0)  //获取一级分类列表
      // eslint-disable-next-line 
    },[])
  
    const getOption = (list,count) =>{
      return {
        title: {
          text: '各类别的数量'
        },
        tooltip: {},
        xAxis: {
          data: list
        },
        yAxis: {
          type:'value'
        },
        series: [
          {
            name: '数量',
            type: 'line',
            data: count
          }
        ]
      }
    }
  

    return ( 
        <div>
            <Card>
                <Button type='primary' onClick={update}>更新</Button>
            </Card>

            <Card title='折线图一'>
                <ReactEcharts option={getOption(list,count)} style={{width:'1200px'}}/>
            </Card>
        </div>
     );
}

export default connect(
  state => ({allProducts:state.allProducts,categorys:state.categorys}),
  {
    getAllProducts,
    getCategorys
  }
)(Line);