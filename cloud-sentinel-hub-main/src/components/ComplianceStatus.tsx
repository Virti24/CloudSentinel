import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, XCircle } from "lucide-react";

type Props = {
  risks: any[];
};

const ComplianceStatus = ({ risks }: Props) => {

  // count risks from dataset
  const s3Risks = risks.filter((r:any)=> r.s3_event === 1).length
  const iamRisks = risks.filter((r:any)=> r.iam_event === 1).length
  const suspicious = risks.filter((r:any)=> r.suspicious_event === 1).length

  // dynamic compliance logic
  const awsStatus =
  suspicious >= 5
    ? { status: "Needs Fix", variant: "critical" as const, icon: XCircle }
    : suspicious >= 2
    ? { status: "Partial", variant: "medium" as const, icon: AlertTriangle }
    : { status: "Compliant", variant: "low" as const, icon: CheckCircle };

const cisStatus =
  iamRisks >= 4
    ? { status: "Needs Fix", variant: "critical" as const, icon: XCircle }
    : iamRisks >= 1
    ? { status: "Partial", variant: "medium" as const, icon: AlertTriangle }
    : { status: "Compliant", variant: "low" as const, icon: CheckCircle };

const isoStatus =
  s3Risks >= 3
    ? { status: "Needs Fix", variant: "critical" as const, icon: XCircle }
    : s3Risks >= 1
    ? { status: "Partial", variant: "medium" as const, icon: AlertTriangle }
    : { status: "Compliant", variant: "low" as const, icon: CheckCircle };

  const items = [
    { name:"AWS Well Architected", ...awsStatus },
    { name:"CIS Benchmark", ...cisStatus },
    { name:"ISO 27001", ...isoStatus }
  ]

  return (
    <Card className="h-full">

      <CardHeader>
        <CardTitle className="text-base font-semibold">
          Compliance Status
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">

        {items.map((item, i) => (

          <div
            key={i}
            className="flex items-center justify-between rounded-lg bg-secondary/50 p-3"
          >

            <div className="flex items-center gap-2">

              <item.icon
                className={`h-4 w-4 ${
                  item.variant === "low"
                    ? "text-low"
                    : item.variant === "medium"
                    ? "text-medium"
                    : "text-critical"
                }`}
              />

              <span className="text-sm font-medium text-foreground">
                {item.name}
              </span>

            </div>

            <Badge variant={item.variant}>
              {item.status}
            </Badge>

          </div>

        ))}

      </CardContent>

    </Card>
  )
};

export default ComplianceStatus;
