import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Calendar as CalendarIcon, Clock, AlertCircle, CheckCircle2, Plus, Edit, Trash2 } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format, addDays, differenceInDays, isBefore, isToday } from "date-fns";
import { fr } from "date-fns/locale";
import { toast } from "sonner";

interface Deadline {
  id: string;
  title: string;
  description: string;
  date: Date;
  type: "step" | "meeting" | "revision" | "submission";
  completed: boolean;
  stepId?: string;
}

const mockDeadlines: Deadline[] = [
  {
    id: "1",
    title: "Soumission du plan détaillé",
    description: "Date limite pour soumettre votre plan détaillé du mémoire",
    date: addDays(new Date(), 3),
    type: "submission",
    completed: false,
    stepId: "3"
  },
  {
    id: "2",
    title: "Réunion avec l'accompagnateur",
    description: "Point d'avancement mensuel",
    date: addDays(new Date(), 7),
    type: "meeting",
    completed: false,
  },
  {
    id: "3",
    title: "Révision bibliographie",
    description: "Intégrer les feedbacks reçus",
    date: addDays(new Date(), 2),
    type: "revision",
    completed: false,
  },
  {
    id: "4",
    title: "Fin de l'étape 'Recherche bibliographique'",
    description: "Validation complète de l'étape",
    date: addDays(new Date(), -2),
    type: "step",
    completed: true,
  },
];

const typeColors = {
  step: "bg-blue-100 text-blue-800 border-blue-200",
  meeting: "bg-purple-100 text-purple-800 border-purple-200",
  revision: "bg-orange-100 text-orange-800 border-orange-200",
  submission: "bg-green-100 text-green-800 border-green-200",
};

const typeLabels = {
  step: "Étape",
  meeting: "Réunion",
  revision: "Révision",
  submission: "Soumission",
};

