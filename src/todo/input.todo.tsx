
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
} // viết kiểu này tường minh, và có thể tái sd 1 cách dễ dàng

const InputTodo = (props: IProps) => {
    // const InputTodo = (
    //     props: {
    //  // {age, name}: {
    //         name: string;
    //         age: number;
    //         info: {
    //             gender: string;
    //             address: string;
    //         };
    //         abc?: string; //optional
    //     } // kiểu code nhìn rườm rà và rồi rắm, ko tái sd code đc
    // ) => {

    const { age, name } = props; // object destructuring
    // props: object
    // console.log(">>>Check props: ", props);
    // jsx
    return (
        <div>
            <h1>{props.abc}</h1>
            <div>name = {name}</div>
            <div>age = {age}</div>
            <div>Add new todo</div>
            <input type="text" />
            &nbsp; &nbsp; {/* HTML Entities - Non-breaking Space */}
            <button>Save</button>
        </div>
    )
}

export default InputTodo;