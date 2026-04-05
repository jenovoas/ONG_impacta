import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuthStore } from "../stores/authStore";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Loader2 } from "lucide-react";
import { authService } from "../services/auth";

const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const setAuth = useAuthStore((state) => state.setAuth);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setLoading(true);
    setError(null);
    try {
      const response = await authService.login(data);
      setAuth(response.user, response.accessToken);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="w-full max-w-sm space-y-8 animate-fade-in">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 gradient-brand rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-glow-blue">
            i
          </div>
          <h2 className="mt-6 text-display-md font-bold tracking-tight">
            Impacta+
          </h2>
          <p className="mt-2 text-body-sm text-muted-foreground">
            Gestión inteligente para organizaciones sociales
          </p>
        </div>

        <div className="glass p-6 rounded-2xl shadow-card border-border">
          <h3 className="text-display-sm font-semibold mb-6 flex items-center gap-2">
            Iniciar sesión
          </h3>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1">
              <label className="text-caption text-muted-foreground uppercase tracking-wider font-semibold">
                Email
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  size={18}
                />
                <input
                  {...register("email")}
                  type="email"
                  className="w-full bg-secondary border border-border rounded-lg py-2.5 pl-10 pr-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  placeholder="name@organization.cl"
                />
              </div>
              {errors.email && (
                <p className="text-danger text-caption mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <label className="text-caption text-muted-foreground uppercase tracking-wider font-semibold">
                Contraseña
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  size={18}
                />
                <input
                  {...register("password")}
                  type="password"
                  className="w-full bg-secondary border border-border rounded-lg py-2.5 pl-10 pr-4 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  placeholder="••••••••"
                />
              </div>
              {errors.password && (
                <p className="text-danger text-caption mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {error && (
              <div className="bg-danger/10 border border-danger/20 p-3 rounded-lg text-danger text-body-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full gradient-brand text-white py-2.5 rounded-lg font-semibold shadow-glow-blue hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                "Entrar"
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-body-sm text-muted-foreground">
            ¿No tienes cuenta?{" "}
            <span className="text-primary hover:underline cursor-pointer">
              Solicitar demo
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
