import { IndicatorCard } from "@/components/IndicatorCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockStudents, mockAccompagnateurs } from "@/lib/mock-data";
import { Users, GraduationCap, BarChart3, Package } from "lucide-react";
import { MemoireProgress } from "@/components/MemoireProgress";

export default function AdminDashboard() {
  const avgProgress = Math.round(mockStudents.reduce((a, s) => a + s.progress, 0) / mockStudents.length);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-poppins font-bold">Tableau de bord</h1>
        <p className="text-muted-foreground">Vue d'ensemble de la plateforme.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <IndicatorCard icon={GraduationCap} title="Étudiants" value={mockStudents.length} />
        <IndicatorCard icon={Users} title="Accompagnateurs" value={mockAccompagnateurs.length} />
        <IndicatorCard icon={BarChart3} title="Progression moy." value={`${avgProgress}%`} />
        <IndicatorCard icon={Package} title="Packs actifs" value={3} />
      </div>

      <Card>
        <CardHeader><CardTitle className="font-poppins">Tous les étudiants</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {mockStudents.map(s => (
            <div key={s.id} className="flex items-center justify-between p-3 rounded-lg border">
              <div>
                <p className="font-medium text-sm">{s.name}</p>
                <p className="text-xs text-muted-foreground">{s.currentStep} · {s.pack}</p>
              </div>
              <div className="w-32"><MemoireProgress value={s.progress} size="sm" /></div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
