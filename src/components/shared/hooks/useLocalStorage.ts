import { useState, useEffect } from "react";

export const useLocalStorage=<T>(key: string, initialValue: T)=> {
  const [storedValue, setStoredValue] = useState<T>(() => {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(storedValue));
  }, [storedValue, key]);

  return {
    storedValue,
    setStoredValue,
  };
};
