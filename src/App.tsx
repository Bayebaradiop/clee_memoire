import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { NotificationProvider } from "@/contexts/NotificationContext";
import { PublicLayout } from "@/components/PublicLayout";
import { DashboardLayout } from "@/components/DashboardLayout";
import NotFound from "./pages/NotFound";

// Public pages
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import ConseilsPage from "./pages/ConseilsPage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

// Student pages
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentSuivi from "./pages/student/StudentSuivi";
import StudentCalendrier from "./pages/student/StudentCalendrier";
import StudentDocuments from "./pages/student/StudentDocuments";
import StudentRessources from "./pages/student/StudentRessources";
import StudentVisio from "./pages/student/StudentVisio";
import StudentExport from "./pages/student/StudentExport";
import StudentMessagerie from "./pages/student/StudentMessagerie";
import StudentProfil from "./pages/student/StudentProfil";

// Accompagnateur pages
import AccompagnateurDashboard from "./pages/accompagnateur/AccompagnateurDashboard";
import AccompagnateurEtudiants from "./pages/accompagnateur/AccompagnateurEtudiants";
import AccompagnateurDocuments from "./pages/accompagnateur/AccompagnateurDocuments";
import AccompagnateurMessagerie from "./pages/accompagnateur/AccompagnateurMessagerie";import AccompagnateurCalendrier from "@/pages/accompagnateur/AccompagnateurCalendrier";
import AccompagnateurVisio from "@/pages/accompagnateur/AccompagnateurVisio";
// Admin pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUtilisateurs from "./pages/admin/AdminUtilisateurs";
import AdminPacks from "./pages/admin/AdminPacks";
import AdminEtapes from "./pages/admin/AdminEtapes";
import AdminStatistiques from "./pages/admin/AdminStatistiques";
import AdminSuivi from "./pages/admin/AdminSuivi";
import AdminMessagerie from "./pages/admin/AdminMessagerie";
import AdminParametres from "./pages/admin/AdminParametres";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <NotificationProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public routes */}
              <Route element={<PublicLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/a-propos" element={<AboutPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/conseils" element={<ConseilsPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/connexion" element={<LoginPage />} />
                <Route path="/inscription" element={<RegisterPage />} />
              </Route>

              {/* Student routes */}
              <Route element={<DashboardLayout />}>
                <Route path="/etudiant" element={<StudentDashboard />} />
                <Route path="/etudiant/suivi" element={<StudentSuivi />} />
                <Route path="/etudiant/calendrier" element={<StudentCalendrier />} />
                <Route path="/etudiant/documents" element={<StudentDocuments />} />
                <Route path="/etudiant/ressources" element={<StudentRessources />} />
                <Route path="/etudiant/visio" element={<StudentVisio />} />
                <Route path="/etudiant/export" element={<StudentExport />} />
                <Route path="/etudiant/messagerie" element={<StudentMessagerie />} />
                <Route path="/etudiant/profil" element={<StudentProfil />} />
              </Route>

              {/* Accompagnateur routes */}
              <Route element={<DashboardLayout />}>
                <Route path="/accompagnateur" element={<AccompagnateurDashboard />} />
                <Route path="/accompagnateur/etudiants" element={<AccompagnateurEtudiants />} />
                <Route path="/accompagnateur/documents" element={<AccompagnateurDocuments />} />
                <Route path="/accompagnateur/calendrier" element={<AccompagnateurCalendrier />} />
                <Route path="/accompagnateur/visio" element={<AccompagnateurVisio />} />
                <Route path="/accompagnateur/messagerie" element={<AccompagnateurMessagerie />} />
              </Route>

              {/* Admin routes */}
              <Route element={<DashboardLayout />}>
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/utilisateurs" element={<AdminUtilisateurs />} />
                <Route path="/admin/packs" element={<AdminPacks />} />
                <Route path="/admin/etapes" element={<AdminEtapes />} />
                <Route path="/admin/statistiques" element={<AdminStatistiques />} />
                <Route path="/admin/suivi" element={<AdminSuivi />} />
                <Route path="/admin/messagerie" element={<AdminMessagerie />} />
                <Route path="/admin/parametres" element={<AdminParametres />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </NotificationProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
