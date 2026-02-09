import { IndicatorCard } from "@/components/IndicatorCard";
import { MemoireProgress } from "@/components/MemoireProgress";
import { MemoireTimeline } from "@/components/MemoireTimeline";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { defaultSteps, mockDocuments, mockConversations } from "@/lib/mock-data";
import { BookOpen, FileText, MessageSquare, Clock } from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";

export default function StudentDashboard() {
  const progress = 42;
  const currentStep = defaultSteps.find(s => s.status === "in_progress");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-poppins font-bold">Bonjour, Amina 👋</h1>
        <p className="text-muted-foreground">Voici l'état d'avancement de votre mémoire.</p>
      </div>

      <MemoireProgress value={progress} label="Progression globale" size="lg" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <IndicatorCard icon={BookOpen} title="Étape actuelle" value={currentStep?.title || "-"} />
        <IndicatorCard icon={Clock} title="Étapes restantes" value={defaultSteps.filter(s => s.status === "pending").length} />
        <IndicatorCard icon={FileText} title="Documents soumis" value={mockDocuments.length} />
        <IndicatorCard icon={MessageSquare} title="Messages non lus" value={mockConversations.reduce((a, c) => a + c.unreadCount, 0)} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle className="text-lg font-poppins">Derniers documents</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {mockDocuments.slice(0, 3).map(doc => (
              <div key={doc.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-accent" />
                  <div>
                    <p className="text-sm font-medium">{doc.name}</p>
                    <p className="text-xs text-muted-foreground">{doc.uploadedAt}</p>
                  </div>
                </div>
                <StatusBadge status={doc.status === "approved" ? "completed" : doc.status === "rejected" ? "to_correct" : doc.status === "reviewed" ? "in_progress" : "pending"} />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-lg font-poppins">Parcours mémoire</CardTitle></CardHeader>
          <CardContent>
            <MemoireTimeline steps={defaultSteps.slice(0, 4)} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
