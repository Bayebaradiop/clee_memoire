import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { BookOpen, LayoutDashboard, FileText, MessageSquare, User, Users, Settings, LogOut, ClipboardList, Package, BarChart3, Menu, X, ChevronLeft, Calendar, Video, FileDown, Library } from "lucide-react";
import { useState } from "react";
import type { UserRole } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { NotificationCenter } from "@/components/NotificationCenter";

type NavItem = { to: string; label: string; icon: typeof LayoutDashboard };

const navItems: Record<UserRole, NavItem[]> = {
  etudiant: [
    { to: "/etudiant", label: "Dashboard", icon: LayoutDashboard },
    { to: "/etudiant/suivi", label: "Suivi du mémoire", icon: ClipboardList },
    { to: "/etudiant/calendrier", label: "Calendrier", icon: Calendar },
    { to: "/etudiant/documents", label: "Documents", icon: FileText },
    { to: "/etudiant/ressources", label: "Ressources", icon: Library },
    { to: "/etudiant/visio", label: "Visioconférence", icon: Video },
    { to: "/etudiant/export", label: "Export PDF", icon: FileDown },
    { to: "/etudiant/messagerie", label: "Messagerie", icon: MessageSquare },
    { to: "/etudiant/profil", label: "Profil", icon: User },
  ],
  accompagnateur: [
    { to: "/accompagnateur", label: "Dashboard", icon: LayoutDashboard },
    { to: "/accompagnateur/etudiants", label: "Mes étudiants", icon: Users },
    { to: "/accompagnateur/documents", label: "Documents", icon: FileText },
    { to: "/accompagnateur/calendrier", label: "Calendrier", icon: Calendar },
    { to: "/accompagnateur/visio", label: "Réunions", icon: Video },
    { to: "/accompagnateur/messagerie", label: "Messagerie", icon: MessageSquare },
  ],
  admin: [
    { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { to: "/admin/utilisateurs", label: "Utilisateurs", icon: Users },
    { to: "/admin/packs", label: "Packs", icon: Package },
    { to: "/admin/etapes", label: "Étapes", icon: ClipboardList },
    { to: "/admin/statistiques", label: "Statistiques", icon: BarChart3 },
    { to: "/admin/suivi", label: "Suivi global", icon: BarChart3 },
    { to: "/admin/messagerie", label: "Messagerie", icon: MessageSquare },
    { to: "/admin/parametres", label: "Paramètres", icon: Settings },
  ],
};

const roleLabels: Record<UserRole, string> = {
  etudiant: "Espace Étudiant",
  accompagnateur: "Espace Accompagnateur",
  admin: "Administration",
};

export function DashboardLayout() {
  const { role, userName, logout } = useAuth();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  if (!role) return null;
  const items = navItems[role];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const sidebarContent = (
    <>
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <div className="bg-sidebar-primary rounded-lg p-1.5 shrink-0">
            <BookOpen className="h-5 w-5 text-sidebar-primary-foreground" />
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <p className="font-poppins font-bold text-sm truncate">Clé Du Mémoire</p>
              <p className="text-xs text-sidebar-foreground/60 truncate">{roleLabels[role]}</p>
            </div>
          )}
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-1">
        {items.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === `/${role}` || item.to === "/etudiant" || item.to === "/accompagnateur" || item.to === "/admin"}
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )
            }
          >
            <item.icon className="h-5 w-5 shrink-0" />
            {!collapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="p-3 border-t border-sidebar-border space-y-1">
        {!collapsed && (
          <div className="px-3 py-2 mb-2">
            <p className="text-sm font-medium truncate">{userName}</p>
            <p className="text-xs text-sidebar-foreground/60 capitalize">{role}</p>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground w-full transition-colors"
        >
          <LogOut className="h-5 w-5 shrink-0" />
          {!collapsed && <span>Déconnexion</span>}
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen flex">
      {/* Desktop Sidebar */}
      <aside className={cn("hidden lg:flex flex-col bg-sidebar text-sidebar-foreground shrink-0 transition-all duration-300", collapsed ? "w-[72px]" : "w-64")}>
        {sidebarContent}
        <button onClick={() => setCollapsed(!collapsed)} className="p-3 border-t border-sidebar-border text-sidebar-foreground/60 hover:text-sidebar-foreground transition-colors">
          <ChevronLeft className={cn("h-5 w-5 mx-auto transition-transform", collapsed && "rotate-180")} />
        </button>
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setMobileOpen(false)} />}
      
      {/* Mobile sidebar */}
      <aside className={cn("fixed inset-y-0 left-0 z-50 flex flex-col bg-sidebar text-sidebar-foreground w-64 transform transition-transform lg:hidden", mobileOpen ? "translate-x-0" : "-translate-x-full")}>
        {sidebarContent}
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 bg-background/95 backdrop-blur border-b h-14 flex items-center px-4 gap-4">
          <button className="lg:hidden" onClick={() => setMobileOpen(true)}>
            <Menu className="h-6 w-6" />
          </button>
          <div className="flex-1" />
          <NotificationCenter />
          <Button variant="ghost" size="sm" asChild>
            <NavLink to="/" className="text-muted-foreground text-xs">← Retour au site</NavLink>
          </Button>
        </header>
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
