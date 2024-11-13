import React, { useState,useEffect } from 'react';
import { Grid } from "antd";
import { Col, Divider, Row } from 'antd';
import { Button, Flex } from 'antd';
import { InputNumber } from "antd";
import { List } from "antd";
import wheelImg from "../imgs/RouletteWheel.svg";
import "./Dice.css"
import Init from "./Init.js"

function Roulette(){

	const distoryData = [
		'30',
		'12',
		'7',
		'19',
		'20',
		'5',
		'8'
	];
	const wheelStyle = {
		backgroundImage:`url(${wheelImg})`,
	}
	useEffect(function(){

		Init();
	},[])
	return (
		<div  >
			
		    <Row>
		      <Col flex={5}>
		      	<Row justify="center" className="Roulette-box">
		      		<div className="wheel-sheath">
		      			<div className="wheel" style={wheelStyle}></div>
		      			<div className="mark"></div>
		      		</div>
		      	</Row>
		      	<Row justify="center" className="Roulette-input">
		      		<Col span={24}  className="Roulette-bet-amount-btns">
			      		<Button>-10</Button>
			      		<Button>-1.0</Button>
			      		<Button>-0.1</Button>
			      		<Button>-0.01</Button>

			      		<InputNumber  defaultValue={3.0}  controls={false} />

			      		<Button>+0.01</Button>
			      		<Button>+0.1</Button>
			      		<Button>+1</Button>
			      		<Button>+10</Button>
			      	</Col>
			      	<Col span={24} className="Roulette-buttons">
				      	<Row justify="center"  className="mg20" gutter={16}>
				      		<Button type="primary" size="large" danger>Red</Button>
				      	</Row>
				      	<Row justify="center"  className="mg20" gutter={16}>
				      		<Button size="large"  color="default" variant="solid">Black</Button>
				      	</Row>
				      	<Row justify="center"  className="mg20" gutter={16}>
				      		<Button type="primary" size="large" >Even</Button>
				      	</Row>
				      	<Row justify="center"  className="mg20" gutter={16}>
				      		<Button type="primary" size="large" style={{backgroundColor:'green'}}>Odd</Button>
				      	</Row>
			      	</Col>
		      	</Row>
		      </Col>
		      <Col flex={2}>
		      	<Row>
		      		<Col className="dice-history">
					    <List
					      size="large"
      					  header={<h3>Game History</h3>}
					      dataSource={distoryData}
					      renderItem={(item) => <List.Item>{item}</List.Item>}
					    />
		      		</Col>
		      	</Row>
		      </Col>
		    </Row>
		</div>
    )

}

export default Roulette;
