
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
}

const InputTodo = (props: IProps) => {
    const { age, name } = props; // object destructuring

    const [fullName, setFullName] = useState<string>("");

    const handleClick = () => {
        // alert('click me');
    };

    console.log(">>> Check fullName: ", fullName);

    return (
        <div>
            <div>name = {name}</div>
            <div>age = {age}</div>
            <div>Add new todo</div>
            <input
                type="text"
                onChange={(event) => {
                    // console.log(event.target.value)
                    setFullName(event.target.value)
                }}
            />
            <div>{fullName}'s todo</div>
            &nbsp; &nbsp; {/* HTML Entities - Non-breaking Space */}
            <button onClick={() => handleClick()}>Save</button>
        </div>
    )
}

export default InputTodo;