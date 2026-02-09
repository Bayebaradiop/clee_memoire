import { cn } from "@/lib/utils";
import type { StepStatus } from "@/lib/mock-data";

const statusConfig: Record<StepStatus, { label: string; className: string }> = {
  completed: { label: "Validé", className: "bg-success/15 text-success border-success/30" },
  in_progress: { label: "En cours", className: "bg-accent/15 text-accent border-accent/30" },
  to_correct: { label: "À corriger", className: "bg-warning/15 text-warning border-warning/30" },
  pending: { label: "En attente", className: "bg-muted text-muted-foreground border-border" },
};

export function StatusBadge({ status, className }: { status: StepStatus; className?: string }) {
  const config = statusConfig[status];
  return (
    <span className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-poppins font-medium", config.className, className)}>
      {config.label}
    </span>
  );
}
