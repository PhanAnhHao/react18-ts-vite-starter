import { Form, Input, InputNumber, Modal, notification, Select } from "antd";
import { useEffect } from "react";
import { IUser } from "./users.table";

const { Option } = Select;

interface IProps {
    access_token: string;
    getData: any;
    isUpdateModalOpen: boolean;
    setIsUpdateModalOpen: (v: boolean) => void;
    dataUpdate: null | IUser;
    setDataUpdate: (v: null | IUser) => void;
}

const UpdateUserModal = (props: IProps) => {

    const [form] = Form.useForm();

    const {
        access_token,
        getData,
        isUpdateModalOpen, setIsUpdateModalOpen,
        dataUpdate, setDataUpdate
    } = props;

    useEffect(() => {
        if (dataUpdate) {
            form.setFieldsValue({
                name: dataUpdate.name,
                email: dataUpdate.email,
                age: dataUpdate.age,
                gender: dataUpdate.gender,
                address: dataUpdate.address,
                role: dataUpdate.role,
            });
        }
    }, [dataUpdate]);

    const onFinish = async (values: any) => {
        if (dataUpdate) {
            const data = {
                _id: dataUpdate._id,
                ...values
            };
            const res = await fetch(
                "http://localhost:8000/api/v1/users",
                {
                    method: "PATCH",
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
                    message: "Cập nhật thành công",
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
        }
    };

    const handleCloseModal = () => {
        setIsUpdateModalOpen(false);
        form.resetFields();
        setDataUpdate(null);
    };

    return (
        <Modal
            title="Update a user"
            open={isUpdateModalOpen}
            onOk={() => form.submit()}
            onCancel={() => handleCloseModal()}
            maskClosable={false}
        >
            <div style={{
                display: "flex",
                flexDirection: "column",
                gap: 16
            }}>
                <Form
                    name="basic"
                    onFinish={onFinish}
                    layout="vertical"
                    form={form}
                >

                    <Form.Item
                        style={{ marginBottom: 5 }}
                        label="Name"
                        name="name"
                        rules={[{ required: true, message: 'Please input your name!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        style={{ marginBottom: 5 }}
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!', type: "email" }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item style={{ marginBottom: 5 }}
                        label="Password"
                        name="password"
                        rules={[{ required: dataUpdate ? false : true, message: 'Please input your password!' }]}
                    >
                        <Input.Password disabled={dataUpdate ? true : false} />
                    </Form.Item>

                    <Form.Item style={{ marginBottom: 5 }}
                        label="Age"
                        name="age"
                        rules={[
                            {
                                required: true,
                                type: 'number',
                                min: 0,
                                max: 100,
                                message: 'Please input age between 0 and 100!',
                            }
                        ]}
                    >
                        <InputNumber style={{ width: "100%" }} />
                    </Form.Item>

                    <Form.Item style={{ marginBottom: 5 }} name="gender" label="Gender" rules={[{ required: true }]}>
                        <Select
                            placeholder="Select a option and change input text above"
                            // onChange={onGenderChange}
                            allowClear
                        >
                            <Option value="MALE">MALE</Option>
                            <Option value="FEMALE">FEMALE</Option>
                            <Option value="OTHER">OTHER</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item style={{ marginBottom: 5 }}
                        label="Address"
                        name="address"
                        rules={[{ required: true, message: 'Please input your address!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item style={{ marginBottom: 5 }} name="role" label="Role" rules={[{ required: true }]}>
                        <Select
                            placeholder="Select a option and change input text above"
                            // onChange={onGenderChange}
                            allowClear
                        >
                            <Option value="ADMIN">ADMIN</Option>
                            <Option value="USER">USER</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </div>
        </Modal>
    );
};

export default UpdateUserModal;