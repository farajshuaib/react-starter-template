import axios from "axios";

export const baseURL = "";

const token = localStorage.getItem("token") || "";

const Axios = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${token}`,
    Accept: "application/json",
  },
});

// set yuor token here by call back this function after login... 
export const setBearerToken = (token: string) =>
  Axios.interceptors.request.use((request: any) => {
    localStorage.setItem("token", token);
    request.headers.Authorization = "Bearer " + token;
    return request;
  });

export default Axios;
