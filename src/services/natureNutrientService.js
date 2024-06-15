import axios from "axios";
import HeadersApi from "../services/headersApi";
import ConstantService from "./constantService";

const REST_API_BASE_URL = `${ConstantService.REST_API_BASE_URL}natureNutrient-management`;

export const listNatureNutrient = () => axios.get(`${REST_API_BASE_URL}/natureNutrients`);

export const getNatureNutrientById = (natureId) => axios.get(`${REST_API_BASE_URL}/natureNutrient/${natureId}`);

export const addNatureNutrient = (natureData, accessToken) => axios.post(`${REST_API_BASE_URL}/natureNutrient`, natureData, HeadersApi.headersAuthorization(accessToken));

export const updateNatureNutrientById = (natureId, natureData, accessToken) => axios.put(`${REST_API_BASE_URL}/natureNutrient/${natureId}`, natureData, HeadersApi.headersAuthorization(accessToken));

export const deleteNatureNutrientById = (natureId, accessToken) => axios.delete(`${REST_API_BASE_URL}/natureNutrient/${natureId}`, HeadersApi.headersAuthorization(accessToken));