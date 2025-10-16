
// typescript = javascript + check type/gợi ý code
// B1: Compile - dịch code: typescript => javascript (check type)
// B2: run - chạy code

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

    const handleClick = () => {
        alert('click me');
    };

    return (
        <div>
            <div>name = {name}</div>
            <div>age = {age}</div>
            <div>Add new todo</div>
            <input
                type="text"
                onChange={(event) => {
                    console.log(event.target.value)
                }}
            />
            &nbsp; &nbsp; {/* HTML Entities - Non-breaking Space */}
            <button onClick={() => handleClick()}>Save</button>
        </div>
    )
}

export default InputTodo;