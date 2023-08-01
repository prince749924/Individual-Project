import React, { useEffect } from "react";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { GetCurrentUser } from "../apicalls/users";
import { useDispatch } from "react-redux";

import { SetUser } from "../redux/userSlice";

function ProtectedPage({ children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateToken = async () => {
    try {
      const response = await GetCurrentUser();

      if (response.success) {
        dispatch(SetUser(response.data));
      } else {
        navigate("/login");
        message.error(response.message);
      }
    } catch (error) {
      navigate("/login");
      message.error(error.message);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      validateToken();
    } else {
      navigate("/login", { replace: true });
    }
  }, []);

  return (
    <div>
      <div>{children}</div>
    </div>
  );
}

export default ProtectedPage;
