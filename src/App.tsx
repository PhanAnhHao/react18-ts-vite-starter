// import './App.css';
import { useState } from 'react';


function App() {

  const [count, setCount] = useState<number>(1);

  return (
    <>
      <div>count = {count}</div>
      <button onClick={() => setCount(count + 1)}>Increase</button>
      <div className='parent' id='taolabomay'>
        <div className="children" id='maylacontao'></div>
      </div>
    </>
  )
}

export default App
