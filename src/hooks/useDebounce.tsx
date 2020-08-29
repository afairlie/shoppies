import React, {useState, useEffect} from 'react'

type Hook = (term: string, ms: number) => string;

export const useDebounce: Hook = (term, ms) => {
  const [debounced, setDebounced] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => setDebounced(term), ms);
    return () => clearTimeout(timeout);
  }, [term, ms])
  return debounced
}