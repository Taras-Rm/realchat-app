import React, { useEffect, useState } from "react";

export const useLocalStorage = (key: string, initialValue: any) => {
  const [value, setValue] = useState(() => {
    const locItem = localStorage.getItem(key);
    return locItem ? JSON.parse(locItem) : initialValue;
  });

  useEffect(() => {
    const item = JSON.stringify(value);
    localStorage.setItem(key, item);
  }, [value]);

  return { value, setValue };
};

export default useLocalStorage;
