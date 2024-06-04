/* eslint-disable no-unused-vars */
import axios from "axios";
import HeadersApi from "../services/headersApi";

// const REST_API_BASE_URL = "http://192.168.1.4:5007/api/user-management";
const REST_API_BASE_URL = "http://127.0.143.145:5007/api/user-management";

export const listUsers = (accessToken) => axios.get(`${REST_API_BASE_URL}/users`, HeadersApi.headersAuthorization(accessToken));

export const getUserById = (userId) => axios.get(`${REST_API_BASE_URL}/user/${userId}`);

export const updateStateUserById = (userId, userState, accessToken) => axios.put(`${REST_API_BASE_URL}/user/state/${userId}`, {state: userState}, HeadersApi.headersAuthorization(accessToken));

export const deleteUserById = (userId, accessToken) => axios.delete(`${REST_API_BASE_URL}/user/${userId}`, HeadersApi.headersAuthorization(accessToken));