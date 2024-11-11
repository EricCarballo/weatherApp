import { queryInfluxDB } from "./influxdb";

const bucket = process.env.NEXT_PUBLIC_INFLUXDB_BUCKET;

export async function getTemperatureData(): Promise<any[]> {
  const query = `
     from(bucket: "${bucket}")
      |> range(start: -1h)
      |> filter(fn: (r) => r["_measurement"] == "sensor_data")
      |> filter(fn: (r) => r["_field"] == "temperature")
      |> aggregateWindow(every: 5m, fn: mean, createEmpty: false)
      |> yield(name: "mean")
  `;
  try {
    const data = await queryInfluxDB(query);
    console.log(`Datos de la Temperatura: ${data}`);
    return data;
  } catch (error) {
    console.error("Error al obtener datos de temperatura:", error);
    return [];
  }
}
