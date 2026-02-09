import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";

const fadeUp = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.5 } };

export default function ContactPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Message envoyé avec succès !");
    }, 1000);
  };

  return (
    <div>
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container">
          <motion.div {...fadeUp}>
            <h1 className="text-4xl font-poppins font-bold">Contact</h1>
            <p className="mt-4 text-primary-foreground/80 max-w-2xl">
              Une question ? N'hésitez pas à nous contacter.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="container max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            <motion.div className="md:col-span-3" {...fadeUp}>
              <Card>
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nom complet</Label>
                        <Input id="name" placeholder="Votre nom" required maxLength={100} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="votre@email.com" required maxLength={255} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Sujet</Label>
                      <Input id="subject" placeholder="Sujet de votre message" required maxLength={200} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea id="message" placeholder="Votre message..." rows={5} required maxLength={1000} />
                    </div>
                    <Button type="submit" disabled={loading} className="bg-warning text-warning-foreground hover:bg-warning/90 font-poppins">
                      {loading ? "Envoi..." : "Envoyer"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div className="md:col-span-2 space-y-6" {...fadeUp} transition={{ duration: 0.5, delay: 0.2 }}>
              <div className="flex gap-3">
                <div className="bg-accent/10 rounded-lg p-3 h-fit"><Mail className="h-5 w-5 text-accent" /></div>
                <div>
                  <p className="font-poppins font-semibold text-sm">Email</p>
                  <p className="text-sm text-muted-foreground">contact@cledumemoire.com</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="bg-accent/10 rounded-lg p-3 h-fit"><Phone className="h-5 w-5 text-accent" /></div>
                <div>
                  <p className="font-poppins font-semibold text-sm">Téléphone</p>
                  <p className="text-sm text-muted-foreground">+33 1 23 45 67 89</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="bg-accent/10 rounded-lg p-3 h-fit"><MapPin className="h-5 w-5 text-accent" /></div>
                <div>
                  <p className="font-poppins font-semibold text-sm">Adresse</p>
                  <p className="text-sm text-muted-foreground">Paris, France</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
