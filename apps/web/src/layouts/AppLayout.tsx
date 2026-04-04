import { useAuthStore } from '../stores/authStore';
import { LogOut, Users, Heart, Calendar, Leaf, Settings, Home, Search, Bell, Menu } from 'lucide-react';
import { Navigate, Outlet, Link, useLocation } from 'react-router-dom';

const sidebarItems = [
  { icon: Home, label: 'Resumen', path: '/dashboard' },
  { icon: Users, label: 'Socios', path: '/socios' },
  { icon: Heart, label: 'Donaciones', path: '/donaciones' },
  { icon: Calendar, label: 'Calendario', path: '/calendario' },
  { icon: Leaf, label: 'Ecología', path: '/ecologia' },
  { icon: Settings, label: 'Ajustes', path: '/configuracion' },
];

export default function AppLayout() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <aside className="w-sidebar bg-sidebar-background border-r border-sidebar-border hidden md:flex flex-col flex-shrink-0 animate-fade-in">
        <div className="h-topbar flex items-center px-6 gap-3">
          <div className="h-8 w-8 gradient-brand rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-glow-blue">i</div>
          <span className="font-display font-bold text-lg tracking-tight">Impacta+</span>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {sidebarItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                  isActive 
                    ? 'bg-sidebar-primary text-white shadow-glow-blue font-semibold' 
                    : 'text-sidebar-foreground hover:bg-sidebar-accent'
                }`}
              >
                <Icon size={20} />
                <span className="text-body-sm">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3 px-2 py-3 mb-2">
            <div className="h-10 w-10 rounded-full bg-secondary border border-border flex items-center justify-center text-primary font-bold">
              {user?.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-body-sm font-semibold truncate">{user?.name}</p>
              <p className="text-caption text-muted-foreground truncate">{user?.organization.name}</p>
            </div>
          </div>
          <button 
            onClick={logout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-danger hover:bg-danger/10 transition-all font-semibold text-body-sm"
          >
            <LogOut size={18} />
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="h-topbar bg-card border-b border-border flex items-center justify-between px-6 flex-shrink-0 z-10">
          <div className="flex items-center gap-4 flex-1">
            <button className="md:hidden p-2 text-muted-foreground"><Menu size={20}/></button>
            <div className="relative max-w-md w-full hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
              <input 
                type="text" 
                placeholder="Buscar socio, evento..." 
                className="w-full bg-muted border border-border rounded-lg py-1.5 pl-10 pr-4 text-body-sm focus:outline-none focus:ring-1 focus:ring-primary pointer-events-none opacity-50"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 text-muted-foreground hover:bg-muted rounded-full transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-primary rounded-full ring-2 ring-card"></span>
            </button>
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="max-w-content-max mx-auto">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
