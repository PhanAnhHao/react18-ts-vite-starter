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
    const [meta, setMeta] = useState({
        current: 1,
        pageSize: 3,
        pages: 0,
        total: 0
    });

    const access_token = localStorage.getItem("access_token") as string; // "as string" - ép kiểu dữ liệu

    useEffect(() => {
        getData();
    }, []);

    // hàm getData có keyword async nên hiểu nó là 1 cái promise
    const getData = async () => {

        const res = await fetch(
            `http://localhost:8000/api/v1/users?current=${meta.current}&pageSize=${meta.pageSize}`,
            {
                headers: {
                    'Authorization': `Bearer ${access_token}`,
                    "Content-Type": "application/json",
                },
            });

        const d = await res.json();
        if (!d?.data) {
            notification.error({
                message: JSON.stringify(d.message)
            });
            return;
        }
        setListUsers(d.data.result);
        setMeta({
            current: d.data.meta.current,
            pageSize: d.data.meta.pageSize,
            pages: d.data.meta.pages,
            total: d.data.meta.total
        });

    };

    const confirm = async (user: IUser) => {
        const res = await fetch(
            `http://localhost:8000/api/v1/users/${user._id}`,
            {
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${access_token}`,
                    "Content-Type": "application/json",
                },
            });
        const d = await res.json();
        if (d.data) {
            message.success('Xoá thành công');
            await getData();
        } else {
            message.error("Lỗi");
        }
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
                            onConfirm={() => confirm(record)}
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

    const handleOnChange = async (page: number, pageSize: number) => {
        const res = await fetch(
            `http://localhost:8000/api/v1/users?current=${page}&pageSize=${pageSize}`,
            {
                headers: {
                    'Authorization': `Bearer ${access_token}`,
                    "Content-Type": "application/json",
                },
            });

        const d = await res.json();
        if (!d?.data) {
            notification.error({
                message: JSON.stringify(d.message)
            });
            return;
        }
        setListUsers(d.data.result);
        setMeta({
            current: d.data.meta.current,
            pageSize: d.data.meta.pageSize,
            pages: d.data.meta.pages,
            total: d.data.meta.total
        });
    };

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
                pagination={{
                    current: meta.current,
                    pageSize: meta.pageSize,
                    total: meta.total,
                    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                    onChange: (page: number, pageSize: number) => handleOnChange(page, pageSize),
                    showSizeChanger: true
                }}
                loading={!listUsers || listUsers.length === 0 ? true : false}
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