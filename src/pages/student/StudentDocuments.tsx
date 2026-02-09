import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockDocuments, mockFeedbacks } from "@/lib/mock-data";
import { StatusBadge } from "@/components/StatusBadge";
import { DocumentVersioning } from "@/components/DocumentVersioning";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FileText, Upload, History, Sparkles, Star } from "lucide-react";
import { toast } from "sonner";
import { AICorrection } from "@/components/AICorrection";
import { UploadWithAI } from "@/components/UploadWithAI";
import { FeedbackView } from "@/components/FeedbackView";

export default function StudentDocuments() {
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null);
  const [openVersions, setOpenVersions] = useState(false);
  const [openAICorrection, setOpenAICorrection] = useState(false);
  const [openUploadAI, setOpenUploadAI] = useState(false);
  const [openFeedback, setOpenFeedback] = useState(false);

  const handleViewVersions = (docId: string) => {
    setSelectedDoc(docId);
    setOpenVersions(true);
  };

  const handleViewFeedback = (docId: string) => {
    setSelectedDoc(docId);
    setOpenFeedback(true);
  };

  // Récupérer les feedbacks pour un document
  const getDocumentFeedbacks = (docId: string) => {
    return mockFeedbacks.filter(f => f.documentId === docId);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-2xl font-poppins font-bold">Mes documents</h1>
        <div className="flex gap-2">
          <Button 
            variant="outline"
            className="border-warning text-warning hover:bg-warning/10"
            onClick={() => setOpenAICorrection(true)}
          >
            <Sparkles className="h-4 w-4 mr-2" /> 
            Assistant IA
          </Button>
          <Button 
            className="bg-warning text-warning-foreground hover:bg-warning/90 font-poppins" 
            onClick={() => setOpenUploadAI(true)}
          >
            <Upload className="h-4 w-4 mr-2" /> 
            Soumettre un document
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader><CardTitle className="font-poppins">Documents soumis</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {mockDocuments.map(doc => {
            const docFeedbacks = getDocumentFeedbacks(doc.id);
            const hasFeedbacks = docFeedbacks.length > 0;
            
            return (
              <div key={doc.id} className="flex items-center justify-between p-4 rounded-lg border hover:bg-secondary/30 transition-colors">
                <div className="flex items-center gap-3 flex-1">
                  <div className="bg-accent/10 rounded-lg p-2">
                    <FileText className="h-5 w-5 text-accent" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{doc.name}</p>
                    <p className="text-xs text-muted-foreground">Soumis le {doc.uploadedAt}</p>
                    {doc.feedback && <p className="text-xs text-accent mt-1">💬 {doc.feedback}</p>}
                    {hasFeedbacks && (
                      <p className="text-xs text-warning mt-1 flex items-center gap-1">
                        <Star className="h-3 w-3" />
                        {docFeedbacks.length} évaluation{docFeedbacks.length > 1 ? 's' : ''} détaillée{docFeedbacks.length > 1 ? 's' : ''}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge status={doc.status === "approved" ? "completed" : doc.status === "rejected" ? "to_correct" : doc.status === "reviewed" ? "in_progress" : "pending"} />
                  {hasFeedbacks && (
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="border-warning text-warning hover:bg-warning/10"
                      onClick={() => handleViewFeedback(doc.id)}
                    >
                      <Star className="h-3.5 w-3.5 mr-1" /> Évaluations
                    </Button>
                  )}
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleViewVersions(doc.id)}
                  >
                    <History className="h-3.5 w-3.5 mr-1" /> Versions
                  </Button>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Dialog des versions */}
      <Dialog open={openVersions} onOpenChange={setOpenVersions}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Historique des versions</DialogTitle>
          </DialogHeader>
          {selectedDoc && <DocumentVersioning documentId={selectedDoc} />}
        </DialogContent>
      </Dialog>

      {/* Dialog des évaluations */}
      <Dialog open={openFeedback} onOpenChange={setOpenFeedback}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Star className="h-5 w-5 text-warning" />
              Historique des évaluations
            </DialogTitle>
          </DialogHeader>
          {selectedDoc && (
            <div className="space-y-6">
              {getDocumentFeedbacks(selectedDoc).length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  Aucune évaluation détaillée pour ce document.
                </p>
              ) : (
                getDocumentFeedbacks(selectedDoc).map((feedback, index) => (
                  <div key={feedback.id}>
                    {index > 0 && <div className="border-t my-6" />}
                    <div className="mb-4">
                      <p className="text-sm text-muted-foreground">
                        Évaluée le {new Date(feedback.date).toLocaleDateString('fr-FR', { 
                          day: 'numeric', 
                          month: 'long', 
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                    <FeedbackView feedback={feedback} />
                  </div>
                ))
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Dialog Assistant IA */}
      <Dialog open={openAICorrection} onOpenChange={setOpenAICorrection}>
        <DialogContent className="max-w-7xl max-h-[95vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-warning" />
              Assistant IA de Correction
            </DialogTitle>
          </DialogHeader>
          <AICorrection />
        </DialogContent>
      </Dialog>

      {/* Dialog Upload avec IA automatique */}
      <Dialog open={openUploadAI} onOpenChange={setOpenUploadAI}>
        <DialogContent className="max-w-7xl max-h-[95vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Soumettre un document avec correction IA automatique
            </DialogTitle>
          </DialogHeader>
          <UploadWithAI 
            onUploadComplete={(file, analysis) => {
              toast.success(`Document "${file.name}" analysé avec succès !`);
              console.log('Analyse:', analysis);
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

