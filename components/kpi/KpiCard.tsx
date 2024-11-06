// components/KpiCard.tsx

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { AlertCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

const KpiCard = ({
  title,
  icon: Icon,
  value,
  alertThreshold,
  alertMessage,
  alertDescription,
  data,
  timeInterval,
  onIntervalChange,
  dataKey,
  unit,
  chartConfig,
}: any) => {
  const latestData = Array.isArray(data) && data.length > 0
    ? parseFloat(data[data.length - 1][dataKey])
    : value;

    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          <Icon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-2xl font-bold">{latestData} {unit}</div>
          <p className="text-xs text-muted-foreground">
            Last updated: {data.length > 0 ? data[data.length - 1].time : "N/A"}
          </p>
          {data.length > 0 && (
            <Tabs value={timeInterval} onValueChange={onIntervalChange} className="mt-4">
              <TabsList>
                <TabsTrigger value="hourly">Hourly</TabsTrigger>
                <TabsTrigger value="daily">Daily</TabsTrigger>
              </TabsList>
              <TabsContent value="hourly" className="space-y-4">
                <ChartContainer config={chartConfig} className="w-full h-[250px] md:h-[300px] lg:h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                      <XAxis dataKey="time" />
                      <YAxis tickFormatter={(value) => `${value}${unit}`} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line
                        type="monotone"
                        dataKey={dataKey}
                        stroke="var(--color-temperature)"
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </TabsContent>
              <TabsContent value="daily" className="space-y-4">
                <ChartContainer config={chartConfig} className="w-full h-[250px] md:h-[300px] lg:h-[350px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                      <XAxis dataKey="time" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line
                        type="monotone"
                        dataKey={dataKey}
                        stroke="var(--color-temperature)"
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </TabsContent>
            </Tabs>
          )}
          {latestData > alertThreshold && (
            <Alert variant="destructive" className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>{alertMessage}</AlertTitle>
              <AlertDescription>{alertDescription}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    );
};

export default KpiCard;
