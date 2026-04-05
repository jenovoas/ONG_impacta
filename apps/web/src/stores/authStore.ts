import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  systemRole: string;
  organization: {
    id: string;
    name: string;
    slug: string;
  };
}

interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isBootstrapping: boolean;
  setAuth: (user: AuthUser, token: string) => void;
  setUser: (user: AuthUser) => void;
  startBootstrap: () => void;
  finishBootstrap: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      isBootstrapping: true,
      setAuth: (user, token) =>
        set({
          user,
          accessToken: token,
          isAuthenticated: true,
          isBootstrapping: false,
        }),
      setUser: (user) => set({ user, isAuthenticated: true }),
      startBootstrap: () => set({ isBootstrapping: true }),
      finishBootstrap: () => set({ isBootstrapping: false }),
      logout: () =>
        set({
          user: null,
          accessToken: null,
          isAuthenticated: false,
          isBootstrapping: false,
        }),
    }),
    {
      name: "impacta-auth-storage",
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
