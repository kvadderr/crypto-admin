import './App.css';

import { useState } from 'react'

import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import { Menu, Layout, theme } from 'antd';

//import custom data
import { menuItems } from './data/menuItems'

import { AuthProvider } from './context/AuthProvider';
import RequireAuth from './screens/RequireAuth';
import Order from './screens/Order'
import Crypt from './screens/Crypt'
import Login from './screens/Login'

const { Content, Sider } = Layout;

function App() {

  const ROLES = {
    'ADMIN': 'ADMIN'
  }

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <BrowserRouter>
      <Layout hasSider>
        <Sider
          style={{
            background: '#fff',
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
            top: 0,
            bottom: 0,
          }}
        >
          <Menu theme="light" mode="inline" defaultSelectedKeys={['4']} items={menuItems} />
        </Sider>
        <Layout className="site-layout" style={{ marginLeft: 200, marginTop:30, padding: '0 24px 24px' }}>
            <Content
              style={{
                padding: 80,
                margin: 0,
                minHeight: 600,
                background: colorBgContainer,
              }}
            >
              <AuthProvider>
              <Routes>
                <Route path='/' element={ <Login/> }/>
                <Route path='/login' element={ <Login/> }/>
                <Route element={<RequireAuth allowedRoles={[ROLES.ADMIN]} />}>
                  <Route path='/order' element={ <Order/> }/>
                  <Route path='/crypt' element={ <Crypt/> }/>
                </Route>
              </Routes>
              </AuthProvider>
            </Content>
        </Layout>
      </Layout>
    </BrowserRouter>       
  )
}

export default App
