import { Card, CardContent } from "@/components/ui/card";
import { Star, Lightbulb } from "lucide-react";
import { mockTestimonials } from "@/lib/mock-data";
import { motion } from "framer-motion";

const fadeUp = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.5 } };

const tips = [
  { title: "Commencez par le plan", desc: "Un plan bien structuré est la fondation d'un bon mémoire. Prenez le temps de le définir avant de rédiger." },
  { title: "Fixez-vous des objectifs hebdomadaires", desc: "Découpez votre travail en petites tâches réalisables pour éviter la procrastination." },
  { title: "Citez correctement vos sources", desc: "Utilisez un gestionnaire de bibliographie et vérifiez les normes de votre université." },
  { title: "Faites relire par un tiers", desc: "Un regard extérieur permet de repérer les incohérences et les erreurs que vous ne voyez plus." },
];

export default function ConseilsPage() {
  return (
    <div>
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container">
          <motion.div {...fadeUp}>
            <h1 className="text-4xl font-poppins font-bold">Conseils & Témoignages</h1>
            <p className="mt-4 text-primary-foreground/80 max-w-2xl">
              Des conseils pratiques et des retours d'expérience pour vous inspirer.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <h2 className="text-2xl font-poppins font-bold mb-8">Conseils pratiques</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tips.map((tip, i) => (
              <motion.div key={i} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.1 }}>
                <Card className="h-full">
                  <CardContent className="p-6 flex gap-4">
                    <div className="bg-warning/10 rounded-lg p-3 h-fit">
                      <Lightbulb className="h-5 w-5 text-warning" />
                    </div>
                    <div>
                      <h3 className="font-poppins font-semibold">{tip.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{tip.desc}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-secondary/50">
        <div className="container">
          <h2 className="text-2xl font-poppins font-bold mb-8">Témoignages</h2>
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
    </div>
  );
}
