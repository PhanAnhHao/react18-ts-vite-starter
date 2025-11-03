import { useEffect, useState } from 'react';
// import '../../styles/users.css';
import { Table, Tag, Button, notification, message, Popconfirm } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { PlusOutlined } from '@ant-design/icons';
import CreateUserModal from './create.user.model';
import UpdateUserModal from './update.user.model';

export interface IUser {
    _id: string;
    email: string;
    name: string;
    address: string;
    role: string;
    isVerify: boolean;
    gender: string;
    password: string;
    age: string;
};

const UsersTable = () => {

    const [listUsers, setListUsers] = useState([]);

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

    const [dataUpdate, setDataUpdate] = useState<null | IUser>(null);

    const access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0b2tlbiBsb2dpbiIsImlzcyI6ImZyb20gc2VydmVyIiwiX2lkIjoiNjhmMjQ0MTNjN2FlNzEwODlmNjRmY2RhIiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJhZGRyZXNzIjoiVmlldE5hbSIsImlzVmVyaWZ5Ijp0cnVlLCJuYW1lIjoiSSdtIGFkbWluIiwidHlwZSI6IlNZU1RFTSIsInJvbGUiOiJBRE1JTiIsImdlbmRlciI6Ik1BTEUiLCJhZ2UiOjY5LCJpYXQiOjE3NjIxNTEzNDQsImV4cCI6MTg0ODU1MTM0NH0.AyBt3cIBspfpwyYniqJnRowxXy7SBeVjLCnZzikSIc8";

    useEffect(() => {
        getData();
    }, []);

    // hàm getData có keyword async nên hiểu nó là 1 cái promise
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
            notification.error({
                message: JSON.stringify(d.message)
            });
            setListUsers([]);
        }

    };

    const confirm = () => {
        message.success('Click on Yes');
    };

    const columns: ColumnsType<IUser> = [
        {
            title: 'Email',
            dataIndex: 'email',
            render(record) {
                return (
                    <a href="">{record}</a>
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
        {
            title: "Actions",
            render(record) {
                return (
                    <div>
                        <Button
                            style={{
                                backgroundColor: "yellow",
                                marginRight: 8,
                            }}
                            onClick={() => {
                                setDataUpdate(record);
                                setIsUpdateModalOpen(true);
                            }}
                        >
                            Update
                        </Button>
                        <Popconfirm
                            title="Delete this user"
                            description={`Are you sure to delete "${record.name}"?`}
                            onConfirm={confirm}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button
                                style={{
                                    backgroundColor: "red",
                                    color: "#fff"
                                }}
                            >
                                Delete
                            </Button>
                        </Popconfirm>
                    </div>
                )
            },
        },
    ];

    return (
        <div style={{
            margin: "0 20px"
        }}>
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                margin: "4px 16px"
            }}>
                <h2>Table Users</h2>
                <Button
                    type="primary"
                    onClick={() => setIsCreateModalOpen(true)}
                    icon={<PlusOutlined />}>
                    Add new
                </Button>
            </div>
            <Table
                columns={columns}
                dataSource={listUsers}
                rowKey={"_id"}
            />
            <CreateUserModal
                access_token={access_token}
                getData={getData}
                isCreateModalOpen={isCreateModalOpen}
                setIsCreateModalOpen={setIsCreateModalOpen}
            />
            <UpdateUserModal
                access_token={access_token}
                getData={getData}
                isUpdateModalOpen={isUpdateModalOpen}
                setIsUpdateModalOpen={setIsUpdateModalOpen}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
            />

        </div>
    );
};

export default UsersTable;