export default function CalendrierPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [deadlines, setDeadlines] = useState<Deadline[]>(mockDeadlines);
  const [openDialog, setOpenDialog] = useState(false);

  const today = new Date();
  const upcomingDeadlines = deadlines
    .filter(d => !d.completed && !isBefore(d.date, today))
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  const overdueDeadlines = deadlines.filter(d => !d.completed && isBefore(d.date, today));

  const completedDeadlines = deadlines
    .filter(d => d.completed)
    .sort((a, b) => b.date.getTime() - a.date.getTime());

  const getDaysUntil = (date: Date) => {
    const days = differenceInDays(date, today);
    if (days === 0) return "Aujourd'hui";
    if (days === 1) return "Demain";
    if (days < 0) return `En retard de ${Math.abs(days)} jour${Math.abs(days) > 1 ? 's' : ''}`;
    return `Dans ${days} jour${days > 1 ? 's' : ''}`;
  };

  const toggleComplete = (id: string) => {
    setDeadlines(prev =>
      prev.map(d => d.id === id ? { ...d, completed: !d.completed } : d)
    );
    toast.success("Statut mis à jour");
  };

  const handleAddDeadline = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Échéance ajoutée avec succès !");
    setOpenDialog(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-poppins font-bold">Calendrier & Échéances</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Suivez vos échéances et ajoutez vos rappels personnels
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
              <DialogTitle>Ajouter un rappel personnel</DialogTitle>
              <DialogDescription>
                Ajoutez vos propres échéances personnelles. Les échéances officielles sont définies par votre accompagnateur.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddDeadline} className="space-y-4">
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
                    <SelectItem value="submission">Soumission personnelle</SelectItem>
                    <SelectItem value="revision">Révision</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">Les étapes officielles et réunions sont définies par votre accompagnateur</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Date limite</Label>
                <Input id="date" type="date" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description (optionnel)</Label>
                <Textarea id="description" placeholder="Détails supplémentaires..." />
              </div>
              <Button type="submit" className="w-full bg-warning text-warning-foreground hover:bg-warning/90">
                Ajouter
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Alertes critiques */}
      {overdueDeadlines.length > 0 && (
        <Alert className="border-red-200 bg-red-50 dark:bg-red-950/20">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800 dark:text-red-200">
            <strong>{overdueDeadlines.length}</strong> échéance{overdueDeadlines.length > 1 ? 's' : ''} en retard !
          </AlertDescription>
        </Alert>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Calendrier */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">Calendrier</CardTitle>
            <CardDescription className="text-xs">
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-red-500"></span>
                  <span className="text-xs">En retard</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                  <span className="text-xs">Urgent</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  <span className="text-xs">À venir</span>
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
                overdue: overdueDeadlines.map(d => d.date),
                urgent: upcomingDeadlines.filter(d => differenceInDays(d.date, today) <= 3).map(d => d.date),
                upcoming: upcomingDeadlines.filter(d => differenceInDays(d.date, today) > 3).map(d => d.date),
              }}
              modifiersClassNames={{
                overdue: "bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-100 font-bold",
                urgent: "bg-orange-100 dark:bg-orange-900 text-orange-900 dark:text-orange-100 font-semibold",
                upcoming: "bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100",
              }}
            />
          </CardContent>
        </Card>

        {/* Timeline */}
        <div className="lg:col-span-2 space-y-6">
          {/* En retard */}
          {overdueDeadlines.length > 0 && (
            <Card className="border-red-200">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-red-600" />
                  <CardTitle className="text-lg text-red-700">En retard</CardTitle>
                  <Badge variant="destructive">{overdueDeadlines.length}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {overdueDeadlines.map(deadline => (
                  <Card key={deadline.id} className="bg-red-50 dark:bg-red-950/10 border-red-200">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-start gap-3">
                            <input
                              type="checkbox"
                              checked={deadline.completed}
                              onChange={() => toggleComplete(deadline.id)}
                              className="mt-1 h-4 w-4 rounded border-gray-300"
                            />
                            <div className="flex-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <h4 className="font-semibold">{deadline.title}</h4>
                                <Badge variant="outline" className={typeColors[deadline.type]}>
                                  {typeLabels[deadline.type]}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mt-1">{deadline.description}</p>
                              <div className="flex items-center gap-2 mt-2 text-sm">
                                <CalendarIcon className="h-3.5 w-3.5 text-red-600" />
                                <span className="font-medium text-red-700">
                                  {format(deadline.date, "d MMMM yyyy", { locale: fr })}
                                </span>
                                <span className="text-red-600">• {getDaysUntil(deadline.date)}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          )}

          {/* À venir */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">Prochaines échéances</CardTitle>
                <Badge variant="secondary">{upcomingDeadlines.length}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingDeadlines.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  Aucune échéance à venir
                </p>
              ) : (
                upcomingDeadlines.map(deadline => {
                  const daysLeft = differenceInDays(deadline.date, today);
                  const isUrgent = daysLeft <= 3;

                  return (
                    <Card key={deadline.id} className={isUrgent ? "border-orange-200 bg-orange-50/50 dark:bg-orange-950/10" : ""}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <div className="flex items-start gap-3">
                              <input
                                type="checkbox"
                                checked={deadline.completed}
                                onChange={() => toggleComplete(deadline.id)}
                                className="mt-1 h-4 w-4 rounded border-gray-300"
                              />
                              <div className="flex-1">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <h4 className="font-semibold">{deadline.title}</h4>
                                  <Badge variant="outline" className={typeColors[deadline.type]}>
                                    {typeLabels[deadline.type]}
                                  </Badge>
                                  {isUrgent && <Badge variant="destructive">Urgent</Badge>}
                                </div>
                                <p className="text-sm text-muted-foreground mt-1">{deadline.description}</p>
                                <div className="flex items-center gap-2 mt-2 text-sm">
                                  <CalendarIcon className="h-3.5 w-3.5" />
                                  <span className="font-medium">
                                    {format(deadline.date, "d MMMM yyyy", { locale: fr })}
                                  </span>
                                  <span className={isUrgent ? "text-orange-600 font-medium" : "text-muted-foreground"}>
                                    • {getDaysUntil(deadline.date)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })
              )}
            </CardContent>
          </Card>

          {/* Terminées */}
          {completedDeadlines.length > 0 && (
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <CardTitle className="text-lg">Terminées</CardTitle>
                  <Badge variant="secondary">{completedDeadlines.length}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {completedDeadlines.slice(0, 3).map(deadline => (
                  <Card key={deadline.id} className="opacity-60">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="font-medium line-through">{deadline.title}</h4>
                            <Badge variant="outline" className={typeColors[deadline.type]}>
                              {typeLabels[deadline.type]}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            Complété le {format(deadline.date, "d MMMM yyyy", { locale: fr })}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
