
const InputTodo = (props) => {
    // props: object
    console.log(">>>Check props: ", props);
    // jsx
    return (
        <div>
            <div>age = {props.age}</div>
            <div>Add new todo</div>
            <input type="text" />
            &nbsp; &nbsp; {/* HTML Entities - Non-breaking Space */}
            <button>Save</button>
        </div>
    )
}

export default InputTodo;