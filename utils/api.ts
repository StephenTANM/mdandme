import axios, { AxiosInstance } from "axios"
import { Platform } from "react-native"

const api: AxiosInstance = axios.create({
  baseURL: `${
    Platform.OS === "web" ? "http://localhost" : "http://10.0.0.118"
  }:3000`,
})

export default api
