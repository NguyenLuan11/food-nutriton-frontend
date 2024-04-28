import axios from "axios";
import HeadersApi from "../services/headersApi";

// const REST_API_BASE_URL = "http://192.168.1.4:5007/api/foods-management";
const REST_API_BASE_URL = "http://127.0.143.145:5007/api/foods-management";

export const listFoods = () => axios.get(`${REST_API_BASE_URL}/foods`);

export const getFoodById = (foodId) => axios.get(`${REST_API_BASE_URL}/food/${foodId}`);

export const addFood = (foodData, accessToken) => axios.post(`${REST_API_BASE_URL}/food`, foodData, HeadersApi.headersAuthorization(accessToken));

export const updateFoodById = (foodId, foodData, accessToken) => axios.put(`${REST_API_BASE_URL}/food/${foodId}`, foodData, HeadersApi.headersAuthorization(accessToken));

export const deleteFoodById = (foodId, accessToken) => axios.delete(`${REST_API_BASE_URL}/food/${foodId}`, HeadersApi.headersAuthorization(accessToken));