import React, { useEffect } from "react";
import { message, Table } from "antd";
import { useDispatch } from "react-redux";
import { GetProducts, UpdateProductStatus } from "../../apicalls/products";
import { SetLoader } from "../../redux/loaderSlice";
import moment from "moment";
 
function Products() {
  const [products, setProducts] = React.useState([]);
 
  const dispatch = useDispatch();

  // Fetching Data............................
  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetProducts(); // Remove the 'null' parameter
      dispatch(SetLoader(false));
      if (response.success) {
        setProducts(response.data);
      }
    } catch (error) {
      dispatch(SetLoader(false));
    }
  };
  // Fetching Section Ends........................

  const onStatusUpdate = async (id, status) => {
    try {
      dispatch(SetLoader(true));
      const response = await UpdateProductStatus(id, status);
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
      title: "Product",
      dataIndex: "name",
    },
    {
      title: "Seller",
      dataIndex: "seller",
      render: (text, record) => {
        return record.seller.name;
      },
    },
    {
      title: "Product",
      dataIndex: "image",
      render: (text, record) => {
        return (
          <img
            src={record?.images?.length > 0 ? record.images[0] : ""}
            alt=""
            className="w-20 h-20 object-cover rounded-md"
          />
        );
      },
    },
    {
      title: "Description",
      dataIndex: "description",
    },
    {
      title: "Category",
      dataIndex: "category",
    },

    {
      title: "Status",
      dataIndex: "status",
      render: (text, record) => {
        return record.status.toUpperCase();
      },
    },
    {
      title: "Added On",
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
            {status === "pending" && (
              <span
                className="underline cursor-pointer"
                style={{ color: "green" }}
                onClick={() => {
                  onStatusUpdate(_id, "approved");
                }}
              >
                Approved
              </span>
            )}
            {status === "pending" && (
              <span
                className="underline cursor-pointer"
                style={{ color: "red" }}
                onClick={() => {
                  onStatusUpdate(_id, "rejected");
                }}
              >
                Reject
              </span>
            )}

            {status === "approved" && (
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
                onClick={() => {
                  onStatusUpdate(_id, "approved"); // Corrected to "approved" instead of "blocked"
                }}
              >
                Unblock
              </span>
            )}
            {status === "rejected" && (
              <span
                className="underline cursor-pointer"
                style={{ color: "green" }}
                onClick={() => {
                  onStatusUpdate(_id, "approved"); // Corrected to "approved" instead of "blocked"
                }}
              >
                Approved
              </span>
            )}
          </div>
        );
      },
    },
  ];
  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div>
      <Table columns={columns} dataSource={products} />
    </div>
  );
}

export default Products;
