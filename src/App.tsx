// import './App.css';
import { useState } from 'react';


function App() {

  const [count, setCount] = useState<number>(1);

  /**
   *  Phase 1: Mounting (born) : được sinh ra -> chèn html vào giao diện (cây DOM)
      Phase 2: Update: cập nhật giao diện sau khi đã có cây DOM
      Phase 3: Unmounting (die): xóa html khỏi cây DOM

   */

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
