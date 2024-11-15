import React, { useState,useEffect } from 'react';
import { Grid } from "antd";
import { Col, Divider, Row } from 'antd';
import { Button, Flex ,Card} from 'antd';
import { InputNumber } from "antd";
import { List,Radio } from "antd";
import wheelImg from "../imgs/RouletteWheel.svg";
import "./Dice.css";
import Init from "./Init.js";
import {wsrun} from "./wsrun.js";

function Roulette(props){
	const placeBetRoulette = props.placeBetRoulette;
	const refreshUserBalance = props.refreshUserBalance;
	const ROULETTE_ORDER = [
	  0, 26, 3, 35, 12, 28, 7, 29, 18, 22, 9, 31, 14, 20, 1, 33, 16, 24, 5, 10, 23,
	  8, 30, 11, 36, 13, 27, 6, 34, 17, 25, 2, 21, 4, 19, 15, 32,
	];
	function isRed(roll) {
		if (roll < 11 || (roll > 18 && roll < 29)) {
			// Red odd, black even
			return roll % 2 == 1;
		} else {
			return roll % 2 == 0;
		}
	}

	const [openData,setOpenData] = useState([]);
	const [betData,setBetData] = useState(["偶数:22","红色:10"]);

	const addData = (newItem) => {
		setOpenData((prevData) => [newItem,...prevData]);
	};

	const addBetData = (newItem) => {
		setBetData((prevData) => [newItem,...prevData]);
	};

	const options = ROULETTE_ORDER.map((e)=>{
		return {
			label:e,
			value:e,
			style:{
				backgroundColor:e==0?"green":isRed(e)?"red":"#565656",
				color:"#fff"
			}
		}
	});
	const wheelStyle = {
		backgroundImage:`url(${wheelImg})`,
	}
	const [betNumber,setBetNumber] = useState();
	const [betAmount,setBetAmount] = useState(1);
	const addBet = function(num){
		let newBetNum = parseFloat(parseFloat(betAmount)+num).toFixed(4);
		return setBetAmount(newBetNum);
	}
	const handleBetChange = function(e){
		setBetAmount(e)
	}
	const placeBet = async function(_type,_num,_amounts,info){
		//console.log(_type,_num,_amounts)
		addBetData(info);
		await placeBetRoulette(_type,_num,_amounts);
		await refreshUserBalance();

	}
	const onChange = (e) => {
		// console.log(`radio checked:${e.target.value}`);
		setBetNumber(e.target.value);

	};

	useEffect(function(){
		Init();
		wsrun(addData,refreshUserBalance);
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
		      	<Row justify="center">
		      		<Col className="radioSelect">
		      			<Radio.Group options={options} defaultValue="0" size="large" optionType="button"  onChange={onChange} />
		      			<br />
		      		</Col>
		      	</Row>
		      	<Row justify="center" className="Roulette-input">
		      		<Col span={24}  className="Roulette-bet-amount-btns">
		      			<br />
		      			<br />
			      		<Button onClick={()=>{addBet(-10)}}>-10</Button>
			      		<Button onClick={()=>{addBet(-1)}}>-1.0</Button>
			      		<Button onClick={()=>{addBet(-0.1)}}>-0.1</Button>
			      		<Button onClick={()=>{addBet(-0.01)}}>-0.01</Button>

			      		<InputNumber  value={betAmount}  onChange={handleBetChange} step={0.1}/>

			      		<Button onClick={()=>{addBet(+0.01)}}>+0.01</Button>
			      		<Button onClick={()=>{addBet(+0.1)}}>+0.1</Button>
			      		<Button onClick={()=>{addBet(+1)}}>+1</Button>
			      		<Button onClick={()=>{addBet(+10)}}>+10</Button>
			      	</Col>
			      	<Col span={24} className="Roulette-buttons">
				      	<Row justify="center"  className="mg20" gutter={16}>
				      		<Button type="primary" size="large" danger onClick={()=>{placeBet(0,isRed(betNumber)?0:1,betAmount,"红色:"+betNumber)}}>预测红色Red</Button>
				      	</Row>
				      	<Row justify="center"  className="mg20" gutter={16}>
				      		<Button type="primary" size="large"  onClick={()=>{placeBet(1,betNumber%2,betAmount,"偶数:"+betNumber)}}>预测偶数Even</Button>
				      	</Row>
				      	<Row justify="center"  className="mg20" gutter={16}>
				      		<Button type="primary" size="large" style={{backgroundColor:'green'}} onClick={()=>{placeBet(1,betNumber%2,betAmount,"奇数:"+betNumber)}}>预测奇数Odd</Button>
				      	</Row>
			      	</Col>
		      	</Row>
		      	<Row justify="center" className="Roulette-box">
				  <List
				  	style={{width:"100%"}}
				    grid={{
				      gutter: 20,
				      column: 8,
				    }}
				    dataSource={betData}
				    renderItem={(item) => <List.Item>{item}</List.Item>}
				  />
		      	</Row>
		      </Col>
		      <Col flex={2}>
		      	<Row>
		      		<Col className="bet-history">
					    <List
					      size="large"
      					  header={<h3>Game History</h3>}
					      dataSource={openData}
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
