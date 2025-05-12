import { message } from "antd";
import type { AxiosRequestConfig } from "axios";
import axios from "axios";
import { getRefreshToken, getToken, setRefreshToken, setToken, clearToken } from "@/helper/storage";
import { destroyCookie } from "nookies";

const axiosClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_API_URL}`,
  headers: {
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
});

const logout = () => {
  clearToken();
  setToken("");
  setRefreshToken("");
  destroyCookie(null, "ACCESS_TOKEN", { path: "/" });
  setTimeout(() => {
    window.location.replace("/auth/login");
  }, 500);
};

axiosClient.interceptors.request.use((config: AxiosRequestConfig): any => {
  const token = getToken();
  const currentPath = window.location.pathname;

  if (!currentPath.includes("auth")) {
    return {
      ...config,
      headers: {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      },
    };
  }

  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (![200, 201, 204].includes(response.status)) {
      throw response.data;
    }

    return response.data || response;
  },
  async (error) => {
    const { statusCode } = error.response?.data || {};

    if (statusCode === 401) {
      message.error("Phiên đã hết hạn hoặc yêu cầu không hợp lệ.");
      logout();
      return;
    }

    if ((error.response && error.response.status === 401) || error.status === 401) {
      const refreshTk = getRefreshToken();

      if (refreshTk) {
        const refreshTokenBody = { refreshTk };
        try {
          const res = await axios.post("/refresh-token", refreshTokenBody);
          if (res.status === 200) {
            setToken(res.data.token);
            setRefreshToken(res.data.refreshToken);
            return axiosClient(error.config);
          }
        } catch {
          logout();
        }
      } else {
        logout();
      }
    }

    throw error;
  },
);

export default axiosClient;
