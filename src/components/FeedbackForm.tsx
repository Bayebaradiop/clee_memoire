import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Star, 
  Send, 
  Save, 
  Lightbulb, 
  AlertTriangle,
  CheckCircle2,
  Plus,
  Minus,
  Sparkles
} from "lucide-react";
import { toast } from "sonner";
import {
  feedbackTemplates,
  commentTemplates,
  calculateGlobalScore,
  getMention,
  type FeedbackTemplate,
  type FeedbackCriterion,
  type DocumentFeedback
} from "@/lib/feedback-system";

interface FeedbackFormProps {
  documentId: string;
  documentName: string;
  onSubmit?: (feedback: Partial<DocumentFeedback>) => void;
  initialFeedback?: Partial<DocumentFeedback>;
}

export function FeedbackForm({ documentId, documentName, onSubmit, initialFeedback }: FeedbackFormProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<FeedbackTemplate | null>(
    initialFeedback?.templateUsed 
      ? feedbackTemplates.find(t => t.id === initialFeedback.templateUsed) || null
      : null
  );
  const [criteria, setCriteria] = useState<FeedbackCriterion[]>(
    initialFeedback?.criteria || []
  );
  const [globalComment, setGlobalComment] = useState(initialFeedback?.globalComment || "");
  const [strengths, setStrengths] = useState<string[]>(initialFeedback?.strengths || []);
  const [improvements, setImprovements] = useState<string[]>(initialFeedback?.improvements || []);
  const [customStrength, setCustomStrength] = useState("");
  const [customImprovement, setCustomImprovement] = useState("");

  const handleTemplateSelect = (templateId: string) => {
    const template = feedbackTemplates.find(t => t.id === templateId);
    if (template) {
      setSelectedTemplate(template);
      setCriteria(template.criteria.map(c => ({ ...c, score: undefined })));
    }
  };

  const handleScoreChange = (criterionId: string, score: number) => {
    setCriteria(prev =>
      prev.map(c => c.id === criterionId ? { ...c, score } : c)
    );
  };

  const globalScore = calculateGlobalScore(criteria);
  const mention = getMention(globalScore);

  const handleAddStrength = (strength: string) => {
    if (strength && !strengths.includes(strength)) {
      setStrengths([...strengths, strength]);
    }
  };

  const handleAddImprovement = (improvement: string) => {
    if (improvement && !improvements.includes(improvement)) {
      setImprovements([...improvements, improvement]);
    }
  };

  const handleRemoveStrength = (index: number) => {
    setStrengths(strengths.filter((_, i) => i !== index));
  };

  const handleRemoveImprovement = (index: number) => {
    setImprovements(improvements.filter((_, i) => i !== index));
  };

  const handleSubmit = (status: "draft" | "sent") => {
    if (!selectedTemplate) {
      toast.error("Veuillez sélectionner un template");
      return;
    }

    const feedback: Partial<DocumentFeedback> = {
      documentId,
      documentName,
      templateUsed: selectedTemplate.id,
      criteria,
      globalComment,
      strengths,
      improvements,
      globalScore,
      status,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    if (onSubmit) {
      onSubmit(feedback);
    }

    toast.success(status === "draft" ? "Brouillon sauvegardé" : "Feedback envoyé à l'étudiant");
  };

  return (
    <div className="space-y-6">
      {/* Sélection du template */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Document à évaluer</CardTitle>
          <CardDescription>{documentName}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Grille d'évaluation</Label>
            <Select 
              value={selectedTemplate?.id} 
              onValueChange={handleTemplateSelect}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner une grille d'évaluation" />
              </SelectTrigger>
              <SelectContent>
                {feedbackTemplates.map(template => (
                  <SelectItem key={template.id} value={template.id}>
                    {template.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {selectedTemplate && (
        <>
          {/* Évaluation par critères */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Évaluation détaillée</CardTitle>
              <CardDescription>
                Notez chaque critère sur {criteria[0]?.maxScore || 20} points
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {criteria.map((criterion, index) => (
                <div key={criterion.id} className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-sm">{criterion.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {criterion.weight}%
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {criterion.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {[...Array(5)].map((_, i) => {
                          const starValue = ((i + 1) / 5) * criterion.maxScore;
                          const isFilled = criterion.score && criterion.score >= starValue;
                          return (
                            <button
                              key={i}
                              type="button"
                              onClick={() => handleScoreChange(criterion.id, starValue)}
                              className="focus:outline-none"
                            >
                              <Star
                                className={`h-6 w-6 ${
                                  isFilled
                                    ? "fill-warning text-warning"
                                    : "text-gray-300"
                                }`}
                              />
                            </button>
                          );
                        })}
                      </div>
                      <div className="flex items-center gap-2">
                        <Input
                          type="number"
                          min="0"
                          max={criterion.maxScore}
                          value={criterion.score || ""}
                          onChange={(e) => handleScoreChange(
                            criterion.id,
                            parseFloat(e.target.value) || 0
                          )}
                          className="w-20"
                        />
                        <span className="text-sm text-muted-foreground">
                          / {criterion.maxScore}
                        </span>
                      </div>
                    </div>
                    
                    {criterion.score !== undefined && (
                      <div className="text-right">
                        <Badge
                          variant={
                            (criterion.score / criterion.maxScore) >= 0.8 ? "default" :
                            (criterion.score / criterion.maxScore) >= 0.6 ? "secondary" : "destructive"
                          }
                        >
                          {((criterion.score / criterion.maxScore) * 100).toFixed(0)}%
                        </Badge>
                      </div>
                    )}
                  </div>
                  
                  {index < criteria.length - 1 && <Separator />}
                </div>
              ))}

              {/* Score global */}
              {criteria.some(c => c.score !== undefined) && (
                <Card className={`${mention.color} border-2`}>
                  <CardContent className="p-4">
                    <div className="text-center space-y-2">
                      <p className="text-sm font-semibold">Note globale</p>
                      <div className="flex items-center justify-center gap-4">
                        <div>
                          <p className="text-4xl font-bold">{globalScore}</p>
                          <p className="text-xs text-muted-foreground">/ 100</p>
                        </div>
                        <Badge className={`${mention.color} text-base px-3 py-1`}>
                          {mention.label}
                        </Badge>
                      </div>
                      <Progress value={globalScore} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>

          {/* Points forts */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                Points forts
              </CardTitle>
              <CardDescription>
                Sélectionnez ou ajoutez les points forts du document
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Templates prédéfinis */}
              <div className="flex flex-wrap gap-2">
                {commentTemplates.strengths.map((template, index) => (
                  <Button
                    key={index}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleAddStrength(template)}
                    disabled={strengths.includes(template)}
                    className="text-xs"
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    {template}
                  </Button>
                ))}
              </div>

              {/* Points forts sélectionnés */}
              {strengths.length > 0 && (
                <div className="space-y-2">
                  <Label className="text-sm">Sélectionnés</Label>
                  <div className="space-y-2">
                    {strengths.map((strength, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-green-50 dark:bg-green-950/20 border border-green-200 rounded-lg p-2"
                      >
                        <span className="text-sm text-green-800 dark:text-green-200">
                          ✓ {strength}
                        </span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveStrength(index)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Ajout personnalisé */}
              <div className="flex gap-2">
                <Input
                  placeholder="Ajouter un point fort personnalisé..."
                  value={customStrength}
                  onChange={(e) => setCustomStrength(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleAddStrength(customStrength);
                      setCustomStrength("");
                    }
                  }}
                />
                <Button
                  type="button"
                  onClick={() => {
                    handleAddStrength(customStrength);
                    setCustomStrength("");
                  }}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Axes d'amélioration */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-orange-600" />
                Axes d'amélioration
              </CardTitle>
              <CardDescription>
                Sélectionnez ou ajoutez les points à améliorer
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Templates prédéfinis */}
              <div className="flex flex-wrap gap-2">
                {commentTemplates.improvements.map((template, index) => (
                  <Button
                    key={index}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleAddImprovement(template)}
                    disabled={improvements.includes(template)}
                    className="text-xs"
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    {template}
                  </Button>
                ))}
              </div>

              {/* Améliorations sélectionnées */}
              {improvements.length > 0 && (
                <div className="space-y-2">
                  <Label className="text-sm">Sélectionnés</Label>
                  <div className="space-y-2">
                    {improvements.map((improvement, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-orange-50 dark:bg-orange-950/20 border border-orange-200 rounded-lg p-2"
                      >
                        <span className="text-sm text-orange-800 dark:text-orange-200">
                          → {improvement}
                        </span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveImprovement(index)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Ajout personnalisé */}
              <div className="flex gap-2">
                <Input
                  placeholder="Ajouter une amélioration personnalisée..."
                  value={customImprovement}
                  onChange={(e) => setCustomImprovement(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleAddImprovement(customImprovement);
                      setCustomImprovement("");
                    }
                  }}
                />
                <Button
                  type="button"
                  onClick={() => {
                    handleAddImprovement(customImprovement);
                    setCustomImprovement("");
                  }}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Commentaire global */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Commentaire global</CardTitle>
              <CardDescription>
                Rédigez un commentaire détaillé sur le document
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Votre appréciation générale du document..."
                value={globalComment}
                onChange={(e) => setGlobalComment(e.target.value)}
                className="min-h-[150px]"
              />

              {/* Suggestions de commentaires */}
              <div className="space-y-2">
                <Label className="text-sm">Suggestions</Label>
                <div className="flex flex-wrap gap-2">
                  {commentTemplates.general.map((template, index) => (
                    <Button
                      key={index}
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setGlobalComment(prev => 
                        prev ? `${prev}\n${template}` : template
                      )}
                      className="text-xs"
                    >
                      <Sparkles className="h-3 w-3 mr-1" />
                      {template}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <p className="font-semibold text-sm">Feedback prêt à être envoyé</p>
                  <p className="text-xs text-muted-foreground">
                    Note globale : {globalScore}/100 • {mention.label}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => handleSubmit("draft")}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Enregistrer brouillon
                  </Button>
                  <Button
                    className="bg-primary"
                    onClick={() => handleSubmit("sent")}
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Envoyer à l'étudiant
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
