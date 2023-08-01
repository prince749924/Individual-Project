import React from "react";
import { Tabs } from "antd";
import Products from "./Products";
import Users from "./Users";
import { useNavigate } from "react-router-dom";

function Admin() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <div className="flex justify-between items-center bg-blue-300 p-3 sticky-top">
        <h1 className="text-2xl cursor-pointer text-black text-center">
          Welcome to admin Dashboard
        </h1>

        <div className="bg-white py-2 px-5 rounded flex gap-1 items-center">
          <i
            className="bi bi-box-arrow-right cursor-pointer ms-3 text-red-500"
            onClick={handleLogout}
          >
            Logout
          </i>
        </div>
      </div>

      <div className="container mt-5">
        <Tabs>
          <Tabs.TabPane tab="Products Request" key="1">
            <Products />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Users" key="2">
            <Users />
          </Tabs.TabPane>
        </Tabs>
      </div>
    </>
  );
}

export default Admin;
