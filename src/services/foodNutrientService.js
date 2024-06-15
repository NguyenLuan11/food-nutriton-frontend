import axios from "axios";
import HeadersApi from "../services/headersApi";
import ConstantService from "./constantService";

const REST_API_BASE_URL = `${ConstantService.REST_API_BASE_URL}foodNutrient-management`;

export const listFoodNutrient = () => axios.get(`${REST_API_BASE_URL}/foodNutrients`);

export const getFoodNutrientByFoodId = (foodId) => axios.get(`${REST_API_BASE_URL}/foodNutrient/${foodId}`);

export const getFoodNutrientByNutrientId = (nutrientId) => axios.get(`${REST_API_BASE_URL}/foodNutrient/${nutrientId}`);

export const addFoodNutrient = (data, accessToken) => 
axios.post(`${REST_API_BASE_URL}/foodNutrient`, data, HeadersApi.headersAuthorization(accessToken));

export const updateFoodNutrientById = (foodId, nutrientId, data, accessToken) => 
axios.put(`${REST_API_BASE_URL}/foodNutrient/${foodId}/${nutrientId}`, data, HeadersApi.headersAuthorization(accessToken));

export const deleteFoodNutrientById = (foodId, nutrientId, accessToken) => 
axios.delete(`${REST_API_BASE_URL}/foodNutrient/${foodId}/${nutrientId}`, HeadersApi.headersAuthorization(accessToken));