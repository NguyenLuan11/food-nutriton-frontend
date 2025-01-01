import axios from "axios";
import HeadersApi from "../services/headersApi";
import ConstantService from "./constantService";

const REST_API_BASE_URL = `${ConstantService.REST_API_BASE_URL}exercise-management`;

export const listExercises = () => axios.get(`${REST_API_BASE_URL}/exercises`);

export const getExerciseById = (exerciseId) => axios.get(`${REST_API_BASE_URL}/exercise/${exerciseId}`);

export const addExercise = (exerciseData, accessToken) => axios.post(`${REST_API_BASE_URL}/exercise`, exerciseData, HeadersApi.headersAuthorization(accessToken));

export const updateExerciseById = (exerciseId, exerciseData, accessToken) => axios.put(`${REST_API_BASE_URL}/exercise/${exerciseId}`, exerciseData, HeadersApi.headersAuthorization(accessToken));

export const deleteExerciseById = (exerciseId, accessToken) => axios.delete(`${REST_API_BASE_URL}/exercise/${exerciseId}`, HeadersApi.headersAuthorization(accessToken));