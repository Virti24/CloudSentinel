import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const ScoreTrendChart = ({ score }: any) => {

  const data = [
    { day: "Mon", score: score - 15 },
    { day: "Tue", score: score - 12 },
    { day: "Wed", score: score - 10 },
    { day: "Thu", score: score - 8 },
    { day: "Fri", score: score - 5 },
    { day: "Sat", score: score - 3 },
    { day: "Sun", score: score }
  ];

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base font-semibold">
          <TrendingUp className="h-4 w-4 text-primary" />
          Security Score Trend
        </CardTitle>
      </CardHeader>

      <CardContent>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={data}>
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />

            <Line
              type="monotone"
              dataKey="score"
              stroke="hsl(210, 100%, 50%)"
              strokeWidth={2.5}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ScoreTrendChart;