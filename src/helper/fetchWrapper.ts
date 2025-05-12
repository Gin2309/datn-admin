import axios from "axios";

const axiosClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/`,
});

axiosClient.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("ACCESS_TOKEN");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    if (error.response) {
      console.error("Server Error:", error.response.data);
    } else if (error.request) {
      console.error("No response received from server");
    } else {
      console.error("Request failed:", error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
