import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetLoader } from "../../redux/loaderSlice";
import Divider from "../../MainComponents/Divider";
import { Button, message } from "antd";
import { GetAllBids, GetProductById } from "../../apicalls/products";
import { useParams } from "react-router-dom";
import moment from "moment";
import BidModal from "./BidModal";
import { isWishReq, isWish, unWishReq } from "../wishlist/Mixins";
import NavSec from "../Partials/Header";

function ProductInfo() {
  const { user } = useSelector((state) => state.users);
  const [showAddNewBid, setShowAddNewBid] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [product, setProduct] = useState(null);

  const { id } = useParams();
  const dispatch = useDispatch();

  const [wList, setWlist] = useState(
    JSON.parse(localStorage.getItem("wishList"))
  );

  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetProductById(id);
      dispatch(SetLoader(false));

      if (response.success) {
        const bidsResponse = await GetAllBids({ product: id });
        setProduct({
          ...response.data,
          bids: bidsResponse.data,
        });
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, [id]);

  const handleImageClick = (index) => {
    setSelectedImageIndex(index);
  };

  // const handleToggleBidModal = () => {
  //   setShowAddNewBid((prevShowAddNewBid) => !prevShowAddNewBid);
  // };

  if (!product) {
    // Render a loading spinner or placeholder while the product data is being fetched
    return <div>Loading...</div>;
  }

  return (
    <>
      <NavSec />
      <div className="container mt-5">
        <div className="row">
          {/* Image Section */}
          <div className="col-md-6">
            <img
              src={product.images[selectedImageIndex]}
              alt=""
              className="w-full h-80 rounded"
            />
            <div className="flex gap-3 mt-2">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  className={`w-20 h-20 object-cover rounded-md cursor-pointer ${
                    selectedImageIndex === index
                      ? "border-2 border-red-700 border-dashed p-2"
                      : ""
                  }`}
                  onClick={() => handleImageClick(index)}
                  src={image}
                  alt=""
                />
              ))}
            </div>
            <Divider />

            {/* Seller Details */}
            <div className="container border border-dark rounded mb-5">
              <h3 className=" flex font-bold text-red-500 mt-1">
                Seller Details
              </h3>
              <div className="flex justify-between mt-2">
                <span>Full Name</span>
                <span className="uppercase">{product.seller.name}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span>Email</span>
                <span>{product.seller.email}</span>
              </div>
              <div className="flex justify-between mt-2 mb-2">
                <span>Contact</span>
                <span>{product.seller.phone}</span>
              </div>
            </div>
          </div>

          {/* All product Details */}
          <div className="col-md-6">
            <div className="flex justify-between mt-2">
              <h1 className="flex text-2xl font-semibold text-orange-900 pb-3">
                {product.name}
              </h1>
              {/* wishlist work */}
              <span>
                <svg
                  onClick={(e) => isWishReq(e, product._id, setWlist)}
                  className={`${
                    isWish(product._id, wList) && "hidden"
                  } w-5 h-5 md:w-6 md:h-6 cursor-pointer text-yellow-700`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                <svg
                  onClick={(e) => unWishReq(e, product._id, setWlist)}
                  className={`${
                    !isWish(product._id, wList) && "hidden"
                  } w-5 h-5 md:w-6 md:h-6 cursor-pointer text-yellow-700`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </div>
            <span className="flex">{product.description}</span>
            <Divider />
            <div className="flex flex-col">
              <h1 className="flex text-2xl font-semibold text-orange-900 pb-1">
                Product Details
              </h1>
              <div className="flex justify-between mt-2">
                <span>Price</span>
                <span>NRP. {product.price}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span>Category</span>
                <span className="uppercase">{product.category}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span>Condition</span>
                <span className="uppercase font-semibold">
                  {product.condition}
                </span>
              </div>
              <div className="flex justify-between mt-2">
                <span>Bill Available</span>
                <span>{product.billAvailable ? "Yes" : "No"}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span>Box Available</span>
                <span>{product.boxAvailable ? "Yes" : "No"}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span>Warranty Available</span>
                <span>{product.warrantyAvailable ? "Yes" : "No"}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span>Accessories Available</span>
                <span>{product.accessoriesAvailable ? "Yes" : "No"}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span>Negotiable</span>
                <span>{product.negotiable ? "Yes" : "No"}</span>
              </div>
              {/* Product Add time section */}
              <div className="flex justify-between mt-2">
                <span> Added On</span>
                <span className="text-gray-600">
                  {moment(product.createdAt).format("MMM D, YYYY ")}
                </span>
              </div>
            </div>
            <Divider />
            {/* Bid Section */}
            <div className="flex flex-col mt-3 mb-2">
              <div className="flex justify-between">
                <h1 className="text-2xl font-semibold text-orange-900">
                  Message
                </h1>
                <Button onClick={() => setShowAddNewBid(!showAddNewBid)}>
                  Contact
                </Button>
              </div>
            </div>

            <div className="flex flex-col mt-3 mb-2">
              <div className="container rounded shadow-md border border-dark">
                <h5 className="text-danger flex">
                  Place Bid for this Product.
                </h5>
              </div>
            </div>
          </div>
        </div>

        {showAddNewBid && (
          <BidModal
            product={product}
            reloadData={getData}
            showBidModal={showAddNewBid}
            setShowBidModal={setShowAddNewBid}
          />
        )}
      </div>
    </>
  );
}

export default ProductInfo;
