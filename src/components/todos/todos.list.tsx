
interface ITodosList {
    listTodo: string[];
}

const TodosList = (props: ITodosList) => {

    const { listTodo } = props;

    return (
        <div>
            <ul style={{ border: "1px solid green" }}>
                {listTodo.map((item, index) => {
                    return (
                        <li key={index}>{item}</li>
                    )
                })}
            </ul>
        </div>
    );
};

export default TodosList;