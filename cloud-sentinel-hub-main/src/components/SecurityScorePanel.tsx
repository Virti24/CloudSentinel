import { ShieldAlert } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Props {
  score: number;
  critical: number;
  high: number;
  medium: number;
  low: number;
}

const SecurityScorePanel = ({ score, critical, high, medium, low }: any) => {

  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (score / 100) * circumference;
  
  let ringColor = "hsl(var(--low))"

  if (critical > high && critical > medium) {
    ringColor = "hsl(var(--critical))"
  } else if (high > medium) {
    ringColor = "hsl(var(--high))"
  } else if (medium > 0) {
    ringColor = "hsl(var(--medium))"
  }

  return (
    <div className="flex flex-col md:flex-row items-center gap-8 rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-card)]">

      {/* Score Circle */}
      <div className="flex items-center gap-6">
        <div className="relative h-32 w-32">

          <svg className="h-32 w-32 -rotate-90" viewBox="0 0 120 120">

            <circle
              cx="60"
              cy="60"
              r="54"
              fill="none"
              stroke="hsl(var(--border))"
              strokeWidth="8"
            />

            <circle
              cx="60"
              cy="60"
              r="54"
              fill="none"
              stroke={ringColor}
              strokeWidth="8"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              className="transition-all duration-1000"
            />

          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-foreground">{score}</span>
            <span className="text-xs text-muted-foreground">/ 100</span>
          </div>

        </div>

        <div>
          <h2 className="text-lg font-semibold text-foreground">
            Security Score
          </h2>

          <Badge variant="warning" className="mt-1">
            <ShieldAlert className="mr-1 h-3 w-3" />
            Needs Attention
          </Badge>
        </div>
      </div>

      {/* Risk Counts */}
      <div className="flex flex-wrap gap-3">

        <RiskBadge count={critical} label="Critical" variant="critical" />
        <RiskBadge count={high} label="High" variant="high" />
        <RiskBadge count={medium} label="Medium" variant="medium" />
        <RiskBadge count={low} label="Low" variant="low" />

      </div>
    </div>
  );
};

const RiskBadge = ({
  count,
  label,
  variant,
}: {
  count: number;
  label: string;
  variant: "critical" | "high" | "medium" | "low";
}) => (
  <div className="flex items-center gap-2 rounded-lg border border-border bg-secondary px-4 py-2">

    <Badge
      variant={variant}
      className="h-6 w-6 items-center justify-center rounded-full p-0 text-xs"
    >
      {count}
    </Badge>

    <span className="text-sm font-medium text-foreground">
      {label}
    </span>

  </div>
);

export default SecurityScorePanel;