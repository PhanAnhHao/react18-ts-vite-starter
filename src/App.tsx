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

  const handleTest = () => {
    alert("handle test")
  }

  const handleTestValueInput = (name: string) => {
    alert(`handle test value input = ${name}`)
  }

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
          handleTest={handleTest}
          handleTestValueInput={handleTestValueInput}
        />

        {/* <ul>
          {todos.map((item, index) => {
            return (
              <li key={index}>{item}</li>
            )
          })}
        </ul> */}
      </div>
    </>
  )
}

export default App
