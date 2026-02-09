export type UserRole = "etudiant" | "accompagnateur" | "admin";

export type StepStatus = "completed" | "in_progress" | "to_correct" | "pending";

export interface MemoireStep {
  id: string;
  title: string;
  description: string;
  status: StepStatus;
  order: number;
  dueDate?: string;
}

export interface Document {
  id: string;
  name: string;
  type: "pdf" | "docx";
  uploadedAt: string;
  status: "pending" | "reviewed" | "approved" | "rejected";
  stepId: string;
  feedback?: string;
}

// Import du type Feedback depuis feedback-system
import type { Feedback } from './feedback-system';

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: UserRole;
  content: string;
  sentAt: string;
  read: boolean;
  attachments?: { name: string; url: string }[];
}

export interface Conversation {
  id: string;
  participants: { id: string; name: string; role: UserRole }[];
  lastMessage: string;
  lastMessageAt: string;
  unreadCount: number;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  progress: number;
  currentStep: string;
  accompagnateurId?: string;
  pack: string;
}

export interface Accompagnateur {
  id: string;
  name: string;
  email: string;
  studentsCount: number;
  specialty: string;
}

export interface Pack {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
}

// Mock Steps
export const defaultSteps: MemoireStep[] = [
  { id: "1", title: "Choix du sujet", description: "Définir et valider le sujet du mémoire", status: "completed", order: 1 },
  { id: "2", title: "Recherche bibliographique", description: "Collecter les sources et références", status: "completed", order: 2 },
  { id: "3", title: "Plan détaillé", description: "Structurer le mémoire en chapitres", status: "in_progress", order: 3 },
  { id: "4", title: "Rédaction", description: "Rédiger le contenu du mémoire", status: "pending", order: 4 },
  { id: "5", title: "Révision", description: "Relecture et corrections", status: "pending", order: 5 },
  { id: "6", title: "Mise en forme", description: "Formatage final et mise en page", status: "pending", order: 6 },
  { id: "7", title: "Soutenance", description: "Préparation et passage de la soutenance", status: "pending", order: 7 },
];

// Mock Students
export const mockStudents: Student[] = [
  { id: "s1", name: "Amina Diallo", email: "amina@email.com", progress: 42, currentStep: "Plan détaillé", accompagnateurId: "a1", pack: "Premium" },
  { id: "s2", name: "Youssef Benali", email: "youssef@email.com", progress: 71, currentStep: "Rédaction", accompagnateurId: "a1", pack: "Standard" },
  { id: "s3", name: "Claire Dupont", email: "claire@email.com", progress: 15, currentStep: "Recherche bibliographique", accompagnateurId: "a2", pack: "Premium" },
  { id: "s4", name: "Mamadou Traoré", email: "mamadou@email.com", progress: 90, currentStep: "Mise en forme", accompagnateurId: "a2", pack: "Essentiel" },
  { id: "s5", name: "Sophie Martin", email: "sophie@email.com", progress: 28, currentStep: "Choix du sujet", pack: "Standard" },
];

// Mock Accompagnateurs
export const mockAccompagnateurs: Accompagnateur[] = [
  { id: "a1", name: "Dr. Fatima Zahra", email: "fatima@email.com", studentsCount: 2, specialty: "Sciences sociales" },
  { id: "a2", name: "Prof. Jean-Pierre", email: "jp@email.com", studentsCount: 2, specialty: "Économie" },
];

// Mock Documents
export const mockDocuments: Document[] = [
  { id: "d1", name: "Plan_memoire_v2.pdf", type: "pdf", uploadedAt: "2025-02-01", status: "reviewed", stepId: "3", feedback: "Bonne structure, revoir le chapitre 3" },
  { id: "d2", name: "Bibliographie.docx", type: "docx", uploadedAt: "2025-01-28", status: "approved", stepId: "2" },
  { id: "d3", name: "Introduction.pdf", type: "pdf", uploadedAt: "2025-02-05", status: "pending", stepId: "4" },
];

// Mock Conversations
export const mockConversations: Conversation[] = [
  { id: "c1", participants: [{ id: "s1", name: "Amina Diallo", role: "etudiant" }, { id: "a1", name: "Dr. Fatima Zahra", role: "accompagnateur" }], lastMessage: "J'ai mis à jour le plan, pouvez-vous le relire ?", lastMessageAt: "2025-02-06 14:30", unreadCount: 2 },
  { id: "c2", participants: [{ id: "s1", name: "Amina Diallo", role: "etudiant" }, { id: "admin", name: "Administration", role: "admin" }], lastMessage: "Votre pack a été activé avec succès.", lastMessageAt: "2025-02-04 09:15", unreadCount: 0 },
];

