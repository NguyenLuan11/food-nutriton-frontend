import axios from "axios";
import HeadersApi from "../services/headersApi";
import ConstantService from "./constantService";

const REST_API_BASE_URL = `${ConstantService.REST_API_BASE_URL}foods-management`;

export const getImgFood = `${REST_API_BASE_URL}/food/images/`;

export const listFoods = () => axios.get(`${REST_API_BASE_URL}/foods`);

export const getFoodById = (foodId) => axios.get(`${REST_API_BASE_URL}/food/${foodId}`);

export const addFood = (foodData, accessToken) => axios.post(`${REST_API_BASE_URL}/food`, foodData, HeadersApi.headersAuthorization(accessToken));

export const updateFoodById = (foodId, foodData, accessToken) => axios.put(`${REST_API_BASE_URL}/food/${foodId}`, foodData, HeadersApi.headersAuthorization(accessToken));

export const uploadImgFoodById = (foodId, file, accessToken) => { 
    const formData = new FormData();
    formData.append("picFood", file);

    return axios.put(`${REST_API_BASE_URL}/food/upload-img/${foodId}`, formData, 
        HeadersApi.headersAuthorization(accessToken), {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }); 
}

export const deleteFoodById = (foodId, accessToken) => axios.delete(`${REST_API_BASE_URL}/food/${foodId}`, HeadersApi.headersAuthorization(accessToken));