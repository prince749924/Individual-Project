import { axiosInstance } from "./axiosInstance";

// Add Advertisement
export const AddAdvertisement = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/ads/add-ads",
      payload
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

//  Get all Advertisement
export const GetAdvertisement = async (filters) => {
  try {
    const response = await axiosInstance.post(
      "/api/ads/get-ads",
      filters
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// Edit Advertisement

export const EditAdvertisement = async (id, payload) => {
  try {
    const response = await axiosInstance.put(
      `/api/ads/edit-ads/${id}`,
      payload
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message); // Throwing an error object instead of returning the error message
  }
};

// Get Advertisement By Id
export const GetAdvertisementById = async (id) => {
  try {
    const response = await axiosInstance.get(
      `/api/ads/get-ads-by-id/${id}`
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message); // Throwing an error object instead of returning the error message
  }
};

// Delete Advertisement
export const DeleteAdvertisement = async (id) => {
  try {
    const response = await axiosInstance.delete(
      `/api/ads/delete-ads/${id}`
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

// Upload Image

export const UploadAdvertisementImage = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/ads/upload-image-to-ads",
      payload
    );
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Update Advertisement status

export const UpdateProductStatus = async (id, status) => {
  try {
    const response = await axiosInstance.put(
      `/api/ads/update-product-status/${id}`,
      { status }
    );
    return response.data;
  } catch (error) {
    return { success: false, message: error.message }; // Return an object with success: false and the error message
  }
};

 

 
