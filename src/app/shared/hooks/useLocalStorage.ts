import { useState, useEffect } from "react";

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (!item) return initialValue;
      return JSON.parse(item) as T;
    } catch (error) {
      console.warn(`Error parsing localStorage key "${key}":`, error);
      window.localStorage.removeItem(key);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  }, [storedValue, key]);

  return [storedValue, setStoredValue] as const;
};
