import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function AdminParametres() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-poppins font-bold">Paramètres</h1>
      <Card>
        <CardHeader><CardTitle className="font-poppins">Général</CardTitle></CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <Label className="font-medium">Inscriptions ouvertes</Label>
              <p className="text-xs text-muted-foreground">Autoriser les nouveaux étudiants à s'inscrire</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label className="font-medium">Notifications email</Label>
              <p className="text-xs text-muted-foreground">Envoyer des emails de notification</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label className="font-medium">Mode maintenance</Label>
              <p className="text-xs text-muted-foreground">Mettre l'application en maintenance</p>
            </div>
            <Switch />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
