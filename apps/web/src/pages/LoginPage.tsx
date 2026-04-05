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
    <div className="min-h-screen flex items-center justify-center p-4 bg-background relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-brand-blue/10 blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-brand-green/10 blur-[120px]" />

      <div className="w-full max-w-sm space-y-8 animate-fade-in relative z-10">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 gradient-brand rounded-2xl flex items-center justify-center text-black font-bold text-3xl shadow-glow-blue mb-6">
            i
          </div>
          <h2 className="text-display-lg font-bold tracking-tight mb-2">
            Impacta+
          </h2>
          <p className="text-body-lg text-muted-foreground">
            Gestión inteligente para organizaciones sociales
          </p>
        </div>

        <div className="glass p-8 rounded-3xl shadow-card border-border/50">
          <h3 className="text-display-sm font-bold mb-8">
            Iniciar sesión
          </h3>

          {error && (
            <div className="bg-danger/10 border border-danger/20 text-danger text-body-sm p-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <label className="text-caption text-muted-foreground uppercase tracking-widest font-bold ml-1">
                Email
              </label>
              <div className="relative group">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-brand-blue transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  {...register("email")}
                  type="email"
                  className="w-full bg-secondary/50 border border-border rounded-xl py-3 pl-11 pr-4 focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all placeholder:text-muted-foreground/30"
                  placeholder="admin@impacta.cl"
                />
              </div>
              {errors.email && (
                <p className="text-danger text-caption mt-1 px-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-caption text-muted-foreground uppercase tracking-widest font-bold ml-1">
                Contraseña
              </label>
              <div className="relative group">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-brand-blue transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  {...register("password")}
                  type="password"
                  className="w-full bg-secondary/50 border border-border rounded-xl py-3 pl-11 pr-4 focus:ring-2 focus:ring-brand-blue focus:border-transparent outline-none transition-all"
                  placeholder="••••••••••••"
                />
              </div>
              {errors.password && (
                <p className="text-danger text-caption mt-1 px-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 gradient-brand text-black rounded-xl font-bold shadow-glow-blue hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:scale-100"
            >
              {loading ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                "Entrar"
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-border/50 text-center">
            <p className="text-body-sm text-muted-foreground">
              ¿No tienes cuenta?{" "}
              <button className="text-brand-green font-bold hover:underline underline-offset-4">
                Solicitar demo
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

