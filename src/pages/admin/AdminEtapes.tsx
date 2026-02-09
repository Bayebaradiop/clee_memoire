import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { defaultSteps } from "@/lib/mock-data";
import { GripVertical, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { StatusBadge } from "@/components/StatusBadge";

export default function AdminEtapes() {
  const [steps, setSteps] = useState(defaultSteps);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-2xl font-poppins font-bold">Configuration des étapes</h1>
        <Button className="bg-warning text-warning-foreground hover:bg-warning/90 font-poppins" onClick={() => toast.info("Ajout (démo)")}>
          <Plus className="h-4 w-4 mr-2" /> Ajouter une étape
        </Button>
      </div>

      <Card>
        <CardHeader><CardTitle className="font-poppins">Étapes du parcours mémoire</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {steps.map((step, i) => (
            <div key={step.id} className="flex items-center gap-3 p-3 rounded-lg border hover:bg-secondary/30 transition-colors">
              <GripVertical className="h-5 w-5 text-muted-foreground shrink-0 cursor-grab" />
              <span className="font-poppins font-bold text-sm text-muted-foreground w-6">{i + 1}</span>
              <div className="flex-1">
                <p className="font-medium text-sm">{step.title}</p>
                <p className="text-xs text-muted-foreground">{step.description}</p>
              </div>
              <Button variant="ghost" size="icon" className="shrink-0 text-destructive" onClick={() => toast.info("Suppression (démo)")}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
