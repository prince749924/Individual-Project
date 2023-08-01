import { axiosInstance } from "./axiosInstance";

export const wishListProducts = async () => {
    let productArray = JSON.parse(localStorage.getItem("wishList"));
    try {
      let res = await axiosInstance.post("/api/products/wish-product", {
        productArray,
      });
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };