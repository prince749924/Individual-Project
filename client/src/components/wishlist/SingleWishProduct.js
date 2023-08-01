import React, { Fragment, useEffect, useState } from "react";
import { wishListProducts } from "../../apicalls/wishlist";
import { useNavigate } from "react-router-dom";
import NavSec from "../Partials/Header";

function SingleWishProduct() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const responseData = await wishListProducts();
      if (responseData && responseData.Products) {
        setProducts(responseData.Products);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const removeFromWishList = (id) => {
    let list = localStorage.getItem("wishList")
      ? JSON.parse(localStorage.getItem("wishList"))
      : [];

    if (list.length > 0) {
      if (list.includes(id) === true) {
        list.splice(list.indexOf(id), 1);
        localStorage.setItem("wishList", JSON.stringify(list));
        fetchData();
      }
    }
  };

  return (
    <Fragment>
      <div className="container">
        <h1>Wishlist</h1>
        <div className="grid grid-cols-2 md:grid-cols-1">
          {products.length > 0 ? (
            products.map((product, index) => {
              return (
                <div
                  key={index}
                  className="relative m-2 md:py-6 md:border-t md:border-b md:my-2 md:mx-0 col-span-1 md:flex md:items-center md:justify-between"
                >
                  <img
                    src={product.images[0]}
                    alt="product"
                    className="w-45 h-40 p-3 rounded-md"
                  />
                  <div className="md:w-1/2 md:flex md:items-center">
                    <div className="text-lg md:ml-6 truncate">
                      {product.name}
                    </div>
                  </div>
                  <div className="md:w-1/2 md:flex md:items-center md:justify-around">
                    <div className="font-semibold text-gray-600">
                      {product.price}
                    </div>
                    <div className="md:w-1/2 md:flex md:items-center md:justify-around">
                      <div className="font-semibold text-gray-600">
                        {product.condition}
                      </div>
                    </div>
                    <div
                      style={{ background: "#ABC270" }}
                      key={product._id}
                      onClick={() => navigate(`/product/${product._id}`)}
                      className="inline-block px-4 py-2 text-white text-xs md:text-base text-center cursor-pointer hover:opacity-75"
                    >
                      View
                    </div>
                  </div>
                  <div className="absolute top-0 right-0 mx-2 my-2 md:relative">
                    <svg
                      onClick={(e) => removeFromWishList(product._id)}
                      className="w-6 h-6 cursor-pointer"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="mt-3">
              <img src="./images/wish.png" alt="" style={{ height: "20rem" }} />
              <h1>No product found in wishList</h1>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
}

export default SingleWishProduct;
