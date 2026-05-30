import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "localhost:3001",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("bango_parc_token") || localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response;

      if (status === 401) {
        console.error("Unauthorized!");
        localStorage.removeItem("bango_parc_token");
        localStorage.removeItem("token");
      }

      if (status === 500) {
        console.error("Server sedang bermasalah. Silakan coba lagi nanti.");
      }
    } else if (error.request) {
      console.error(
        "Tidak ada respon dari server. Periksa koneksi internet Anda.",
      );
    } else {
      console.error("Terjadi kesalahan:", error.message);
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
