import {useState, useEffect} from 'react'

type Hook = (value: string, ms: number) => string;

export const useDebounce: Hook = (value, ms) => {
  const [debounced, setDebounced] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => setDebounced(value), ms);
    // cleanup to prevent repeated calls
    return () => clearTimeout(timeout);
  }, [value, ms])

  return debounced
}