"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type ScatterPlotProps = {
  title: string;
  description: string;
  data: { x: number; y: number }[];
  color?: string;
};

export default function ScatterPlotChart({
  title,
  description,
  data,
  color = "hsl(var(--chart-1))",
}: ScatterPlotProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            correlation: {
              label: "Correlación",
              color: color,
            },
          }}
          className="w-full h-[250px] md:h-[300px] lg:h-[350px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
              <CartesianGrid />
              <XAxis type="number" dataKey="x" name="Variable X" />
              <YAxis type="number" dataKey="y" name="Variable Y" />
              <ChartTooltip
                content={({ active, payload, }: {
                  active?: boolean;
                  payload?: any[];
                }) => {
                  if (active && payload?.length) {
                    return (
                      <div className="bg-background p-2 rounded shadow">
                        <p className="text-sm font-medium">
                          X: {payload[0].value.toFixed(2)}
                        </p>
                        <p className="text-sm font-medium">
                          Y: {payload[1]?.value?.toFixed(2)}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Scatter name="Correlación" data={data} fill={color} />
            </ScatterChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
