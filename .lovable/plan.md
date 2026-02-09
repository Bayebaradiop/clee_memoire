

# 🔑 Clé Du Mémoire — Plan d'implémentation

## Vision
Application web éducative en français, guidant les étudiants dans la rédaction de leur mémoire avec suivi par étapes, feedbacks et messagerie. Interface élégante aux couleurs bleu foncé (#202548), jaune (#F9B700) et bleu clair (#44BAEC), typographies Poppins/Raleway.

---

## Phase 1 — Fondations & Design System

- **Thème personnalisé** : couleurs (#202548, #F9B700, #44BAEC), polices Poppins + Raleway, variables CSS
- **Composants réutilisables** : cartes d'indicateurs, barre de progression, badges de statut (En cours / À corriger / Validé), timeline du mémoire
- **Layout principal** : sidebar dynamique selon le rôle (étudiant, accompagnateur, admin) + header avec notifications
- **Responsive mobile-first** avec animations légères

---

## Phase 2 — Espace Public

- **Accueil** : hero section inspirante, présentation du service, appel à l'inscription
- **À propos** : mission, équipe, valeurs
- **Services** : description des packs d'accompagnement
- **Conseils & Témoignages** : articles/conseils + témoignages d'anciens étudiants
- **Contact** : formulaire de contact
- **Inscription / Connexion** : formulaires avec choix du rôle, validation des champs

---

## Phase 3 — Espace Étudiant

- **Dashboard** : progression du mémoire (%), étape actuelle, derniers feedbacks, messages non lus
- **Suivi du mémoire** : timeline interactive des étapes avec statuts visuels
- **Documents** : upload PDF/DOCX, liste des documents soumis avec statut de correction
- **Messagerie** : boîte de réception avec pièces jointes, conversations avec accompagnateur et admin
- **Profil** : informations personnelles, paramètres

---

## Phase 4 — Espace Accompagnateur

- **Dashboard** : nombre d'étudiants suivis, documents en attente de correction, messages
- **Liste des étudiants** : tableau avec progression, étape actuelle, dernier document
- **Consultation de documents** : visualisation + ajout de feedbacks détaillés (pages, types d'erreurs)
- **Validation des étapes** : possibilité de valider ou demander des corrections
- **Messagerie** : conversations avec étudiants et admin

---

## Phase 5 — Espace Administrateur

- **Dashboard global** : statistiques générales (nombre d'étudiants, taux de progression, activité)
- **Gestion des utilisateurs** : CRUD étudiants, accompagnateurs, admins
- **Assignation** : associer étudiants ↔ accompagnateurs via modale
- **Gestion des packs** : créer/modifier les offres d'accompagnement
- **Configuration des étapes** : définir et réorganiser les étapes du parcours mémoire
- **Suivi global** : vue d'ensemble des progressions de tous les étudiants
- **Messagerie admin** : communication avec tous les utilisateurs
- **Paramètres** : rôles, permissions

---

## Données

Toutes les données seront **fictives/mockées** dans cette première version frontend. Le backend (authentification, base de données, stockage de fichiers) sera ajouté dans une phase ultérieure avec Supabase.

---

## Résultat attendu

Une application complète, navigable, avec les 4 espaces fonctionnels (données fictives), un design professionnel et rassurant, et une navigation fluide adaptée à chaque rôle.

