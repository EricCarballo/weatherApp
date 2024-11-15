import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line } from "recharts";
import { Button } from "@/components/ui/button";
import { calculateRegression } from "../../common/formulaRegresion";
import { calculateCorrelation } from "@/common/formulaCorrelacion";

type LinearRegressionChartProps = {
  title: string;
  description: string;
  temperatureData: any
  humidityData: any
  dataColor?: string;
  regressionColor?: string;
};

export default function LinearRegressionChart({
  title,
  description,
  temperatureData,
  humidityData,
  dataColor = "hsl(var(--chart-1))",
  regressionColor = "hsl(var(--chart-2))",
}: LinearRegressionChartProps) {
  const formattedData = temperatureData.map((temp: { value: any; }, index: string | number) => ({
    x: temp.value, // La temperatura será el valor de X
    y: humidityData[index]?.value || 0, // La humedad será el valor de Y
  }));

  const [data, setData] = useState(formattedData);

  const regression = useMemo(() => calculateRegression(data), [data]);
  const correlation = useMemo(() => calculateCorrelation(data), [data]);

  const regressionLine = [
    { x: Math.min(...data.map((d: { x: any; }) => d.x)), y: regression.a * Math.min(...data.map((d: { x: any; }) => d.x)) + regression.b },
    { x: Math.max(...data.map((d: { x: any; }) => d.x)), y: regression.a * Math.max(...data.map((d: { x: any; }) => d.x)) + regression.b },
  ];

  const regenerateData = () => {
    setData(
      Array.from({ length: 50 }, (_, i) => ({
        x: i + Math.random() * 10,
        y: i * 1.5 + Math.random() * 20,
      }))
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            data: { label: "Datos", color: dataColor },
            regression: { label: "Regresión", color: regressionColor },
          }}
          className="w-full h-[250px] md:h-[300px] lg:h-[350px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 0 }}>
              <CartesianGrid />
              <XAxis type="number" dataKey="x" name="Temperatura" />
              <YAxis type="number" dataKey="y" name="Humedad" />
              <Tooltip
                content={({ active, payload }: { active?: boolean; payload?: any[] }) => {
                  if (active && payload?.length) {
                    return (
                      <div className="bg-background p-2 rounded shadow">
                        <p className="text-sm font-medium">X: {payload[0].value.toFixed(2)}</p>
                        <p className="text-sm font-medium">Y: {payload[0].payload.y.toFixed(2)}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Scatter name="Datos" data={data} fill={dataColor} />
              <Line
                name="Regresión"
                data={regressionLine}
                type="linear"
                dataKey="y"
                stroke={regressionColor}
                strokeWidth={2}
                dot={false}
              />
            </ScatterChart>
          </ResponsiveContainer>
        </ChartContainer>
        <div className="mt-4 flex justify-center">
          <Button onClick={regenerateData}>Regenerar Datos</Button>
        </div>
        <p className="mt-4 capitalize text-center text-sm text-muted-foreground">
          Ecuación de regresión: <span className="font-bold">y = {regression.a.toFixed(2)}x + {regression.b.toFixed(2)}</span>
        </p>
        <p className="mt-4 capitalize text-center text-sm text-muted-foreground">
          coeficiente de correlación: <span className="font-bold">{correlation.toFixed(4)}</span>
        </p>
      </CardContent>
    </Card>
  );
}
