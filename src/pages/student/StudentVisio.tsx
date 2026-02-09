import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Monitor, 
  MonitorOff,
  PhoneOff,
  Calendar,
  Clock,
  Users,
  Plus,
  Settings,
  CheckCircle2
} from "lucide-react";
import { format, addDays } from "date-fns";
import { fr } from "date-fns/locale";
import { toast } from "sonner";

interface Meeting {
  id: string;
  title: string;
  participant: string;
  date: Date;
  duration: number;
  status: "proposed" | "confirmed" | "completed" | "cancelled";
  link?: string;
  notes?: string;
}

const mockMeetings: Meeting[] = [
  {
    id: "1",
    title: "Révision du plan détaillé",
    participant: "Dr. Sophie Martin",
    date: addDays(new Date(), 2),
    duration: 60,
    status: "proposed",
    notes: "Discussion sur la structure et les ajustements nécessaires"
  },
  {
    id: "2",
    title: "Point d'avancement mensuel",
    participant: "Dr. Sophie Martin",
    date: addDays(new Date(), 7),
    duration: 30,
    status: "confirmed"
  },
];

export default function Visio() {
  const [inCall, setInCall] = useState(false);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [screenShare, setScreenShare] = useState(false);
  const [openSchedule, setOpenSchedule] = useState(false);

  const startCall = () => {
    setInCall(true);
    toast.success("Connexion en cours...");
  };

  const endCall = () => {
    setInCall(false);
    toast.info("Appel terminé");
  };

  const handleSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Demande de réunion envoyée à votre accompagnateur !");
    setOpenSchedule(false);
  };

  if (inCall) {
    return (
      <div className="fixed inset-0 bg-black z-50 flex flex-col">
        {/* Zone vidéo */}
        <div className="flex-1 relative">
          {/* Vidéo principale */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
            <div className="text-center text-white">
              <div className="bg-white/10 rounded-full p-8 inline-block mb-4">
                <Users className="h-24 w-24" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Dr. Sophie Martin</h2>
              <p className="text-white/70">En appel...</p>
            </div>
          </div>

          {/* Vidéo locale (miniature) */}
          <div className="absolute top-4 right-4 w-64 h-48 bg-gray-800 rounded-lg border-2 border-white/20 overflow-hidden">
            <div className="w-full h-full bg-gradient-to-br from-blue-900 to-blue-800 flex items-center justify-center">
              {videoEnabled ? (
                <div className="text-white text-center">
                  <div className="bg-white/10 rounded-full p-4 inline-block">
                    <Users className="h-12 w-12" />
                  </div>
                  <p className="mt-2 text-sm">Vous</p>
                </div>
              ) : (
                <div className="text-white text-center">
                  <VideoOff className="h-12 w-12 mx-auto mb-2" />
                  <p className="text-sm">Caméra désactivée</p>
                </div>
              )}
            </div>
          </div>

          {/* Indicateur de partage d'écran */}
          {screenShare && (
            <div className="absolute top-4 left-4">
              <Badge className="bg-red-600 text-white">
                <Monitor className="h-3 w-3 mr-1" />
                Partage d'écran actif
              </Badge>
            </div>
          )}

          {/* Timer */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2">
            <Badge variant="secondary" className="bg-black/50 text-white backdrop-blur">
              <Clock className="h-3 w-3 mr-1" />
              12:34
            </Badge>
          </div>
        </div>

        {/* Contrôles */}
        <div className="bg-gray-900 p-6">
          <div className="max-w-2xl mx-auto flex items-center justify-center gap-4">
            <Button
              size="lg"
              variant={audioEnabled ? "secondary" : "destructive"}
              className="rounded-full w-14 h-14 p-0"
              onClick={() => setAudioEnabled(!audioEnabled)}
            >
              {audioEnabled ? <Mic className="h-6 w-6" /> : <MicOff className="h-6 w-6" />}
            </Button>

            <Button
              size="lg"
              variant={videoEnabled ? "secondary" : "destructive"}
              className="rounded-full w-14 h-14 p-0"
              onClick={() => setVideoEnabled(!videoEnabled)}
            >
              {videoEnabled ? <Video className="h-6 w-6" /> : <VideoOff className="h-6 w-6" />}
            </Button>

            <Button
              size="lg"
              variant={screenShare ? "default" : "secondary"}
              className="rounded-full w-14 h-14 p-0"
              onClick={() => {
                setScreenShare(!screenShare);
                toast.info(screenShare ? "Partage d'écran arrêté" : "Partage d'écran démarré");
              }}
            >
              {screenShare ? <MonitorOff className="h-6 w-6" /> : <Monitor className="h-6 w-6" />}
            </Button>

            <Button
              size="lg"
              variant="destructive"
              className="rounded-full w-14 h-14 p-0"
              onClick={endCall}
            >
              <PhoneOff className="h-6 w-6" />
            </Button>

            <Button
              size="lg"
              variant="ghost"
              className="rounded-full w-14 h-14 p-0 text-white hover:bg-white/10"
            >
              <Settings className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-poppins font-bold flex items-center gap-2">
            <Video className="h-6 w-6" />
            Visioconférence
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Demandez des réunions et rejoignez vos sessions avec votre accompagnateur
          </p>
        </div>
        <Dialog open={openSchedule} onOpenChange={setOpenSchedule}>
          <DialogTrigger asChild>
            <Button className="bg-warning text-warning-foreground hover:bg-warning/90">
              <Plus className="h-4 w-4 mr-2" /> Demander une réunion
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Demander une réunion</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSchedule} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Titre de la réunion</Label>
                <Input id="title" placeholder="Ex: Point d'avancement" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="participant">Participant</Label>
                <Input id="participant" value="Dr. Sophie Martin" disabled className="bg-muted" />
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
                <Label htmlFor="duration">Durée souhaitée (minutes)</Label>
                <Input id="duration" type="number" defaultValue="60" min="15" max="180" step="15" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Motif de la réunion</Label>
                <Textarea id="notes" placeholder="Précisez les points à discuter..." className="resize-none" />
              </div>
              <Button type="submit" className="w-full bg-warning text-warning-foreground hover:bg-warning/90">
                Envoyer la demande
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Démarrage rapide */}
      <Card className="border-primary/50 bg-gradient-to-br from-primary/5 to-accent/5">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-lg mb-2">Démarrer un appel instantané</h3>
              <p className="text-sm text-muted-foreground">
                Lancez une session vidéo avec votre accompagnateur
              </p>
            </div>
            <Button size="lg" onClick={startCall} className="bg-primary">
              <Video className="h-5 w-5 mr-2" />
              Démarrer l'appel
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Réunions proposées et confirmées */}
      <div className="grid gap-6">
        {/* Réunions proposées (en attente de confirmation) */}
        {mockMeetings.filter(m => m.status === "proposed").length > 0 && (
          <Card className="border-orange-200 bg-orange-50/50 dark:bg-orange-950/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-700 dark:text-orange-400">
                <Clock className="h-5 w-5" />
                Réunions proposées par votre accompagnateur
              </CardTitle>
              <CardDescription>
                Confirmez le créneau ou proposez une alternative si vous n'êtes pas disponible
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockMeetings.filter(m => m.status === "proposed").map(meeting => (
                <Card key={meeting.id} className="bg-white dark:bg-gray-950">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-4 flex-wrap">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="bg-orange-100 dark:bg-orange-950 rounded-lg p-2">
                          <Calendar className="h-5 w-5 text-orange-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold">{meeting.title}</h4>
                            <Badge variant="outline" className="border-orange-300 text-orange-700 bg-orange-50">
                              En attente
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{meeting.participant}</p>
                          {meeting.notes && (
                            <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">
                              📝 {meeting.notes}
                            </p>
                          )}
                          <div className="flex items-center gap-3 mt-2 text-sm">
                            <span className="flex items-center gap-1 text-muted-foreground">
                              <Calendar className="h-3.5 w-3.5" />
                              {format(meeting.date, "d MMMM yyyy 'à' HH'h'mm", { locale: fr })}
                            </span>
                            <span className="flex items-center gap-1 text-muted-foreground">
                              <Clock className="h-3.5 w-3.5" />
                              {meeting.duration} min
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => {
                            setOpenSchedule(true);
                            toast.info("Proposez un créneau alternatif");
                          }}
                        >
                          <Calendar className="h-3.5 w-3.5 mr-1" />
                          Proposer un autre créneau
                        </Button>
                        <Button 
                          size="sm" 
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => toast.success("Réunion confirmée !")}
                        >
                          <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                          Confirmer ce créneau
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Réunions confirmées */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Réunions confirmées
            </CardTitle>
            <CardDescription>
              {mockMeetings.filter(m => m.status === "confirmed").length} réunion{mockMeetings.filter(m => m.status === "confirmed").length > 1 ? "s" : ""} confirmée{mockMeetings.filter(m => m.status === "confirmed").length > 1 ? "s" : ""}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockMeetings.filter(m => m.status === "confirmed").length === 0 ? (
              <p className="text-center text-sm text-muted-foreground py-8">
                Aucune réunion confirmée pour le moment
              </p>
            ) : (
              mockMeetings.filter(m => m.status === "confirmed").map(meeting => (
                <Card key={meeting.id} className="hover:border-primary/50 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between gap-4 flex-wrap">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="bg-primary/10 rounded-lg p-2">
                          <Video className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold">{meeting.title}</h4>
                            <Badge variant="outline" className="border-green-300 text-green-700 bg-green-50">
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                              Confirmée
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{meeting.participant}</p>
                          <div className="flex items-center gap-3 mt-2 text-sm">
                            <span className="flex items-center gap-1 text-muted-foreground">
                              <Calendar className="h-3.5 w-3.5" />
                              {format(meeting.date, "d MMMM yyyy 'à' HH'h'mm", { locale: fr })}
                            </span>
                            <span className="flex items-center gap-1 text-muted-foreground">
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
                          onClick={() => toast.info("Annulation envoyée")}
                        >
                          Annuler
                        </Button>
                        <Button size="sm" className="bg-primary" onClick={startCall}>
                          <Video className="h-3.5 w-3.5 mr-1" /> Rejoindre
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
