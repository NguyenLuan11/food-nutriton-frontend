import axios from "axios";
import HeadersApi from "../services/headersApi";

// const REST_API_BASE_URL = "http://192.168.1.4:5007/api/categoryArticle-management";
const REST_API_BASE_URL = "http://127.0.143.145:5007/api/categoryArticle-management";

export const listCategory = () => axios.get(`${REST_API_BASE_URL}/categoriesArticle`);

export const getCategoryById = (categoryId) => axios.get(`${REST_API_BASE_URL}/categoryArticle/${categoryId}`);

export const addCategory = (categoryData, accessToken) => axios.post(`${REST_API_BASE_URL}/categoryArticle`, categoryData, HeadersApi.headersAuthorization(accessToken));

export const updateCategoryById = (categoryId, categoryData, accessToken) => axios.put(`${REST_API_BASE_URL}/categoryArticle/${categoryId}`, categoryData, HeadersApi.headersAuthorization(accessToken));

export const deleteCategoryById = (categoryId, accessToken) => axios.delete(`${REST_API_BASE_URL}/categoryArticle/${categoryId}`, HeadersApi.headersAuthorization(accessToken));