import { useEffect, useState } from 'react';
import '../../styles/users.css';

interface IUser {
    email: string;
    name: string;
    address: string;
    role: string;
    isVerify: boolean;
}

const UsersTable = () => {

    const [listUsers, setListUsers] = useState([]);

    // update
    useEffect(() => {
        // viết api trong hàm useEffect, bởi vì hàm useEffect, chạy sau khi component đc mounting/render/cây DOM đã sẵn sàng rồi
        console.log(">>> check useEffect");
        getData();
    }, []);  //tất cả những logic nào muốn update cho component thì viết trong useEffect

    const getData = async () => {
        const access_token = "";

        const res = await fetch(
            "http://localhost:8000/api/v1/users/all",
            {
                headers: {
                    'Authorization': `Bearer ${access_token}`,
                    "Content-Type": "application/json",
                },
            }); // method mặc định của fetch là GET

        const d = await res.json();
        setListUsers(d.data.result);
    }

    console.log(">>> check render: ", listUsers); //mounting

    return (
        <div>
            <h2>Table Users</h2>

            <table>
                <thead>
                    <tr>
                        <td>Email</td>
                        <td>Name</td>
                        <td>Address</td>
                        <td>Role</td>
                        <td>Verify?</td>
                        <td>Action</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        listUsers.map((item: IUser, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.email}</td>
                                    <td>{item.name}</td>
                                    <td>{item.address}</td>
                                    <td>{item.role}</td>
                                    <td>{item.isVerify === true ? "Verified" : "Not yet"}</td>
                                    <td>
                                        <button
                                            style={{
                                                backgroundColor: 'yellow',
                                                border: "2px solid black",
                                                padding: 8,
                                                margin: 4,
                                                borderRadius: 8
                                            }}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            style={{
                                                backgroundColor: 'red',
                                                border: "2px solid black",
                                                padding: 8,
                                                margin: 4,
                                                borderRadius: 8
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>
        </div>
    );
};

export default UsersTable;