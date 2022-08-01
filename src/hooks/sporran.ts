import { useState, useEffect } from 'react';
import useFetch from './fetch';

export default function useSporran () {
  const [ sporran, setSporran ] = useState<any>(null);

  useEffect(() => {
    const inState = !!sporran;
    const inWindow = window.kilt && window.kilt.sporran;
    if (!inState && inWindow) {
      setSporran(window.kilt.sporran);
    }
    
    if (!inState) {
      window.kilt = new Proxy({}, { 
        set(target: any, prop, value) {
          if (prop === 'sporran') {
            setSporran(value);
          }
          return !!(target[prop] = value);
        } 
      })
    }
  });

  return { 
    sporran
  }
}