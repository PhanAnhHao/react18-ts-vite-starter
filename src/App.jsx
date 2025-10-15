// import './App.css';
import InputTodo from './todo/input.todo';

function App() {

  const name = "ChillFeel";
  const age = 22;
  const info = {
    gender: "male",
    address: "Hue"
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
        />
      </div>
    </>
  )
}

export default App
