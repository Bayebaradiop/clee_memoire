import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  CheckCircle2, 
  Lightbulb, 
  Star,
  Calendar,
  User,
  FileText
} from "lucide-react";
import { getMention, type DocumentFeedback } from "@/lib/feedback-system";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface FeedbackViewProps {
  feedback: DocumentFeedback;
  showHeader?: boolean;
}

export function FeedbackView({ feedback, showHeader = true }: FeedbackViewProps) {
  const mention = getMention(feedback.globalScore);

  return (
    <div className="space-y-6">
      {showHeader && (
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-lg">{feedback.documentName}</CardTitle>
                <CardDescription className="mt-2 space-y-1">
                  <div className="flex items-center gap-2 text-sm">
                    <User className="h-3.5 w-3.5" />
                    <span>Évalué par {feedback.evaluatorName}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>
                      {format(new Date(feedback.createdAt), "d MMMM yyyy 'à' HH:mm", { locale: fr })}
                    </span>
                  </div>
                </CardDescription>
              </div>
              <Badge
                className={`${mention.color} text-base px-3 py-1`}
                variant="outline"
              >
                {feedback.globalScore}/100
              </Badge>
            </div>
          </CardHeader>
        </Card>
      )}

      {/* Note globale */}
      <Card className={`${mention.color} border-2`}>
        <CardContent className="p-6">
          <div className="text-center space-y-3">
            <p className="text-sm font-semibold uppercase tracking-wide">Note globale</p>
            <div className="flex items-center justify-center gap-6">
              <div>
                <p className="text-5xl font-bold">{feedback.globalScore}</p>
                <p className="text-sm text-muted-foreground mt-1">/ 100</p>
              </div>
              <div className="text-left">
                <Badge className={`${mention.color} text-lg px-4 py-2`}>
                  {mention.label}
                </Badge>
              </div>
            </div>
            <Progress value={feedback.globalScore} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Détail des critères */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Évaluation détaillée</CardTitle>
          <CardDescription>Note par critère avec pondération</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {feedback.criteria.map((criterion, index) => (
            <div key={criterion.id} className="space-y-2">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-sm">{criterion.name}</span>
                    <Badge variant="outline" className="text-xs">
                      Poids: {criterion.weight}%
                    </Badge>
                  </div>
                  {criterion.description && (
                    <p className="text-xs text-muted-foreground">
                      {criterion.description}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => {
                    const starValue = ((i + 1) / 5) * criterion.maxScore;
                    const isFilled = criterion.score && criterion.score >= starValue;
                    return (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          isFilled
                            ? "fill-warning text-warning"
                            : "text-gray-300"
                        }`}
                      />
                    );
                  })}
                </div>
                
                <div className="flex items-center gap-2 flex-1">
                  <Progress 
                    value={criterion.score ? (criterion.score / criterion.maxScore) * 100 : 0} 
                    className="h-2 flex-1"
                  />
                  <span className="text-sm font-semibold min-w-[60px] text-right">
                    {criterion.score}/{criterion.maxScore}
                  </span>
                  <Badge
                    variant={
                      criterion.score && (criterion.score / criterion.maxScore) >= 0.8 ? "default" :
                      criterion.score && (criterion.score / criterion.maxScore) >= 0.6 ? "secondary" : "destructive"
                    }
                  >
                    {criterion.score ? ((criterion.score / criterion.maxScore) * 100).toFixed(0) : 0}%
                  </Badge>
                </div>
              </div>

              {index < feedback.criteria.length - 1 && <Separator className="mt-4" />}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Points forts */}
      {feedback.strengths.length > 0 && (
        <Card className="bg-green-50 dark:bg-green-950/20 border-green-200">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2 text-green-700 dark:text-green-400">
              <CheckCircle2 className="h-5 w-5" />
              Points forts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {feedback.strengths.map((strength, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-sm text-green-800 dark:text-green-200"
                >
                  <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>{strength}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Axes d'amélioration */}
      {feedback.improvements.length > 0 && (
        <Card className="bg-orange-50 dark:bg-orange-950/20 border-orange-200">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2 text-orange-700 dark:text-orange-400">
              <Lightbulb className="h-5 w-5" />
              Axes d'amélioration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {feedback.improvements.map((improvement, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2 text-sm text-orange-800 dark:text-orange-200"
                >
                  <Lightbulb className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>{improvement}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Commentaire global */}
      {feedback.globalComment && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Commentaire de l'accompagnateur</CardTitle>
          </CardHeader>
          <CardContent>
            <Alert>
              <FileText className="h-4 w-4" />
              <AlertDescription className="text-sm leading-relaxed whitespace-pre-line">
                {feedback.globalComment}
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
