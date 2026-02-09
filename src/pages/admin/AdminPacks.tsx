import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockPacks } from "@/lib/mock-data";
import { CheckCircle, Plus, Edit } from "lucide-react";
import { toast } from "sonner";

export default function AdminPacks() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-2xl font-poppins font-bold">Gestion des packs</h1>
        <Button className="bg-warning text-warning-foreground hover:bg-warning/90 font-poppins" onClick={() => toast.info("Ajout (démo)")}>
          <Plus className="h-4 w-4 mr-2" /> Nouveau pack
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mockPacks.map(pack => (
          <Card key={pack.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-poppins font-bold text-xl">{pack.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{pack.description}</p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => toast.info("Édition (démo)")}>
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-3xl font-poppins font-bold mt-4">{pack.price}€</p>
              <ul className="mt-4 space-y-2">
                {pack.features.map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-success shrink-0" /> {f}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
