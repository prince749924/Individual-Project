import React, { useEffect } from "react";
import { Table, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { SetLoader } from "../../../redux/loaderSlice";
import { GetAllBids } from "../../../apicalls/products"; // Import the getAllBids function
import moment from "moment";

function UserBids() {
  const [bidsData, setBidsData] = React.useState([]);
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch(); // Declare the dispatch function

  // Fetching Bids Data
  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetAllBids({ buyer: user._id });
      dispatch(SetLoader(false));
      if (response.success) {
        setBidsData(response.data);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  // Creating Table
  const columns = [
    {
      title: "Product",
      dataIndex: "product",
      render: (text, record) => {
        return record.product.name;
      },
    },
    {
      title: " Seller Name",
      dataIndex: "name",
      render: (text, record) => {
        return record.seller.name;
      },
    },
    {
      title: "Original Price",
      dataIndex: "originalPrice", // Corrected dataIndex to 'originalPrice'
      render: (text, record) => {
        return record.product.price;
      },
    },
    {
      title: "Bid Amount",
      dataIndex: "bidAmount",
    },
    {
      title: "Bid Date",
      dataIndex: "createdAt",
      render: (text, record) =>
        moment(record.createdAt).format("DD-MM-YYYY hh:mm a"),
    },
    {
      title: "Message",
      dataIndex: "message",
    },
    {
      title: "Contact Details",
      dataIndex: "contactDetails",
      render: (text, record) => {
        return (
          <div>
            <p>Phone: {record.mobile}</p>
            <p>Email: {record.buyer.email}</p>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="flex flex-col gap-3">
      <Table columns={columns} dataSource={bidsData} />
    </div>
  );
}

export default UserBids;
