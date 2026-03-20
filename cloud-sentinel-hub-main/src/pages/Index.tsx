import { Shield, Activity } from "lucide-react";
import SecurityScorePanel from "@/components/SecurityScorePanel";
import InfrastructureRiskChart from "@/components/InfrastructureRiskChart";
import CriticalAlertsTable from "@/components/CriticalAlertsTable";
import AISecurityInsights from "@/components/AISecurityInsights";
import RecommendedFix from "@/components/RecommendedFix";
import ScoreTrendChart from "@/components/ScoreTrendChart";
import RealTimeAlerts from "@/components/RealTimeAlerts";
import ComplianceStatus from "@/components/ComplianceStatus";
import { useState } from "react";

const Index = () => {

  const [risks, setRisks] = useState<any[]>([]);
  const [score, setScore] = useState(0);

  const [critical, setCritical] = useState(0);
  const [high, setHigh] = useState(0);
  const [medium, setMedium] = useState(0);
  const [low, setLow] = useState(0);

  const loadRisks = async () => {

    // Hide risks if already shown
    if (risks.length > 0) {
      setRisks([]);
      setScore(0);
      setCritical(0);
      setHigh(0);
      setMedium(0);
      setLow(0);
      return;
    }

    const res = await fetch("http://localhost:8000/risks");
    const data = await res.json();

    const uniqueRisks = [...new Map(data.map((r:any)=>[r.eventName,r])).values()];

    setRisks(uniqueRisks);

    // Calculate counts
    const criticalCount = uniqueRisks.filter((r:any)=> r.suspicious_event === 1).length;
    const highCount = uniqueRisks.filter((r:any)=> r.iam_event === 1).length;
    const mediumCount = uniqueRisks.filter((r:any)=> r.s3_event === 1).length;
    const lowCount = uniqueRisks.filter((r:any)=> r.external_ip === 0).length;

    setCritical(criticalCount);
    setHigh(highCount);
    setMedium(mediumCount);
    setLow(lowCount);

    //  FIXED SECURITY SCORE FORMULA
    let calculatedScore = 100;

    calculatedScore -= criticalCount * 3;
    calculatedScore -= highCount * 2;
    calculatedScore -= mediumCount * 1;
    calculatedScore -= lowCount * 0.5;

    calculatedScore = Math.max(0, Math.min(100, calculatedScore));

    setScore(Math.round(calculatedScore));
  };

  return (
    <div className="min-h-screen bg-background">

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
        <div className="container mx-auto flex items-center gap-3 px-4 py-4 md:px-6">

          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
            <Shield className="h-5 w-5 text-primary" />
          </div>

          <div>
            <h1 className="text-lg font-bold text-foreground">
              CloudSentinel
            </h1>
            <p className="text-xs text-muted-foreground">
              AWS Security Monitor
            </p>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <Activity className="h-4 w-4 animate-pulse-glow text-low" />
            <span className="text-xs text-muted-foreground">
              Live
            </span>
          </div>

        </div>
      </header>

      {/* Risk Button */}
      <div className="container mx-auto mt-6 px-4">

        <button
          onClick={loadRisks}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          {risks.length > 0 ? "Hide Risks" : "Show Risks"}
        </button>

       <ul className="mt-4 space-y-2">
  {[...new Map(risks.map(r => [r.eventName, r])).values()]
    .slice(0,10)
    .map((r:any, i:number) => (
      <li
        key={i}
        className="p-3 bg-red-500/10 border border-red-500 rounded text-red-500"
      >
        ⚠ {r.eventName} detected as anomaly
      </li>
    ))}
</ul>

      </div>

      {/* Dashboard */}
      <main className="container mx-auto space-y-6 px-4 py-6 md:px-6">

        {/* Security Score */}
        <SecurityScorePanel
          score={score}
          critical={critical}
          high={high}
          medium={medium}
          low={low}
        />

        {/* Row 1 */}
        <div className="grid gap-6 lg:grid-cols-2">
          <InfrastructureRiskChart risks={risks} />
          <CriticalAlertsTable risks={risks} />
        </div>

        {/* Row 2 */}
        { <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AISecurityInsights risks={risks} />
          <RecommendedFix />
          <ScoreTrendChart score={score} />
        </div> }
        

        {/* Row 3 */}
        <div className="grid gap-6 lg:grid-cols-2">
          <RealTimeAlerts risks={risks} />
          <ComplianceStatus risks={risks} />
        </div>

      </main>

    </div>
  );
};

export default Index;