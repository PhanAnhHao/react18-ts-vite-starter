import {
    Form,
    Input,
    InputNumber,
    Modal,
    notification,
    Select
} from "antd";
const { Option } = Select;

interface IProps {
    access_token: string;
    getData: any;
    isCreateModalOpen: boolean;
    setIsCreateModalOpen: (v: boolean) => void;
}

const CreateUserModal = (props: IProps) => {

    const { access_token, getData, isCreateModalOpen, setIsCreateModalOpen } = props;

    const [form] = Form.useForm();

    const handleCloseModal = () => {
        form.resetFields();
        setIsCreateModalOpen(false);
    };

    const onFinish = async (values: any) => {
        const res = await fetch(
            "http://localhost:8000/api/v1/users",
            {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${access_token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values)
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

    return (
        <Modal
            title="Add new user"
            open={isCreateModalOpen}
            onOk={() => form.submit()}
            onCancel={() => handleCloseModal()}
            maskClosable={false}
        >
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
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
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
        </Modal>
    );
};

export default CreateUserModal;