import axios from "axios";
import HeadersApi from "./headersApi";
import ConstantService from "./constantService";

const header = {
    'Content-Type': 'application/json'
}

const REST_API_BASE_URL = `${ConstantService.REST_API_BASE_URL}admin-management`;

export const getAvtAdmin = `${REST_API_BASE_URL}/admin/images/`;

export const listAdmins = () => axios.get(`${REST_API_BASE_URL}/admins`);

export const countAllItems = () => axios.get(`${REST_API_BASE_URL}/count_all_items`);

export const getAdminById = (adminId) => axios.get(`${REST_API_BASE_URL}/admin/${adminId}`);

export const loginAdmin = (adminAuth) => axios.post(`${REST_API_BASE_URL}/login`, adminAuth, {headers: header});

export const refreshToken = (refreshToken) => axios.post(`${REST_API_BASE_URL}/refresh_token`, refreshToken, {headers: header});

export const addAdmin = (adminData) => axios.post(`${REST_API_BASE_URL}/admin`, adminData, {headers: header});

export const updateAdminById = (adminId, adminData) => axios.put(`${REST_API_BASE_URL}/admin/${adminId}`, adminData, {headers: header});

export const updateAvtAdminById = (adminId, file, accessToken) => { 
    const formData = new FormData();
    formData.append("picAvt", file);

    return axios.put(`${REST_API_BASE_URL}/admin/upload-avt/${adminId}`, formData, 
        HeadersApi.headersAuthorization(accessToken), {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }); 
}

export const deleteAdminById = (adminId) => axios.delete(`${REST_API_BASE_URL}/admin/${adminId}`);