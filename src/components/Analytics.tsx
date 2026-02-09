import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  FileCheck, 
  Clock, 
  DollarSign,
  Target,
  Award,
  BarChart3
} from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  icon: React.ReactNode;
  color?: string;
}

export function StatsCard({ title, value, description, trend, icon, color = "primary" }: StatsCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className={`h-9 w-9 rounded-lg bg-${color}/10 flex items-center justify-center text-${color}`}>
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
        {trend && (
          <div className="flex items-center gap-1 mt-2">
            {trend.isPositive ? (
              <TrendingUp className="h-3.5 w-3.5 text-green-600" />
            ) : (
              <TrendingDown className="h-3.5 w-3.5 text-red-600" />
            )}
            <span className={`text-xs font-medium ${trend.isPositive ? "text-green-600" : "text-red-600"}`}>
              {trend.isPositive ? "+" : ""}{trend.value}%
            </span>
            <span className="text-xs text-muted-foreground">vs mois dernier</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

interface ProgressStatsProps {
  title: string;
  items: { label: string; value: number; color?: string }[];
}

export function ProgressStats({ title, items }: ProgressStatsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">{item.label}</span>
              <span className="text-muted-foreground">{item.value}%</span>
            </div>
            <Progress value={item.value} className="h-2" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

interface ChartData {
  name: string;
  value: number;
  color?: string;
}

export function SimpleBarChart({ data, title }: { data: ChartData[]; title: string }) {
  const maxValue = Math.max(...data.map(d => d.value));
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <BarChart3 className="h-4 w-4" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {data.map((item, index) => (
            <div key={index} className="space-y-1.5">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{item.name}</span>
                <span className="text-muted-foreground">{item.value}</span>
              </div>
              <div className="h-8 bg-secondary rounded-lg overflow-hidden">
                <div
                  className={`h-full ${item.color || "bg-primary"} transition-all duration-500 flex items-center justify-end pr-2`}
                  style={{ width: `${(item.value / maxValue) * 100}%` }}
                >
                  {(item.value / maxValue) * 100 > 20 && (
                    <span className="text-xs font-medium text-white">{item.value}</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// Analytics pour Admin
export function AdminAnalytics() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Étudiants"
          value="124"
          description="Actifs ce mois"
          trend={{ value: 12, isPositive: true }}
          icon={<Users className="h-5 w-5" />}
          color="blue-600"
        />
        <StatsCard
          title="Revenus Mensuels"
          value="24,500 €"
          description="Depuis le 1er février"
          trend={{ value: 8, isPositive: true }}
          icon={<DollarSign className="h-5 w-5" />}
          color="green-600"
        />
        <StatsCard
          title="Taux de Réussite"
          value="87%"
          description="Soutenances validées"
          trend={{ value: 3, isPositive: true }}
          icon={<Award className="h-5 w-5" />}
          color="purple-600"
        />
        <StatsCard
          title="Documents Traités"
          value="342"
          description="Ce mois-ci"
          trend={{ value: 15, isPositive: true }}
          icon={<FileCheck className="h-5 w-5" />}
          color="orange-600"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <SimpleBarChart
          title="Répartition par Pack"
          data={[
            { name: "Pack Essentiel", value: 45, color: "bg-blue-500" },
            { name: "Pack Premium", value: 62, color: "bg-purple-500" },
            { name: "Pack Excellence", value: 17, color: "bg-yellow-500" },
          ]}
        />
        <SimpleBarChart
          title="Progression par Étape"
          data={[
            { name: "Choix du sujet", value: 124, color: "bg-green-500" },
            { name: "Bibliographie", value: 98, color: "bg-blue-500" },
            { name: "Plan détaillé", value: 73, color: "bg-orange-500" },
            { name: "Rédaction", value: 45, color: "bg-purple-500" },
            { name: "Révision", value: 28, color: "bg-yellow-500" },
            { name: "Mise en forme", value: 12, color: "bg-pink-500" },
            { name: "Soutenance", value: 8, color: "bg-teal-500" },
          ]}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <ProgressStats
          title="Taux d'Achèvement par Étape"
          items={[
            { label: "Choix du sujet", value: 100 },
            { label: "Recherche biblio", value: 79 },
            { label: "Plan détaillé", value: 59 },
            { label: "Rédaction", value: 36 },
            { label: "Révision", value: 23 },
            { label: "Mise en forme", value: 10 },
            { label: "Soutenance", value: 6 },
          ]}
        />
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Performance Accompagnateurs</CardTitle>
            <CardDescription>Temps moyen de feedback</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { name: "Dr. Sophie Martin", time: "24h", rating: 4.9 },
              { name: "Prof. Jean Dupont", time: "36h", rating: 4.7 },
              { name: "Dr. Marie Laurent", time: "18h", rating: 5.0 },
            ].map((acc, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">{acc.name}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-xs text-muted-foreground">⏱️ {acc.time}</span>
                    <span className="text-xs text-muted-foreground">• ⭐ {acc.rating}</span>
                  </div>
                </div>
                <Badge variant="secondary">{acc.time}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Analytics pour Accompagnateur
export function AccompagnateurAnalytics() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Mes Étudiants"
          value="8"
          description="Actifs"
          icon={<Users className="h-5 w-5" />}
          color="blue-600"
        />
        <StatsCard
          title="Documents à Corriger"
          value="12"
          description="En attente"
          icon={<FileCheck className="h-5 w-5" />}
          color="orange-600"
        />
        <StatsCard
          title="Temps Moyen"
          value="24h"
          description="Pour feedback"
          icon={<Clock className="h-5 w-5" />}
          color="purple-600"
        />
        <StatsCard
          title="Satisfaction"
          value="4.8/5"
          description="Note moyenne"
          icon={<Award className="h-5 w-5" />}
          color="green-600"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <SimpleBarChart
          title="Progression de mes étudiants"
          data={[
            { name: "Avancés (>70%)", value: 3, color: "bg-green-500" },
            { name: "En cours (40-70%)", value: 4, color: "bg-blue-500" },
            { name: "Débutants (<40%)", value: 1, color: "bg-orange-500" },
          ]}
        />
        <ProgressStats
          title="Activité cette semaine"
          items={[
            { label: "Documents corrigés", value: 85 },
            { label: "Messages envoyés", value: 92 },
            { label: "Réunions tenues", value: 75 },
          ]}
        />
      </div>
    </div>
  );
}

// Analytics pour Étudiant
export function StudentAnalytics() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Progression Globale"
          value="43%"
          description="Du mémoire"
          icon={<Target className="h-5 w-5" />}
          color="blue-600"
        />
        <StatsCard
          title="Documents Validés"
          value="2/7"
          description="Étapes complètes"
          icon={<FileCheck className="h-5 w-5" />}
          color="green-600"
        />
        <StatsCard
          title="Temps Investi"
          value="42h"
          description="Ce mois-ci"
          icon={<Clock className="h-5 w-5" />}
          color="purple-600"
        />
        <StatsCard
          title="Prochaine Deadline"
          value="3 jours"
          description="Plan détaillé"
          icon={<BarChart3 className="h-5 w-5" />}
          color="orange-600"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <ProgressStats
          title="Progression par Étape"
          items={[
            { label: "Choix du sujet", value: 100 },
            { label: "Recherche biblio", value: 100 },
            { label: "Plan détaillé", value: 65 },
            { label: "Rédaction", value: 0 },
            { label: "Révision", value: 0 },
            { label: "Mise en forme", value: 0 },
            { label: "Soutenance", value: 0 },
          ]}
        />
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Temps par Étape</CardTitle>
            <CardDescription>Répartition de votre travail</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { step: "Recherche biblio", time: "18h", percentage: 43 },
              { step: "Plan détaillé", time: "12h", percentage: 29 },
              { step: "Choix du sujet", time: "8h", percentage: 19 },
              { step: "Autres", time: "4h", percentage: 9 },
            ].map((item, index) => (
              <div key={index}>
                <div className="flex items-center justify-between text-sm mb-1.5">
                  <span className="font-medium">{item.step}</span>
                  <span className="text-muted-foreground">{item.time}</span>
                </div>
                <Progress value={item.percentage} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
