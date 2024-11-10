"use client";

import { useState, useEffect } from "react"; // React hooks
import { queryData } from "@/lib/influxdb"; // Importar la función de consulta

// UI Components
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Thermometer, Droplets, Wind } from "lucide-react";

export default function EnvironmentalDashboard() {
  const [temperatureData, setTemperatureData] = useState<any[]>([]);
  const [humidityData, setHumidityData] = useState<any[]>([]);
  const [airQuality, setAirQuality] = useState<number>(0); // Calcular la calidad del aire en base a los datos
  const [timeInterval, setTimeInterval] = useState("hourly");

  useEffect(() => {
    // Función que se ejecuta al cargar el componente
    const fetchData = async () => {
      // Consulta para obtener los datos de temperatura y humedad
      const query = `
        from(bucket: "Prueba") 
          |> range(start: -1h)
          |> filter(fn: (r) => r._measurement == "sensor_data")
          |> filter(fn: (r) => r._field == "air_quality" or r._field == "temperature" or r._field == "humidity")
          |> aggregateWindow(every: 5m, fn: mean, createEmpty: false)
          |> yield(name: "mean")
      `;
      
      const results = await queryData(query); // Realizar la consulta

      // Filtrar los resultados para obtener temperatura y humedad
      const newTemperatureData = results.filter((r: any) => r["_field"] === "temperature").map((r: any) => ({
        time: r._time,
        temperature: r._value,
      }));
      const newHumidityData = results.filter((r: any) => r["_field"] === "humidity").map((r: any) => ({
        time: r._time,
        humidity: r._value,
      }));

      setTemperatureData(newTemperatureData);
      setHumidityData(newHumidityData);
      
      // Aquí calculamos una estimación de la calidad del aire en base a los datos de humedad y temperatura
      // La fórmula de calidad del aire depende de lo que estés midiendo. Este es solo un ejemplo simple.
      setAirQuality(Math.floor((newTemperatureData[0]?.temperature + newHumidityData[0]?.humidity) / 2));
    };

    // Llamar la función de consulta cada 5 segundos (ajusta esto según tus necesidades)
    const interval = setInterval(() => {
      fetchData();
    }, 5000);

    return () => clearInterval(interval);
  }, [timeInterval]);

  const latestTemperature = parseFloat(temperatureData[temperatureData.length - 1]?.temperature || "0");
  const latestHumidity = parseFloat(humidityData[humidityData.length - 1]?.humidity || "0");

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">KPI Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">

        {/*================= TEMPERATURA =================*/}
        <div className="md:col-span-2 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Temperatura</CardTitle>
              <Thermometer className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{latestTemperature} °C</div>
              <p className="text-xs text-muted-foreground">
                Última actualización: {new Date().toLocaleTimeString()}
              </p>
            </CardContent>
          </Card>
        </div>

        {/*================= HÚMEDAD =================*/}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Humedad</CardTitle>
            <Droplets className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{latestHumidity} %</div>
            <p className="text-xs text-muted-foreground">
              Última actualización: {new Date().toLocaleTimeString()}
            </p>
          </CardContent>
        </Card>

        {/*================= CALIDAD DEL AIRE =================*/}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium">Calidad del Aire</CardTitle>
            <Wind className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{airQuality} ppm</div>
            <p className="text-xs text-muted-foreground">
              Última actualización: {new Date().toLocaleTimeString()}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}