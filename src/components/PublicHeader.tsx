import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { BookOpen, Menu, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const publicLinks = [
  { to: "/", label: "Accueil" },
  { to: "/a-propos", label: "À propos" },
  { to: "/services", label: "Services" },
  { to: "/conseils", label: "Conseils" },
  { to: "/contact", label: "Contact" },
];

export function PublicHeader() {
  const { isAuthenticated, role } = useAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const dashboardPath = isAuthenticated
    ? role === "admin" ? "/admin" : role === "accompagnateur" ? "/accompagnateur" : "/etudiant"
    : null;

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b">
      <div className="container flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-primary rounded-lg p-1.5">
            <BookOpen className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-poppins font-bold text-lg text-primary">Clé Du Mémoire</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {publicLinks.map(l => (
            <Link
              key={l.to}
              to={l.to}
              className={cn(
                "text-sm font-medium transition-colors hover:text-accent",
                location.pathname === l.to ? "text-accent" : "text-muted-foreground"
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {dashboardPath ? (
            <Button asChild className="bg-warning text-warning-foreground hover:bg-warning/90 font-poppins">
              <Link to={dashboardPath}>Mon espace</Link>
            </Button>
          ) : (
            <>
              <Button variant="ghost" asChild><Link to="/connexion">Connexion</Link></Button>
              <Button asChild className="bg-warning text-warning-foreground hover:bg-warning/90 font-poppins">
                <Link to="/inscription">S'inscrire</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden border-t bg-background p-4 space-y-3 animate-fade-in">
          {publicLinks.map(l => (
            <Link key={l.to} to={l.to} className="block text-sm font-medium py-2 hover:text-accent" onClick={() => setMobileOpen(false)}>
              {l.label}
            </Link>
          ))}
          <div className="flex gap-2 pt-2">
            {dashboardPath ? (
              <Button asChild className="w-full bg-warning text-warning-foreground hover:bg-warning/90 font-poppins">
                <Link to={dashboardPath}>Mon espace</Link>
              </Button>
            ) : (
              <>
                <Button variant="outline" asChild className="flex-1"><Link to="/connexion">Connexion</Link></Button>
                <Button asChild className="flex-1 bg-warning text-warning-foreground hover:bg-warning/90 font-poppins">
                  <Link to="/inscription">S'inscrire</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