// Mock Messages
export const mockMessages: Message[] = [
  { id: "m1", senderId: "s1", senderName: "Amina Diallo", senderRole: "etudiant", content: "Bonjour, j'ai mis à jour le plan détaillé. Pouvez-vous le relire ?", sentAt: "2025-02-06 14:30", read: true },
  { id: "m2", senderId: "a1", senderName: "Dr. Fatima Zahra", senderRole: "accompagnateur", content: "Très bien, je vais le relire ce soir. N'oubliez pas d'ajouter les références.", sentAt: "2025-02-06 15:45", read: false },
  { id: "m3", senderId: "s1", senderName: "Amina Diallo", senderRole: "etudiant", content: "D'accord, merci beaucoup !", sentAt: "2025-02-06 16:00", read: false, attachments: [{ name: "Plan_v3.pdf", url: "#" }] },
];

// Mock Packs
export const mockPacks: Pack[] = [
  { id: "p1", name: "Essentiel", description: "Accompagnement de base pour démarrer", price: 150, features: ["Suivi par étapes", "1 correction par étape", "Messagerie"] },
  { id: "p2", name: "Standard", description: "Accompagnement complet et structuré", price: 300, features: ["Suivi par étapes", "3 corrections par étape", "Messagerie", "Feedbacks détaillés", "Appel de suivi mensuel"] },
  { id: "p3", name: "Premium", description: "Accompagnement intensif et personnalisé", price: 500, features: ["Suivi par étapes", "Corrections illimitées", "Messagerie prioritaire", "Feedbacks détaillés", "Appels hebdomadaires", "Aide à la soutenance"] },
];

// Mock testimonials
export const mockTestimonials = [
  { id: "t1", name: "Kenza B.", quote: "Grâce à Clé Du Mémoire, j'ai pu structurer mon travail et obtenir mon diplôme avec mention !", university: "Université Paris 8" },
  { id: "t2", name: "Thomas L.", quote: "L'accompagnement personnalisé m'a permis de surmonter le syndrome de la page blanche.", university: "Université Lyon 3" },
  { id: "t3", name: "Fatou S.", quote: "Les feedbacks précis de mon accompagnateur ont vraiment fait la différence.", university: "Université de Dakar" },
];

// Mock Feedbacks structurés
export const mockFeedbacks: Feedback[] = [
  {
    id: "f1",
    documentId: "doc1",
    documentName: "Introduction - Chapitre 1",
    evaluatorId: "acc1",
    evaluatorName: "Dr. Sophie Martin",
    date: new Date("2024-01-15T10:30:00").toISOString(),
    templateType: "chapitre",
    criteria: [
      { name: "Clarté de la problématique", score: 16, maxScore: 20, weight: 25 },
      { name: "Cohérence de l'argumentation", score: 14, maxScore: 20, weight: 30 },
      { name: "Qualité de l'écriture", score: 15, maxScore: 20, weight: 20 },
      { name: "Respect des normes académiques", score: 17, maxScore: 20, weight: 15 },
      { name: "Pertinence des sources", score: 13, maxScore: 20, weight: 10 },
    ],
    globalScore: 15.1,
    strengths: [
      "Problématique bien formulée et pertinente",
      "Bon respect des citations et références",
      "Style d'écriture clair et fluide"
    ],
    improvements: [
      "Développer davantage la transition entre les sections",
      "Ajouter plus de sources récentes (< 5 ans)",
      "Approfondir l'analyse critique dans la partie 2"
    ],
    comment: "Bon travail d'ensemble sur ce chapitre. La problématique est bien posée et l'écriture est de qualité. Cependant, il serait judicieux de renforcer l'argumentation dans certaines sections et de diversifier les sources bibliographiques avec des références plus récentes."
  },
  {
    id: "f2",
    documentId: "doc2",
    documentName: "Plan détaillé",
    evaluatorId: "acc1",
    evaluatorName: "Dr. Sophie Martin",
    date: new Date("2023-12-20T14:15:00").toISOString(),
    templateType: "plan",
    criteria: [
      { name: "Cohérence globale du plan", score: 18, maxScore: 20, weight: 30 },
      { name: "Équilibre entre les parties", score: 16, maxScore: 20, weight: 25 },
      { name: "Pertinence de la problématique", score: 17, maxScore: 20, weight: 25 },
      { name: "Progression logique", score: 15, maxScore: 20, weight: 20 },
    ],
    globalScore: 16.65,
    strengths: [
      "Structure générale solide et bien pensée",
      "Problématique clairement identifiable",
      "Bon équilibre entre théorie et pratique"
    ],
    improvements: [
      "Revoir la transition entre partie 2 et partie 3",
      "Préciser les sous-parties de la section méthodologie"
    ],
    comment: "Excellent plan détaillé ! La structure est cohérente et la progression logique. Quelques ajustements mineurs permettront d'améliorer la fluidité entre certaines parties."
  }
];
