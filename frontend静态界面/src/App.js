import logo from './logo.svg';
import './App.css';
import React from 'react';
import { Flex, Layout } from 'antd';
import Head from "./layout/Head.js";
import Side from "./layout/Side.js";
import Cont from "./layout/Cont.js";
import { BrowserRouter as Router,Link } from 'react-router-dom'

const { Header, Footer, Sider, Content } = Layout;

function App() {

  const headerStyle = {
    textAlign: 'center',
    color: '#fff',
    paddingInline: 48,
    lineHeight: '64px',
    backgroundColor: '#4096ff',
    height: 'auto'
  };
  const contentStyle = {
    textAlign: 'center',
    color: '#fff',
    // backgroundColor: '#0958d9',
  };
  const siderStyle = {
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#fff',
  };
  const layoutStyle = {
    borderRadius: 8,
    overflow: 'hidden',
    height:'100%'
  };
  return (
    <div className="App">
      <Router>
        <Layout style={layoutStyle}>
          <Header style={headerStyle}>
            <Head/>
          </Header>
          <Layout>
            <Sider width="25%" style={siderStyle}>
              <Side />
            </Sider>
            <Content style={contentStyle}>
              <Cont/>
            </Content>
          </Layout>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
