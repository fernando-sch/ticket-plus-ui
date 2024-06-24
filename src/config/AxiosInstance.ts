import axios from "axios";
import { envObject } from "./EnvObject";

export const axiosInstance = axios.create({
  baseURL: envObject.apiBaseUrl,
  headers: { apiKey: envObject.apiToken },
});
