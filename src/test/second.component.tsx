
const SecondComponent = () => {

    // jsx: html + js => 1 block - là cú pháp viết trong hàm return này
    return (
        <div>
            <h1>Hedy Lamarr's Todos</h1>
            <img
                src="https://i.imgur.com/yXOvdOSs.jpg"
                alt="Hedy Lamarr"
                className="photo"
            />
            <ul>
                <li>Invent new traffic lights </li>
                <li>Rehearse a movie scene </li>
                <li>Improve the spectrum technology</li>
            </ul>

        </div>
    );
};

export default SecondComponent;