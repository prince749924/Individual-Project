import React, { useEffect, useState } from "react";
import "./prodct.css";
import { message } from "antd";
import { SetLoader } from "../../redux/loaderSlice";
import { GetProducts } from "../../apicalls/products";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Filters from "./Category";

import { isWishReq, isWish, unWishReq } from "../wishlist/Mixins";
import Banner from "./Banner";

function Product() {
  const [showFilters, setShowFilters] = React.useState(true);
  const [products, setProducts] = React.useState([]);
  const [wList, setWlist] = useState(
    JSON.parse(localStorage.getItem("wishList"))
  );
  const [filters, setFilters] = React.useState({
    status: "approved",
    category: [],
  });
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetProducts(filters);
      dispatch(SetLoader(false));
      if (response.success) {
        setProducts(response.data);
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
  }, [filters]);

  return (
    <>
    
      <section className="product ">
        <div className="gap-5">
          {showFilters && (
            <Filters
              showFilters={showFilters}
              setShowFilters={setShowFilters}
              filters={filters}
              setFilters={setFilters}
            />
          )}
          <div className="flex flex-col gap-5">
            <div className="flex gap-5 items-center">
              {!showFilters && (
                <i
                  className="ri-equalizer-line text-xl cursor-pointer"
                  onClick={() => setShowFilters(!showFilters)}
                ></i>
              )}
            </div>
            <div
              className={`grid gap-5 ${
                showFilters ? "grid-cols-4" : "grid-cols-5"
              }`}
            ></div>
          </div>
        </div>
        <Banner />
        <section>
          <div className="container bg-trasparent my-4 p-3">
            <div className="row row-cols-1 row-cols-xs-2 row-cols-sm-2 row-cols-lg-5 g-3">
              {products.map((product) => (
                <div key={product._id} className="col">
                  <div className="card h-100 shadow-sm">
                    <img
                      src={product.images[0]}
                      alt="Product"
                      style={{ maxHeight: "7rem" }}
                      className="rounded w-full cursor-pointer"
                      onClick={() => navigate(`/product/${product._id}`)}
                    />

                    <div className="label-top shadow-sm">
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
                    <div className="card-body">
                      <h5 className="flex">{product.name}</h5>

                      <div className="clearfix mb-3">
                        <span className="float-start badge rounded-pill bg-dark text-white ">
                          {product.condition}
                        </span>
                      </div>
                      <h5 className="flex">NRP. {product.price}</h5>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </section>
    </>
  );
}

export default Product;
