import axios from "axios";
import HeadersApi from "../services/headersApi";

const REST_API_BASE_URL = "http://127.0.143.145:5007/api/natureNutrient-management";
// const REST_API_BASE_URL = "http://192.168.1.4:5007/api/natureNutrient-management";

export const listNatureNutrient = () => axios.get(`${REST_API_BASE_URL}/natureNutrients`);

export const getNatureNutrientById = (natureId) => axios.get(`${REST_API_BASE_URL}/natureNutrient/${natureId}`);

export const addNatureNutrient = (natureData, accessToken) => axios.post(`${REST_API_BASE_URL}/natureNutrient`, natureData, HeadersApi.headersAuthorization(accessToken));

export const updateNatureNutrientById = (natureId, natureData, accessToken) => axios.put(`${REST_API_BASE_URL}/natureNutrient/${natureId}`, natureData, HeadersApi.headersAuthorization(accessToken));

export const deleteNatureNutrientById = (natureId, accessToken) => axios.delete(`${REST_API_BASE_URL}/natureNutrient/${natureId}`, HeadersApi.headersAuthorization(accessToken));