import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Lun", connections: 124, exceptions: 2 },
  { name: "Mar", connections: 156, exceptions: 1 },
  { name: "Mer", connections: 189, exceptions: 4 },
  { name: "Jeu", connections: 134, exceptions: 0 },
  { name: "Ven", connections: 198, exceptions: 3 },
  { name: "Sam", connections: 89, exceptions: 1 },
  { name: "Dim", connections: 67, exceptions: 0 },
];

export function ActivityChart() {
  return (
    <Card className="card-hover">
      <CardHeader>
        <CardTitle>Activité hebdomadaire</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              className="text-xs"
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              className="text-xs"
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
            />
            <Line 
              type="monotone" 
              dataKey="connections" 
              stroke="hsl(var(--primary))" 
              strokeWidth={2}
              dot={{ fill: "hsl(var(--primary))" }}
              name="Connexions"
            />
            <Line 
              type="monotone" 
              dataKey="exceptions" 
              stroke="hsl(var(--destructive))" 
              strokeWidth={2}
              dot={{ fill: "hsl(var(--destructive))" }}
              name="Exceptions"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}