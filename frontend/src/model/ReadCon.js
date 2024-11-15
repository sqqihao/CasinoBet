import {config} from "../wagmiconf.js";
import {contractData} from "../constant.js";

import { useAccount,useWriteContract } from 'wagmi'
import { readContract,writeContract ,simulateContract,getAccount,waitForTransactionReceipt} from '@wagmi/core'


export async function Readbal() {
		const { address } = getAccount(config)
		const args = [address];
		let bal = await readContract(config,{
			address: contractData.BankAddr,
			abi: contractData.BankABI,
			account:address,
			functionName: "balanceOf",
			args:args
		});
		return bal
}

export async function readRolleds() {
		const { address } = getAccount(config)

		let roll = await readContract(config,{
			address: contractData.DiceAddr,
			abi: contractData.DiceABI,
			account:address,
			functionName: "getRolledCount"
		}).then(function(rolledCount){
			const args = [parseInt(rolledCount)-1];
			return readContract(config,{
				address: contractData.DiceAddr,
				abi: contractData.DiceABI,
				account:address,
				functionName: "getRoll",
				args:args
			});
		})
		// console.log(roll)
		return [parseInt(roll[0]),parseInt(roll[1]),parseInt(roll[2])]
}

