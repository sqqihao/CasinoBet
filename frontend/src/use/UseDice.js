import { writeBetDice  } from "../model/WriteCon.js"
import {readRolleds} from "../model/ReadCon.js"
import { message } from 'antd';


export default function useDice(setSpinning){
	async function placeBet(diceNumber,betAmount){
		//调用loading
		// alert(diceNumber,betAmount)
		//等待执行过程
		setSpinning(true);
		setTimeout(()=>{
			setSpinning(false)
		},20000);
		let res = await writeBetDice(diceNumber,betAmount);
		setSpinning(false)
		//清除loading
		return res;
	}
	async function rolleds(){
		let res = await readRolleds();
		// console.log(res)
		return res;
	}
	return {placeBet, rolleds};
}