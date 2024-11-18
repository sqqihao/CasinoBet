import { message } from 'antd';


export function wsrun(addData,refreshUserBalance){
	// debugger;
	let ws;
	function start(){

		ws = new WebSocket(
		 `ws://${window.location.hostname}:8090`
		);

		ws.onopen = (e) => {
		  console.log("Connected to WS", e);
		};

		ws.onerror = (e) => {
		  console.error("wS error", e);
		};

		ws.onmessage = function(data) {
		  console.log("ws recv", data);
		  let resJson = JSON.parse(data.data);
		  if(resJson.time==0) {
			  // debugger;
			  resJson.roll&&addData(resJson.roll);
			  refreshUserBalance();

		  }else{

			  message.success('开盘倒计时:'+(20-resJson.time));
		  }
		};
	}

	function stop(){

		if (ws.readyState === WebSocket.OPEN) {
			ws.close(1000, "Client closed connection"); // 正常关闭
			console.log("WebSocket connection closed by client.");
		} else {
			console.log("WebSocket is not open, cannot close.");
			}
	}
	return {start,stop}
}
