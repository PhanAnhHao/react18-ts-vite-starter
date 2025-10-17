
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
    abc?: string; //optional
    handleTest: () => void;
    handleTestValueInput: (v: string) => void;
}

const InputTodo = (props: IProps) => {

    const { handleTestValueInput } = props;

    const [todo, setTodo] = useState<string>("");
    const [listTodo, setListTodo] = useState(
        ["todo1", "todo2", "todo3", "todo4", "todo5", "todo6"]
    );

    const handleClick = () => {
        handleTestValueInput(todo);
        // if (!todo) {
        //     alert("empty todo");
        //     return; // khi dùng keyword return(mà k return về 1 gtrị) thì nó sẽ thoát ra khỏi func này, ko dịch phần code phía dưới nữa
        // }
        // // alert('click me');
        // setListTodo([...listTodo, todo]); // spread syntax
        // setTodo("");
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
            <br />
            <ul>
                {listTodo.map((item, index) => {
                    return (
                        <li key={index}>{item}</li>
                    )
                })}
            </ul>
            {/* Thay đổi props hay thay đổi state sẽ khiến component re-render */}
        </div>
    )
}

export default InputTodo;