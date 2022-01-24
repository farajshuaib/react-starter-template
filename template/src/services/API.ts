import axios from "axios";
import { AuthData } from "../types";

export const baseURL = "";

class Axios {
  // Axios Instances ..
  Axios; // Authenticated Auto Refresh Axios

  currentToken = ""; // Current Token, Loaded from Local Storage

  constructor() {
    this.Axios = axios.create({ baseURL });

    this.getToken();

    // Add The Interceptors .. ( The Auth Interceptor is also used for logging .. )
    this.Axios.interceptors.request.use(this.requestAuthInterceptor);

    this.Axios.interceptors.response.use(
      (response) => response,
      this.requestErrorInterceptor
    );
  }

  async getToken() {
    this.currentToken = localStorage.getItem("token") || "";
  }

  requestAuthInterceptor = (request: any) => {
    request.headers.Authorization = "Bearer " + this.currentToken;
    return request;
  };

  requestErrorInterceptor = (error: any) => {
    return Promise.reject(error);
  };

  async saveAuthData(token: string) {
    this.currentToken = token;
    localStorage.setItem("token", token.toString());
  }
  clearLocalStorage() {
    this.currentToken = "";
    localStorage.clear();
  }
  async authenticate() { // getting the user data from the server whenever lose it and he's already logged in .
    return this.Axios.get("is_logged_in");
  }
  async login(authData: AuthData) {
    const response = await this.Axios.post("login", authData);
    console.log(response);
    if (response.data.data) {
      this.saveAuthData(response.data.data.token);
    }
    return response;
  }
  async logout() {
    try {
      const response = await this.Axios.get(`logout`);
      if (response.status === 200 || response.status === 204) {
        this.clearLocalStorage();
      }
      return response;
    } catch (err) {
      throw err;
    }
  }
}

const API = new Axios();

export default API;
