/**
 * Types et templates pour le système de feedback structuré
 */

export interface FeedbackCriterion {
  id: string;
  name: string;
  description: string;
  weight: number; // Pondération en %
  maxScore: number;
  score?: number;
}

export interface FeedbackTemplate {
  id: string;
  name: string;
  type: "plan" | "chapitre" | "final" | "revision";
  criteria: FeedbackCriterion[];
  comments?: string;
}

export interface DocumentFeedback {
  id: string;
  documentId: string;
  documentName: string;
  evaluatorId: string;
  evaluatorName: string;
  templateUsed: string;
  criteria: FeedbackCriterion[];
  globalComment: string;
  strengths: string[];
  improvements: string[];
  globalScore: number;
  status: "draft" | "sent" | "read";
  createdAt: string;
  updatedAt: string;
}

// Templates prédéfinis de grilles d'évaluation
export const feedbackTemplates: FeedbackTemplate[] = [
  {
    id: "template-plan",
    name: "Évaluation du Plan détaillé",
    type: "plan",
    criteria: [
      {
        id: "c1",
        name: "Pertinence du sujet",
        description: "Le sujet est-il bien délimité et pertinent ?",
        weight: 20,
        maxScore: 20
      },
      {
        id: "c2",
        name: "Structure du plan",
        description: "La structure est-elle cohérente et logique ?",
        weight: 25,
        maxScore: 20
      },
      {
        id: "c3",
        name: "Problématique",
        description: "La problématique est-elle clairement formulée ?",
        weight: 20,
        maxScore: 20
      },
      {
        id: "c4",
        name: "Méthodologie",
        description: "La méthodologie envisagée est-elle appropriée ?",
        weight: 20,
        maxScore: 20
      },
      {
        id: "c5",
        name: "Bibliographie préliminaire",
        description: "Les sources sont-elles pertinentes et récentes ?",
        weight: 15,
        maxScore: 20
      }
    ]
  },
  {
    id: "template-chapitre",
    name: "Évaluation d'un Chapitre",
    type: "chapitre",
    criteria: [
      {
        id: "c1",
        name: "Qualité rédactionnelle",
        description: "Style académique, orthographe, grammaire",
        weight: 20,
        maxScore: 20
      },
      {
        id: "c2",
        name: "Argumentation",
        description: "Solidité et cohérence des arguments",
        weight: 25,
        maxScore: 20
      },
      {
        id: "c3",
        name: "Utilisation des sources",
        description: "Citations appropriées et références correctes",
        weight: 20,
        maxScore: 20
      },
      {
        id: "c4",
        name: "Analyse critique",
        description: "Profondeur de l'analyse et esprit critique",
        weight: 20,
        maxScore: 20
      },
      {
        id: "c5",
        name: "Respect des normes",
        description: "Conformité aux normes académiques",
        weight: 15,
        maxScore: 20
      }
    ]
  },
  {
    id: "template-final",
    name: "Évaluation du Mémoire Complet",
    type: "final",
    criteria: [
      {
        id: "c1",
        name: "Introduction",
        description: "Contexte, problématique, annonce du plan",
        weight: 10,
        maxScore: 20
      },
      {
        id: "c2",
        name: "Développement",
        description: "Qualité du contenu et de l'argumentation",
        weight: 30,
        maxScore: 20
      },
      {
        id: "c3",
        name: "Conclusion",
        description: "Synthèse, réponse à la problématique, ouvertures",
        weight: 10,
        maxScore: 20
      },
      {
        id: "c4",
        name: "Méthodologie",
        description: "Rigueur scientifique et méthodes appropriées",
        weight: 20,
        maxScore: 20
      },
      {
        id: "c5",
        name: "Bibliographie",
        description: "Qualité et conformité des références",
        weight: 10,
        maxScore: 20
      },
      {
        id: "c6",
        name: "Présentation générale",
        description: "Mise en forme, respect des normes",
        weight: 10,
        maxScore: 20
      },
      {
        id: "c7",
        name: "Originalité",
        description: "Apport personnel et innovation",
        weight: 10,
        maxScore: 20
      }
    ]
  },
  {
    id: "template-revision",
    name: "Vérification après Révision",
    type: "revision",
    criteria: [
      {
        id: "c1",
        name: "Corrections demandées",
        description: "Les corrections demandées ont-elles été effectuées ?",
        weight: 40,
        maxScore: 20
      },
      {
        id: "c2",
        name: "Qualité des corrections",
        description: "Les améliorations sont-elles satisfaisantes ?",
        weight: 30,
        maxScore: 20
      },
      {
        id: "c3",
        name: "Nouvelles problématiques",
        description: "De nouvelles erreurs sont-elles apparues ?",
        weight: 15,
        maxScore: 20
      },
      {
        id: "c4",
        name: "Progression globale",
        description: "Le document s'est-il amélioré dans l'ensemble ?",
        weight: 15,
        maxScore: 20
      }
    ]
  }
];

