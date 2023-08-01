import React, { useEffect } from "react";
import { Modal, Table, message } from "antd";
import { useDispatch } from "react-redux";
import { SetLoader } from "../../../redux/loaderSlice";
import { GetAllBids } from "../../../apicalls/products"; // Import the getAllBids function
import moment from "moment";
import Divider from "../../../MainComponents/Divider";

function Bids({ showBidsModal, setShowBidsModal, selectedProduct }) {
  const [bidsData, setBidsData] = React.useState([]);
  const dispatch = useDispatch(); // Declare the dispatch function

  const handleCancel = () => {
    setShowBidsModal(false);
  };

  // Fetching Bids Data
  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetAllBids({ product: selectedProduct._id });
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
      title: "Bids Placed Date",
      dataIndex: "createdAt",
      render: (text, record) => {
        return moment(text).format("DD-MM-YYY hh:mm a");
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => {
        return record.buyer.name;
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
  }, [selectedProduct]);

  return (
    <Modal
      title="Bids"
      visible={showBidsModal}
      onCancel={handleCancel}
      centered
      width={1200}
      footer={null}
    >
      {/* content of the modal */}
      <Divider />
      <div className="flex flex-col gap-3">
        <h2 className="text-xl text-gray-500">
          {" "}
          {/* Corrected className */}
          Product Name: {selectedProduct.name}
        </h2>
        <Table columns={columns} dataSource={bidsData} />
      </div>
    </Modal>
  );
}

export default Bids;
