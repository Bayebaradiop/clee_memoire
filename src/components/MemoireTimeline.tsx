import { cn } from "@/lib/utils";
import { StatusBadge } from "./StatusBadge";
import type { MemoireStep } from "@/lib/mock-data";
import { Check, Circle, AlertCircle, Clock } from "lucide-react";

const statusIcon = {
  completed: Check,
  in_progress: Circle,
  to_correct: AlertCircle,
  pending: Clock,
};

const statusColor = {
  completed: "bg-success text-success-foreground",
  in_progress: "bg-accent text-accent-foreground",
  to_correct: "bg-warning text-warning-foreground",
  pending: "bg-muted text-muted-foreground",
};

export function MemoireTimeline({ steps }: { steps: MemoireStep[] }) {
  return (
    <div className="space-y-0">
      {steps.map((step, i) => {
        const Icon = statusIcon[step.status];
        const isLast = i === steps.length - 1;
        return (
          <div key={step.id} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className={cn("w-10 h-10 rounded-full flex items-center justify-center shrink-0", statusColor[step.status])}>
                <Icon className="h-5 w-5" />
              </div>
              {!isLast && <div className="w-0.5 h-full min-h-[40px] bg-border" />}
            </div>
            <div className={cn("pb-8", isLast && "pb-0")}>
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="font-poppins font-semibold text-sm">{step.title}</h4>
                <StatusBadge status={step.status} />
              </div>
              <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
