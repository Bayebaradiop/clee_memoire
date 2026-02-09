import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";

export function PublicFooter() {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-warning rounded-lg p-1.5">
                <BookOpen className="h-5 w-5 text-warning-foreground" />
              </div>
              <span className="font-poppins font-bold text-lg">Clé Du Mémoire</span>
            </div>
            <p className="text-sm text-primary-foreground/70">
              Votre partenaire de confiance pour réussir votre mémoire académique.
            </p>
          </div>
          <div>
            <h4 className="font-poppins font-semibold mb-4">Liens rapides</h4>
            <div className="space-y-2 text-sm text-primary-foreground/70">
              <Link to="/a-propos" className="block hover:text-warning transition-colors">À propos</Link>
              <Link to="/services" className="block hover:text-warning transition-colors">Services</Link>
              <Link to="/conseils" className="block hover:text-warning transition-colors">Conseils</Link>
              <Link to="/contact" className="block hover:text-warning transition-colors">Contact</Link>
            </div>
          </div>
          <div>
            <h4 className="font-poppins font-semibold mb-4">Contact</h4>
            <div className="space-y-2 text-sm text-primary-foreground/70">
              <p>contact@cledumemoire.com</p>
              <p>+33 1 23 45 67 89</p>
            </div>
          </div>
        </div>
        <div className="border-t border-primary-foreground/20 mt-8 pt-6 text-center text-sm text-primary-foreground/50">
          © 2025 Clé Du Mémoire. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}
