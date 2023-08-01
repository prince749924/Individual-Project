import React from "react";
import { useSelector } from "react-redux";
function ProfileInfo() {
  const { user } = useSelector((state) => state.users);
  return (
    <>
      <div className="container border border-dark rounded bg-green-200">
        <div className="row">
          <div className="col-md-4">
            <h1 className="  flex">
              Hi, <span className="text-danger ">{user.name}</span>
            </h1>

            <h3 className="mt-2 text-success mb-2 flex">
              {" "}
              Here are your Profile details...{" "}
            </h3>
            <h4 className="  flex">Email: {user.email}</h4>
            <h4 className="  flex">Address: {user.address}</h4>
            <h4 className="  flex">Phone: {user.phone}</h4>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileInfo;
