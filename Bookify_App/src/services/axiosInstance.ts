import axios from "axios";
import { API_BASE_URL } from "../constants/api";

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        Accept: "application/json",
    },
});

export default axiosInstance;