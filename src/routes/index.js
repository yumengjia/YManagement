import { Navigate } from 'react-router-dom'

import Login from '../pages/Login'
import Admin from '../pages/Admin'


/* import Category from '../pages/category/index.jsx'
import Product from '../pages/product/index.jsx'
import Role from '../pages/role/index.jsx'
import User from '../pages/user/index.jsx'
import Bar from '../pages/charts/bar.jsx'
import Line from '../pages/charts/line.jsx'
import Pie from '../pages/charts/pie.jsx'
import ProductHome from '../pages/product/home.jsx'
import ProductAddUpdate from '../pages/product/add-product.jsx'
import ProductDetail from '../pages/product/detail.jsx'
import NotFound from '../pages/not-found/not-found.jsx'  */
import Home from '../pages/Home'
import Product from '../pages/Product'
import User from '../pages/User'
import Category from '../pages/Category'
import NotFound from '../pages/NotFound'
import Role from '../pages/Role'
import Bar from '../pages/charts/Bar.jsx'
import Line from '../pages/charts/Line.jsx'
import Pie from '../pages/charts/Pie.jsx'
import ProductHome from '../pages/Product/home'
import ProductAddUpdate from '../pages/Product/addupdate'
import ProductDetail from '../pages/Product/detail'


// eslint-disable-next-line import/no-anonymous-default-export
export default [
    {
        path:'/',
        element:<Navigate to='/home'/>
    }, 
    {
        path:'/login',
        element:<Login/>
    },
    {
        path:'/',
        element:<Admin/>,
        children:[
            {
                path:'/home',
                element:<Home/>
            }, 
            {
                path:'/category',
                element:<Category/>
            },
            {
                path:'/product',
                element:<Product/>,
                children:[
                    {
                        path:'/product',
                        element:<ProductHome/>
                    },
                    {
                        path:'/product/addupdate',
                        element:<ProductAddUpdate/>
                    },
                    {
                        path:'/product/detail',
                        element:<ProductDetail/>
                    },
                    {
                        path:'/product',
                        element:<Navigate to='/product'/>
                    }
                ] 
            },
            {
                path:'/role',
                element:<Role/>
            },
            {
                path:'/user',
                element:<User/>
            },
            {
                path:'/charts/bar',
                element:<Bar/>
            },
            {
                path:'/charts/line',
                element:<Line/>
            },
            {
                path:'/charts/pie',
                element:<Pie/>
            }, 
            {
                path:'/',
                element:<Navigate to='/home'/>
            } 
        ] 
       
    },
    {
        path:'*',
        element:<NotFound/>
    } 
    
]