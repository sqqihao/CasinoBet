import React, { useState } from 'react';
import { Grid } from "antd";
import { Col, Divider, Row } from 'antd';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { WalletButton } from '@rainbow-me/rainbowkit';
import { Button } from "antd";
import { Modal } from "antd";
import { Input } from "antd";
import { Message } from "antd";
import { message } from 'antd';

import "./dialog.css"

import {
  TransactionOutlined
} from '@ant-design/icons';

function Head(props){
	const deposit = props.deposit;
	const userBalance =  parseInt(props.userBalance);
	const refreshUserBalance =  props.refreshUserBalance;
	const withDraw = props.withDraw;

	const [withDrawInput, setWithDrawInput] = useState(1);
	const withDrawOnchange = function(e){
		setWithDrawInput(e.target.value);
	}
	const withDrawToWallet = async function(){
		let res = await withDraw(withDrawInput)
		console.log(res)
		if(res.status=="success"){
			message.success('提现成功');
			refreshUserBalance()
		}
	}
		
	const [bankInput, setBankInput] = useState(1);
	const bankInputChange = function(e){
		setBankInput(e.target.value);
	}
	const HomeStyle = {
		fontSize:"22px",
		fontWeight:"bold",
	};
	const [isModalOpen, setIsModalOpen] = useState(false);
	const showModal = () => {
		setIsModalOpen(true);
	};
	const hideModal = () =>{
		setIsModalOpen(false);	
	}
	async function transferToBank(){
		//deposit
		let res = await deposit(bankInput)
		console.log(res)
		if(res.status=="success"){
			message.success('充值成功');
			refreshUserBalance()
		}

	}
	return (
	    <Row>
	      <Col className="gutter-row" sm={24} xs={24} md={6}>
	        <div style={HomeStyle}>
	        	Casino
	        </div>
	      </Col>
	      <Col className="gutter-row" sm={24} xs={24} md={6}>
	      </Col>
	      <Col className="gutter-row" sm={24} xs={24} md={6}>
	        <div style={{paddingTop: "4px"}}>
	        	Bank余额: <span>{userBalance/(10**18)}ETH</span>
	        	&nbsp;
	        	&nbsp;
	        	&nbsp;
	        	&nbsp;
	            <Button type="primary" icon={<TransactionOutlined />} shape="round" size="large" onClick={showModal}>
	            	Bank转账
	            </Button>
	        </div>
	      </Col>
	      <Col className="gutter-row" sm={24} xs={24} md={6}>
	        <div  style={{paddingTop: "13px"}}>
				<ConnectButton
				accountStatus={{
					smallScreen: 'avatar'
				}}/>
	        </div>
	      </Col>

	      <Modal title="转账" open={isModalOpen} className="transferDialog" footer={null} onCancel={hideModal} >

		    <Row gutter={10}>

		      <Col span={6}>
		      	<span className="lh52">余额信息</span>
		      </Col>
		      <Col span={6}>
		      	<span className="lh52">转账额度</span>
		      	
		      </Col>
		      <Col span={6}>
		      	<span className="lh52">确认</span>
		      </Col>
		      <Col span={6}></Col>
		    </Row>

		    <Row gutter={10}>
		      <Col span={6} >
		      	<span className="lh52">Bank balance</span>
		      </Col>
		      <Col span={6}>
		      	<div className="pd10">
		      		<Input placeholder="" onChange={bankInputChange} value={bankInput} addonAfter="ETH" />
		      	</div>
		      </Col>
		      <Col span={6}>

		      	<div className="pd10">
			      	<Button type="primary" onClick={transferToBank}>
		            	向Bank转账
		            </Button>
	            </div>
		      </Col>
		    </Row>

		    <Row gutter={10}>
		      <Col span={6} >
		      	<span className="lh52">Bank提现至钱包</span>
		      </Col>
		      <Col span={6}>
		      	<div className="pd10">
  		      		<Input placeholder="" value={withDrawInput} onChange={withDrawOnchange} addonAfter="ETH" />
  		      	</div>
		      </Col>
		      <Col span={6}>

		      	<div className="pd10">
			      	<Button type="primary" onClick={withDrawToWallet}>
			      		提现至钱包
		            </Button>
		        </div>
		      </Col>
		    </Row>
	      </Modal>
	    </Row>
    )

}

export default Head;
