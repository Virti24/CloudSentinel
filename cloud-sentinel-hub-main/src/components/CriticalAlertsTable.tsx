import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Props = {
  risks: any[];
};

const CriticalAlertsTable = ({ risks }: Props) => {

  // take only anomaly risks
  const alerts = [...new Map(
  risks
    .filter((r:any) => r.anomaly === 1)
    .map((r:any) => [r.eventName, r])
).values()];

  return (
    <Card className="h-full">

      <CardHeader>
        <CardTitle className="text-base font-semibold">
          Critical Alerts
        </CardTitle>
      </CardHeader>

      <CardContent>

        {alerts.length === 0 ? (
          <div className="text-sm text-muted-foreground">
            No critical alerts detected
          </div>
        ) : (

          <div className="overflow-x-auto">
            <table className="w-full text-sm">

              <thead>
                <tr className="border-b border-border text-muted-foreground">
                  <th className="pb-3 text-left font-medium">Issue</th>
                  <th className="pb-3 text-left font-medium">Service</th>
                  <th className="pb-3 text-left font-medium">Risk</th>
                  <th className="pb-3 text-left font-medium">Impact</th>
                  <th className="pb-3 text-left font-medium">Action</th>
                </tr>
              </thead>

              <tbody>

                {alerts.slice(0,5).map((r:any, i:number) => {

                  const service =
                    r.eventName?.toLowerCase().includes("bucket")
                      ? "S3"
                      : r.eventName?.toLowerCase().includes("user")
                      ? "IAM"
                      : "AWS";

                  const impact =
                    service === "S3"
                      ? "Data Exposure"
                      : service === "IAM"
                      ? "Privilege Abuse"
                      : "Security Risk";

                  return (
                    <tr
                      key={i}
                      className="border-b border-border/50 last:border-0"
                    >

                      <td className="py-3 font-medium text-foreground">
                        {r.eventName}
                      </td>

                      <td className="py-3">
                        <Badge variant="secondary" className="font-mono text-xs">
                          {service}
                        </Badge>
                      </td>

                      <td className="py-3">
                        <Badge variant="critical">
                          Critical
                        </Badge>
                      </td>

                      <td className="py-3 text-muted-foreground">
                        {impact}
                      </td>

                      <td className="py-3">
                        <Button
                          size="sm"
                          variant="glow"
                          className="h-7 text-xs"
                        >
                          Investigate
                        </Button>
                      </td>

                    </tr>
                  );
                })}

              </tbody>

            </table>
          </div>

        )}

      </CardContent>

    </Card>
  );
};

export default CriticalAlertsTable;