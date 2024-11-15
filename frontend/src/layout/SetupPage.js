import { Grid } from "antd";
import { Col, Divider, Row } from 'antd';
import { BrowserRouter as Router,Link } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import { Switch ,Input,Button} from "antd";
import React, { useState,useEffect } from 'react';
import {useLocalStorageState,getTheme,setTheme} from "../model/store.js"
import {Init,initTheme} from "./Init.js"
import {contractData} from "../constant.js";


function SetupPage(){
	// const [theme, setTheme] = useLocalStorageState(getTheme());
	const [switchChecked, setSwitchChecked] = useState(getTheme()=="true"?true:false);
	const BankAddr = contractData.BankAddr;
	const DiceAddr = contractData.DiceAddr;
	const RouletteAddr = contractData.RouletteAddr;
	const onChange = (checked) => {
		setSwitchChecked(checked);
		// setTheme(checked);
		setTheme(checked);
		initTheme();
	};

	useEffect(function(){
		// setSwitchChecked(theme.theme)
		initTheme();
	},[])

	
	
	return (
	  <>
	    <Row style={{color:"blue",padding:"40px",lineHeight:"30px"}}>
	      <Col span={24}> 银行合约地址： {BankAddr}</Col>
	      <Col span={24}> DICE合约地址： {DiceAddr}</Col>
	      <Col span={24}> Roulette合约地址：{RouletteAddr}</Col>
	      <Col span={24}>
	          ERC20合约授权额度 : 
	          <Input suffix="$" style={{
		        width: 200,
		      }} />
		      <Button>更改授权额度</Button>

	      </Col>
	      <Col span={24}>
	          颜色模式<Switch checkedChildren="默认" unCheckedChildren="暗黑" checked={switchChecked}  onChange={onChange} />
	      </Col>
	    </Row>
	  </>
    )

}

export default SetupPage;
