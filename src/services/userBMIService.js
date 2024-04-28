import axios from "axios";

const header = {
    'Content-Type': 'application/json'
}

const REST_API_BASE_URL = "http://127.0.143.145:5007/api/userBMI-management";
// const REST_API_BASE_URL = "http://192.168.1.4:5007/api/userBMI-management";

export const listUserBMI = () => axios.get(`${REST_API_BASE_URL}/userBMIs`);

export const getUserBMIByUsername = (userName) => axios.get(`${REST_API_BASE_URL}/userBMI/${userName}`);

export const getUserBMIById = (bmiId) => axios.get(`${REST_API_BASE_URL}/userBMI/${bmiId}`);

export const addUserBMI = (data) => axios.post(`${REST_API_BASE_URL}/userBMI`, data, {headers: header});

export const updateUserBMIById = (bmiId, data) => axios.put(`${REST_API_BASE_URL}/userBMI/${bmiId}`, data, {headers: header});

export const deleteUserBMIById = (bmiId) => axios.delete(`${REST_API_BASE_URL}/userBMI/${bmiId}`);