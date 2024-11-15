import React, { useState,useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { Flex, Layout,Spin } from 'antd';
import Head from "./layout/Head.js";
import Side from "./layout/Side.js";
import Cont from "./layout/Cont.js";
import { BrowserRouter as Router,Link } from 'react-router-dom'
import useSetup from "./use/useSetup.js";
import useDice from "./use/UseDice.js";
import useRoulette from "./use/UseRoulette.js";

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
    height:'100%'
  };
  const [spinning, setSpinning] = React.useState(false);

  // placeBet
  const {placeBet,rolleds} = useDice(setSpinning);
  const {placeBetRoulette} = useRoulette(setSpinning);
  const {userBalance, refreshUserBalance, deposit, withDraw} = useSetup();
  useEffect(function(){
    refreshUserBalance();
    // console.log(userBalance)
  },[]);
  // useEffect(function(){
  // },[userBalance]);
  return (
    <div className="App">
      <Spin spinning={spinning} fullscreen />
      <Router>
        <Layout style={layoutStyle}>
          <Header style={headerStyle}>
            <Head deposit={deposit} userBalance={userBalance} refreshUserBalance={refreshUserBalance} withDraw={withDraw}/>
          </Header>
          <Layout>
            <Sider width="25%" style={siderStyle}>
            <Side />
            </Sider>
            <Content style={contentStyle}>
              <Cont  placeBet={placeBet} rolleds={rolleds} refreshUserBalance={refreshUserBalance} placeBetRoulette={placeBetRoulette} />
            </Content>
          </Layout>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
