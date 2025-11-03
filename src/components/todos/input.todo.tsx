import { useState } from "react";

export interface IProps {
    name: string;
    age: number;
    info: {
        gender: string;
        address: string;
    };
    listTodo: string[];
    setListTodo: (v: string[]) => void;
}

const InputTodo = (props: IProps) => {

    const { listTodo, setListTodo } = props;

    const [todo, setTodo] = useState<string>("");

    const handleClick = () => {
        if (!todo) {
            alert("empty todo");
            return;
        }
        setListTodo([...listTodo, todo]);
        setTodo("");
    };

    return (
        <div style={{ border: "1px solid red" }}>
            <div>Add new todo</div>
            <input
                value={todo}
                type="text"
                onChange={(event) => {
                    setTodo(event.target.value)
                }}
            />
            &nbsp; &nbsp;
            <button onClick={() => handleClick()}>Save</button>
        </div>
    )
}

export default InputTodo;