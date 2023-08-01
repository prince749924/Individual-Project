import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Form, Input, message } from "antd";

import { SetLoader } from "../../redux/loaderSlice";
import { PlaceNewBid } from "../../apicalls/products";
import { AddNotification } from "../../apicalls/notifications";
// import { AddNotification } from "../../apicalls/notifications";

function BidModal({ showBidModal, setShowBidModal, product, reloadData }) {
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const formRef = React.useRef(null);
  const rules = [{ required: true, message: "Required" }];

  const onFinish = async (values) => {
    try {
      dispatch(SetLoader(true));
      const response = await PlaceNewBid({
        ...values,
        product: product._id,
        seller: product.seller._id,
        buyer: user._id,
      });
      dispatch(SetLoader(false));

      if (response.success) {
        message.success("Bid added successfully");
        // Send Notification to seller
        await AddNotification({
          title: "Hey, new bid has been placed",
          message: `Hey, new bid has been placed on your product ${product.name} by ${user.name} for ₹. ${values.bidAmount}`,
          user: product.seller._id,
          onClick: "/profile",
          // this line would be reason
          read: false,
        });

        reloadData();
        setShowBidModal(false);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
      dispatch(SetLoader(false));
    }
  };

  const handleCancel = () => {
    setShowBidModal(false);
  };

  const handleOk = () => {
    formRef.current.submit();
  };

  return (
    <Modal
      onCancel={handleCancel}
      visible={showBidModal}
      centered
      width={600}
      onOk={handleOk}
    >
      <div className="flex flex-col gap-5 mb-5">
        <h1 className="text-2xl font-semibold text-orange-900 text-center">
          Message Now
        </h1>
        <Form layout="vertical" ref={formRef} onFinish={onFinish}>
          <Form.Item label="Bid Amount" name="bidAmount" rules={rules}>
            <Input />
          </Form.Item>

          <Form.Item label="Message" name="message" rules={rules}>
            <Input.TextArea />
          </Form.Item>

          <Form.Item label="Mobile" name="mobile" rules={rules}>
            <Input type="number" />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
}

export default BidModal;
