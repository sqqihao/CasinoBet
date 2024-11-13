import React, { useState,useEffect } from 'react';


export function useLocalStorageState(key, defaultValue) {
  const [state, setState] = useState(() => {
    const savedValue = localStorage.getItem(key) || defaultValue;
    return typeof savedValue =="string" ? JSON.parse(savedValue) : savedValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}

export function getTheme() {
	const savedValue = localStorage.getItem("theme") || "{}";
  // console.log(savedValue)
  return JSON.parse(savedValue)
}
