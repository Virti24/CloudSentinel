import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Lock, TrendingUp } from "lucide-react";
import { useState } from "react";


const RecommendedFix = () => {

  const [showChat, setShowChat] = useState(false);
  // const [question, setQuestion] = useState("");
  // const [messages, setMessages] = useState<{q:string,a:string}[]>([]);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);

  // function that generates solution
  const getSolution = (q: string) => {
  const text = q.toLowerCase();

    if (text.includes("bucket") || text.includes("s3")) {
      return `To fix S3 bucket public access:

1. Open AWS Console
2. Go to S3 Service
3. Select the bucket
4. Open Permissions tab
5. Enable Block Public Access
6. Save changes`;
    }

    if (text.includes("iam") || text.includes("user") || text.includes("accesskey")) {
      return `To fix IAM risk:

1. Open AWS IAM Console
2. Review user permissions
3. Remove unnecessary admin access
4. Enable MFA for the user`;
    }

    if (text.includes("policy")) {
      return `To fix bucket policy risk:

1. Open the S3 bucket
2. Go to Permissions
3. Edit Bucket Policy
4. Remove public "*" access`;
    }

    return "No fix found for this risk. Please check AWS documentation.";
  };

  return (
    <Card className="h-full border-primary/20">

      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base font-semibold">
          <Shield className="h-4 w-4 text-primary" />
          Recommended Fix
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">

        {/* Problem */}
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Problem
          </p>

          <p className="mt-1 text-sm text-foreground">
            S3 bucket <span className="font-mono text-primary">"customer-data-backup"</span> is public
          </p>
        </div>

        {/* Solution */}
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Solution
          </p>

          <ul className="mt-1 space-y-1.5 text-sm text-foreground">
            <li className="flex items-center gap-2">
              <Lock className="h-3.5 w-3.5 text-low" />
              Disable public access
            </li>
            <li className="flex items-center gap-2">
              <Shield className="h-3.5 w-3.5 text-low" />
              Enable encryption
            </li>
          </ul>
        </div>

        {/* Score */}
        <div className="rounded-lg bg-low/10 p-3">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-low" />
            <span className="text-sm font-medium text-low">
              Score improves to 74
            </span>
          </div>
        </div>

        {/* Button */}
        {/* <Button
          variant="glow"
          className="w-full"
          onClick={() => setShowChat(!showChat)}
        >
          {showChat ? "Close Assistant" : "Apply Fix"}
        </Button>
      <div
        className="fixed inset-0 bg-black/40 z-40"
        onClick={() => setShowChat(false)}
      /> */}
      {/* Apply Fix Button */}
      <Button
        variant="glow"
        className="w-full"
        onClick={() => setShowChat(true)}
      >
        Apply Fix
      </Button>
       </CardContent>
      {/* Chatbot Drawer */}
{showChat && (
  <div className="fixed right-0 top-0 h-full w-[380px] bg-background border-l border-border shadow-xl z-50 p-4 overflow-y-auto">

    <button
      className="mb-3 text-sm text-muted-foreground"
      onClick={() => setShowChat(false)}
    >
      Close ✕
    </button>

    <h3 className="font-semibold mb-3 text-lg">
      🤖 Security Assistant
    </h3>

    <p className="text-sm mb-3">
      Ask how to fix detected AWS risks.
    </p>

    <div className="space-y-3 text-sm">
      {messages.map((m, i) => (
        <div key={i}>
          <div className="text-primary font-medium">You: {m.q}</div>
          <div className="whitespace-pre-line">Assistant: {m.a}</div>
        </div>
      ))}
    </div>
   
    <input
  type="text"
  value={question}
  onChange={(e) => setQuestion(e.target.value)}
  onKeyDown={(e) => {
        if (e.key === "Enter" && question.trim()) {

          const solution = getSolution(question);

          setMessages((prev) => [
            ...prev,
            { q: question, a: solution }
          ]);

          setQuestion("");
        }
      }} 
  placeholder="Ask CloudSentinel Copilot..."
  className="w-full mt-4 rounded border border-border p-2 text-sm bg-background text-foreground"
/>

  </div>
)}
     

    </Card>
  );
};

export default RecommendedFix;