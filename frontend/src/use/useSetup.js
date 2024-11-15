import React, { useState,useEffect } from 'react';
import {Readbal} from "../model/ReadCon.js"
import {deposit,withDraw} from "../model/WriteCon.js"

function useSetup(){
	const [userBalance,setUserBalance] = useState(0);
	const refreshUserBalance = async function(){
		let balance =  await Readbal();
		// console.log(balance);
		setUserBalance(balance);
	};
	// console.log(refreshUserBalance());
	return {userBalance, refreshUserBalance, deposit, withDraw}
}

export default useSetup;