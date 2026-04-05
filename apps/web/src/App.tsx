import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthBootstrap from "./components/AuthBootstrap";
import PublicRoute from "./components/PublicRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import AppLayout from "./layouts/AppLayout";

export default function App() {
  return (
    <AuthBootstrap>
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />

          {/* Protected Routes */}
          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route
              path="/dashboard"
              element={
                <div className="space-y-6">
                  <header className="flex flex-col gap-1">
                    <h1 className="text-display-lg font-bold tracking-tight">
                      Panel de Control
                    </h1>
                    <p className="text-body-lg text-muted-foreground">
                      Bienvenido a la gestión inteligente de tu organización.
                    </p>
                  </header>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      {
                        label: "Socios Activos",
                        value: "423",
                        change: "+12% este mes",
                      },
                      {
                        label: "Donaciones mes",
                        value: "$1.420.000",
                        change: "+5% vs anterior",
                      },
                      {
                        label: "Eventos Próximos",
                        value: "3",
                        change: "2 esta semana",
                      },
                    ].map((stat, i) => (
                      <div
                        key={i}
                        className="glass p-6 rounded-2xl shadow-card hover:shadow-card-hover transition-all animate-fade-in"
                        style={{ animationDelay: `${i * 100}ms` }}
                      >
                        <p className="text-caption text-muted-foreground uppercase tracking-wider font-semibold">
                          {stat.label}
                        </p>
                        <p className="text-display-md font-bold mt-2">
                          {stat.value}
                        </p>
                        <p className="text-body-sm text-accent mt-1">
                          {stat.change}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div
                    className="glass p-6 rounded-2xl shadow-card h-64 flex items-center justify-center text-muted-foreground animate-fade-in"
                    style={{ animationDelay: "300ms" }}
                  >
                    <p className="font-display font-medium text-display-sm opacity-20 tracking-widest uppercase">
                      Gráficos en construcción
                    </p>
                  </div>
                </div>
              }
            />

            {/* Placeholder routes */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route
              path="/socios"
              element={
                <div className="text-display-md font-bold">Módulo Socios</div>
              }
            />
            <Route
              path="/donaciones"
              element={
                <div className="text-display-md font-bold">
                  Módulo Donaciones
                </div>
              }
            />
            <Route
              path="/calendario"
              element={
                <div className="text-display-md font-bold">
                  Módulo Calendario
                </div>
              }
            />
            <Route
              path="/ecologia"
              element={
                <div className="text-display-md font-bold">Módulo Ecología</div>
              }
            />
            <Route
              path="/configuracion"
              element={
                <div className="text-display-md font-bold">Configuración</div>
              }
            />
          </ProtectedRoute>
        </Routes>
        </Routes>
      </BrowserRouter>
    </AuthBootstrap>
  );
}
