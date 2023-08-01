import React, { useEffect } from "react";
import { SetLoader } from "../redux/loaderSlice";
import { GetProducts } from "../apicalls/products";
import { message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom"; // Add useNavigate import
import Divider from "../MainComponents/Divider";

function BestSelling() {
  const navigate = useNavigate();
  const [products, setProducts] = React.useState([]);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);

  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetProducts();
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
  }, []);

  return (
    <div className="container">
      <h1 className="flex"> Latest Products</h1>
      {products.map((product) => (
        <div
          key={product._id}
          className="flex flex-col mb-3 items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 cursor-pointer"
          onClick={() => navigate(`/product/${product._id}`)}
        >
          <img
            className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
            src={product.images[0]}
            alt=""
          />
          <div className="flex flex-col justify-between p-4 leading-normal">
            <h2 className="flex">{product.name}</h2>
            <p className="flex">{product.description}</p>
            <p className="flex">
              Price: ₹. {product.price}
              <span className="justify-end"> {product.condition} </span>
            </p>
            <p className="flex">Location: {product.seller.address}</p>
            <Divider />
            <p className="flex">{product.seller.name} (seller)</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BestSelling;
