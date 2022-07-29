import {
    AppstoreOutlined,
    HomeOutlined,
    UserOutlined,
    LineChartOutlined,
    BarChartOutlined,
    AreaChartOutlined,
    PieChartOutlined,
    UnorderedListOutlined,
    ToolOutlined,
    SafetyOutlined
    
  } from '@ant-design/icons';

const menuList = [
    {
        title:'首页',
        label:'首页',
        key:'/home',
        icon:<HomeOutlined />,
        ispublic:'true'
    },
    {
        title:'商品',
        label:'商品',
        key:'/products',
        icon:<AppstoreOutlined />,
        children:[
            {
                title:'品类管理',
                label:'品类管理',
                key:'/category',
                icon:<UnorderedListOutlined />
            },
            {
                title:'商品管理',
                label:'商品管理',
                key:'/product',
                icon:<ToolOutlined />
            },

        ]
    },
    {
        title:'用户管理',
        label: '用户管理',
        key: '/user',
        icon: <UserOutlined />
    },
    {
        title:'角色管理',
        label: '角色管理',
        key: '/role',
        icon: <SafetyOutlined />,
    },
    {
        title:'图形图表',
        label: '图形图表',
        key: '/charts',
        icon: <AreaChartOutlined />,
        children: [
        {
            title:'柱形图',
            label: '柱形图',
            key: '/charts/bar',
            icon: <BarChartOutlined />
        },
        {
            title:'折线图',
            label: '折线图',
            key: '/charts/line',
            icon: <LineChartOutlined />
        },
        {
            title:'饼图',
            label: '饼图',
            key: '/charts/pie',
            icon: <PieChartOutlined />
        },
    ]
}

]

export default menuList