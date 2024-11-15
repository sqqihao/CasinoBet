import {config} from "../wagmiconf.js";
import {contractData} from "../constant.js";
import { ethers } from 'ethers';

import { useAccount,useWriteContract } from 'wagmi'
import { readContract,writeContract ,simulateContract,getAccount,waitForTransactionReceipt} from '@wagmi/core'


const { address } = getAccount(config)
export const waitReceipt = async function(hash){
	const transactionReceipt = await waitForTransactionReceipt(config, {
	  hash: hash,
	});
	return transactionReceipt;
}

export async function deposit(amounts) {
		let _amounts=ethers.parseEther(amounts);

		const args = [];
		let tx = await writeContract(config,{
			address: contractData.BankAddr,
			abi: contractData.BankABI,
			functionName: "deposit",
			value:_amounts
		});
		
		console.log(tx)
		return waitReceipt(tx);
}

export async function withDraw(amounts) {
		let _amounts=ethers.parseEther(amounts);

		const args = [_amounts];
		let tx = await writeContract(config,{
			address: contractData.BankAddr,
			abi: contractData.BankABI,
			functionName: "withDraw",
			args: args
		});
		
		console.log(tx)
		return waitReceipt(tx);
}

export async function writeBetDice(_number ,amounts) {
		let _amounts=ethers.parseEther(String(amounts));

		const args = [_number,_amounts];
		// console.log(args)
		let tx = await writeContract(config,{
			address: contractData.DiceAddr,
			abi: contractData.DiceABI,
			functionName: "place_bet",
			args: args
		});
		
		console.log(tx)
		// return await waitReceipt(tx);
		return tx;
}



export async function writeBetDiceRoulette(_type, _num, amounts) {
		let _amounts=ethers.parseEther(String(amounts));

		const args = [_type, _num, _amounts];
		// console.log(args)
		let tx = await writeContract(config,{
			address: contractData.RouletteAddr,
			abi: contractData.RouletteABI,
			functionName: "place_bet",
			args: args
		});
		
		console.log(tx);
		// return await waitReceipt(tx);
		return tx;
}



