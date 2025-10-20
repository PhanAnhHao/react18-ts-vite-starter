
// typescript = javascript + check type/gợi ý code
// B1: Compile - dịch code: typescript => javascript (check type)
// B2: run - chạy code

import { useState } from "react";
// use => hook

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

    const { listTodo, setListTodo } = props; // props của thằng con là state của thằng cha => thay đổi state => gdiện re-render

    const [todo, setTodo] = useState<string>("");

    const handleClick = () => {
        if (!todo) {
            alert("empty todo");
            return; // khi dùng keyword return(mà k return về 1 gtrị) thì nó sẽ thoát ra khỏi func này, ko dịch phần code phía dưới nữa
        }
        // alert('click me');
        setListTodo([...listTodo, todo]); // spread syntax
        setTodo("");
    };

    return (
        <div style={{ border: "1px solid red" }}>
            <div>Add new todo</div>
            <input
                value={todo}
                type="text"
                onChange={(event) => {
                    // console.log(event.target.value)
                    setTodo(event.target.value)
                }}
            />
            &nbsp; &nbsp; {/* HTML Entities - Non-breaking Space */}
            <button onClick={() => handleClick()}>Save</button>
        </div>
    )
}

export default InputTodo;