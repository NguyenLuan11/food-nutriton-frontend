import axios from "axios";
import HeadersApi from "../services/headersApi";
import ConstantService from "./constantService";

const REST_API_BASE_URL = `${ConstantService.REST_API_BASE_URL}article-management`;

export const listArticle = () => axios.get(`${REST_API_BASE_URL}/articles`);

export const getArticleById = (articleId) => axios.get(`${REST_API_BASE_URL}/article/${articleId}`);

export const getArticleByCategory = (categoryName) => axios.get(`${REST_API_BASE_URL}/article/${categoryName}`);

export const addArticle = (articleData, accessToken) => axios.post(`${REST_API_BASE_URL}/article`, articleData, HeadersApi.headersAuthorization(accessToken));

export const updateArticleById = (articleId, articleData, accessToken) => axios.put(`${REST_API_BASE_URL}/article/${articleId}`, articleData, HeadersApi.headersAuthorization(accessToken));

export const deleteArticleById = (articleId, accessToken) => axios.delete(`${REST_API_BASE_URL}/article/${articleId}`, HeadersApi.headersAuthorization(accessToken));