// Templates de commentaires prédéfinis
export const commentTemplates = {
  strengths: [
    "Excellente maîtrise du sujet",
    "Argumentation solide et convaincante",
    "Citations bien intégrées et pertinentes",
    "Rédaction claire et structurée",
    "Esprit critique développé",
    "Méthodologie rigoureuse",
    "Bonne utilisation des sources",
    "Originalité de l'approche",
    "Problématique bien formulée",
    "Analyse approfondie"
  ],
  improvements: [
    "Renforcer l'argumentation dans certaines parties",
    "Développer davantage l'analyse critique",
    "Améliorer les transitions entre les parties",
    "Enrichir la bibliographie",
    "Préciser certains concepts clés",
    "Vérifier l'orthographe et la grammaire",
    "Respecter les normes de citation",
    "Développer la conclusion",
    "Clarifier la méthodologie",
    "Éviter les répétitions"
  ],
  general: [
    "Bon travail dans l'ensemble",
    "Document de qualité",
    "Quelques ajustements nécessaires",
    "Travail prometteur qui mérite d'être approfondi",
    "Progrès significatifs depuis la dernière version",
    "Conforme aux attentes",
    "Nécessite des révisions importantes",
    "Excellent travail de recherche",
    "Démontre une bonne compréhension du sujet",
    "Respecte les consignes académiques"
  ]
};

/**
 * Calcule le score global pondéré
 */
export function calculateGlobalScore(criteria: FeedbackCriterion[]): number {
  let totalScore = 0;
  let totalWeight = 0;

  for (const criterion of criteria) {
    if (criterion.score !== undefined) {
      const normalizedScore = (criterion.score / criterion.maxScore) * 100;
      totalScore += normalizedScore * (criterion.weight / 100);
      totalWeight += criterion.weight;
    }
  }

  return totalWeight > 0 ? Math.round((totalScore / totalWeight) * 100) : 0;
}

/**
 * Obtient la mention selon le score
 */
export function getMention(score: number): {
  label: string;
  color: string;
} {
  if (score >= 90) return { label: "Excellent", color: "text-green-700 bg-green-100 border-green-300" };
  if (score >= 80) return { label: "Très Bien", color: "text-blue-700 bg-blue-100 border-blue-300" };
  if (score >= 70) return { label: "Bien", color: "text-cyan-700 bg-cyan-100 border-cyan-300" };
  if (score >= 60) return { label: "Assez Bien", color: "text-yellow-700 bg-yellow-100 border-yellow-300" };
  if (score >= 50) return { label: "Passable", color: "text-orange-700 bg-orange-100 border-orange-300" };
  return { label: "Insuffisant", color: "text-red-700 bg-red-100 border-red-300" };
}

// Données mockées de feedbacks
export const mockFeedbacks: DocumentFeedback[] = [
  {
    id: "f1",
    documentId: "doc1",
    documentName: "Plan détaillé.docx",
    evaluatorId: "a1",
    evaluatorName: "Dr. Sophie Martin",
    templateUsed: "template-plan",
    criteria: [
      { id: "c1", name: "Pertinence du sujet", description: "", weight: 20, maxScore: 20, score: 18 },
      { id: "c2", name: "Structure du plan", description: "", weight: 25, maxScore: 20, score: 16 },
      { id: "c3", name: "Problématique", description: "", weight: 20, maxScore: 20, score: 17 },
      { id: "c4", name: "Méthodologie", description: "", weight: 20, maxScore: 20, score: 15 },
      { id: "c5", name: "Bibliographie préliminaire", description: "", weight: 15, maxScore: 20, score: 14 }
    ],
    globalComment: "Bon travail dans l'ensemble. Le plan est cohérent et la problématique est bien formulée. Quelques ajustements sont nécessaires au niveau de la méthodologie.",
    strengths: [
      "Problématique claire et pertinente",
      "Structure logique du plan",
      "Bonne délimitation du sujet"
    ],
    improvements: [
      "Développer davantage la méthodologie",
      "Enrichir la bibliographie avec des sources plus récentes",
      "Préciser les objectifs de recherche"
    ],
    globalScore: 81,
    status: "sent",
    createdAt: "2026-02-05T14:30:00Z",
    updatedAt: "2026-02-05T14:30:00Z"
  },
  {
    id: "f2",
    documentId: "doc2",
    documentName: "Chapitre 1 - Introduction.docx",
    evaluatorId: "a1",
    evaluatorName: "Dr. Sophie Martin",
    templateUsed: "template-chapitre",
    criteria: [
      { id: "c1", name: "Qualité rédactionnelle", description: "", weight: 20, maxScore: 20, score: 17 },
      { id: "c2", name: "Argumentation", description: "", weight: 25, maxScore: 20, score: 18 },
      { id: "c3", name: "Utilisation des sources", description: "", weight: 20, maxScore: 20, score: 16 },
      { id: "c4", name: "Analyse critique", description: "", weight: 20, maxScore: 20, score: 15 },
      { id: "c5", name: "Respect des normes", description: "", weight: 15, maxScore: 20, score: 18 }
    ],
    globalComment: "Chapitre de bonne qualité avec une argumentation solide. L'analyse critique pourrait être approfondie.",
    strengths: [
      "Excellente maîtrise du sujet",
      "Argumentation bien structurée",
      "Respect des normes académiques"
    ],
    improvements: [
      "Développer l'esprit critique",
      "Intégrer plus de sources récentes",
      "Renforcer certaines transitions"
    ],
    globalScore: 84,
    status: "read",
    createdAt: "2026-01-28T10:15:00Z",
    updatedAt: "2026-01-28T10:15:00Z"
  }
];
