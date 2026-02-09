import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Info, 
  Loader2,
  Copy,
  Download,
  FileText,
  BarChart3,
  Lightbulb,
  ShieldAlert
} from "lucide-react";
import { toast } from "sonner";
import { 
  analyzeDocument, 
  checkAcademicQuality, 
  checkPlagiarism,
  applyCorrections,
  type CorrectionIssue,
  type DocumentAnalysis 
} from "@/lib/ai-correction";

export function AICorrection() {
  const [text, setText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<DocumentAnalysis | null>(null);
  const [qualityCheck, setQualityCheck] = useState<any>(null);
  const [plagiarismCheck, setPlagiarismCheck] = useState<any>(null);
  const [correctedText, setCorrectedText] = useState("");

  const handleAnalyze = async () => {
    if (!text.trim()) {
      toast.error("Veuillez saisir du texte à analyser");
      return;
    }

    setIsAnalyzing(true);
    try {
      const [analysisResult, qualityResult, plagiarismResult] = await Promise.all([
        analyzeDocument(text),
        checkAcademicQuality(text),
        checkPlagiarism(text)
      ]);

      setAnalysis(analysisResult);
      setQualityCheck(qualityResult);
      setPlagiarismCheck(plagiarismResult);
      
      // Appliquer les corrections automatiques
      const corrected = applyCorrections(text, analysisResult.issues);
      setCorrectedText(corrected);
      
      toast.success("Analyse terminée !");
    } catch (error) {
      toast.error("Erreur lors de l'analyse");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "error": return "text-red-600 bg-red-50 border-red-200";
      case "warning": return "text-orange-600 bg-orange-50 border-orange-200";
      case "info": return "text-blue-600 bg-blue-50 border-blue-200";
      default: return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "error": return <AlertCircle className="h-4 w-4" />;
      case "warning": return <Info className="h-4 w-4" />;
      case "info": return <Lightbulb className="h-4 w-4" />;
      default: return <Info className="h-4 w-4" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "orthographe": return "Orthographe";
      case "grammaire": return "Grammaire";
      case "style": return "Style";
      case "coherence": return "Cohérence";
      case "plagiat": return "Plagiat";
      default: return type;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-poppins font-bold flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-warning" />
            Assistant IA de Correction
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Corrigez et améliorez la qualité de vos textes académiques
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Zone de saisie */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Texte à analyser</CardTitle>
            <CardDescription>
              Collez ou saisissez votre texte pour une analyse complète
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Collez votre texte ici pour l'analyser avec l'IA..."
              className="min-h-[400px] font-mono text-sm"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">
                {text.length} caractères • {text.trim().split(/\s+/).filter(w => w).length} mots
              </p>
              <Button 
                onClick={handleAnalyze}
                disabled={isAnalyzing || !text.trim()}
                className="bg-warning text-warning-foreground hover:bg-warning/90"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Analyse en cours...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Analyser avec l'IA
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Résultats */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Résultats de l'analyse</CardTitle>
          </CardHeader>
          <CardContent>
            {!analysis ? (
              <div className="text-center py-12 text-muted-foreground">
                <Sparkles className="h-12 w-12 mx-auto mb-4 opacity-20" />
                <p>Aucune analyse effectuée</p>
                <p className="text-xs mt-2">Cliquez sur "Analyser avec l'IA" pour commencer</p>
              </div>
            ) : (
              <Tabs defaultValue="corrections" className="space-y-4">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="corrections" className="text-xs">
                    Corrections
                    {analysis.issues.length > 0 && (
                      <Badge variant="destructive" className="ml-1 h-4 px-1 text-xs">
                        {analysis.issues.length}
                      </Badge>
                    )}
                  </TabsTrigger>
                  <TabsTrigger value="stats" className="text-xs">Statistiques</TabsTrigger>
                  <TabsTrigger value="quality" className="text-xs">Qualité</TabsTrigger>
                  <TabsTrigger value="plagiarism" className="text-xs">Plagiat</TabsTrigger>
                </TabsList>

                {/* Corrections */}
                <TabsContent value="corrections" className="space-y-3">
                  <ScrollArea className="h-[400px] pr-4">
                    {analysis.issues.length === 0 ? (
                      <Alert className="bg-green-50 border-green-200">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        <AlertDescription className="text-green-800">
                          Aucune erreur détectée ! Votre texte est de bonne qualité.
                        </AlertDescription>
                      </Alert>
                    ) : (
                      analysis.issues.map((issue) => (
                        <Card key={issue.id} className={`mb-3 ${getSeverityColor(issue.severity)}`}>
                          <CardContent className="p-4">
                            <div className="flex items-start gap-3">
                              {getSeverityIcon(issue.severity)}
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <Badge variant="outline" className="text-xs">
                                    {getTypeLabel(issue.type)}
                                  </Badge>
                                  <span className="text-xs font-semibold">
                                    {issue.severity === "error" ? "Erreur" : issue.severity === "warning" ? "Avertissement" : "Info"}
                                  </span>
                                </div>
                                <p className="text-sm font-medium mb-2">{issue.message}</p>
                                {issue.original && (
                                  <p className="text-xs mb-1">
                                    <span className="font-semibold">Original :</span> 
                                    <span className="font-mono bg-white/50 px-1 rounded">{issue.original}</span>
                                  </p>
                                )}
                                {issue.suggestion && (
                                  <p className="text-xs">
                                    <span className="font-semibold">Suggestion :</span> 
                                    <span className="font-mono bg-white/50 px-1 rounded text-green-700">{issue.suggestion}</span>
                                  </p>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </ScrollArea>

                  {correctedText && correctedText !== text && (
                    <div className="space-y-2 pt-4 border-t">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold">Texte corrigé automatiquement</p>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            navigator.clipboard.writeText(correctedText);
                            toast.success("Texte corrigé copié !");
                          }}
                        >
                          <Copy className="h-3.5 w-3.5 mr-1" />
                          Copier
                        </Button>
                      </div>
                      <Textarea
                        value={correctedText}
                        readOnly
                        className="min-h-[150px] text-sm font-mono bg-green-50"
                      />
                    </div>
                  )}
                </TabsContent>

                {/* Statistiques */}
                <TabsContent value="stats" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="p-4 text-center">
                        <FileText className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                        <p className="text-2xl font-bold">{analysis.wordCount}</p>
                        <p className="text-xs text-muted-foreground">Mots</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <BarChart3 className="h-8 w-8 mx-auto mb-2 text-green-600" />
                        <p className="text-2xl font-bold">{analysis.sentenceCount}</p>
                        <p className="text-xs text-muted-foreground">Phrases</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <FileText className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                        <p className="text-2xl font-bold">{analysis.paragraphCount}</p>
                        <p className="text-xs text-muted-foreground">Paragraphes</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-4 text-center">
                        <BarChart3 className="h-8 w-8 mx-auto mb-2 text-orange-600" />
                        <p className="text-2xl font-bold">{analysis.characterCount}</p>
                        <p className="text-xs text-muted-foreground">Caractères</p>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-sm">Score de lisibilité</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <Progress value={analysis.readabilityScore} className="h-2" />
                      <div className="flex items-center justify-between text-sm">
                        <span>{analysis.readabilityScore}/100</span>
                        <Badge variant={
                          analysis.academicLevel === "excellent" ? "default" :
                          analysis.academicLevel === "bon" ? "secondary" : "outline"
                        }>
                          {analysis.academicLevel}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>

                  {analysis.suggestions.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-sm flex items-center gap-2">
                          <Lightbulb className="h-4 w-4" />
                          Suggestions d'amélioration
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {analysis.suggestions.map((suggestion, index) => (
                            <li key={index} className="text-sm flex items-start gap-2">
                              <span className="text-warning">•</span>
                              <span>{suggestion}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>

                {/* Qualité académique */}
                <TabsContent value="quality" className="space-y-4">
                  {qualityCheck && (
                    <>
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-sm">Score de qualité académique</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <Progress value={qualityCheck.score} className="h-3" />
                          <p className="text-2xl font-bold text-center">{qualityCheck.score}/100</p>
                        </CardContent>
                      </Card>

                      <Card className="bg-green-50 border-green-200">
                        <CardHeader>
                          <CardTitle className="text-sm flex items-center gap-2 text-green-700">
                            <CheckCircle2 className="h-4 w-4" />
                            Points forts
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-1">
                            {qualityCheck.strengths.map((strength: string, index: number) => (
                              <li key={index} className="text-sm text-green-700 flex items-start gap-2">
                                <span>✓</span>
                                <span>{strength}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>

                      <Card className="bg-orange-50 border-orange-200">
                        <CardHeader>
                          <CardTitle className="text-sm flex items-center gap-2 text-orange-700">
                            <Lightbulb className="h-4 w-4" />
                            Axes d'amélioration
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-1">
                            {qualityCheck.improvements.map((improvement: string, index: number) => (
                              <li key={index} className="text-sm text-orange-700 flex items-start gap-2">
                                <span>→</span>
                                <span>{improvement}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </>
                  )}
                </TabsContent>

                {/* Plagiat */}
                <TabsContent value="plagiarism" className="space-y-4">
                  {plagiarismCheck && (
                    <>
                      <Alert className={
                        plagiarismCheck.score < 10 ? "bg-green-50 border-green-200" :
                        plagiarismCheck.score < 30 ? "bg-orange-50 border-orange-200" :
                        "bg-red-50 border-red-200"
                      }>
                        <ShieldAlert className={`h-4 w-4 ${
                          plagiarismCheck.score < 10 ? "text-green-600" :
                          plagiarismCheck.score < 30 ? "text-orange-600" :
                          "text-red-600"
                        }`} />
                        <AlertDescription className={
                          plagiarismCheck.score < 10 ? "text-green-800" :
                          plagiarismCheck.score < 30 ? "text-orange-800" :
                          "text-red-800"
                        }>
                          <p className="font-semibold mb-1">
                            Taux de similarité : {plagiarismCheck.score}%
                          </p>
                          <p className="text-xs">
                            {plagiarismCheck.score < 10 ? "Votre texte semble original ✓" :
                             plagiarismCheck.score < 30 ? "Quelques similarités détectées - Vérifiez vos citations" :
                             "Taux de similarité élevé - Risque de plagiat"}
                          </p>
                        </AlertDescription>
                      </Alert>

                      {plagiarismCheck.matches.length > 0 && (
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-sm">Correspondances trouvées</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            {plagiarismCheck.matches.map((match: any, index: number) => (
                              <Card key={index} className="bg-orange-50 border-orange-200">
                                <CardContent className="p-3">
                                  <p className="text-sm font-mono mb-2">"{match.text}"</p>
                                  {match.source && (
                                    <p className="text-xs text-muted-foreground">
                                      Source : {match.source}
                                    </p>
                                  )}
                                  <div className="flex items-center gap-2 mt-2">
                                    <Progress value={match.similarity} className="h-1 flex-1" />
                                    <span className="text-xs font-semibold">{match.similarity}%</span>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </CardContent>
                        </Card>
                      )}
                    </>
                  )}
                </TabsContent>
              </Tabs>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
