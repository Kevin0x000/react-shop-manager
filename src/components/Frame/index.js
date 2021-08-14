import React from 'react'
import { withRouter} from "react-router-dom"
import { Layout, Menu, Dropdown, Badge} from 'antd';
import {CaretDownOutlined, UserOutlined} from '@ant-design/icons'
import { clearToken } from '../../utils/auth';
import shopLogo from './shop.png'
import {adminRoutes} from '../../routes'
import { connect } from 'react-redux';
import './frame.css'


const { Header, Content, Sider } = Layout;

const routes = adminRoutes.filter(route=>route.isShow)

function index(props) {
  
    const menu = (
    <Menu onClick={p=>{
      if(p.key === 'logout'){
        clearToken()
        props.history.push('/login')
      }else{
        if(p.key === "notify"){
          props.history.push('/admin/notice')
        }
      }
    }}>
      <Menu.Item key="notify">Noification Center</Menu.Item>
      <Menu.Item key="setting">Setting</Menu.Item>
      <Menu.Item key="logout">Exit</Menu.Item>
    </Menu>)
    return (
        <Layout>
          <Header className="header">
            <div className="logo">
                <img src={shopLogo} alt=""/>
            </div>
            {/* <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
              <Menu.Item key="1">nav 1</Menu.Item>
              <Menu.Item key="2">nav 2</Menu.Item>
              <Menu.Item key="3">nav 3</Menu.Item>
            </Menu> */}
            <Dropdown overlay={menu}>
              <div className="adminspan">
                <Badge dot={!props.isAllRead} />
                <UserOutlined />&nbsp;
                <span >Administrator</span>&nbsp;
                <CaretDownOutlined />
              </div>
            </Dropdown>
          </Header>
        <Layout>
          <Sider width={200} className="site-layout-background">
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%', borderRight: 0 }}
            >
              {routes.map(route=>{
                return (
                  <Menu.Item key={route.path} onClick={p=>props.history.push(p.key)}>
                    {route.icon}
                    {route.title}
                  </Menu.Item>
                )
              })}
            </Menu>
          </Sider>
          <Layout style={{ padding: '16px' }}>
            {/* <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb> */}
            <Content
              className="site-layout-background"
              style={{
                margin: 0,
                
              }}
            >
              {props.children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    )
}

export default connect(state=>state)(withRouter(index));