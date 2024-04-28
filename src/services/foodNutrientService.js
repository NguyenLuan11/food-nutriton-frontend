import axios from "axios";
import HeadersApi from "../services/headersApi";


const REST_API_BASE_URL = "http://192.168.1.4:5007/api/foodNutrient-management";

export const listFoodNutrient = () => axios.get(`${REST_API_BASE_URL}/foodNutrients`);

export const getFoodNutrientByFoodId = (foodId) => axios.get(`${REST_API_BASE_URL}/foodNutrient/${foodId}`);

export const getFoodNutrientByNutrientId = (nutrientId) => axios.get(`${REST_API_BASE_URL}/foodNutrient/${nutrientId}`);

export const addFoodNutrient = (data, accessToken) => 
axios.post(`${REST_API_BASE_URL}/foodNutrient`, data, HeadersApi.headersAuthorization(accessToken));

export const updateFoodNutrientById = (foodId, nutrientId, data, accessToken) => 
axios.put(`${REST_API_BASE_URL}/foodNutrient/${foodId}/${nutrientId}`, data, HeadersApi.headersAuthorization(accessToken));

export const deleteFoodNutrientById = (foodId, nutrientId, accessToken) => 
axios.delete(`${REST_API_BASE_URL}/foodNutrient/${foodId}/${nutrientId}`, HeadersApi.headersAuthorization(accessToken));