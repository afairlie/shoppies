import React, { useEffect, useState } from 'react';
import './App.css';

const App: React.FC = () => {
  let [state, setState] = useState<any>()

  useEffect(() => {
    fetch('http://www.omdbapi.com/?i=tt3896198&apikey=538adb24&t=apocalypse+now')
    .then(res => res.json())
    .then(res => setState(res.Title))
  }, [])

  return (
    <div>
      {state}
    </div>
  );
}

export default App;
