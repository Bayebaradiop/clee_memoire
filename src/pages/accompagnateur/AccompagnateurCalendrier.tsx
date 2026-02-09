import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar as CalendarIcon, Clock, Users, Plus, AlertCircle } from "lucide-react";
import { format, addDays } from "date-fns";
import { fr } from "date-fns/locale";
import { toast } from "sonner";
import { mockStudents } from "@/lib/mock-data";
import { useNotifications } from "@/contexts/NotificationContext";

interface Deadline {
  id: string;
  studentId: string;
  studentName: string;
  title: string;
  date: Date;
  type: "submission" | "meeting" | "revision";
}

const mockDeadlines: Deadline[] = [
  {
    id: "1",
    studentId: "s1",
    studentName: "Alice Kouassi",
    title: "Soumission plan détaillé",
    date: addDays(new Date(), 3),
    type: "submission"
  },
  {
    id: "2",
    studentId: "s2",
    studentName: "Bob Traoré",
    title: "Révision bibliographie",
    date: addDays(new Date(), 2),
    type: "revision"
  },
  {
    id: "3",
    studentId: "s1",
    studentName: "Alice Kouassi",
    title: "Réunion mensuelle",
    date: addDays(new Date(), 7),
    type: "meeting"
  },
];

export default function AccompagnateurCalendrier() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [openDialog, setOpenDialog] = useState(false);
  const myStudents = mockStudents.filter(s => s.accompagnateurId === "a1");
  const { addNotification } = useNotifications();

  const handleAddDeadline = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Envoyer une notification à l'étudiant
    addNotification({
      title: "Nouvelle échéance définie",
      message: "Votre accompagnateur a défini une nouvelle échéance pour votre mémoire",
      type: "deadline",
      link: "/etudiant/calendrier"
    });
    
    toast.success("Échéance ajoutée pour l'étudiant !");
    setOpenDialog(false);
  };

  const deadlinesByStudent = myStudents.map(student => {
    const studentDeadlines = mockDeadlines.filter(d => d.studentId === student.id);
    return {
      student,
      deadlines: studentDeadlines,
      urgent: studentDeadlines.filter(d => 
        (d.date.getTime() - new Date().getTime()) < 3 * 24 * 60 * 60 * 1000
      ).length
    };
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-poppins font-bold">Calendrier de suivi</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Gérez les échéances de vos {myStudents.length} étudiants
          </p>
        </div>
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <Button className="bg-warning text-warning-foreground hover:bg-warning/90">
              <Plus className="h-4 w-4 mr-2" /> Ajouter une échéance
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Définir une échéance</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddDeadline} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="student">Étudiant</Label>
                <Select required>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un étudiant" />
                  </SelectTrigger>
                  <SelectContent>
                    {myStudents.map(student => (
                      <SelectItem key={student.id} value={student.id}>
                        {student.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">Titre</Label>
                <Input id="title" placeholder="Ex: Soumission du chapitre 1" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Select required>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="submission">Soumission</SelectItem>
                    <SelectItem value="meeting">Réunion</SelectItem>
                    <SelectItem value="revision">Révision</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Date limite</Label>
                <Input id="date" type="date" required />
              </div>
              <Button type="submit" className="w-full bg-warning text-warning-foreground hover:bg-warning/90">
                Définir l'échéance
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Calendrier */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Vue calendrier</CardTitle>
            <CardDescription className="text-xs">
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                  <span className="text-xs">Urgent (&lt; 3j)</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  <span className="text-xs">Échéances</span>
                </span>
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              locale={fr}
              className="rounded-md border"
              modifiers={{
                urgent: mockDeadlines.filter(d => {
                  const daysLeft = Math.ceil((d.date.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                  return daysLeft > 0 && daysLeft <= 3;
                }).map(d => d.date),
                deadline: mockDeadlines.filter(d => {
                  const daysLeft = Math.ceil((d.date.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                  return daysLeft > 3;
                }).map(d => d.date),
              }}
              modifiersClassNames={{
                urgent: "bg-orange-100 dark:bg-orange-900 text-orange-900 dark:text-orange-100 font-bold",
                deadline: "bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100",
              }}
            />
          </CardContent>
        </Card>

        {/* Échéances par étudiant */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="h-5 w-5" />
                Échéances par étudiant
              </CardTitle>
              <CardDescription>
                Vue d'ensemble des deadlines de vos étudiants
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {deadlinesByStudent.map(({ student, deadlines, urgent }) => (
                <Card key={student.id} className={urgent > 0 ? "border-orange-200" : ""}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold flex items-center gap-2">
                          {student.name}
                          {urgent > 0 && (
                            <Badge variant="destructive" className="text-xs">
                              {urgent} urgent{urgent > 1 ? 's' : ''}
                            </Badge>
                          )}
                        </h4>
                        <p className="text-sm text-muted-foreground">{student.pack}</p>
                      </div>
                      <Badge variant="secondary">{deadlines.length} échéance{deadlines.length > 1 ? 's' : ''}</Badge>
                    </div>
                    
                    {deadlines.length === 0 ? (
                      <p className="text-sm text-muted-foreground text-center py-4">
                        Aucune échéance définie
                      </p>
                    ) : (
                      <div className="space-y-2">
                        {deadlines.map(deadline => {
                          const daysLeft = Math.ceil((deadline.date.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                          const isUrgent = daysLeft <= 3;
                          
                          return (
                            <div 
                              key={deadline.id}
                              className={`flex items-center justify-between p-2 rounded-lg border text-sm ${
                                isUrgent ? "bg-orange-50 dark:bg-orange-950/10 border-orange-200" : ""
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                {isUrgent && <AlertCircle className="h-4 w-4 text-orange-600" />}
                                <span className="font-medium">{deadline.title}</span>
                              </div>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <CalendarIcon className="h-3 w-3" />
                                <span>{format(deadline.date, "d MMM", { locale: fr })}</span>
                                {isUrgent && (
                                  <Badge variant="outline" className="text-xs border-orange-300 text-orange-700">
                                    {daysLeft}j
                                  </Badge>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
