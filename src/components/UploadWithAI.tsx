import { useState, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Upload, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  FileText,
  Loader2,
  X,
  Download,
  Copy,
  Info,
  ShieldAlert
} from "lucide-react";
import { toast } from "sonner";
import { extractTextFromFile, isFileSupported, getFileFormat } from "@/lib/file-extractor";
import { analyzeDocument, checkPlagiarism, applyCorrections, type DocumentAnalysis } from "@/lib/ai-correction";

interface UploadWithAIProps {
  onUploadComplete?: (file: File, analysis: DocumentAnalysis) => void;
}

export function UploadWithAI({ onUploadComplete }: UploadWithAIProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedText, setExtractedText] = useState("");
  const [analysis, setAnalysis] = useState<DocumentAnalysis | null>(null);
  const [plagiarismCheck, setPlagiarismCheck] = useState<any>(null);
  const [correctedText, setCorrectedText] = useState("");
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (!isFileSupported(selectedFile)) {
      toast.error("Format non supporté. Utilisez PDF, DOCX ou TXT.");
      return;
    }

    setFile(selectedFile);
    setProgress(0);
    setIsProcessing(true);

    try {
      // Étape 1: Extraction du texte (20%)
      setProgress(20);
      toast.info("Extraction du texte en cours...");
      const text = await extractTextFromFile(selectedFile);
      setExtractedText(text);

      // Étape 2: Analyse IA (60%)
      setProgress(40);
      toast.info("Analyse IA en cours...");
      const [analysisResult, plagiarismResult] = await Promise.all([
        analyzeDocument(text),
        checkPlagiarism(text)
      ]);
      setProgress(80);

      setAnalysis(analysisResult);
      setPlagiarismCheck(plagiarismResult);

      // Étape 3: Corrections automatiques (100%)
      const corrected = applyCorrections(text, analysisResult.issues);
      setCorrectedText(corrected);
      setProgress(100);

      // Notification des résultats
      const errorCount = analysisResult.issues.filter(i => i.severity === "error").length;
      const warningCount = analysisResult.issues.filter(i => i.severity === "warning").length;

      if (errorCount === 0 && warningCount === 0) {
        toast.success("✅ Aucune erreur détectée ! Document de qualité.");
      } else {
        toast.warning(`${errorCount} erreur(s) et ${warningCount} avertissement(s) détecté(s)`);
      }

      // Callback
      if (onUploadComplete) {
        onUploadComplete(selectedFile, analysisResult);
      }

    } catch (error) {
      toast.error("Erreur lors du traitement du fichier");
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setExtractedText("");
    setAnalysis(null);
    setPlagiarismCheck(null);
    setCorrectedText("");
    setProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const downloadCorrectedDocument = () => {
    const blob = new Blob([correctedText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${file?.name.replace(/\.[^/.]+$/, "")}_corrigé.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Document corrigé téléchargé !");
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "error": return "border-red-200 bg-red-50";
      case "warning": return "border-orange-200 bg-orange-50";
      case "info": return "border-blue-200 bg-blue-50";
      default: return "border-gray-200 bg-gray-50";
    }
  };

  return (
    <div className="space-y-6">
      {/* Zone d'upload */}
      {!file ? (
        <Card className="border-2 border-dashed">
          <CardContent className="p-12">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="bg-warning/10 rounded-full p-6">
                <Upload className="h-12 w-12 text-warning" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  Déposez votre document pour une correction automatique
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  L'IA analysera automatiquement l'orthographe, la grammaire et le plagiat
                </p>
                <p className="text-xs text-muted-foreground">
                  Formats supportés : PDF, DOCX, TXT • Max 10 Mo
                </p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.docx,.txt"
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload"
              />
              <Button
                size="lg"
                className="bg-warning text-warning-foreground hover:bg-warning/90"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="h-5 w-5 mr-2" />
                Sélectionner un fichier
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* En-tête du fichier */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 rounded-lg p-3">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">{file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(file.size / 1024).toFixed(2)} Ko • {getFileFormat(file).toUpperCase()}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={handleReset}>
                  <X className="h-4 w-4" />
                </Button>
              </div>

              {isProcessing && (
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Traitement en cours...
                    </span>
                    <span className="font-semibold">{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Résultats de l'analyse */}
          {analysis && !isProcessing && (
            <>
              {/* Résumé rapide */}
              <div className="grid gap-4 md:grid-cols-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-2 ${
                      analysis.issues.filter(i => i.severity === "error").length === 0 
                        ? "bg-green-100" : "bg-red-100"
                    }`}>
                      {analysis.issues.filter(i => i.severity === "error").length === 0 ? (
                        <CheckCircle2 className="h-6 w-6 text-green-600" />
                      ) : (
                        <AlertCircle className="h-6 w-6 text-red-600" />
                      )}
                    </div>
                    <p className="text-2xl font-bold">
                      {analysis.issues.filter(i => i.severity === "error").length}
                    </p>
                    <p className="text-xs text-muted-foreground">Erreurs</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-orange-100 mb-2">
                      <Info className="h-6 w-6 text-orange-600" />
                    </div>
                    <p className="text-2xl font-bold">
                      {analysis.issues.filter(i => i.severity === "warning").length}
                    </p>
                    <p className="text-xs text-muted-foreground">Avertissements</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 mb-2">
                      <FileText className="h-6 w-6 text-blue-600" />
                    </div>
                    <p className="text-2xl font-bold">{analysis.wordCount}</p>
                    <p className="text-xs text-muted-foreground">Mots</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 text-center">
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-2 ${
                      plagiarismCheck.score < 10 ? "bg-green-100" :
                      plagiarismCheck.score < 30 ? "bg-orange-100" : "bg-red-100"
                    }`}>
                      <ShieldAlert className={`h-6 w-6 ${
                        plagiarismCheck.score < 10 ? "text-green-600" :
                        plagiarismCheck.score < 30 ? "text-orange-600" : "text-red-600"
                      }`} />
                    </div>
                    <p className="text-2xl font-bold">{plagiarismCheck.score}%</p>
                    <p className="text-xs text-muted-foreground">Similarité</p>
                  </CardContent>
                </Card>
              </div>

              {/* Onglets détaillés */}
              <Tabs defaultValue="corrections" className="space-y-4">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="corrections">
                    Corrections
                    {analysis.issues.length > 0 && (
                      <Badge variant="destructive" className="ml-2">
                        {analysis.issues.length}
                      </Badge>
                    )}
                  </TabsTrigger>
                  <TabsTrigger value="corrected">Texte corrigé</TabsTrigger>
                  <TabsTrigger value="plagiarism">Plagiat</TabsTrigger>
                </TabsList>

                {/* Liste des corrections */}
                <TabsContent value="corrections">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Corrections détectées</CardTitle>
                      <CardDescription>
                        {analysis.issues.length === 0 
                          ? "Aucune correction nécessaire" 
                          : `${analysis.issues.length} correction(s) détectée(s)`}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3 max-h-[500px] overflow-y-auto">
                      {analysis.issues.length === 0 ? (
                        <Alert className="bg-green-50 border-green-200">
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                          <AlertDescription className="text-green-800">
                            Excellent ! Aucune erreur détectée dans votre document.
                          </AlertDescription>
                        </Alert>
                      ) : (
                        analysis.issues.map((issue) => (
                          <Alert key={issue.id} className={getSeverityColor(issue.severity)}>
                            <AlertDescription>
                              <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <Badge variant="outline" className="text-xs">
                                    {issue.type}
                                  </Badge>
                                  <span className="font-semibold text-sm">{issue.message}</span>
                                </div>
                                {issue.original && (
                                  <p className="text-sm">
                                    <span className="font-semibold">Original :</span>{" "}
                                    <code className="bg-white/70 px-1 rounded">{issue.original}</code>
                                  </p>
                                )}
                                {issue.suggestion && (
                                  <p className="text-sm">
                                    <span className="font-semibold">Suggestion :</span>{" "}
                                    <code className="bg-green-100 px-1 rounded text-green-800">
                                      {issue.suggestion}
                                    </code>
                                  </p>
                                )}
                              </div>
                            </AlertDescription>
                          </Alert>
                        ))
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Texte corrigé */}
                <TabsContent value="corrected">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg">Document corrigé automatiquement</CardTitle>
                          <CardDescription>
                            Toutes les corrections ont été appliquées
                          </CardDescription>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              navigator.clipboard.writeText(correctedText);
                              toast.success("Texte copié !");
                            }}
                          >
                            <Copy className="h-4 w-4 mr-1" />
                            Copier
                          </Button>
                          <Button
                            size="sm"
                            className="bg-warning text-warning-foreground"
                            onClick={downloadCorrectedDocument}
                          >
                            <Download className="h-4 w-4 mr-1" />
                            Télécharger
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4 max-h-[500px] overflow-y-auto">
                        <pre className="whitespace-pre-wrap text-sm font-mono">
                          {correctedText}
                        </pre>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Plagiat */}
                <TabsContent value="plagiarism">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Analyse de plagiat</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
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
                        <AlertDescription>
                          <p className="font-semibold mb-1">
                            Taux de similarité : {plagiarismCheck.score}%
                          </p>
                          <p className="text-sm">
                            {plagiarismCheck.score < 10 ? "✅ Votre document semble original" :
                             plagiarismCheck.score < 30 ? "⚠️ Quelques similarités - Vérifiez vos citations" :
                             "❌ Taux élevé - Risque de plagiat"}
                          </p>
                        </AlertDescription>
                      </Alert>

                      {plagiarismCheck.matches.length > 0 && (
                        <div className="space-y-3">
                          <p className="text-sm font-semibold">Passages similaires trouvés :</p>
                          {plagiarismCheck.matches.map((match: any, index: number) => (
                            <Alert key={index} className="bg-orange-50 border-orange-200">
                              <AlertDescription>
                                <p className="text-sm font-mono mb-2">"{match.text}"</p>
                                {match.source && (
                                  <p className="text-xs text-muted-foreground mb-2">
                                    Source : {match.source}
                                  </p>
                                )}
                                <div className="flex items-center gap-2">
                                  <Progress value={match.similarity} className="h-1 flex-1" />
                                  <span className="text-xs font-semibold">{match.similarity}%</span>
                                </div>
                              </AlertDescription>
                            </Alert>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              {/* Actions finales */}
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <p className="font-semibold text-sm mb-1">Document analysé avec succès !</p>
                      <p className="text-xs text-muted-foreground">
                        Vous pouvez télécharger la version corrigée ou soumettre le document
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={handleReset}>
                        Nouveau document
                      </Button>
                      <Button className="bg-primary">
                        <Upload className="h-4 w-4 mr-2" />
                        Soumettre à l'accompagnateur
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </>
      )}
    </div>
  );
}
