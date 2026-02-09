import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface MemoireProgressProps {
  value: number;
  label?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function MemoireProgress({ value, label, className, size = "md" }: MemoireProgressProps) {
  const heights = { sm: "h-2", md: "h-3", lg: "h-4" };
  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between">
        {label && <span className="text-sm font-medium text-muted-foreground">{label}</span>}
        <span className="text-sm font-poppins font-bold text-accent">{value}%</span>
      </div>
      <Progress value={value} className={cn(heights[size], "bg-secondary [&>div]:bg-accent")} />
    </div>
  );
}
