import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { 
  FileDown, 
  FileText, 
  Check, 
  Settings2, 
  BookOpen,
  FileCheck,
  ListOrdered,
  Sparkles
} from "lucide-react";
import { toast } from "sonner";

interface ExportSection {
  id: string;
  title: string;
  included: boolean;
  pages: number;
}

export default function ExportMemoire() {
  const [exporting, setExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [format, setFormat] = useState("pdf");
  const [style, setStyle] = useState("academique");
  const [sections, setSections] = useState<ExportSection[]>([
    { id: "cover", title: "Page de garde", included: true, pages: 1 },
    { id: "toc", title: "Table des matières", included: true, pages: 2 },
    { id: "intro", title: "Introduction", included: true, pages: 5 },
    { id: "chap1", title: "Chapitre 1: Contexte", included: true, pages: 15 },
    { id: "chap2", title: "Chapitre 2: Méthodologie", included: true, pages: 18 },
    { id: "chap3", title: "Chapitre 3: Résultats", included: true, pages: 22 },
    { id: "conclusion", title: "Conclusion", included: true, pages: 4 },
    { id: "biblio", title: "Bibliographie", included: true, pages: 6 },
    { id: "annexes", title: "Annexes", included: false, pages: 12 },
  ]);

  const totalPages = sections
    .filter(s => s.included)
    .reduce((acc, s) => acc + s.pages, 0);

  const toggleSection = (id: string) => {
    setSections(prev =>
      prev.map(s => (s.id === id ? { ...s, included: !s.included } : s))
    );
  };

  const handleExport = async () => {
    setExporting(true);
    setExportProgress(0);

    // Simuler l'export
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setExportProgress(i);
    }

    toast.success("Mémoire exporté avec succès !");
    setExporting(false);
    setExportProgress(0);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-poppins font-bold flex items-center gap-2">
          <FileDown className="h-6 w-6" />
          Export & Génération du Mémoire
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Compilez votre mémoire complet avec mise en page automatique
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Configuration */}
        <div className="lg:col-span-2 space-y-6">
          {/* Sections */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <ListOrdered className="h-5 w-5" />
                Sélection des sections
              </CardTitle>
              <CardDescription>
                Choisissez les parties à inclure dans l'export
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {sections.map(section => (
                <div
                  key={section.id}
                  className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Checkbox
                      checked={section.included}
                      onCheckedChange={() => toggleSection(section.id)}
                    />
                    <div>
                      <p className="font-medium text-sm">{section.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {section.pages} page{section.pages > 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>
                  {section.included && (
                    <Badge variant="secondary">
                      <Check className="h-3 w-3 mr-1" />
                      Inclus
                    </Badge>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Options */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Settings2 className="h-5 w-5" />
                Options d'export
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="format">Format</Label>
                  <Select value={format} onValueChange={setFormat}>
                    <SelectTrigger id="format">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="docx">Word (DOCX)</SelectItem>
                      <SelectItem value="latex">LaTeX</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="style">Style</Label>
                  <Select value={style} onValueChange={setStyle}>
                    <SelectTrigger id="style">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="academique">Académique</SelectItem>
                      <SelectItem value="moderne">Moderne</SelectItem>
                      <SelectItem value="classique">Classique</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-2">
                  <Checkbox id="numbering" defaultChecked />
                  <Label htmlFor="numbering" className="font-normal cursor-pointer">
                    Numérotation automatique des pages
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="toc-auto" defaultChecked />
                  <Label htmlFor="toc-auto" className="font-normal cursor-pointer">
                    Table des matières automatique
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="headers" defaultChecked />
                  <Label htmlFor="headers" className="font-normal cursor-pointer">
                    En-têtes et pieds de page
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="citations" defaultChecked />
                  <Label htmlFor="citations" className="font-normal cursor-pointer">
                    Formatage automatique des citations
                  </Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Aperçu & Export */}
        <div className="space-y-6">
          {/* Résumé */}
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle className="text-lg">Résumé</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Sections</span>
                  <span className="font-medium">
                    {sections.filter(s => s.included).length}/{sections.length}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Pages totales</span>
                  <span className="font-medium">{totalPages}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Format</span>
                  <Badge variant="outline">{format.toUpperCase()}</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Style</span>
                  <span className="font-medium capitalize">{style}</span>
                </div>
              </div>

              {exporting && (
                <div className="space-y-2 pt-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Export en cours...</span>
                    <span className="font-medium">{exportProgress}%</span>
                  </div>
                  <Progress value={exportProgress} className="h-2" />
                </div>
              )}

              <Button
                className="w-full bg-warning text-warning-foreground hover:bg-warning/90"
                size="lg"
                onClick={handleExport}
                disabled={exporting || sections.filter(s => s.included).length === 0}
              >
                {exporting ? (
                  <>
                    <Sparkles className="h-4 w-4 mr-2 animate-spin" />
                    Génération...
                  </>
                ) : (
                  <>
                    <FileDown className="h-4 w-4 mr-2" />
                    Exporter le mémoire
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Fonctionnalités */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Fonctionnalités incluses</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { icon: BookOpen, text: "Mise en page professionnelle" },
                { icon: ListOrdered, text: "Table des matières auto" },
                { icon: FileCheck, text: "Numérotation des pages" },
                { icon: FileText, text: "Citations formatées" },
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <div className="bg-green-100 dark:bg-green-950 rounded p-1">
                    <feature.icon className="h-3.5 w-3.5 text-green-600" />
                  </div>
                  <span className="text-muted-foreground">{feature.text}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
