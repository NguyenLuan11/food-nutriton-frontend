import axios from "axios";
import HeadersApi from "../services/headersApi";
import ConstantService from "./constantService";

const REST_API_BASE_URL = `${ConstantService.REST_API_BASE_URL}categoryArticle-management`;

export const listCategory = () => axios.get(`${REST_API_BASE_URL}/categoriesArticle`);

export const getCategoryById = (categoryId) => axios.get(`${REST_API_BASE_URL}/categoryArticle/${categoryId}`);

export const addCategory = (categoryData, accessToken) => axios.post(`${REST_API_BASE_URL}/categoryArticle`, categoryData, HeadersApi.headersAuthorization(accessToken));

export const updateCategoryById = (categoryId, categoryData, accessToken) => axios.put(`${REST_API_BASE_URL}/categoryArticle/${categoryId}`, categoryData, HeadersApi.headersAuthorization(accessToken));

export const deleteCategoryById = (categoryId, accessToken) => axios.delete(`${REST_API_BASE_URL}/categoryArticle/${categoryId}`, HeadersApi.headersAuthorization(accessToken));