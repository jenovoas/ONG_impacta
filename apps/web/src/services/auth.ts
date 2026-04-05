import { apiClient, refreshTokenStorage } from "../lib/api";
import type { AuthUser } from "../stores/authStore";
import { useAuthStore } from "../stores/authStore";

interface LoginPayload {
  email: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: AuthUser;
}

interface RefreshResponse {
  accessToken: string;
  refreshToken: string;
  user: AuthUser;
}

export const authService = {
  async login(payload: LoginPayload) {
    const { data } = await apiClient.post<LoginResponse>(
      "/auth/login",
      payload,
    );
    refreshTokenStorage.set(data.refreshToken);
    return data;
  },

  async refresh() {
    const currentRefreshToken = refreshTokenStorage.get();
    if (!currentRefreshToken) {
      throw new Error("No refresh token available");
    }
    const { data } = await apiClient.post<RefreshResponse>("/auth/refresh", {
      refreshToken: currentRefreshToken,
    });
    refreshTokenStorage.set(data.refreshToken);
    useAuthStore.getState().setAuth(data.user, data.accessToken);
    return data;
  },

  async getCurrentUser() {
    const { data } = await apiClient.get<AuthUser>("/auth/me");
    return data;
  },
};
