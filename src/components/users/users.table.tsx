import { useEffect, useState } from 'react';
// import '../../styles/users.css';
import { Space, Table, Tag, Button, Modal, Input } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { PlusOutlined } from '@ant-design/icons';

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

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [address, setAddress] = useState("");
    const [role, setRole] = useState("");

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
                // console.log({ value, record, index });
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
    ];

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        const data = {
            name, email, password, age, gender, address, role
        };
        console.log({ data });
        // setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                margin: "4px 16px"
            }}>
                <h2>Table Users</h2>
                <Button
                    type="primary"
                    onClick={showModal}
                    icon={<PlusOutlined />}>
                    Add new
                </Button>
            </div>
            <Table
                columns={columns}
                dataSource={listUsers}
                rowKey={"_id"}
            />
            <Modal
                title="Add new user"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                maskClosable={false}
            >
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 16
                }}>
                    <Input
                        placeholder="Name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
                    <Input
                        placeholder="Email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                    <Input
                        placeholder="Password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    <Input
                        placeholder="Age"
                        value={age}
                        onChange={(event) => setAge(event.target.value)}
                    />
                    <Input
                        placeholder="Gender"
                        value={gender}
                        onChange={(event) => setGender(event.target.value)}
                    />
                    <Input
                        placeholder="Address"
                        value={address}
                        onChange={(event) => setAddress(event.target.value)}
                    />
                    <Input
                        placeholder="Role"
                        value={role}
                        onChange={(event) => setRole(event.target.value)}
                    />
                </div>


            </Modal>
        </div>
    );
};

export default UsersTable;