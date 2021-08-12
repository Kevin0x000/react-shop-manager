import index from "../pages/admin/dashboard"
import Edit from "../pages/admin/products/Edit"
import List from "../pages/admin/products/List"
import Login from "../pages/Login"
import PageNotFound from "../pages/PageNotFound"

import {ShopOutlined,AreaChartOutlined} from '@ant-design/icons'


export const mainRoutes = [{
    path:'/login',
    component: Login
},{
    path: '/404',
    component : PageNotFound
}]

export const adminRoutes = [{
    path:'/admin/dashboard',
    component: index,
    isShow:true,
    title: "Watch board",
    icon: <AreaChartOutlined />,
},{
    path:'/admin/products',
    component: List,
    exact: true,
    isShow:true,
    title:"Product Management",
    icon: <ShopOutlined />,
},{
    path:'/admin/products/edit/:id?',
    component: Edit,
    isShow:false,
}]