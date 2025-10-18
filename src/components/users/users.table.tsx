import { useEffect } from 'react';
import '../../styles/users.css';

const UsersTable = () => {

    // update
    useEffect(() => {
        // viết api trong hàm useEffect, bởi vì hàm useEffect, chạy sau khi component đc mounting/render/cây DOM đã sẵn sàng rồi
        console.log(">>> check useEffect");
        getData();
    }, []);  //tất cả những logic nào muốn update cho component thì viết trong useEffect

    const getData = async () => {
        const res = await fetch(
            "http://localhost:8000/api/v1/auth/login",
            {
                method: "POST",
                body: JSON.stringify({
                    username: "",
                    password: ""
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            }); // method mặc định của fetch là GET
        const data = await res.json();

        const access_token = ""

        console.log(">>> Check data: ", data);

        const res1 = await fetch(
            "http://localhost:8000/api/v1/users/all",
            {
                headers: {
                    'Authorization': `Bearer ${access_token}`,
                    "Content-Type": "application/json",
                },
            });

        const data1 = await res1.json();
        console.log(">>> Check data1: ", data1);
    }

    console.log(">>> check render"); //mounting

    return (
        <div>
            <h2>HTML Table</h2>

            <table>
                <tr>
                    <th>Company</th>
                    <th>Contact</th>
                    <th>Country</th>
                </tr>
                <tr>
                    <td>Alfreds Futterkiste</td>
                    <td>Maria Anders</td>
                    <td>Germany</td>
                </tr>
                <tr>
                    <td>Centro comercial Moctezuma</td>
                    <td>Francisco Chang</td>
                    <td>Mexico</td>
                </tr>
                <tr>
                    <td>Ernst Handel</td>
                    <td>Roland Mendel</td>
                    <td>Austria</td>
                </tr>
                <tr>
                    <td>Island Trading</td>
                    <td>Helen Bennett</td>
                    <td>UK</td>
                </tr>
                <tr>
                    <td>Laughing Bacchus Winecellars</td>
                    <td>Yoshi Tannamuri</td>
                    <td>Canada</td>
                </tr>
                <tr>
                    <td>Magazzini Alimentari Riuniti</td>
                    <td>Giovanni Rovelli</td>
                    <td>Italy</td>
                </tr>
            </table>
        </div>
    );
};

export default UsersTable;