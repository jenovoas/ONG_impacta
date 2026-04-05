import axios from "axios";
import { useAuthStore } from "../stores/authStore";
import { authService } from "../services/auth";

const apiBaseUrl = (
  import.meta.env.VITE_API_URL || "http://localhost:4000/api"
).replace(/\/$/, "");

const storageKey = "impacta-refresh-token";

export const refreshTokenStorage = {
  get: () => localStorage.getItem(storageKey),
  set: (token: string) => localStorage.setItem(storageKey, token),
  clear: () => localStorage.removeItem(storageKey),
};

export const apiClient = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;

apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      refreshTokenStorage.get()
    ) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;

        try {
          await authService.refresh();
          isRefreshing = false;
          return apiClient(originalRequest);
        } catch {
          isRefreshing = false;
          refreshTokenStorage.clear();
          useAuthStore.getState().logout();
        }
      }
    }

    if (error.response?.status === 401) {
      refreshTokenStorage.clear();
      useAuthStore.getState().logout();
    }

    return Promise.reject(error);
  },
);
