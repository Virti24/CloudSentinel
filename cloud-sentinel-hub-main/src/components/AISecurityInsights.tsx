import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, AlertTriangle, TrendingUp } from "lucide-react";

const insights = [
  { icon: AlertTriangle, text: "78% of risks due to misconfigured IAM roles", color: "text-high" },
  { icon: TrendingUp, text: "EC2 instance exposed for 12 days", color: "text-critical" },
  { icon: Brain, text: "Similar breaches observed in other companies", color: "text-info" },
];

const AISecurityInsights = ({ risks }: any) => {

  const total = risks.length

  const iamRisks = risks.filter((r:any)=>
    r.eventName?.toLowerCase().includes("user") ||
    r.eventName?.toLowerCase().includes("accesskey")
  ).length

  const s3Risks = risks.filter((r:any)=>
    r.eventName?.toLowerCase().includes("bucket")
  ).length

  const suspicious = risks.filter((r:any)=> r.anomaly === 1).length

  const iamPercent = total ? Math.round((iamRisks/total)*100) : 0


  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base font-semibold">
          <Brain className="h-4 w-4 text-primary" />
          AI Security Insights
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">

<div className="p-3 bg-secondary rounded">
⚠ {iamPercent}% of risks related to IAM activity
</div>

<div className="p-3 bg-secondary rounded">
⚠ {s3Risks} risky S3 related events detected
</div>

<div className="p-3 bg-secondary rounded">
⚠ {suspicious} suspicious security events detected
</div>

</CardContent>
    </Card>
  );

};

export default AISecurityInsights;