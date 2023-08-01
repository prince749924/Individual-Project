import React, { useEffect } from "react";
import { Button, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Divider from "../../MainComponents/Divider";
import { RegisterUser } from "../../apicalls/users";

const rules = [
  {
    required: true,
    message: "required",
  },
];

function Signup() {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const response = await RegisterUser(values);

      if (response.success) {
        navigate("/login");
        message.success(response.message);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="h-screen bg-dark flex justify-center items-center">
      <div className="bg-white p-5 rounded w-[550px]">
        <h1 className="text-primary text-center">
          MarketHub - <span className="text-gray-500 ">Register</span>
        </h1>
        <p className="text-center">
          Register here and sell your product for free.
        </p>
        <Divider />
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Name" name="name" rules={rules}>
            <Input placeholder="Name" />
          </Form.Item>

          <Form.Item label="Address" name="address" rules={rules}>
            <Input placeholder="Address" />
          </Form.Item>

          <Form.Item label="Phone" name="phone" rules={rules}>
            <Input placeholder="Phone" />
          </Form.Item>

          <Form.Item label="Email" name="email" rules={rules}>
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item label="Password" name="password" rules={rules}>
            <Input type="password" placeholder="Password" />
          </Form.Item>

          <Button type="primary" htmlType="submit" block className="mt-2">
            Register
          </Button>
          <div className="mt-5 text-center">
            <span className="text-gray-500">
              Already have an Account?{" "}
              <Link to="/login" className="text-primary">
                Login
              </Link>
            </span>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Signup;
