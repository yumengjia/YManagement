import React, { useState, useEffect} from 'react'
import { Card, Button ,message} from 'antd'
import ReactEcharts from 'echarts-for-react'
import {reqAllProducts, reqCategory} from '../../api/index.js'

function Line() {
    const [products,setProducts] = useState([])
    const [categorys,setCategorys] = useState([])
    const [list, setList] = useState([])
    const [count,setCount] = useState([])
  
    const update = () =>{
      message.info('该功能正在开发中！请稍后哟');
    }

    //获取所有商品
    const getAllProducts = async() => {
      const result = await reqAllProducts()
      if(result.status===0){
        setProducts(result.data)
      } 
    }

    //获取一级分类列表
    const getCategorys = async () => {
      let categoryList = []
      let list = []
      const result = await reqCategory(0)
      if(result.status===0){
        result.data.forEach(item => {
          item.count = 0
          list.push(item.name)
        })
      }
      categoryList = result.data
     
      setCategorys(categoryList)
      setList(list)
    }

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

    useEffect(()=> {
      getCategoryCount()
      // eslint-disable-next-line 
    },[products,categorys])

    useEffect(()=>{
      getAllProducts()
      getCategorys()

    },[])
  
    const getOption = (list,count) =>{
      return {
        title: {
          text: '各类别的数量'
        },
        tooltip: {},
      /*   legend: {
          data: ['销量','库存']
        }, */
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

export default Line;