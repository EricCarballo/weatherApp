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
    const rawData = await queryInfluxDB(query);

    if (!Array.isArray(rawData) || rawData.length === 0) {
      console.error("No se obtuvieron datos de temperatura.");
      return [];
    }

    return rawData
      .map((entry: any) => ({
        time: new Date(entry[4]).toLocaleTimeString("es-MX", { hour: '2-digit', minute: '2-digit' }),
        value: parseFloat(entry[5]),
        type: entry[6],
      }));
  } catch (error) {
    console.error("Error al obtener datos de temperatura:", error);
    return [];
  }
}
