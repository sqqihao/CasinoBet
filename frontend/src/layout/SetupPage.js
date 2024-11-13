import { Grid } from "antd";
import { Col, Divider, Row } from 'antd';
import { BrowserRouter as Router,Link } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import { Switch ,Input,Button} from "antd";
import React, { useState,useEffect } from 'react';
import {useLocalStorageState,getTheme,setTheme} from "../model/store.js"
import {Init,initTheme} from "./Init.js"


function SetupPage(){
	// const [theme, setTheme] = useLocalStorageState("theme",true);
	const [switchChecked, setSwitchChecked] = useState(getTheme()=="true"?true:false);
	
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
	      <Col span={24}> 银行合约地址： 0xc3e53F4d16Ae77Db1c982e75a937B9f60FE63690</Col>
	      <Col span={24}> DICE合约地址： 0xc3e53F4d16Ae77Db1c982e75a937B9f60FE63690</Col>
	      <Col span={24}> Roulette合约地址： 0xc3e53F4d16Ae77Db1c982e75a937B9f60FE63690</Col>
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
