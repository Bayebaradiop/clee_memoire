import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockDocuments } from "@/lib/mock-data";
import { StatusBadge } from "@/components/StatusBadge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, CheckCircle, XCircle, MessageSquare, AlertCircle, Lightbulb, ThumbsUp, ThumbsDown, Eye, Download, Star } from "lucide-react";
import { toast } from "sonner";
import { FeedbackForm } from "@/components/FeedbackForm";
import { mockFeedbacks } from "@/lib/feedback-system";

export default function AccompagnateurDocuments() {
  const [openFeedback, setOpenFeedback] = useState(false);
  const [openStructuredFeedback, setOpenStructuredFeedback] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<any>(null);
  const [feedbackType, setFeedbackType] = useState<"approve" | "revise" | "reject">("revise");
  const [feedbackText, setFeedbackText] = useState("");
  const [suggestions, setSuggestions] = useState("");

  const handleOpenFeedback = (doc: any) => {
    setSelectedDoc(doc);
    setFeedbackText(doc.feedback || "");
    setOpenFeedback(true);
  };

  const handleSubmitFeedback = () => {
    if (!feedbackText.trim() && feedbackType !== "approve") {
      toast.error("Veuillez ajouter un commentaire");
      return;
    }
    
    const messages = {
      approve: "Document approuvé avec succès !",
      revise: "Feedback envoyé. L'étudiant va réviser le document.",
      reject: "Document rejeté. L'étudiant devra le soumettre à nouveau."
    };
    
    toast.success(messages[feedbackType]);
    setOpenFeedback(false);
    setFeedbackText("");
    setSuggestions("");
  };

  const pendingDocs = mockDocuments.filter(d => d.status === "pending" || d.status === "reviewed");
  const reviewedDocs = mockDocuments.filter(d => d.status === "approved" || d.status === "rejected");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-poppins font-bold">Documents à corriger</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {pendingDocs.length} document{pendingDocs.length > 1 ? 's' : ''} en attente de votre retour
        </p>
      </div>

      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pending" className="font-poppins">
            En attente
            {pendingDocs.length > 0 && (
              <Badge variant="secondary" className="ml-2">{pendingDocs.length}</Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="reviewed" className="font-poppins">Traités</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {pendingDocs.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <CheckCircle className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">Aucun document en attente</p>
              </CardContent>
            </Card>
          ) : (
            pendingDocs.map(doc => (
              <Card key={doc.id} className="hover:border-primary/50 transition-colors">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="bg-accent/10 rounded-lg p-3">
                        <FileText className="h-6 w-6 text-accent" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <div>
                          <h3 className="font-semibold">{doc.name}</h3>
                          <p className="text-sm text-muted-foreground mt-1">Soumis le {doc.uploadedAt}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <StatusBadge status={doc.status === "approved" ? "completed" : doc.status === "rejected" ? "to_correct" : doc.status === "reviewed" ? "in_progress" : "pending"} />
                          {doc.feedback && (
                            <Badge variant="outline" className="text-xs">
                              <MessageSquare className="h-3 w-3 mr-1" />
                              Feedback envoyé
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-1" /> Voir
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleOpenFeedback(doc)}
                      >
                        <MessageSquare className="h-4 w-4 mr-1" /> Feedback simple
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => {
                          setSelectedDoc(doc);
                          setOpenStructuredFeedback(true);
                        }}
                        className="border-warning text-warning hover:bg-warning hover:text-warning-foreground"
                      >
                        <Star className="h-4 w-4 mr-1" /> Grille d'évaluation
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="reviewed">
          <Card>
            <CardContent className="p-0 divide-y">
              {reviewedDocs.map(doc => (
                <div key={doc.id} className="p-4 flex items-center justify-between gap-4 flex-wrap">
                  <div className="flex items-center gap-3">
                    <div className="bg-accent/10 rounded-lg p-2">
                      <FileText className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{doc.name}</p>
                      <p className="text-xs text-muted-foreground">Soumis le {doc.uploadedAt}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusBadge status={doc.status === "approved" ? "completed" : "to_correct"} />
                    <Button size="sm" variant="ghost" onClick={() => handleOpenFeedback(doc)}>
                      <Eye className="h-4 w-4 mr-1" /> Voir feedback
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Dialog de Feedback */}
      <Dialog open={openFeedback} onOpenChange={(open) => {
        setOpenFeedback(open);
        if (!open) {
          setFeedbackText("");
          setSuggestions("");
          setFeedbackType("revise");
        }
      }}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              Feedback du document
            </DialogTitle>
            <DialogDescription>
              Donnez un retour détaillé pour aider l'étudiant à améliorer son travail.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Info Document */}
            <Card className="bg-muted/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{selectedDoc?.name}</p>
                    <p className="text-sm text-muted-foreground mt-1">Soumis le {selectedDoc?.uploadedAt}</p>
                  </div>
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4 mr-1" /> Télécharger
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Décision */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">Décision</Label>
              <RadioGroup value={feedbackType} onValueChange={(v: any) => setFeedbackType(v)}>
                <Card className={`cursor-pointer transition-all ${feedbackType === "approve" ? "border-green-500 bg-green-50 dark:bg-green-950/20" : "hover:border-muted-foreground/50"}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <RadioGroupItem value="approve" id="approve" className="mt-1" />
                      <label htmlFor="approve" className="flex-1 cursor-pointer">
                        <div className="flex items-center gap-2">
                          <ThumbsUp className="h-4 w-4 text-green-600" />
                          <span className="font-semibold">Approuver</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Le document est validé et l'étudiant peut passer à l'étape suivante.
                        </p>
                      </label>
                    </div>
                  </CardContent>
                </Card>

                <Card className={`cursor-pointer transition-all ${feedbackType === "revise" ? "border-orange-500 bg-orange-50 dark:bg-orange-950/20" : "hover:border-muted-foreground/50"}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <RadioGroupItem value="revise" id="revise" className="mt-1" />
                      <label htmlFor="revise" className="flex-1 cursor-pointer">
                        <div className="flex items-center gap-2">
                          <AlertCircle className="h-4 w-4 text-orange-600" />
                          <span className="font-semibold">Demander des révisions</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Le document nécessite des modifications avant validation.
                        </p>
                      </label>
                    </div>
                  </CardContent>
                </Card>

                <Card className={`cursor-pointer transition-all ${feedbackType === "reject" ? "border-red-500 bg-red-50 dark:bg-red-950/20" : "hover:border-muted-foreground/50"}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <RadioGroupItem value="reject" id="reject" className="mt-1" />
                      <label htmlFor="reject" className="flex-1 cursor-pointer">
                        <div className="flex items-center gap-2">
                          <ThumbsDown className="h-4 w-4 text-red-600" />
                          <span className="font-semibold">Rejeter</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Le document doit être refait complètement.
                        </p>
                      </label>
                    </div>
                  </CardContent>
                </Card>
              </RadioGroup>
            </div>

            {/* Commentaires */}
            <div className="space-y-3">
              <Label htmlFor="feedback" className="text-base font-semibold flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Commentaires détaillés {feedbackType !== "approve" && <span className="text-red-500">*</span>}
              </Label>
              <Textarea 
                id="feedback"
                placeholder="Donnez un feedback constructif et détaillé sur le document..."
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                className="min-h-[120px] resize-none"
              />
              <p className="text-xs text-muted-foreground">
                {feedbackText.length} caractères
              </p>
            </div>

            {/* Suggestions */}
            <div className="space-y-3">
              <Label htmlFor="suggestions" className="text-base font-semibold flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-yellow-600" />
                Suggestions d'amélioration (optionnel)
              </Label>
              <Textarea 
                id="suggestions"
                placeholder="Proposez des pistes d'amélioration, des ressources, des exemples..."
                value={suggestions}
                onChange={(e) => setSuggestions(e.target.value)}
                className="min-h-[100px] resize-none"
              />
            </div>

            {/* Alerte */}
            {feedbackType !== "approve" && !feedbackText.trim() && (
              <Alert className="border-orange-200 bg-orange-50 dark:bg-orange-950/20">
                <AlertCircle className="h-4 w-4 text-orange-600" />
                <AlertDescription className="text-sm text-orange-800 dark:text-orange-200">
                  Un commentaire détaillé est requis pour les révisions ou rejets.
                </AlertDescription>
              </Alert>
            )}

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <Button 
                variant="outline" 
                onClick={() => setOpenFeedback(false)}
                className="flex-1"
              >
                Annuler
              </Button>
              <Button 
                onClick={handleSubmitFeedback}
                className={`flex-1 ${
                  feedbackType === "approve" 
                    ? "bg-green-600 hover:bg-green-700" 
                    : feedbackType === "reject"
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-warning hover:bg-warning/90"
                } text-white`}
              >
                {feedbackType === "approve" ? "Approuver" : feedbackType === "reject" ? "Rejeter" : "Envoyer les révisions"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog Feedback Structuré */}
      <Dialog open={openStructuredFeedback} onOpenChange={setOpenStructuredFeedback}>
        <DialogContent className="max-w-5xl max-h-[95vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-warning" />
              Grille d'évaluation détaillée
            </DialogTitle>
            <DialogDescription>
              Évaluez le document selon des critères académiques prédéfinis
            </DialogDescription>
          </DialogHeader>
          {selectedDoc && (
            <FeedbackForm
              documentId={selectedDoc.id}
              documentName={selectedDoc.name}
              onSubmit={(feedback) => {
                console.log('Feedback soumis:', feedback);
                setOpenStructuredFeedback(false);
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
