import { Grid } from "antd";
import { Col, Divider, Row } from 'antd';
import { BrowserRouter as Router,Link } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import Dice from "./Dice.js"
import Roulette from "./Roulette.js"
import Setting from "./Setting.js"


function Cont(){

	return (
		<div>
			<Routes >
				<Route path="/" element={<Dice/>} />
				<Route path="/Dice" element={<Dice/>} />
				<Route path="/Roulette" element={<Roulette/>} />
				<Route path="/Setting" element={<Setting/>} />
				
			</Routes>
		</div>
    )

}

export default Cont;
