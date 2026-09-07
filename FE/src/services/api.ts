import axios from "axios";
import { Platform } from "react-native";

const BASE_URL =
  Platform.OS === "android"
    ? "http://10.0.2.2:5221/api"
    : "http://localhost:5221/api";

const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export default api;
