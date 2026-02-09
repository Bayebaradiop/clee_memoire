/**
 * Service d'IA pour la correction et l'amélioration des documents académiques
 * Utilise OpenAI GPT ou peut être remplacé par d'autres APIs (LanguageTool, etc.)
 */

export interface CorrectionIssue {
  id: string;
  type: "orthographe" | "grammaire" | "style" | "coherence" | "plagiat";
  severity: "error" | "warning" | "info";
  message: string;
  suggestion?: string;
  position: {
    start: number;
    end: number;
    line?: number;
  };
  original: string;
}

export interface DocumentAnalysis {
  wordCount: number;
  characterCount: number;
  sentenceCount: number;
  paragraphCount: number;
  readabilityScore: number; // Score de lisibilité (0-100)
  academicLevel: "faible" | "moyen" | "bon" | "excellent";
  issues: CorrectionIssue[];
  suggestions: string[];
}

/**
 * Analyse un texte et retourne les corrections et suggestions
 */
export async function analyzeDocument(text: string): Promise<DocumentAnalysis> {
  // Simuler un délai d'API
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Statistiques de base
  const words = text.trim().split(/\s+/).filter(w => w.length > 0);
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const paragraphs = text.split(/\n\n+/).filter(p => p.trim().length > 0);

  // Mock corrections (en production, utiliser une vraie API)
  const mockIssues: CorrectionIssue[] = [
    {
      id: "1",
      type: "orthographe",
      severity: "error",
      message: "Faute d'orthographe détectée",
      suggestion: "développement",
      position: { start: 45, end: 58 },
      original: "developement"
    },
    {
      id: "2",
      type: "grammaire",
      severity: "error",
      message: "Accord sujet-verbe incorrect",
      suggestion: "Les résultats montrent",
      position: { start: 120, end: 145 },
      original: "Les résultats montre"
    },
    {
      id: "3",
      type: "style",
      severity: "warning",
      message: "Formulation trop familière pour un contexte académique",
      suggestion: "Cette recherche démontre que",
      position: { start: 200, end: 220 },
      original: "Cette étude prouve que"
    },
    {
      id: "4",
      type: "coherence",
      severity: "info",
      message: "Transition manquante entre les paragraphes",
      suggestion: "Ajouter une phrase de transition pour améliorer la fluidité",
      position: { start: 350, end: 351 },
      original: ""
    },
  ];

  // Calcul du score de lisibilité (formule simplifiée de Flesch)
  const avgWordsPerSentence = words.length / Math.max(sentences.length, 1);
  const avgSyllablesPerWord = 1.5; // Simplification
  const readabilityScore = Math.max(0, Math.min(100, 
    206.835 - 1.015 * avgWordsPerSentence - 84.6 * avgSyllablesPerWord
  ));

  // Déterminer le niveau académique
  let academicLevel: "faible" | "moyen" | "bon" | "excellent" = "moyen";
  if (readabilityScore >= 80) academicLevel = "excellent";
  else if (readabilityScore >= 60) academicLevel = "bon";
  else if (readabilityScore >= 40) academicLevel = "moyen";
  else academicLevel = "faible";

  const suggestions = [
    "Utilisez des transitions plus explicites entre les sections",
    "Évitez les répétitions en variant votre vocabulaire",
    "Renforcez vos arguments avec des citations académiques",
    "Vérifiez la cohérence des temps verbaux dans tout le document",
    "Précisez vos références bibliographiques selon les normes APA"
  ];

  return {
    wordCount: words.length,
    characterCount: text.length,
    sentenceCount: sentences.length,
    paragraphCount: paragraphs.length,
    readabilityScore: Math.round(readabilityScore),
    academicLevel,
    issues: mockIssues,
    suggestions: suggestions.slice(0, 3)
  };
}

/**
 * Corrige automatiquement les erreurs détectées
 */
export function applyCorrections(text: string, corrections: CorrectionIssue[]): string {
  let correctedText = text;
  
  // Trier par position (de la fin vers le début pour éviter les décalages)
  const sortedCorrections = [...corrections]
    .filter(c => c.suggestion)
    .sort((a, b) => b.position.start - a.position.start);

  for (const correction of sortedCorrections) {
    const before = correctedText.substring(0, correction.position.start);
    const after = correctedText.substring(correction.position.end);
    correctedText = before + correction.suggestion + after;
  }

  return correctedText;
}

/**
 * Vérifie la qualité académique du texte
 */
export async function checkAcademicQuality(text: string): Promise<{
  score: number;
  feedback: string[];
  strengths: string[];
  improvements: string[];
}> {
  await new Promise(resolve => setTimeout(resolve, 1000));

  return {
    score: 75,
    feedback: [
      "Le texte présente une structure claire et logique",
      "L'argumentation est bien développée dans l'ensemble",
      "Certaines formulations gagneraient à être plus précises"
    ],
    strengths: [
      "Vocabulaire académique approprié",
      "Citations correctement intégrées",
      "Progression logique des idées"
    ],
    improvements: [
      "Renforcer les transitions entre paragraphes",
      "Éviter les répétitions de termes clés",
      "Développer davantage la conclusion"
    ]
  };
}

/**
 * Détecte les passages potentiellement plagiés
 */
export async function checkPlagiarism(text: string): Promise<{
  score: number; // 0 = pas de plagiat, 100 = plagiat complet
  matches: Array<{
    text: string;
    source?: string;
    similarity: number;
  }>;
}> {
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Mock - en production, utiliser une API comme Turnitin, Compilatio, etc.
  return {
    score: 8, // 8% de similarité
    matches: [
      {
        text: "Les technologies de l'information transforment notre société",
        source: "Wikipedia - Technologies de l'information",
        similarity: 95
      }
    ]
  };
}

/**
 * Génère des suggestions de reformulation
 */
export async function getSuggestions(text: string): Promise<string[]> {
  await new Promise(resolve => setTimeout(resolve, 800));

  return [
    "Cette recherche vise à démontrer l'impact significatif de...",
    "L'analyse des données révèle que...",
    "Les résultats obtenus confirment l'hypothèse selon laquelle..."
  ];
}
