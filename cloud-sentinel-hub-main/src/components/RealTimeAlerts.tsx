import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, AlertTriangle, CheckCircle } from "lucide-react";

const iconMap = {
  alert: { icon: Bell, color: "text-critical" },
  warning: { icon: AlertTriangle, color: "text-high" },
  fix: { icon: CheckCircle, color: "text-low" },
};

const labelMap = {
  alert: "ALERT",
  warning: "WARNING",
  fix: "FIX APPLIED",
};

const RealTimeAlerts = ({ risks }: { risks: any[] }) => {

  const [alerts, setAlerts] = useState<any[]>([]);

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    });
  };

const generateAlerts = () => {

  // remove duplicate events by eventName
  const uniqueRisks = [...new Map(risks.map(r => [r.eventName, r])).values()];

  const newAlerts = uniqueRisks.slice(0,5).map((r:any)=>{

    let type: "alert" | "warning" | "fix" = "alert"
    let message = `${r.eventName} detected`

    // IAM related activity
    if(r.eventName?.toLowerCase().includes("user") || 
       r.eventName?.toLowerCase().includes("accesskey")){
      type="warning"
      message=`IAM activity: ${r.eventName}`
    }

    // S3 related activity
    else if(r.eventName?.toLowerCase().includes("bucket")){
      type="fix"
      message=`S3 change: ${r.eventName}`
    }

    return {
      time:getCurrentTime(),
      type,
      message
    }

  })

  setAlerts(newAlerts)
}

  useEffect(()=>{

    generateAlerts();

    const interval = setInterval(()=>{
      generateAlerts();
    },5000);

    return ()=> clearInterval(interval);

  },[risks]);

  return (
    <Card className="h-full">

      <CardHeader>
        <CardTitle className="text-base font-semibold">
          Real-Time Alerts
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">

        {alerts.length === 0 ? (
          <div className="text-sm text-muted-foreground">
            No alerts detected
          </div>
        ) : (

          alerts.map((a, i) => {

            const { icon: Icon, color } = iconMap[a.type];

            return (
              <div
                key={i}
                className="flex items-start gap-3 rounded-lg bg-secondary/50 p-3"
              >

                <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${color}`} />

                <div className="min-w-0">

                  <span className="font-mono text-xs text-muted-foreground">
                    [{a.time}]
                  </span>

                  <span className={`ml-2 text-xs font-bold ${color}`}>
                    {labelMap[a.type]}
                  </span>

                  <span className="ml-1 text-sm text-foreground">
                    — {a.message}
                  </span>

                </div>

              </div>
            );
          })

        )}

      </CardContent>

    </Card>
  );
};

export default RealTimeAlerts;