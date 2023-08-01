import React from "react";

function Banner() {
  return (
    <div className="container contback mt-5 rounded ">
      <div className="row">
        <div className="col-md-6">
          <h2 className="mt-3 text-light">Multi-vendor Ecommerce Platform</h2>
          <h3 className="text-light mt-3">
            Buy and Sell your products without any charges
          </h3>
        </div>
        <div className="col-md-6">
          <img
            src="./images/multi.png"
            style={{ width: "20rem" }}
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default Banner;
