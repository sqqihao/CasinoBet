import React, { useState,useEffect } from 'react';
import { Grid } from "antd";
import { Col, Divider, Row } from 'antd';
import { Button, Flex } from 'antd';
import { InputNumber } from "antd";
import { List } from "antd";
import { Spin } from "antd";
import { message } from 'antd';

import dice from "../imgs/Dice.svg";
import "./Dice.css"
function Dice(props){

	const placeBet = props.placeBet;
	const rolleds = props.rolleds;
	const refreshUserBalance = props.refreshUserBalance;
	const [distoryData, setDistoryData] = useState([]);
	const [diceNumbers, setDiceNumbers] = useState([0, 0, 0]);

	const [betAmount,setBetAmount] = useState(1);
	const [betData,setBetData] = useState(["1","6","2","1"]);

	const handleBetChange = function(e){
		setBetAmount(e)
	}

	const addData = (newItem) => {
		setDistoryData((prevData) => [newItem,...prevData]);
	};
	const addBetData = (newItem) => {
		setBetData((prevData) => [newItem,...prevData]);
	};

	const addBet = function(num){
		let newBetNum = parseFloat(parseFloat(betAmount)+num).toFixed(4);
		// setBetNum(betNum+parseFloat(num));
		// console.log(newBetNum)
		return setBetAmount(newBetNum);
	}

	const commitBet = async function(diceNumber){
		addBetData(diceNumber);
		let res = await placeBet(diceNumber,betAmount)
		// console.log(res)
		if(res){
			message.success('押注成功');
		}
		
		let rolls = await rolleds();
		setDiceNumbers(rolls);
		console.log(rolls);
		addData(rolls);
		// debugger;
		refreshUserBalance();
		//获取开奖记录
		//更新余额
	}
	return (
		<div>

		    <Row>
		      <Col flex={5}>
		      	<Row justify="center" className="dices-box">
		      		<div className="dice-wrap">
		      			<div className={"dice dice"+diceNumbers[0]}></div>
		      		</div>
		      		<div className="dice-wrap">
		      			<div className={"dice dice"+diceNumbers[1]}></div>
		      		</div>
		      		<div className="dice-wrap">
		      			<div className={"dice dice"+diceNumbers[2]}></div>
		      		</div>
		      		{/*
			      		<div>
			      			<div className="dice dice4"></div>
			      		</div>
			      		<div>
			      			<div className="dice dice5"></div>
			      		</div>
			      		<div>
			      			<div className="dice dice6"></div>
			      		</div>
		      		*/}
		      	</Row>
		      	<Row justify="center" className="dices-input">
		      		<Col span={24}  className="bet-amount-btns">
			      		<Button onClick={()=>{addBet(-10)}}>-10</Button>
			      		<Button onClick={()=>{addBet(-1)}}>-1.0</Button>
			      		<Button onClick={()=>{addBet(-0.1)}}>-0.1</Button>
			      		<Button onClick={()=>{addBet(-0.01)}}>-0.01</Button>

			      		<InputNumber value={betAmount} onChange={handleBetChange} step={0.1}/>

			      		<Button onClick={()=>{addBet(+0.01)}}>+0.01</Button>
			      		<Button onClick={()=>{addBet(+0.1)}}>+0.1</Button>
			      		<Button onClick={()=>{addBet(+1)}}>+1</Button>
			      		<Button onClick={()=>{addBet(+10)}}>+10</Button>
			      	</Col>
			      	<Col span={24}>
				      	<Row  className="mg20" gutter={16}>
				      		<Col span={8}>
				      			<Button type="primary" block={true} size="large" onClick={()=>{commitBet(1)}}>1</Button>
				      		</Col>
				      		<Col  span={8}>
				      			<Button type="primary" block={true} size="large" onClick={()=>{commitBet(2)}}>2</Button>
				      		</Col>
				      		<Col  span={8}>
				      			<Button type="primary" block={true} size="large" onClick={()=>{commitBet(3)}}>3</Button>
				      		</Col>
				      	</Row>
				      	<Row   className="mg20" gutter={16}>
				      		<Col span={8}>
				      			<Button type="primary" block={true} size="large" onClick={()=>{commitBet(4)}}>4</Button>
				      		</Col>
				      		<Col  span={8}>
				      			<Button type="primary" block={true} size="large" onClick={()=>{commitBet(5)}}>5</Button>
				      		</Col>
				      		<Col  span={8}>
				      			<Button type="primary" block={true} size="large" onClick={()=>{commitBet(6)}}>6</Button>
				      		</Col>
				      	</Row>
			      	</Col>
		      	</Row>

		      	<Row justify="center" className="dices-box">
				  <List
				    grid={{
				      gutter: 100,
				      column: 6,
				    }}
				    dataSource={betData}
				    renderItem={(item) => <List.Item>{item}</List.Item>}
				  />
		      	</Row>
		      </Col>
		      <Col flex={2}>
		      	<Row>
		      		<Col className="dice-history">
					    <List
					      size="large"
      					  header={<h3>Game History</h3>}
					      dataSource={distoryData}
					      renderItem={(item) => <List.Item>{item[0]+" , "+item[1]+" , "+item[2]}</List.Item>}
					    />
		      		</Col>
		      	</Row>
		      </Col>
		    </Row>

		</div>
    )

}

export default Dice;
