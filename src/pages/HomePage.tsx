import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Users, FileText, MessageSquare, ArrowRight, Star, CheckCircle } from "lucide-react";
import { mockTestimonials, mockPacks } from "@/lib/mock-data";
import { motion } from "framer-motion";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const features = [
  { icon: BookOpen, title: "Suivi par étapes", desc: "Avancez pas à pas avec un parcours structuré et clair." },
  { icon: Users, title: "Accompagnement expert", desc: "Un accompagnateur dédié pour vous guider." },
  { icon: FileText, title: "Feedbacks détaillés", desc: "Des corrections précises pour améliorer votre travail." },
  { icon: MessageSquare, title: "Messagerie intégrée", desc: "Communiquez facilement avec votre équipe." },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-warning rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-accent rounded-full blur-3xl" />
        </div>
        <div className="container relative py-20 md:py-32">
          <motion.div className="max-w-2xl" {...fadeUp}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-poppins font-bold leading-tight">
              La clé de votre <span className="text-warning">réussite</span> académique
            </h1>
            <p className="mt-6 text-lg text-primary-foreground/80 font-raleway">
              Un accompagnement personnalisé, étape par étape, pour rédiger et réussir votre mémoire en toute sérénité.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-warning text-warning-foreground hover:bg-warning/90 font-poppins">
                <Link to="/inscription">Commencer maintenant <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                <Link to="/services">Découvrir nos offres</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-secondary/50">
        <div className="container">
          <motion.div className="text-center mb-12" {...fadeUp}>
            <h2 className="text-3xl font-poppins font-bold">Pourquoi Clé Du Mémoire ?</h2>
            <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
              Tout ce dont vous avez besoin pour mener votre mémoire à bien.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div key={i} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.1 }}>
                <Card className="h-full hover:shadow-lg transition-shadow border-none bg-background">
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                      <f.icon className="h-7 w-7 text-accent" />
                    </div>
                    <h3 className="font-poppins font-semibold mb-2">{f.title}</h3>
                    <p className="text-sm text-muted-foreground">{f.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Packs Preview */}
      <section className="py-20">
        <div className="container">
          <motion.div className="text-center mb-12" {...fadeUp}>
            <h2 className="text-3xl font-poppins font-bold">Nos formules</h2>
            <p className="mt-3 text-muted-foreground">Choisissez l'accompagnement adapté à vos besoins.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockPacks.map((pack, i) => (
              <motion.div key={pack.id} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.1 }}>
                <Card className={`h-full ${i === 2 ? "border-warning shadow-lg ring-2 ring-warning/20" : ""}`}>
                  <CardContent className="p-6">
                    {i === 2 && <span className="text-xs font-poppins font-semibold text-warning bg-warning/10 px-2 py-1 rounded-full">Populaire</span>}
                    <h3 className="font-poppins font-bold text-xl mt-2">{pack.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{pack.description}</p>
                    <p className="text-3xl font-poppins font-bold mt-4">{pack.price}€</p>
                    <ul className="mt-4 space-y-2">
                      {pack.features.map(f => (
                        <li key={f} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-success shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <Button asChild className="w-full mt-6 bg-warning text-warning-foreground hover:bg-warning/90 font-poppins">
                      <Link to="/inscription">Choisir</Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-secondary/50">
        <div className="container">
          <motion.div className="text-center mb-12" {...fadeUp}>
            <h2 className="text-3xl font-poppins font-bold">Ils nous font confiance</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockTestimonials.map((t, i) => (
              <motion.div key={t.id} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.1 }}>
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="flex gap-1 mb-3">
                      {[...Array(5)].map((_, j) => <Star key={j} className="h-4 w-4 fill-warning text-warning" />)}
                    </div>
                    <p className="text-sm italic text-muted-foreground mb-4">"{t.quote}"</p>
                    <p className="font-poppins font-semibold text-sm">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.university}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container text-center">
          <motion.div {...fadeUp}>
            <h2 className="text-3xl font-poppins font-bold">Prêt à réussir votre mémoire ?</h2>
            <p className="mt-4 text-primary-foreground/80 max-w-lg mx-auto">
              Rejoignez des centaines d'étudiants qui ont déjà franchi le cap grâce à notre accompagnement.
            </p>
            <Button asChild size="lg" className="mt-8 bg-warning text-warning-foreground hover:bg-warning/90 font-poppins">
              <Link to="/inscription">S'inscrire gratuitement <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
