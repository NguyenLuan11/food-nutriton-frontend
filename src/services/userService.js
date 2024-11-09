/* eslint-disable no-unused-vars */
import axios from "axios";
import HeadersApi from "../services/headersApi";
import ConstantService from "./constantService";

const REST_API_BASE_URL = `${ConstantService.REST_API_BASE_URL}user-management`;

export const getAvtUser = `${REST_API_BASE_URL}/user/images/`;

export const listUsers = (accessToken) => axios.get(`${REST_API_BASE_URL}/users`, HeadersApi.headersAuthorization(accessToken));

export const getUserById = (userId) => axios.get(`${REST_API_BASE_URL}/user/${userId}`);

export const updateStateUserById = (userId, userState, accessToken) => axios.put(`${REST_API_BASE_URL}/user/state/${userId}`, {state: userState}, HeadersApi.headersAuthorization(accessToken));

export const deleteUserById = (userId, accessToken) => axios.delete(`${REST_API_BASE_URL}/user/${userId}`, HeadersApi.headersAuthorization(accessToken));