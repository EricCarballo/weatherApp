import { queryInfluxDB } from "./influxdb";

const bucket = process.env.NEXT_PUBLIC_INFLUXDB_BUCKET;

export async function getAirQualityData(): Promise<any[]> {
  const query = `
    from(bucket: "${bucket}")
      |> range(start: -1h)
      |> filter(fn: (r) => r["_measurement"] == "sensor_data")
      |> filter(fn: (r) => r["_field"] == "air_quality")
      |> aggregateWindow(every: 5m, fn: mean, createEmpty: false)
      |> yield(name: "mean")
  `;

  try {
    const rawData = await queryInfluxDB(query);

    if (!Array.isArray(rawData) || rawData.length === 0) {
      console.error("No se obtuvieron datos de calidad del aire.");
      return [];
    }

    return rawData
      .filter((entry: any) => entry._time && entry._value)
      .map((entry: any) => ({
        time: new Date(entry._time).toLocaleTimeString("es-MX", { hour: '2-digit', minute: '2-digit' }),
        air_quality: parseFloat(entry._value)
      }));
  } catch (error) {
    console.error("Error al obtener datos de calidad del aire:", error);
    return [];
  }
}
