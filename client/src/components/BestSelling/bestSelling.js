// import React, { useEffect } from "react";
// import { GetProductById, GetProducts } from "../../apicalls/products";
// import { SetLoader } from "../../redux/loaderSlice";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { message } from "antd";
// import Divider from "../../MainComponents/Divider";
// import { GetAdvertisement } from "../../apicalls/advertisement";

// function BestSelling() {
//   const [products, setProducts] = React.useState([]);
//   const [ads, setAdvertisement] = React.useState([]);
//   const navigate = useNavigate();
//   const { user } = useSelector((state) => state.users);
//   const dispatch = useDispatch();

//   // Get product
//   const getData = async () => {
//     try {
//       dispatch(SetLoader(true));
//       const response = await GetProducts();
//       dispatch(SetLoader(false));
//       if (response.success) {
//         setProducts(response.data);
//       } else {
//         throw new Error(response.message);
//       }
//     } catch (error) {
//       dispatch(SetLoader(false));
//       message.error(error.message);
//     }
//   };

//   // Get Advertisement
//   const getAdvertisementData = async () => {
//     try {
//       dispatch(SetLoader(true));
//       const response = await GetAdvertisement();
//       dispatch(SetLoader(false));
//       if (response.success) {
//         setAdvertisement(response.data);
//       } else {
//         throw new Error(response.message);
//       }
//     } catch (error) {
//       dispatch(SetLoader(false));
//       message.error(error.message);
//     }
//   };

//   useEffect(() => {
//     getData();
//     getAdvertisementData();
//   }, []);
//   return (
//     <>
//       <div className="container-fluid mt-5">
//         <div className="row">
//           <div className="col-md-6 ms-5">
//             <h1 className="text-center text-success fw-bold">Latest Uploads</h1>
//             {products.map((product) => (
//               <div
//                 className="card mb-3 border border-dark"
//                 style={{ width: "540px" }}
//                 onClick={() => navigate(`/product/${product._id}`)} // Add the key prop with a unique identifier
//               >
//                 <div className="row g-0">
//                   <div className="col-md-4">
//                     <img
//                       src={product.images[0]}
//                       className="img-fluid "
//                       style={{ height: "15rem" }}
//                       alt="..."
//                     />
//                   </div>

//                   <div className="col-md-8">
//                     <div className="card-body">
//                       <h5 className="flex card-title">{product.name}</h5>
//                       <p className="flex card-text">{product.description}</p>
//                       <p className="flex card-text justify-between">
//                         {product.price}
//                         <span>{product.condition}</span>
//                       </p>
//                       <p className="flex">Location: {product.seller.address}</p>
//                       <Divider />
//                       <p className="flex">Seller: {product.seller.name}</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//           {ads.map((adsdata) => (
//             <div className="col-md-5">
//               <div class="card mb-3">
//                 <img src={adsdata.images[0]} class="card-img-top" alt="..." />
//                 <div class="card-body">
//                   <h5 class="card-title">{adsdata.name}</h5>
//                   <p class="card-text">{adsdata.description}</p>
//                   <p class="card-text">
//                     <small class="text-muted">Last updated 3 mins ago</small>
//                   </p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// }

// export default BestSelling;
