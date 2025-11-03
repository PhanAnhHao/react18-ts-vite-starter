import { useEffect, useState } from 'react';
// import '../../styles/users.css';
import { Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface IUser {
    _id: string;
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
        // console.log(">>> check useEffect"); //update
        getData();
    }, []);  //tất cả những logic nào muốn update cho component thì viết trong useEffect

    const getData = async () => {
        const access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0b2tlbiBsb2dpbiIsImlzcyI6ImZyb20gc2VydmVyIiwiX2lkIjoiNjhmMjQ0MTNjN2FlNzEwODlmNjRmY2RhIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJhZGRyZXNzIjoiVmlldE5hbSIsImlzVmVyaWZ5Ijp0cnVlLCJuYW1lIjoiSSdtIGFkbWluIiwidHlwZSI6IlNZU1RFTSIsInJvbGUiOiJBRE1JTiIsImdlbmRlciI6Ik1BTEUiLCJhZ2UiOjY5LCJpYXQiOjE3NjA5MzIwMzcsImV4cCI6MTg0NzMzMjAzN30.tHQngx7egr79X9caPapFl6fvamh7r-j9vX3Boqa0R7M";

        const res = await fetch(
            "http://localhost:8000/api/v1/users/all",
            {
                headers: {
                    'Authorization': `Bearer ${access_token}`,
                    "Content-Type": "application/json",
                },
            }); // method mặc định của fetch là GET

        const d = await res.json();
        if (d && d?.data) {
            setListUsers(d.data.result);
        } else {
            setListUsers([]);
        }

    }

    // console.log(">>> check render: ", listUsers); //mounting

    const columns: ColumnsType<IUser> = [
        {
            title: 'Email',
            dataIndex: 'email',
            render(value, record, index) {
                console.log({ value, record, index })
                return (
                    <a href="">{record.email}</a>
                )
            },
        },
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Address',
            dataIndex: 'address',
        },
        {
            title: 'Role',
            dataIndex: 'role',
        },
        {
            title: 'Verify?',
            dataIndex: 'isVerify',
            render: (_, { isVerify }) => (
                <>
                    {
                        isVerify == true
                            ?
                            <Tag color={"green"}>
                                Verified
                            </Tag>
                            :
                            <Tag color={"red"}>
                                Not yet
                            </Tag>
                    }
                </>
            ),
        },
    ]

    return (
        <div>
            <h2>Table Users</h2>
            <Table
                columns={columns}
                dataSource={listUsers}
            />
            {/* <table>
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
                {
                    listUsers.length === 0 ? (
                        <div>no data yet</div>
                    ) : (
                        <tbody>
                            {listUsers.map((item: IUser, index) => (
                                <tr key={item._id}>
                                    <td>{item.email}</td>
                                    <td>{item.name}</td>
                                    <td>{item.address}</td>
                                    <td>{item.role}</td>
                                    <td>{item.isVerify ? "Verified" : "Not yet"}</td>
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
                            ))}
                        </tbody>
                    )
                }

            </table> */}
        </div>
    );
};

export default UsersTable;