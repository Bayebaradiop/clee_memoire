import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FileText, Clock, Download, Eye, RotateCcw, GitCompare, CheckCircle2, XCircle } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface DocumentVersion {
  id: string;
  versionNumber: number;
  fileName: string;
  uploadedAt: Date;
  status: "current" | "approved" | "revised" | "rejected";
  feedback?: string;
  fileSize: string;
}

const mockVersions: Record<string, DocumentVersion[]> = {
  "doc1": [
    {
      id: "v1-3",
      versionNumber: 3,
      fileName: "plan_detaille_v3.pdf",
      uploadedAt: new Date(2026, 1, 7),
      status: "current",
      fileSize: "2.4 MB"
    },
    {
      id: "v1-2",
      versionNumber: 2,
      fileName: "plan_detaille_v2.pdf",
      uploadedAt: new Date(2026, 1, 5),
      status: "revised",
      feedback: "Bon travail mais la structure du chapitre 2 doit être retravaillée. Ajoutez plus de détails sur la méthodologie.",
      fileSize: "2.1 MB"
    },
    {
      id: "v1-1",
      versionNumber: 1,
      fileName: "plan_detaille_v1.pdf",
      uploadedAt: new Date(2026, 1, 1),
      status: "rejected",
      feedback: "Le plan manque de cohérence. Revoyez la structure globale et assurez-vous que chaque section a un objectif clair.",
      fileSize: "1.8 MB"
    },
  ],
  "doc2": [
    {
      id: "v2-2",
      versionNumber: 2,
      fileName: "bibliographie_v2.pdf",
      uploadedAt: new Date(2026, 1, 3),
      status: "approved",
      feedback: "Excellent travail ! La bibliographie est complète et bien formatée.",
      fileSize: "1.2 MB"
    },
    {
      id: "v2-1",
      versionNumber: 1,
      fileName: "bibliographie_v1.pdf",
      uploadedAt: new Date(2026, 0, 28),
      status: "revised",
      feedback: "Il manque quelques références importantes. Consultez les ouvrages que je vous ai recommandés.",
      fileSize: "950 KB"
    },
  ],
};

const statusConfig = {
  current: { label: "Version actuelle", color: "bg-blue-100 text-blue-800 border-blue-200", icon: Clock },
  approved: { label: "Approuvée", color: "bg-green-100 text-green-800 border-green-200", icon: CheckCircle2 },
  revised: { label: "À réviser", color: "bg-orange-100 text-orange-800 border-orange-200", icon: RotateCcw },
  rejected: { label: "Rejetée", color: "bg-red-100 text-red-800 border-red-200", icon: XCircle },
};

export function DocumentVersioning({ documentId }: { documentId: string }) {
  const [selectedVersions, setSelectedVersions] = useState<[string, string] | null>(null);
  const [openCompare, setOpenCompare] = useState(false);

  const versions = mockVersions[documentId] || [];
  const currentVersion = versions.find(v => v.status === "current");

  const handleRestore = (versionId: string) => {
    const version = versions.find(v => v.id === versionId);
    toast.success(`Version ${version?.versionNumber} restaurée comme version actuelle`);
  };

  const handleCompare = (v1Id: string, v2Id: string) => {
    setSelectedVersions([v1Id, v2Id]);
    setOpenCompare(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Historique des versions
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            {versions.length} version{versions.length > 1 ? "s" : ""} disponible{versions.length > 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {versions.length === 0 ? (
        <Alert>
          <AlertDescription>
            Aucune version disponible pour ce document.
          </AlertDescription>
        </Alert>
      ) : (
        <div className="space-y-3">
          {versions.map((version, index) => {
            const config = statusConfig[version.status];
            const Icon = config.icon;
            const isLatest = index === 0;

            return (
              <Card key={version.id} className={version.status === "current" ? "border-primary" : ""}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="bg-accent/10 rounded-lg p-2 mt-1">
                        <FileText className="h-5 w-5 text-accent" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-semibold">Version {version.versionNumber}</h4>
                          <Badge variant="outline" className={config.color}>
                            <Icon className="h-3 w-3 mr-1" />
                            {config.label}
                          </Badge>
                          {isLatest && version.status !== "current" && (
                            <Badge variant="secondary">Plus récente</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{version.fileName}</p>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span>{format(version.uploadedAt, "d MMMM yyyy 'à' HH:mm", { locale: fr })}</span>
                          <span>•</span>
                          <span>{version.fileSize}</span>
                        </div>
                        {version.feedback && (
                          <Alert className={`mt-2 ${
                            version.status === "approved" 
                              ? "border-green-200 bg-green-50 dark:bg-green-950/20" 
                              : version.status === "rejected"
                              ? "border-red-200 bg-red-50 dark:bg-red-950/20"
                              : "border-orange-200 bg-orange-50 dark:bg-orange-950/20"
                          }`}>
                            <AlertDescription className="text-sm">
                              <strong>Feedback:</strong> {version.feedback}
                            </AlertDescription>
                          </Alert>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Button size="sm" variant="outline">
                        <Eye className="h-3.5 w-3.5 mr-1" /> Voir
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="h-3.5 w-3.5 mr-1" /> Télécharger
                      </Button>
                      {version.status !== "current" && (
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleRestore(version.id)}
                        >
                          <RotateCcw className="h-3.5 w-3.5 mr-1" /> Restaurer
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {versions.length >= 2 && (
        <Card className="bg-muted/50">
          <CardContent className="p-4">
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => {
                if (versions.length >= 2) {
                  handleCompare(versions[0].id, versions[1].id);
                }
              }}
            >
              <GitCompare className="h-4 w-4 mr-2" />
              Comparer les versions
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Dialog de comparaison */}
      <Dialog open={openCompare} onOpenChange={setOpenCompare}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <GitCompare className="h-5 w-5" />
              Comparaison de versions
            </DialogTitle>
          </DialogHeader>
          
          <div className="grid md:grid-cols-2 gap-4">
            {selectedVersions?.map(vId => {
              const version = versions.find(v => v.id === vId);
              if (!version) return null;
              const config = statusConfig[version.status];
              const Icon = config.icon;

              return (
                <Card key={vId}>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      Version {version.versionNumber}
                      <Badge variant="outline" className={config.color}>
                        <Icon className="h-3 w-3 mr-1" />
                        {config.label}
                      </Badge>
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {format(version.uploadedAt, "d MMMM yyyy 'à' HH:mm", { locale: fr })}
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="text-sm font-medium mb-1">Fichier</p>
                      <p className="text-sm text-muted-foreground">{version.fileName}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-1">Taille</p>
                      <p className="text-sm text-muted-foreground">{version.fileSize}</p>
                    </div>
                    {version.feedback && (
                      <div>
                        <p className="text-sm font-medium mb-1">Feedback</p>
                        <p className="text-sm text-muted-foreground">{version.feedback}</p>
                      </div>
                    )}
                    <div className="flex gap-2 pt-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Eye className="h-3.5 w-3.5 mr-1" /> Voir
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <Download className="h-3.5 w-3.5 mr-1" /> Télécharger
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Alert className="mt-4">
            <AlertDescription>
              💡 <strong>Astuce:</strong> Pour une comparaison détaillée, téléchargez les deux versions et utilisez un outil de comparaison PDF.
            </AlertDescription>
          </Alert>
        </DialogContent>
      </Dialog>
    </div>
  );
}
