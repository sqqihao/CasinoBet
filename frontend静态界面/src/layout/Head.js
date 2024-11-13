import React, { useState } from 'react';
import { Grid } from "antd";
import { Col, Divider, Row } from 'antd';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { WalletButton } from '@rainbow-me/rainbowkit';
import { Button } from "antd";
import { Modal } from "antd";
import { Input } from "antd";
import "./dialog.css"

import {
  TransactionOutlined
} from '@ant-design/icons';

function Head(){
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
	        	Bank余额<span>10.0</span>
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
		      	<span className="lh52">确定</span>
		      </Col>
		      <Col span={6}></Col>
		    </Row>

		    <Row gutter={10}>
		      <Col span={6} >
		      	<span className="lh52">Bank balance</span>
		      </Col>
		      <Col span={6}>
		      	<Input placeholder="" />
		      </Col>
		      <Col span={6}>
		      	<Button type="primary">
	            	向Bank转账
	            </Button>
		      </Col>
		    </Row>

		    <Row gutter={10}>
		      <Col span={6} >
		      	<span className="lh52">Bank提现至钱包</span>
		      </Col>
		      <Col span={6}>
  		      	<Input placeholder="" />
		      </Col>
		      <Col span={6}>
		      	<Button type="primary">
		      		提现至钱包
	            </Button>
		      </Col>
		    </Row>
	      </Modal>
	    </Row>
    )

}

export default Head;
