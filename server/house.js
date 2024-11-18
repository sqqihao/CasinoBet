require("dotenv").config();
require("log-timestamp");
const { ethers } = require("ethers");
const { contractData } = require("./constant.js");
const { WebSocketServer, WebSocket } = require("ws");

const wss = new WebSocketServer({
  port: 8090,
});

let roulette;

function heartbeat() {
  this.isAlive = true;
}

wss.on("connection", function connection(ws) {
  // ws.isAlive = true;
  // ws.on("pong", heartbeat);

  // if (roulette && roulette.rollPending) {
  //   ws.send(roulette.data());
  // }
});


wss.clients.forEach(function each(ws) {
if (ws.isAlive === false) return ws.terminate();
	ws.isAlive = false;
	//ws.ping();
});
//console.log()

const provider =  new ethers.JsonRpcProvider(process.env.PRC_URL_LOCAL);
const signer = new ethers.Wallet(process.env.PRIVATE_KEY).connect(provider);
// console.log(signer);

const contract = new ethers.Contract(
	contractData.RouletteAddr,
	contractData.RouletteABI,
	provider).connect(signer);
// console.log(contract)
//循环10秒检测;
//如果有bet记录play一次;

async function getLen(){
	return 	await contract.betsLength();
}
// (async function(){

// 	console.log(await getLen())
// })();
// console.log(contract.filters)

contract.on("PlaceBet", async (_,c) => {
	//console.log(1)
	// console.log(_)
    // console.log(c); // 包含事件的详细信息
	console.log("新PlaceBet下注，等待公布结果:" + await getLen());
	// const tx = await contract.play();
	// Waits for the spin to be confirmed
	// await tx.wait();
	// console.log(await getLen());

});


function broadcast(data) {
	console.log(`Broadcasing data to ${wss.clients.length} clients!`);
	wss.clients.forEach((client) => {
		console.log(client.readyState);
		if (client.readyState === WebSocket.OPEN) {
			client.send(typeof data =="object"? JSON.stringify(data): data);
		}
	});
}

/*
console.log(await getLen());
const tx = await contract.play();
await tx.wait();
console.log(await getLen());
*/
async function openBet(){
	let count = await getLen();
	console.log("count: "+count);
	if(count==0)return;

	await contract.play();
	let rollLength = await contract.getRollLength();
	console.log("rollLength: "+rollLength);
	let roll = await contract.rolleds(parseInt(rollLength)-1);
	console.log("last roll is: " + roll);
	return parseInt(roll);
};

let countDownTime = 0;
setInterval(async function(){
	countDownTime++;
	if(countDownTime<20){
		return broadcast({time:countDownTime});
	};
	countDownTime = 0;
	let roll = await openBet();
	return broadcast({time:0,roll:roll})

},3000);

/*
setInterval(async function(){
	let count = await getLen();
	if(count==0)return;
	await contract.play();
	// broadcast();
},10*1000);
*/

/*
contract.on(contract.filters.BetPlaced(), (_,c) => {
    console.log(c); // 包含事件的详细信息
});
*/