import { Input, Modal, notification } from "antd";
import { useState } from "react";

interface IProps {
    access_token: string;
    getData: any;
    isCreateModalOpen: boolean;
    setIsCreateModalOpen: (v: boolean) => void;
}

const CreateUserModal = (props: IProps) => {

    const { access_token, getData, isCreateModalOpen, setIsCreateModalOpen } = props;

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [address, setAddress] = useState("");
    const [role, setRole] = useState("");

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
        setIsCreateModalOpen(false);
        setName("");
        setEmail("");
        setPassword("");
        setAge("");
        setGender("");
        setAddress("");
        setRole("");
    };

    return (
        <Modal
            title="Add new user"
            open={isCreateModalOpen}
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
    );
};

export default CreateUserModal;