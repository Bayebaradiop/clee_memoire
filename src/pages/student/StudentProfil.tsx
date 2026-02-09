import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function StudentProfil() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-poppins font-bold">Mon profil</h1>
      <Card>
        <CardHeader><CardTitle className="font-poppins">Informations personnelles</CardTitle></CardHeader>
        <CardContent>
          <form className="space-y-4 max-w-lg" onSubmit={e => { e.preventDefault(); toast.success("Profil mis à jour (démo)"); }}>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Prénom</Label><Input defaultValue="Amina" /></div>
              <div className="space-y-2"><Label>Nom</Label><Input defaultValue="Diallo" /></div>
            </div>
            <div className="space-y-2"><Label>Email</Label><Input type="email" defaultValue="amina@email.com" /></div>
            <div className="space-y-2"><Label>Université</Label><Input defaultValue="Université Paris 8" /></div>
            <Button type="submit" className="bg-warning text-warning-foreground hover:bg-warning/90 font-poppins">Sauvegarder</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
