
const SecondComponent = () => {

    const name = "PhAHao";
    const age = 22;

    const info = {
        address: "VN",
        regionId: 75
    };
    const arr = [1, 2, 3, true, { sound: "hehehe" }];
    const testBoolean = true; // boolean => render nothing
    const testNull = null; // null => render nothing
    const testUndifine = undefined; // undefined => render nothing

    // jsx: html + js => 1 block - là cú pháp viết trong hàm return này
    return (
        <div>
            <h1 style={
                {
                    borderRadius: "5px",
                    border: "1px solid green",
                    color: "red"
                }
            }>Hedy Lamarr's Todos</h1>
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
            <h5>{JSON.stringify(arr)}</h5>
            <footer>Make by {name}, age {age}, {JSON.stringify(info)}</footer>
        </div>
    );
};

export default SecondComponent;