import { useEffect, useState } from 'react';
// import '../../styles/users.css';
import { Table, Tag, Button, Modal, Input, notification } from 'antd';
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

    const access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0b2tlbiBsb2dpbiIsImlzcyI6ImZyb20gc2VydmVyIiwiX2lkIjoiNjhmMjQ0MTNjN2FlNzEwODlmNjRmY2RhIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJhZGRyZXNzIjoiVmlldE5hbSIsImlzVmVyaWZ5Ijp0cnVlLCJuYW1lIjoiSSdtIGFkbWluIiwidHlwZSI6IlNZU1RFTSIsInJvbGUiOiJBRE1JTiIsImdlbmRlciI6Ik1BTEUiLCJhZ2UiOjY5LCJpYXQiOjE3NjIxNTEzNDQsImV4cCI6MTg0ODU1MTM0NH0.AyBt3cIBspfpwyYniqJnRowxXy7SBeVjLCnZzikSIc8";

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {

        const res = await fetch(
            "http://localhost:8000/api/v1/users/all",
            {
                headers: {
                    'Authorization': `Bearer ${access_token}`,
                    "Content-Type": "application/json",
                },
            });

        const d = await res.json();
        if (d && d?.data) {
            setListUsers(d.data.result);
        } else {
            setListUsers([]);
        }

    }

    const columns: ColumnsType<IUser> = [
        {
            title: 'Email',
            dataIndex: 'email',
            render(record) {
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

    const handleOk = async () => {
        const data = {
            name, email, password, age, gender, address, role
        };
        const res = await fetch(
            "http://localhost:8000/api/v1/users",
            {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${access_token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...data })
            });

        const d = await res.json();
        if (d?.data) {
            // success
            await getData();
            notification.success({
                message: "Tạo mới thành công",
            });
            handleCloseModal();
        } else {
            d.message.map((errorMessage: any) => {
                notification.error({
                    message: "Có lỗi xảy ra",
                    description: JSON.stringify(errorMessage)
                });
            });
        }
    };

    const handleCloseModal = () => {
        setName("");
        setEmail("");
        setPassword("");
        setAge("");
        setGender("");
        setAddress("");
        setRole("");
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
                    onClick={() => setIsModalOpen(true)}
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
                onCancel={() => handleCloseModal()}
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