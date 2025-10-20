import { useState } from 'react';
import InputTodo from '../components/todos/input.todo';
import TodosList from '../components/todos/todos.list';

const TodoPage = () => {
    const name = "ChillFeel";
    const age = 22;
    const info = {
        gender: "male",
        address: "Hue"
    }

    const [listTodo, setListTodo] = useState<string[]>(
        ["todo1", "todo2", "todo3", "todo4", "todo5", "todo6"]
    );
    return (
        <div>
            <InputTodo
                name={name}
                age={age}
                info={info}
                listTodo={listTodo}
                setListTodo={setListTodo}
            />

            <br />
            <TodosList
                listTodo={listTodo}
            />
            {/* Thay đổi props hay thay đổi state sẽ khiến component re-render */}
        </div>
    );
};

export default TodoPage