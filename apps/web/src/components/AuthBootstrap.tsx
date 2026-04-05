import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { authService } from "../services/auth";
import { useAuthStore } from "../stores/authStore";

interface AuthBootstrapProps {
  children: React.ReactNode;
}

export default function AuthBootstrap({ children }: AuthBootstrapProps) {
  const accessToken = useAuthStore((state) => state.accessToken);
  const isBootstrapping = useAuthStore((state) => state.isBootstrapping);
  const startBootstrap = useAuthStore((state) => state.startBootstrap);
  const finishBootstrap = useAuthStore((state) => state.finishBootstrap);
  const setUser = useAuthStore((state) => state.setUser);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    let cancelled = false;

    const bootstrapSession = async () => {
      startBootstrap();

      if (!accessToken) {
        finishBootstrap();
        return;
      }

      try {
        const user = await authService.getCurrentUser();

        if (!cancelled) {
          setUser(user);
        }
      } catch {
        if (!cancelled) {
          logout();
        }
      } finally {
        if (!cancelled) {
          finishBootstrap();
        }
      }
    };

    void bootstrapSession();

    return () => {
      cancelled = true;
    };
  }, [accessToken, finishBootstrap, logout, setUser, startBootstrap]);

  if (isBootstrapping) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center gap-3 text-muted-foreground">
          <Loader2 className="animate-spin" size={20} />
          <span className="text-body-sm">Validando sesion...</span>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
