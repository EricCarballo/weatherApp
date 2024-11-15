import { useState, useEffect } from "react"; // React hooks
import { Thermometer, Droplets, Wind } from "lucide-react";
import { getAirQualityData, getHumidityData, getTemperatureData } from "@/lib";
import KpiCard from "@/components/kpi/KpiCard";
import LinearRegressionChart from "@/components/linearRegression/linearRegression";

export default function EnvironmentalDashboard() {
  const [temperatureData, setTemperatureData] = useState<any[]>([]);
  const [humidityData, setHumidityData] = useState<any[]>([]);
  const [airQualityData, setAirQualityData] = useState<any[]>([]);
  const [timeInterval, setTimeInterval] = useState("hourly");

  useEffect(() => {
    const fetchData = async () => {
      const tempData = await getTemperatureData();
      const humData = await getHumidityData();
      const airData = await getAirQualityData();

      console.log("Temperatura", tempData);
      console.log("Humedad", humData);
      console.log("Calidad del Aire", airData);

      setTemperatureData(tempData);
      setHumidityData(humData);
      setAirQualityData(airData);
    };

    const interval = setInterval(() => {
      fetchData();
    }, 3000);

    return () => clearInterval(interval);
  }, [timeInterval]);

  // Cálculos de la última temperatura, humedad y calidad del aire
  const latestTemperature =
    temperatureData[temperatureData.length - 1]?.value || 0;
  const latestHumidity = humidityData[humidityData.length - 1]?.value || 0;
  const latestAirQuality =
    airQualityData[airQualityData.length - 1]?.value || 0;

  // Combina la data de temperatura y humedad para la regresión
  const regressionData = temperatureData.map((temp, index) => ({
    x: temp.value, // Temperatura
    y: humidityData[index]?.value || 0, // Humedad
  }));

  const chartConfig = {
    temperature: {
      color: "#ff6347",
      dataKey: "temperature",
    },
    humidity: {
      color: "#4682b4",
      dataKey: "humidity",
    },
    airQuality: {
      color: "#32cd32",
      dataKey: "air_quality",
    },
  };

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">KPI Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {/*============  TEMPERATURA  ============*/}
        <KpiCard
          title="Temperatura"
          icon={Thermometer}
          value={latestTemperature}
          unit="°C"
          data={temperatureData}
          timeInterval={timeInterval}
          onIntervalChange={setTimeInterval}
          dataKey={chartConfig.temperature.dataKey}
          alertThreshold={30}
          alertMessage="¡Temperatura alta!"
          alertDescription="La temperatura ha superado el umbral de seguridad."
          chartConfig={{
            color: chartConfig.temperature.color,
            dataKey: chartConfig.temperature.dataKey,
          }}
        />

        {/*============  HUMEDAD  ============*/}
        <KpiCard
          title="Humedad"
          icon={Droplets}
          value={latestHumidity}
          unit="%"
          data={humidityData}
          timeInterval={timeInterval}
          onIntervalChange={setTimeInterval}
          dataKey={chartConfig.humidity.dataKey}
          alertThreshold={80}
          alertMessage="¡Humedad alta!"
          alertDescription="La humedad ha superado el umbral de seguridad."
          chartConfig={{
            color: chartConfig.humidity.color,
            dataKey: chartConfig.humidity.dataKey,
          }}
        />

        {/*============  CALIDAD DEL AIRE  ============*/}
        <KpiCard
          title="Calidad del Aire"
          icon={Wind}
          value={latestAirQuality}
          unit="ppm"
          data={airQualityData}
          timeInterval={timeInterval}
          onIntervalChange={setTimeInterval}
          dataKey={chartConfig.airQuality.dataKey}
          alertThreshold={100}
          alertMessage="¡Calidad del aire baja!"
          alertDescription="La calidad del aire ha caído por debajo del nivel seguro."
          chartConfig={{
            color: chartConfig.airQuality.color,
            dataKey: chartConfig.airQuality.dataKey,
          }}
        />

        {/*============  REGRESIÓN LINEAL  ============*/}
        <LinearRegressionChart
          title="Gráfica de Regresión Lineal"
          description="Relación entre Temperatura y Humedad con línea de regresión"
          initialData={regressionData}
          dataColor="hsl(var(--chart-3))"
          regressionColor="hsl(var(--chart-4))"
        />
      </div>
    </div>
  );
}
