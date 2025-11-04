import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  Link
} from "react-router-dom";
import UsersPage from './screens/users.page.tsx';
// import './index.css';
import { HomeOutlined, SolutionOutlined, TeamOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import TodoPage from './todo/todos.tsx';
import { Footer } from 'antd/es/layout/layout';
// import './App.scss';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    label: <Link to={"/"}>Home</Link>,
    key: 'home',
    icon: <HomeOutlined />,
  },
  {
    label: <Link to="/users">Manage Users</Link>,
    key: 'users',
    icon: <TeamOutlined />,
  },
  {
    label: <Link to="/todo">Todo</Link>,
    key: 'todo',
    icon: <SolutionOutlined />,
  },
];

const Header = () => {
  const [current, setCurrent] = useState('home');

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
  };

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
};

const LayoutAdmin = () => {

  const getData = async () => {

    const res = await fetch(
      "http://localhost:8000/api/v1/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "admin@gmail.com",
          password: "123456",
        })
      });

    const d = await res.json();
    if (d?.data) {
      localStorage.setItem("access_token", d?.data?.access_token);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Header />
      <br />
      <Outlet />
      <Footer style={{ textAlign: 'center' }}>
        Made in 2025 by PhAHao aka ChillFeel
      </Footer>
    </div>
  )
};

const router = createBrowserRouter([
  {
    path: "/",
    // element: <App />,
    element: <LayoutAdmin />,
    children: [
      { index: true, element: <App /> },
      {
        path: "users",
        element: <UsersPage />,
      },
      {
        path: "todo",
        element: <TodoPage />,
      },
    ]
  },
  {
    path: "/tracks",
    element: <div>manage tracks</div>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </React.StrictMode>,
)
