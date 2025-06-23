import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:8000/api",
});

export const updateApiToken = (token: string | null) => {
	if (token) axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
	else delete axiosInstance.defaults.headers.common["Authorization"];
};