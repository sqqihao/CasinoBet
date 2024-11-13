import React, { useState,useEffect } from 'react';


export function useLocalStorageState(key, defaultValue) {
  const [state, setState] = useState(() => {
    const savedValue = localStorage.getItem(key) || defaultValue;
    return  Boolean(savedValue);
  });

  useEffect(() => {
    localStorage.setItem(key, state);
  }, [key, state]);

  return [state, setState];
}

export function getTheme() {
  const savedValue = localStorage.getItem("theme");
  // console.log(savedValue)
  return String(savedValue);
}

export function setTheme(state) {
  localStorage.setItem("theme",String(state))
}
