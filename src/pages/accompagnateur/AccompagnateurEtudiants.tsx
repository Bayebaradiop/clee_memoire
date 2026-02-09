import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { mockStudents } from "@/lib/mock-data";
import { MemoireProgress } from "@/components/MemoireProgress";

export default function AccompagnateurEtudiants() {
  const myStudents = mockStudents.filter(s => s.accompagnateurId === "a1");

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-poppins font-bold">Mes étudiants</h1>
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Étape actuelle</TableHead>
                <TableHead>Pack</TableHead>
                <TableHead className="w-[200px]">Progression</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {myStudents.map(s => (
                <TableRow key={s.id}>
                  <TableCell>
                    <p className="font-medium">{s.name}</p>
                    <p className="text-xs text-muted-foreground">{s.email}</p>
                  </TableCell>
                  <TableCell className="text-sm">{s.currentStep}</TableCell>
                  <TableCell><span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-full font-poppins">{s.pack}</span></TableCell>
                  <TableCell><MemoireProgress value={s.progress} size="sm" /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
