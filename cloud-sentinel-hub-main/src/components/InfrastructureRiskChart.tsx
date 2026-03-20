import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

const InfrastructureRiskChart = ({ risks }: any) => {

  const s3 = risks.filter((r:any)=> r.s3_event === 1).length
  const ec2 = risks.filter((r:any)=> r.eventSource === "ec2.amazonaws.com").length
  const iam = risks.filter((r:any)=> r.iam_event === 1).length
  const sg = risks.filter((r:any)=> r.eventName?.toLowerCase().includes("security")).length

  // ⭐ CREATE DYNAMIC DATA
  const data = [
    { name: "S3 Buckets", risks: s3, color: "hsl(0, 72%, 51%)" },
    { name: "EC2 Instances", risks: ec2, color: "hsl(25, 95%, 53%)" },
    { name: "IAM Roles", risks: iam, color: "hsl(45, 93%, 47%)" },
    { name: "Security Groups", risks: sg, color: "hsl(210, 100%, 50%)" },
  ];

  return (
  <Card className="h-full">
    <CardHeader>
      <CardTitle className="text-base font-semibold">
        Infrastructure Risk Overview
      </CardTitle>
    </CardHeader>

    <CardContent>
      <ResponsiveContainer width="100%" height={240}>

        <BarChart data={data} barSize={36}>

          <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 20%, 20%)" />

          <XAxis
            dataKey="name"
            tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            tick={{ fill: "hsl(215, 15%, 55%)", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "rgb(70, 88, 131)",
              border: "1px solid hsl(220, 20%, 22%)",
              borderRadius: "8px",
              color: "hsl(210, 100%, 99%)"
            }}
          />

          <Bar dataKey="risks" radius={[6, 6, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Bar>

        </BarChart>

      </ResponsiveContainer>
    </CardContent>
  </Card>
  );
};

export default InfrastructureRiskChart;