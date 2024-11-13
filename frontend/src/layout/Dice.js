import { Grid } from "antd";
import { Col, Divider, Row } from 'antd';
import { Button, Flex } from 'antd';
import { InputNumber } from "antd";
import { List } from "antd";
import dice from "../imgs/Dice.svg";
import "./Dice.css"
function Dice(){
	const distoryData = [
	  '1 2 3',
	  '4 5 6',
	  '7 8 9',
	  '10 11 12',
	  '12 12 22',
	  '7 8 9',
	  '10 11 12',
	  '12 12 22',
	  '7 8 9'
	];
	return (
		<div>
			
		    <Row>
		      <Col flex={5}>
		      	<Row justify="center" className="dices-box">
		      		<div className="dice-wrap">
		      			<div className="dice dice1"></div>
		      		</div>
		      		<div className="dice-wrap">
		      			<div className="dice dice2"></div>
		      		</div>
		      		<div className="dice-wrap">
		      			<div className="dice dice3"></div>
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
			      	<Col span={24}>
				      	<Row  className="mg20" gutter={16}>
				      		<Col span={8}>
				      			<Button type="primary" block={true} size="large" >1</Button>
				      		</Col>
				      		<Col  span={8}>
				      			<Button type="primary" block={true} size="large" >2</Button>
				      		</Col>
				      		<Col  span={8}>
				      			<Button type="primary" block={true} size="large" >3</Button>
				      		</Col>
				      	</Row>
				      	<Row   className="mg20" gutter={16}>
				      		<Col span={8}>
				      			<Button type="primary" block={true} size="large" >4</Button>
				      		</Col>
				      		<Col  span={8}>
				      			<Button type="primary" block={true} size="large" >5</Button>
				      		</Col>
				      		<Col  span={8}>
				      			<Button type="primary" block={true} size="large" >6</Button>
				      		</Col>
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

export default Dice;
