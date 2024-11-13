import React, { useState,useEffect } from 'react';


export function useLocalStorageState(key, defaultValue) {
  const [state, setState] = useState(() => {
    const savedValue = localStorage.getItem(key);
    return savedValue ? JSON.parse(savedValue) : defaultValue;
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
