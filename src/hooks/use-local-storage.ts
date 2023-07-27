import { useState, useEffect } from "react";

// Hook
function useLocalStorage(key: string, initialValue: string) {
  const [value, setValue] = useState(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }

    // Get from local storage by key
    const storedValue = window.localStorage.getItem(key);

    // Parse stored json or if none return initialValue
    return storedValue !== null ? JSON.parse(storedValue) : initialValue;
  });

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export default useLocalStorage;
