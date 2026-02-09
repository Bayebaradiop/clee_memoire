import { MemoireTimeline } from "@/components/MemoireTimeline";
import { defaultSteps } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MemoireProgress } from "@/components/MemoireProgress";

export default function StudentSuivi() {
  const completed = defaultSteps.filter(s => s.status === "completed").length;
  const progress = Math.round((completed / defaultSteps.length) * 100);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-poppins font-bold">Suivi du mémoire</h1>
      <MemoireProgress value={progress} label="Progression globale" size="lg" />
      <Card>
        <CardHeader><CardTitle className="font-poppins">Étapes du parcours</CardTitle></CardHeader>
        <CardContent>
          <MemoireTimeline steps={defaultSteps} />
        </CardContent>
      </Card>
    </div>
  );
}
