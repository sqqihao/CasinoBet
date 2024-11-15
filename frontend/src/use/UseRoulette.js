import { writeBetDiceRoulette  } from "../model/WriteCon.js"
import {readRolleds} from "../model/ReadCon.js"
import { message } from 'antd';

export default function useRoulette(setSpinning){
	const placeBetRoulette = async function(_type,_num,_amounts){
		// console.log(_type,_num,_amounts);
		
		setSpinning(true);
		setTimeout(()=>{
			setSpinning(false)
		},20000);
		let res = await writeBetDiceRoulette(_type,_num,_amounts);
		setSpinning(false)


	};
	return {placeBetRoulette}
};
