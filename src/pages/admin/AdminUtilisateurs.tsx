import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { mockStudents, mockAccompagnateurs } from "@/lib/mock-data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { UserPlus, UserCog, Users, AlertCircle, CheckCircle2, Mail, GraduationCap } from "lucide-react";

export default function AdminUtilisateurs() {
  const [openDialog, setOpenDialog] = useState(false);
  const [openAssignDialog, setOpenAssignDialog] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [selectedAccompagnateur, setSelectedAccompagnateur] = useState<string>("");
  const [activeTab, setActiveTab] = useState("etudiants");

  const handleAddAccompagnateur = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Accompagnateur ajouté avec succès !");
    setOpenDialog(false);
  };

  const handleAssign = () => {
    if (!selectedAccompagnateur) {
      toast.error("Veuillez sélectionner un accompagnateur");
      return;
    }
    const accompagnateur = mockAccompagnateurs.find(a => a.id === selectedAccompagnateur);
    const student = mockStudents.find(s => s.id === selectedStudent);
    toast.success(`${student?.name} a été assigné(e) à ${accompagnateur?.name}`);
    setOpenAssignDialog(false);
    setSelectedStudent(null);
    setSelectedAccompagnateur("");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-2xl font-poppins font-bold">Utilisateurs</h1>
        {activeTab === "accompagnateurs" ? (
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
              <Button className="bg-warning text-warning-foreground hover:bg-warning/90 font-poppins">
                <UserPlus className="h-4 w-4 mr-2" /> Ajouter un accompagnateur
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Ajouter un accompagnateur</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddAccompagnateur} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Prénom</Label>
                    <Input id="firstName" placeholder="Prénom" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Nom</Label>
                    <Input id="lastName" placeholder="Nom" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="email@exemple.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="specialty">Spécialité</Label>
                  <Input id="specialty" placeholder="Ex: Informatique, Gestion..." required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Mot de passe</Label>
                  <Input id="password" type="password" placeholder="••••••••" required />
                </div>
                <Button type="submit" className="w-full bg-warning text-warning-foreground hover:bg-warning/90">
                  Créer le compte
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        ) : null}
      </div>

      <Tabs defaultValue="etudiants" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="etudiants" className="font-poppins">Étudiants</TabsTrigger>
          <TabsTrigger value="accompagnateurs" className="font-poppins">Accompagnateurs</TabsTrigger>
        </TabsList>
        <TabsContent value="etudiants">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5" />
                    Liste des étudiants
                  </CardTitle>
                  <CardDescription className="mt-1">
                    {mockStudents.length} étudiant{mockStudents.length > 1 ? 's' : ''} inscrit{mockStudents.length > 1 ? 's' : ''}
                  </CardDescription>
                </div>
                <Badge variant="secondary" className="text-sm">
                  {mockStudents.filter(s => !s.accompagnateurId).length} non assigné{mockStudents.filter(s => !s.accompagnateurId).length > 1 ? 's' : ''}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Pack</TableHead>
                    <TableHead>Progression</TableHead>
                    <TableHead>Accompagnateur</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockStudents.map(s => (
                    <TableRow key={s.id} className="hover:bg-muted/50 transition-colors">
                      <TableCell className="font-medium">{s.name}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{s.email}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
                          {s.pack}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={s.progress} className="h-2 w-16" />
                          <span className="text-sm font-medium">{s.progress}%</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">
                        {s.accompagnateurId ? (
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                            <span>{mockAccompagnateurs.find(a => a.id === s.accompagnateurId)?.name}</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <AlertCircle className="h-4 w-4 text-orange-500" />
                            <span className="text-muted-foreground">Non assigné</span>
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button 
                          size="sm" 
                          variant={s.accompagnateurId ? "outline" : "default"}
                          className={!s.accompagnateurId ? "bg-warning text-warning-foreground hover:bg-warning/90" : ""}
                          onClick={() => {
                            setSelectedStudent(s.id);
                            setSelectedAccompagnateur(s.accompagnateurId || "");
                            setOpenAssignDialog(true);
                          }}
                        >
                          <UserCog className="h-4 w-4 mr-1" />
                          {s.accompagnateurId ? "Modifier" : "Assigner"}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="accompagnateurs">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Liste des accompagnateurs
                  </CardTitle>
                  <CardDescription className="mt-1">
                    {mockAccompagnateurs.length} accompagnateur{mockAccompagnateurs.length > 1 ? 's' : ''} actif{mockAccompagnateurs.length > 1 ? 's' : ''}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Spécialité</TableHead>
                    <TableHead>Étudiants assignés</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockAccompagnateurs.map(a => (
                    <TableRow key={a.id} className="hover:bg-muted/50 transition-colors">
                      <TableCell className="font-medium">{a.name}</TableCell>
                      <TableCell className="text-sm text-muted-foreground flex items-center gap-2">
                        <Mail className="h-3.5 w-3.5" />
                        {a.email}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{a.specialty}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{a.studentsCount}</span>
                          <span className="text-sm text-muted-foreground">étudiant{a.studentsCount > 1 ? 's' : ''}</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Dialog d'assignation */}
      <Dialog open={openAssignDialog} onOpenChange={(open) => {
        setOpenAssignDialog(open);
        if (!open) {
          setSelectedStudent(null);
          setSelectedAccompagnateur("");
        }
      }}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <UserCog className="h-5 w-5 text-primary" />
              Assigner un accompagnateur
            </DialogTitle>
            <DialogDescription>
              Choisissez un accompagnateur pour guider cet étudiant dans son parcours.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-5">
            {/* Infos Étudiant */}
            <Card className="bg-muted/50">
              <CardContent className="pt-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Étudiant</Label>
                    <p className="font-semibold text-base">{mockStudents.find(s => s.id === selectedStudent)?.name}</p>
                  </div>
                  <Badge variant="outline" className="bg-accent/10">
                    {mockStudents.find(s => s.id === selectedStudent)?.pack}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-3.5 w-3.5" />
                  {mockStudents.find(s => s.id === selectedStudent)?.email}
                </div>
                <div>
                  <div className="flex items-center justify-between text-sm mb-1.5">
                    <span className="text-muted-foreground">Progression</span>
                    <span className="font-medium">{mockStudents.find(s => s.id === selectedStudent)?.progress}%</span>
                  </div>
                  <Progress value={mockStudents.find(s => s.id === selectedStudent)?.progress || 0} className="h-2" />
                </div>
                {mockStudents.find(s => s.id === selectedStudent)?.accompagnateurId && (
                  <Alert className="border-orange-200 bg-orange-50 dark:bg-orange-950/20">
                    <AlertCircle className="h-4 w-4 text-orange-600" />
                    <AlertDescription className="text-sm text-orange-800 dark:text-orange-200">
                      Accompagnateur actuel : <strong>{mockAccompagnateurs.find(a => a.id === mockStudents.find(s => s.id === selectedStudent)?.accompagnateurId)?.name}</strong>
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>

            {/* Sélection Accompagnateur */}
            <div className="space-y-2">
              <Label htmlFor="accompagnateur" className="text-base">Nouvel accompagnateur</Label>
              <Select value={selectedAccompagnateur} onValueChange={setSelectedAccompagnateur}>
                <SelectTrigger className="h-auto">
                  <SelectValue placeholder="Sélectionner un accompagnateur" />
                </SelectTrigger>
                <SelectContent>
                  {mockAccompagnateurs.map(acc => (
                    <SelectItem key={acc.id} value={acc.id} className="py-3">
                      <div className="flex items-start gap-3">
                        <div className="flex-1">
                          <p className="font-medium">{acc.name}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{acc.specialty}</p>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          <Users className="h-3 w-3 mr-1" />
                          {acc.studentsCount}
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedAccompagnateur && (
                <div className="flex items-center gap-1.5 text-sm text-green-600 dark:text-green-400 mt-2">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Accompagnateur sélectionné</span>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <Button 
                variant="outline" 
                onClick={() => setOpenAssignDialog(false)}
                className="flex-1"
              >
                Annuler
              </Button>
              <Button 
                onClick={handleAssign} 
                className="bg-warning text-warning-foreground hover:bg-warning/90 flex-1"
                disabled={!selectedAccompagnateur}
              >
                {mockStudents.find(s => s.id === selectedStudent)?.accompagnateurId ? "Réassigner" : "Assigner"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
