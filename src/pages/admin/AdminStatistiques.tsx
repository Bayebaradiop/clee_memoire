import { AdminAnalytics } from "@/components/Analytics";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3 } from "lucide-react";

export default function AdminStatistiques() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-poppins font-bold flex items-center gap-2">
          <BarChart3 className="h-6 w-6" />
          Statistiques & Analytics
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Vue d'ensemble des performances de la plateforme
        </p>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Vue d'ensemble</TabsTrigger>
          <TabsTrigger value="students">Étudiants</TabsTrigger>
          <TabsTrigger value="revenue">Revenus</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <AdminAnalytics />
        </TabsContent>

        <TabsContent value="students">
          <Card>
            <CardHeader>
              <CardTitle>Statistiques Étudiants</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Données détaillées sur les étudiants...</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="revenue">
          <Card>
            <CardHeader>
              <CardTitle>Analyse des Revenus</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Données financières détaillées...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
