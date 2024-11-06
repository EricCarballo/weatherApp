"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { AlertCircle, Droplets, Thermometer, Wind } from "lucide-react";
import KpiCard from "@/components/kpi/KpiCard";

// Mock data generator functions
const generateTemperatureData = (interval: string) => {
  const now = new Date();
  const data = [];
  for (let i = 0; i < (interval === "hourly" ? 12 : 24); i++) {
    const time = new Date(
      now.getTime() - i * (interval === "hourly" ? 5 * 60000 : 3600000)
    );
    const temp = 20 + Math.random() * 15;
    data.unshift({
      time: time.toLocaleTimeString(),
      temperature: temp.toFixed(1),
    });
  }
  return data;
};

const generateHumidityData = (interval: string) => {
  const now = new Date();
  const data = [];
  for (let i = 0; i < (interval === "hourly" ? 12 : 24); i++) {
    const time = new Date(
      now.getTime() - i * (interval === "hourly" ? 5 * 60000 : 3600000)
    );
    const humidity = 30 + Math.random() * 50;
    data.unshift({
      time: time.toLocaleTimeString(),
      humidity: humidity.toFixed(1),
    });
  }
  return data;
};

const generateAirQualityData = () => {
  return Math.floor(Math.random() * 150);
};

export default function EnvironmentalDashboard() {
  const [temperatureData, setTemperatureData] = useState(generateTemperatureData("hourly"));
  const [humidityData, setHumidityData] = useState(generateHumidityData("hourly"));
  const [airQuality, setAirQuality] = useState(generateAirQualityData());
  const [timeInterval, setTimeInterval] = useState("hourly");

  useEffect(() => {
    const interval = setInterval(() => {
      setTemperatureData((prev) => {
        const newData = [
          ...prev.slice(1),
          {
            time: new Date().toLocaleTimeString(),
            temperature: (20 + Math.random() * 15).toFixed(1),
          },
        ];
        return newData;
      });
      setHumidityData((prev) => {
        const newData = [
          ...prev.slice(1),
          {
            time: new Date().toLocaleTimeString(),
            humidity: (30 + Math.random() * 50).toFixed(1),
          },
        ];
        return newData;
      });
      setAirQuality(generateAirQualityData());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleIntervalChange = (interval: string) => {
    setTimeInterval(interval);
    setTemperatureData(generateTemperatureData(interval));
    setHumidityData(generateHumidityData(interval));
  };

  const latestTemperature = parseFloat(temperatureData[temperatureData.length - 1].temperature);
  const latestHumidity = parseFloat(humidityData[humidityData.length - 1].humidity);

  // Configuración para los gráficos
  const temperatureChartConfig = {
    temperature: {
      label: "Temperatura",
      color: "hsl(var(--chart-1))",
    },
  };

  const humidityChartConfig = {
    temperature: {
      label: "Húmedad",
      color: "hsl(var(--chart-3))",
    },
  };

  return (
    <div className="container mx-auto p-4  min-h-screen">
      <h1 className="text-3xl font-bold mb-6">KPI Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        
        {/*================= TEMPERATURA =================*/}
        <div className="md:col-span-2 lg:col-span-2">
        <KpiCard
          title="Temperatura"
          icon={Thermometer}
          value={latestTemperature}
          alertThreshold={30}
          alertMessage="High Temperature Alert"
          alertDescription="Temperature exceeds 30°C. Take necessary precautions."
          data={temperatureData}
          timeInterval={timeInterval}
          onIntervalChange={handleIntervalChange}
          dataKey="temperature"
          unit="°C"
          chartConfig={temperatureChartConfig}
        />
        </div>

        {/*================= HÚMEDAD =================*/}
          <KpiCard
            title="Húmedad"
            icon={Droplets}
            value={latestHumidity}
            alertThreshold={80}
            alertMessage="High Humidity Alert"
            data={humidityData}
            timeInterval={timeInterval}
            onIntervalChange={handleIntervalChange}
            dataKey="humidity"
            unit="%"
            chartConfig={humidityChartConfig}
          />

        {/*================= CALIDAD DEL AIRE =================*/}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Calidad del Aire</CardTitle>
            <Wind className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{airQuality} ppm</div>
            <p className="text-xs text-muted-foreground">
              Last updated: {new Date().toLocaleTimeString()}
            </p>
            <div className="mt-4">
              <div className="h-4 w-full bg-secondary rounded-full overflow-hidden">
                <div
                  className={`h-full ${
                    airQuality > 100 ? "bg-destructive" : "bg-primary"
                  }`}
                  style={{ width: `${Math.min(airQuality, 150) / 1.5}%` }}
                />
              </div>
            </div>
            <div className="mt-2 flex justify-between text-xs text-muted-foreground">
              <span>0 ppm</span>
              <span>150 ppm</span>
            </div>
            {airQuality > 100 && (
              <Alert variant="destructive" className="mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Alerta de Mala Calidad del Aire</AlertTitle>
                <AlertDescription>
                  La calidad del aire supera los 100 ppm. Tome las precauciones necesarias.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
