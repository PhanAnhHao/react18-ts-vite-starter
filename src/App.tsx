// import './App.css';
import { useState } from 'react';
import InputTodo from './todo/input.todo';

function App() {

  const [count, setCount] = useState<number>(1);
  const name = "ChillFeel";
  const age = 22;
  const info = {
    gender: "male",
    address: "Hue"
  }

  const [listTodo, setListTodo] = useState<string[]>(
    ["todo1", "todo2", "todo3", "todo4", "todo5", "todo6"]
  );

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
      <div>
        <InputTodo
          name={name}
          age={age}
          info={info}
          listTodo={listTodo}
          setListTodo={setListTodo}
        />

        <br />
        <ul style={{ border: "1px solid green" }}>
          {listTodo.map((item, index) => {
            return (
              <li key={index}>{item}</li>
            )
          })}
        </ul>
        {/* Thay đổi props hay thay đổi state sẽ khiến component re-render */}
      </div>
    </>
  )
}

export default App
