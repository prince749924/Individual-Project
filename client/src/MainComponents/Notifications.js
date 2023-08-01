import { Modal, message } from "antd";
import moment from "moment";
import React from "react";
import { useNavigate } from "react-router-dom";
import { DeleteNotification } from "../apicalls/notifications";
import { SetLoader } from "../redux/loaderSlice";
import { useDispatch } from "react-redux";

function Notifications({
  notifications = [],
  reloadNotifications,
  showNotifications,
  setShowNotifications,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const deleteNotification = async (id) => {
    try {
      dispatch(SetLoader(true));
      const response = await DeleteNotification(id);
      dispatch(SetLoader(false));
      if (response.success) {
        message.success(response.message);
        reloadNotifications();
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.messsage);
    }
  };
  return (
    <Modal
      title="Notifications"
      open={showNotifications}
      onCancel={() => setShowNotifications(false)}
      centered
      width={1000}
      footer={null}
    >
      <div className="flex flex-col gap-2">
        {notifications.map((notification) => (
          <div
            className="flex flex-col   border border-solid p-2 border-gray-500 rounded cursor-pointer"
            key={notification._id}
          >
            <div className="flex justify-between items-center">
              <div
                onClick={() => {
                  navigate(notification.onClick);
                  setShowNotifications(false);
                }}
              >
                <h5 className="text-green-800">{notification.title}</h5>

                <span className="text-black">{notification.message}</span>
                <h1 className="text-gray-500 text-sm">
                  {moment(notification.createdAt).fromNow()}
                </h1>
              </div>
              <i
                class="bi bi-archive-fill cursor-pointer"
                style={{ color: "red" }}
                onClick={() => {
                  deleteNotification(notification._id);
                }}
              ></i>
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
}

export default Notifications;
