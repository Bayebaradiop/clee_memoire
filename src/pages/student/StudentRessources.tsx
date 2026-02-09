import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, 
  Download, 
  Eye, 
  BookOpen, 
  GraduationCap, 
  FileCheck,
  Search,
  Star,
  Clock,
  Video
} from "lucide-react";
import { toast } from "sonner";

interface Resource {
  id: string;
  title: string;
  description: string;
  type: "template" | "guide" | "example" | "article" | "video";
  category: string;
  downloads: number;
  rating: number;
  fileSize?: string;
  duration?: string;
}

const mockResources: Resource[] = [
  {
    id: "1",
    title: "Template de Plan Détaillé",
    description: "Modèle structuré pour organiser votre plan de mémoire avec exemples",
    type: "template",
    category: "Plan",
    downloads: 324,
    rating: 4.8,
    fileSize: "450 KB"
  },
  {
    id: "2",
    title: "Guide de Rédaction Bibliographique",
    description: "Comment rédiger une bibliographie selon les normes APA et IEEE",
    type: "guide",
    category: "Bibliographie",
    downloads: 567,
    rating: 4.9,
    fileSize: "1.2 MB"
  },
  {
    id: "3",
    title: "Exemple de Mémoire en Informatique",
    description: "Mémoire complet sur l'Intelligence Artificielle (anonymisé)",
    type: "example",
    category: "Exemples",
    downloads: 892,
    rating: 4.7,
    fileSize: "3.5 MB"
  },
  {
    id: "4",
    title: "Méthodologie de Recherche",
    description: "Article sur les différentes méthodes de recherche académique",
    type: "article",
    category: "Méthodologie",
    downloads: 445,
    rating: 4.6,
    fileSize: "890 KB"
  },
  {
    id: "5",
    title: "Template de Page de Garde",
    description: "Page de garde professionnelle aux normes universitaires",
    type: "template",
    category: "Mise en forme",
    downloads: 678,
    rating: 4.9,
    fileSize: "120 KB"
  },
  {
    id: "6",
    title: "Comment Réussir sa Soutenance",
    description: "Tutoriel vidéo : préparation et techniques de présentation",
    type: "video",
    category: "Soutenance",
    downloads: 1024,
    rating: 5.0,
    duration: "25 min"
  },
  {
    id: "7",
    title: "Guide de Citation",
    description: "Maîtriser les citations et éviter le plagiat",
    type: "guide",
    category: "Rédaction",
    downloads: 523,
    rating: 4.7,
    fileSize: "780 KB"
  },
  {
    id: "8",
    title: "Template de Table des Matières",
    description: "Modèle automatique de table des matières Word/Google Docs",
    type: "template",
    category: "Mise en forme",
    downloads: 412,
    rating: 4.5,
    fileSize: "95 KB"
  },
];

const typeConfig = {
  template: { label: "Template", icon: FileText, color: "bg-blue-100 text-blue-800" },
  guide: { label: "Guide", icon: BookOpen, color: "bg-purple-100 text-purple-800" },
  example: { label: "Exemple", icon: GraduationCap, color: "bg-green-100 text-green-800" },
  article: { label: "Article", icon: FileCheck, color: "bg-orange-100 text-orange-800" },
  video: { label: "Vidéo", icon: Video, color: "bg-red-100 text-red-800" },
};

export default function Ressources() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = ["all", ...Array.from(new Set(mockResources.map(r => r.category)))];

  const filteredResources = mockResources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const resourcesByType = (type: Resource["type"]) =>
    filteredResources.filter(r => r.type === type);

  const handleDownload = (resource: Resource) => {
    toast.success(`Téléchargement de "${resource.title}"`);
  };

  const ResourceCard = ({ resource }: { resource: Resource }) => {
    const config = typeConfig[resource.type];
    const Icon = config.icon;

    return (
      <Card className="hover:border-primary/50 transition-colors">
        <CardHeader>
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className={config.color}>
                  <Icon className="h-3 w-3 mr-1" />
                  {config.label}
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  {resource.category}
                </Badge>
              </div>
              <CardTitle className="text-base leading-tight">{resource.title}</CardTitle>
              <CardDescription className="mt-2 text-sm line-clamp-2">
                {resource.description}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Download className="h-3 w-3" />
                {resource.downloads}
              </span>
              <span className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                {resource.rating}
              </span>
              {resource.fileSize && (
                <span className="flex items-center gap-1">
                  <FileText className="h-3 w-3" />
                  {resource.fileSize}
                </span>
              )}
              {resource.duration && (
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {resource.duration}
                </span>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <Button 
              size="sm" 
              variant="outline" 
              className="flex-1"
              onClick={() => toast.info("Aperçu (démo)")}
            >
              <Eye className="h-3.5 w-3.5 mr-1" /> Aperçu
            </Button>
            <Button 
              size="sm" 
              className="flex-1 bg-warning text-warning-foreground hover:bg-warning/90"
              onClick={() => handleDownload(resource)}
            >
              <Download className="h-3.5 w-3.5 mr-1" /> Télécharger
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-poppins font-bold flex items-center gap-2">
          <BookOpen className="h-6 w-6" />
          Bibliothèque de Ressources
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Templates, guides et exemples pour vous aider dans votre rédaction
        </p>
      </div>

      {/* Barre de recherche */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher une ressource..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Filtres par catégorie */}
      <div className="flex gap-2 flex-wrap">
        {categories.map(category => (
          <Button
            key={category}
            size="sm"
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => setSelectedCategory(category)}
            className={selectedCategory === category ? "bg-primary" : ""}
          >
            {category === "all" ? "Toutes" : category}
          </Button>
        ))}
      </div>

      {/* Statistiques */}
      <div className="grid gap-4 md:grid-cols-4">
        {Object.entries(typeConfig).map(([type, config]) => {
          const count = resourcesByType(type as Resource["type"]).length;
          const Icon = config.icon;
          return (
            <Card key={type}>
              <CardContent className="p-4 flex items-center gap-3">
                <div className={`h-10 w-10 rounded-lg ${config.color} flex items-center justify-center`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{count}</p>
                  <p className="text-xs text-muted-foreground">{config.label}s</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Onglets par type */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">Toutes ({filteredResources.length})</TabsTrigger>
          <TabsTrigger value="templates">Templates ({resourcesByType("template").length})</TabsTrigger>
          <TabsTrigger value="guides">Guides ({resourcesByType("guide").length})</TabsTrigger>
          <TabsTrigger value="examples">Exemples ({resourcesByType("example").length})</TabsTrigger>
          <TabsTrigger value="other">Autres</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {filteredResources.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">Aucune ressource trouvée</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredResources.map(resource => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="templates">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {resourcesByType("template").map(resource => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="guides">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {resourcesByType("guide").map(resource => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="examples">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {resourcesByType("example").map(resource => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="other">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[...resourcesByType("article"), ...resourcesByType("video")].map(resource => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
