import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Target, Heart, Users } from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.5 } };

const values = [
  { icon: Target, title: "Excellence", desc: "Nous visons la qualité dans chaque accompagnement." },
  { icon: Heart, title: "Bienveillance", desc: "Un suivi humain, à l'écoute de vos besoins." },
  { icon: Users, title: "Accessibilité", desc: "Des formules adaptées à tous les budgets." },
  { icon: BookOpen, title: "Expertise", desc: "Des accompagnateurs qualifiés et expérimentés." },
];

export default function AboutPage() {
  return (
    <div>
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container">
          <motion.div {...fadeUp}>
            <h1 className="text-4xl font-poppins font-bold">À propos</h1>
            <p className="mt-4 text-primary-foreground/80 max-w-2xl">
              Clé Du Mémoire est née de la conviction que chaque étudiant mérite un accompagnement de qualité pour réussir son mémoire.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="container max-w-3xl">
          <motion.div {...fadeUp} className="prose prose-lg">
            <h2 className="font-poppins font-bold text-2xl mb-4">Notre mission</h2>
            <p className="text-muted-foreground">
              Nous accompagnons les étudiants dans la rédaction de leur mémoire de fin d'études, en leur offrant un suivi personnalisé, des feedbacks constructifs et un parcours structuré. Notre objectif : transformer une épreuve souvent stressante en une expérience enrichissante et réussie.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-secondary/50">
        <div className="container">
          <motion.h2 {...fadeUp} className="text-3xl font-poppins font-bold text-center mb-12">Nos valeurs</motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div key={i} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.1 }}>
                <Card className="h-full border-none bg-background">
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                      <v.icon className="h-7 w-7 text-accent" />
                    </div>
                    <h3 className="font-poppins font-semibold mb-2">{v.title}</h3>
                    <p className="text-sm text-muted-foreground">{v.desc}</p>
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
