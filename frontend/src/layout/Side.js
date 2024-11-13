import { Grid } from "antd";
import { Col, Divider, Row } from 'antd';
import { BrowserRouter as Router,Link } from 'react-router-dom'
import { Avatar, List } from 'antd';
import React,{useState} from 'react';

import {
  DollarOutlined,
  EuroCircleOutlined,
  SettingOutlined
} from '@ant-design/icons';


function Side(){
	const [activeIndex, setActiveIndex] = useState(null);

	// 点击 Item 时设置为激活状态
	const handleClick = (index) => {
		setActiveIndex(index);
	};


	const data = [
	  	<Link to="/Dice" onClick={() => handleClick(0)} >
			<EuroCircleOutlined />
			&nbsp;
			Dice
		</Link>
		,
	  	<Link to="/Roulette" onClick={() => handleClick(1)}>
			<DollarOutlined />
			&nbsp;
			Roulette
		</Link>
		,
	  	<Link to="/Setup" onClick={() => handleClick(2)}>
			<SettingOutlined />
			&nbsp;
			Setup
		</Link>
	];
	//
	return (
		<div>
		    <List
		      bordered
		      dataSource={data}
		      renderItem={(item, index) => (
		        <List.Item
		          onClick={() => handleClick(index)}
		          style={{
		            cursor: 'pointer',
		            justifyContent: "center",
		            backgroundColor: activeIndex === index ? '#e6f7ff' : 'white',
		          }}
		        >
		          {item}
		        </List.Item>
		      )}
		    />
				
		</div>
    )

}

export default Side;