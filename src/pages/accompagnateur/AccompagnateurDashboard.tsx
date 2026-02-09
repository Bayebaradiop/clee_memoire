import { IndicatorCard } from "@/components/IndicatorCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockStudents, mockDocuments } from "@/lib/mock-data";
import { Users, FileText, MessageSquare, CheckCircle } from "lucide-react";
import { MemoireProgress } from "@/components/MemoireProgress";

export default function AccompagnateurDashboard() {
  const myStudents = mockStudents.filter(s => s.accompagnateurId === "a1");
  const pendingDocs = mockDocuments.filter(d => d.status === "pending").length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-poppins font-bold">Bonjour, Dr. Fatima Zahra 👋</h1>
        <p className="text-muted-foreground">Voici un résumé de votre activité.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <IndicatorCard icon={Users} title="Étudiants suivis" value={myStudents.length} />
        <IndicatorCard icon={FileText} title="Documents en attente" value={pendingDocs} />
        <IndicatorCard icon={CheckCircle} title="Étapes validées" value={5} />
        <IndicatorCard icon={MessageSquare} title="Messages" value={3} />
      </div>

      <Card>
        <CardHeader><CardTitle className="font-poppins">Progression des étudiants</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {myStudents.map(s => (
            <div key={s.id} className="p-4 rounded-lg border">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <p className="font-medium text-sm">{s.name}</p>
                  <p className="text-xs text-muted-foreground">{s.currentStep}</p>
                </div>
                <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-full font-poppins">{s.pack}</span>
              </div>
              <MemoireProgress value={s.progress} size="sm" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
