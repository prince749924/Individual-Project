import React, { useEffect } from "react";
import { message, Table } from "antd";
import { useDispatch } from "react-redux";

import { SetLoader } from "../../redux/loaderSlice";
import moment from "moment";
import { GetAllUsers, UpdateUserStatus } from "../../apicalls/users";

function Users() {
  const [users, setUsers] = React.useState([]);

  const dispatch = useDispatch();

  // Fetching Data............................
  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetAllUsers(null); // Remove the 'null' parameter
      dispatch(SetLoader(false));
      if (response.success) {
        setUsers(response.data);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };
  // Fetching Section Ends........................

  // User Status Update
  const onStatusUpdate = async (id, status) => {
    try {
      dispatch(SetLoader(true));
      const response = await UpdateUserStatus(id, status);
      dispatch(SetLoader(false));
      if (response.success) {
        message.success(response.message);
        getData();
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  // Assigning Tables......................
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },

    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Address",
      dataIndex: "address",
    },

    {
      title: "Status",
      dataIndex: "status",
      render: (text, record) => {
        return record.status.toUpperCase();
      },
    },
    {
      title: "Role",
      dataIndex: "role",
      render: (text, record) => {
        return record.role.toUpperCase();
      },
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (createdAt) => moment(createdAt).format("DD-MM-YYYY hh:mm A"),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        const { status, _id } = record;
        return (
          <div className="flex gap-3">
            {status === "active" && (
              <span
                className="underline cursor-pointer"
                style={{ color: "red" }}
                onClick={() => {
                  onStatusUpdate(_id, "blocked");
                }}
              >
                Block
              </span>
            )}
            {status === "blocked" && (
              <span
                className="underline cursor-pointer"
                style={{ color: "green" }}
                onClick={() => {
                  onStatusUpdate(_id, "active");
                }}
              >
                Unblock
              </span>
            )}
          </div>
        );
      },
    },
  ];
  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Table columns={columns} dataSource={users} />
    </div>
  );
}

export default Users;
