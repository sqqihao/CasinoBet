import { Grid } from "antd";
import { Col, Divider, Row } from 'antd';
import { BrowserRouter as Router,Link } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import Dice from "./Dice.js"
import Roulette from "./Roulette.js"
import SetupPage from "./SetupPage.js"


function Cont(props){
	const placeBet = props.placeBet;
	const rolleds = props.rolleds;
	const placeBetRoulette = props.placeBetRoulette;
	const refreshUserBalance = props.refreshUserBalance;
	return (
		<div>
			<Routes >
				<Route path="/" element={<Dice placeBet={placeBet} />} />
				<Route path="/Dice" element={<Dice placeBet={placeBet} rolleds={rolleds} refreshUserBalance={refreshUserBalance} />} />
				<Route path="/Roulette" element={<Roulette placeBetRoulette={placeBetRoulette} refreshUserBalance={refreshUserBalance}/>} />
				<Route path="/SetupPage" element={<SetupPage/>} />
				
			</Routes>
		</div>
    )

}

export default Cont;
