import axios from "axios";

const header = {
    'Content-Type': 'application/json'
}

// const REST_API_BASE_URL = "http://192.168.1.4:5007/api/admin-management";
const REST_API_BASE_URL = "http://127.0.143.145:5007/api/admin-management";

export const listAdmins = () => axios.get(`${REST_API_BASE_URL}/admins`);

export const getAdminById = (adminId) => axios.get(`${REST_API_BASE_URL}/admin/${adminId}`);

export const loginAdmin = (adminAuth) => axios.post(`${REST_API_BASE_URL}/login`, adminAuth, {headers: header});

export const refreshToken = (refreshToken) => axios.post(`${REST_API_BASE_URL}/refresh_token`, refreshToken, {headers: header});

export const addAdmin = (adminData) => axios.post(`${REST_API_BASE_URL}/admin`, adminData, {headers: header});

export const updateAdminById = (adminId, adminData) => axios.put(`${REST_API_BASE_URL}/admin/${adminId}`, adminData, {headers: header});

export const deleteAdminById = (adminId) => axios.delete(`${REST_API_BASE_URL}/admin/${adminId}`);