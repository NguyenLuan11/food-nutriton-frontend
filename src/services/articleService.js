import axios from "axios";
import HeadersApi from "../services/headersApi";

const REST_API_BASE_URL = "http://127.0.143.145:5007/api/article-management";
// const REST_API_BASE_URL = "http://192.168.1.4:5007/api/article-management";

export const listArticle = () => axios.get(`${REST_API_BASE_URL}/articles`);

export const getArticleById = (articleId) => axios.get(`${REST_API_BASE_URL}/article/${articleId}`);

export const getArticleByCategory = (categoryName) => axios.get(`${REST_API_BASE_URL}/article/${categoryName}`);

export const addArticle = (articleData, accessToken) => axios.post(`${REST_API_BASE_URL}/article`, articleData, HeadersApi.headersAuthorization(accessToken));

export const updateArticleById = (articleId, articleData, accessToken) => axios.put(`${REST_API_BASE_URL}/article/${articleId}`, articleData, HeadersApi.headersAuthorization(accessToken));

export const deleteArticleById = (articleId, accessToken) => axios.delete(`${REST_API_BASE_URL}/article/${articleId}`, HeadersApi.headersAuthorization(accessToken));