import React, { useState,useEffect } from 'react';
import {useLocalStorageState,getTheme} from "../model/store.js"
// 

export default function Init(){
	initTheme()
}
export function initTheme(){

	const theme = getTheme();
	if(theme.theme == true) {
		document.querySelector("header").style.background="#4096ff"
	}else{
		document.querySelector("header").style.background="#20231f"
	}
}