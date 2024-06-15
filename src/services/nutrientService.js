import axios from "axios";
import HeadersApi from "../services/headersApi";
import ConstantService from "./constantService";

const REST_API_BASE_URL = `${ConstantService.REST_API_BASE_URL}nutrients-management`;

export const listNutrients = () => axios.get(`${REST_API_BASE_URL}/nutrients`);

export const getNutrientById = (nutrientId) => axios.get(`${REST_API_BASE_URL}/nutrient/${nutrientId}`);

export const getNutrientByNatureName = (natureName) => axios.get(`${REST_API_BASE_URL}/nutrient/${natureName}`);

export const addNutrient = (nutrientData, accessToken) => axios.post(`${REST_API_BASE_URL}/nutrient`, nutrientData, HeadersApi.headersAuthorization(accessToken));

export const updateNutrientById = (nutrientId, nutrientData, accessToken) => axios.put(`${REST_API_BASE_URL}/nutrient/${nutrientId}`, nutrientData, HeadersApi.headersAuthorization(accessToken));

export const deleteNutrientById = (nutrientId, accessToken) => axios.delete(`${REST_API_BASE_URL}/nutrient/${nutrientId}`, HeadersApi.headersAuthorization(accessToken));