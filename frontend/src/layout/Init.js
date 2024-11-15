import React, { useState,useEffect } from 'react';
import {useLocalStorageState,getTheme} from "../model/store.js"
// 

export default function Init(){
	initTheme()
}
export function initTheme(){

	const theme = getTheme();
	if(theme == true || theme == "true" ) {
		document.querySelector("header").style.background="#4096ff"
		document.querySelector("aside").style.background="#fff";
		document.querySelector("main").style.background="#fff";
		
	}else{
		document.querySelector("header").style.background="#20231f"
		document.querySelector("aside").style.background="rgb(213 211 211)";
		document.querySelector("main").style.background="#999797";
	}
}