// import './App.css';
import InputTodo from './todo/input.todo';

function App() {

  const name = "ChillFeel";
  const age = 22;
  const info = {
    gender: "male",
    address: "Hue"
  }

  const todos = ["todo1", "todo2", "todo3", "todo4", "todo5", "todo6"]

  // {key: value}
  return (
    <>
      <div className='parent' id='taolabomay'>
        <div className="children" id='maylacontao'></div>
      </div>
      <div>
        <InputTodo
          name={name}
          age={age}
          info={info}
        />

        <ul>
          {todos.map(item => {
            return (<li>{item}</li>)
          })}
          {/* vòng map tạo ra 1 array mới.
          sau này, nếu cần dùng vòng lặp với react thì dùng vòng map */}
        </ul>
      </div>
    </>
  )
}

export default App
