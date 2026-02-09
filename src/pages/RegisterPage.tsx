import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { BookOpen } from "lucide-react";
import type { UserRole } from "@/lib/mock-data";
import { toast } from "sonner";

export default function RegisterPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [role] = useState<UserRole>("etudiant"); // Seuls les étudiants peuvent s'inscrire

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(role);
    toast.success("Inscription réussie !");
    navigate("/etudiant");
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <div className="bg-primary rounded-xl p-2 w-fit mx-auto mb-4">
              <BookOpen className="h-8 w-8 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-poppins font-bold">Inscription</h1>
            <p className="text-sm text-muted-foreground mt-1">Créez votre compte</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Prénom</Label>
                <Input id="firstName" placeholder="Prénom" required maxLength={50} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Nom</Label>
                <Input id="lastName" placeholder="Nom" required maxLength={50} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="votre@email.com" required maxLength={255} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Mot de passe</Label>
              <Input id="password" type="password" placeholder="••••••••" required />
            </div>
            <Button type="submit" className="w-full bg-warning text-warning-foreground hover:bg-warning/90 font-poppins">
              S'inscrire
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Déjà un compte ?{" "}
            <Link to="/connexion" className="text-accent hover:underline font-medium">Se connecter</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
