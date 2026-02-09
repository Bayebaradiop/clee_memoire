import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { mockPacks } from "@/lib/mock-data";
import { motion } from "framer-motion";

const fadeUp = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.5 } };

export default function ServicesPage() {
  return (
    <div>
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container">
          <motion.div {...fadeUp}>
            <h1 className="text-4xl font-poppins font-bold">Nos services</h1>
            <p className="mt-4 text-primary-foreground/80 max-w-2xl">
              Des formules d'accompagnement adaptées à chaque étudiant, pour avancer sereinement dans la rédaction de votre mémoire.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mockPacks.map((pack, i) => (
              <motion.div key={pack.id} {...fadeUp} transition={{ duration: 0.5, delay: i * 0.15 }}>
                <Card className={`h-full flex flex-col ${i === 2 ? "border-warning shadow-lg ring-2 ring-warning/20" : ""}`}>
                  <CardContent className="p-8 flex flex-col flex-1">
                    {i === 2 && <span className="self-start text-xs font-poppins font-semibold text-warning bg-warning/10 px-3 py-1 rounded-full mb-3">⭐ Le plus populaire</span>}
                    <h3 className="font-poppins font-bold text-2xl">{pack.name}</h3>
                    <p className="text-muted-foreground mt-2">{pack.description}</p>
                    <p className="text-4xl font-poppins font-bold mt-6">{pack.price}<span className="text-lg">€</span></p>
                    <ul className="mt-6 space-y-3 flex-1">
                      {pack.features.map(f => (
                        <li key={f} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-success shrink-0 mt-0.5" />
                          {f}
                        </li>
                      ))}
                    </ul>
                    <Button asChild className="w-full mt-8 bg-warning text-warning-foreground hover:bg-warning/90 font-poppins">
                      <Link to="/inscription">Choisir ce pack</Link>
                    </Button>
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
