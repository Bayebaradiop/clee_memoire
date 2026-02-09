import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Video, 
  Calendar as CalendarIcon, 
  Clock, 
  Plus, 
  CheckCircle2,
  XCircle,
  Users
} from "lucide-react";
import { format, addDays } from "date-fns";
import { fr } from "date-fns/locale";
import { toast } from "sonner";
import { mockStudents } from "@/lib/mock-data";
import { useNotifications } from "@/contexts/NotificationContext";

interface Meeting {
  id: string;
  studentId: string;
  studentName: string;
  title: string;
  date: Date;
  duration: number;
  status: "proposed" | "confirmed" | "completed" | "cancelled";
  notes?: string;
}

const mockMeetings: Meeting[] = [
  {
    id: "1",
    studentId: "s1",
    studentName: "Alice Kouassi",
    title: "Révision du plan détaillé",
    date: addDays(new Date(), 2),
    duration: 60,
    status: "confirmed"
  },
  {
    id: "2",
    studentId: "s2",
    studentName: "Bob Traoré",
    title: "Point d'avancement",
    date: addDays(new Date(), 5),
    duration: 30,
    status: "proposed"
  },
];

export default function AccompagnateurVisio() {
  const [openSchedule, setOpenSchedule] = useState(false);
  const myStudents = mockStudents.filter(s => s.accompagnateurId === "a1");
  const { addNotification } = useNotifications();

  const handleProposeMeeting = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simuler l'envoi d'une notification à l'étudiant
    addNotification({
      title: "Nouvelle proposition de réunion",
      message: "Votre accompagnateur vous propose une nouvelle réunion. Veuillez confirmer ou proposer un autre créneau.",
      type: "meeting",
      link: "/etudiant/visio"
    });
    
    toast.success("Proposition de réunion envoyée à l'étudiant !");
    setOpenSchedule(false);
  };

  const confirmedMeetings = mockMeetings.filter(m => m.status === "confirmed");
  const proposedMeetings = mockMeetings.filter(m => m.status === "proposed");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-poppins font-bold">Gestion des réunions</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Planifiez et gérez vos réunions avec vos étudiants
          </p>
        </div>
        <Dialog open={openSchedule} onOpenChange={setOpenSchedule}>
          <DialogTrigger asChild>
            <Button className="bg-warning text-warning-foreground hover:bg-warning/90">
              <Plus className="h-4 w-4 mr-2" /> Proposer une réunion
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Proposer une réunion</DialogTitle>
              <DialogDescription>
                L'étudiant recevra une notification et pourra confirmer le créneau
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleProposeMeeting} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="student">Étudiant</Label>
                <Select required>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un étudiant" />
                  </SelectTrigger>
                  <SelectContent>
                    {myStudents.map(student => (
                      <SelectItem key={student.id} value={student.id}>
                        {student.name} - {student.pack}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">Objet de la réunion</Label>
                <Input 
                  id="title" 
                  placeholder="Ex: Point d'avancement mensuel" 
                  required 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input id="date" type="date" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Heure</Label>
                  <Input id="time" type="time" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Durée (minutes)</Label>
                <Select defaultValue="60">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="45">45 minutes</SelectItem>
                    <SelectItem value="60">1 heure</SelectItem>
                    <SelectItem value="90">1h30</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes (optionnel)</Label>
                <Textarea 
                  id="notes" 
                  placeholder="Points à aborder, documents à préparer..."
                  className="resize-none"
                />
              </div>
              <Button type="submit" className="w-full bg-warning text-warning-foreground hover:bg-warning/90">
                Envoyer la proposition
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistiques */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-green-100 dark:bg-green-950 flex items-center justify-center">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{confirmedMeetings.length}</p>
              <p className="text-xs text-muted-foreground">Confirmées</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-orange-100 dark:bg-orange-950 flex items-center justify-center">
              <Clock className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{proposedMeetings.length}</p>
              <p className="text-xs text-muted-foreground">En attente</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-950 flex items-center justify-center">
              <Users className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{myStudents.length}</p>
              <p className="text-xs text-muted-foreground">Étudiants</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Liste des réunions */}
      <Tabs defaultValue="confirmed" className="space-y-4">
        <TabsList>
          <TabsTrigger value="confirmed">
            Confirmées ({confirmedMeetings.length})
          </TabsTrigger>
          <TabsTrigger value="proposed">
            Proposées ({proposedMeetings.length})
          </TabsTrigger>
          <TabsTrigger value="history">Historique</TabsTrigger>
        </TabsList>

        <TabsContent value="confirmed" className="space-y-4">
          {confirmedMeetings.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">Aucune réunion confirmée</p>
              </CardContent>
            </Card>
          ) : (
            confirmedMeetings.map(meeting => (
              <Card key={meeting.id} className="border-green-200 bg-green-50/50 dark:bg-green-950/10">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="bg-green-100 dark:bg-green-950 rounded-lg p-2">
                        <Video className="h-5 w-5 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold">{meeting.title}</h4>
                          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            Confirmée
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          Avec {meeting.studentName}
                        </p>
                        <div className="flex items-center gap-3 text-sm">
                          <span className="flex items-center gap-1">
                            <CalendarIcon className="h-3.5 w-3.5" />
                            {format(meeting.date, "d MMMM yyyy", { locale: fr })}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" />
                            {meeting.duration} min
                          </span>
                        </div>
                        {meeting.notes && (
                          <p className="text-sm text-muted-foreground mt-2 italic">
                            📝 {meeting.notes}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        Modifier
                      </Button>
                      <Button size="sm" className="bg-primary">
                        <Video className="h-3.5 w-3.5 mr-1" /> Démarrer
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="proposed" className="space-y-4">
          {proposedMeetings.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">Aucune proposition en attente</p>
              </CardContent>
            </Card>
          ) : (
            proposedMeetings.map(meeting => (
              <Card key={meeting.id} className="border-orange-200 bg-orange-50/50 dark:bg-orange-950/10">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="bg-orange-100 dark:bg-orange-950 rounded-lg p-2">
                        <Clock className="h-5 w-5 text-orange-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold">{meeting.title}</h4>
                          <Badge variant="outline" className="bg-orange-100 text-orange-800 border-orange-200">
                            En attente de confirmation
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          Proposée à {meeting.studentName}
                        </p>
                        <div className="flex items-center gap-3 text-sm">
                          <span className="flex items-center gap-1">
                            <CalendarIcon className="h-3.5 w-3.5" />
                            {format(meeting.date, "d MMMM yyyy", { locale: fr })}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" />
                            {meeting.duration} min
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => toast.info("Réunion annulée")}
                      >
                        <XCircle className="h-3.5 w-3.5 mr-1" /> Annuler
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">Aucune réunion passée</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
