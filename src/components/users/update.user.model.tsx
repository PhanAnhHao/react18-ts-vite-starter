import { Input, Modal, notification } from "antd";
import { useState, useEffect } from "react";
import { IUser } from "./users.table";

interface IProps {
    access_token: string;
    getData: any;
    isUpdateModalOpen: boolean;
    setIsUpdateModalOpen: (v: boolean) => void;
    dataUpdate: null | IUser;
    setDataUpdate: (v: null | IUser) => void;
}

const UpdateUserModal = (props: IProps) => {

    const {
        access_token,
        getData,
        isUpdateModalOpen, setIsUpdateModalOpen,
        dataUpdate, setDataUpdate
    } = props;

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [address, setAddress] = useState("");
    const [role, setRole] = useState("");

    useEffect(() => {
        if (dataUpdate) {
            setName(dataUpdate.name);
            setEmail(dataUpdate.email);
            setPassword(dataUpdate.password);
            setAge(dataUpdate.age);
            setGender(dataUpdate.gender);
            setAddress(dataUpdate.address);
            setRole(dataUpdate.role);
        }
    }, [dataUpdate]);

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
    };

    const handleCloseModal = () => {
        setIsUpdateModalOpen(false);
        setDataUpdate(null);
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
            title="Update a user"
            open={isUpdateModalOpen}
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
                    disabled
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

export default UpdateUserModal;