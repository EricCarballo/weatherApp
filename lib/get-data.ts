import { queryInfluxDB } from './influxdb';

export async function getTemperatureData(): Promise<any[]> {
  const query = `
     from(bucket: "${process.env.NEXT_PUBLIC_INFLUXDB_BUCKET}")
      |> range(start: -1h)
      |> filter(fn: (r) => r["_measurement"] == "sensor_data")
      |> filter(fn: (r) => r["_field"] == "temperature")
      |> aggregateWindow(every: 5m, fn: mean, createEmpty: false)
      |> yield(name: "mean")
  `;
  try {
    const data = await queryInfluxDB(query);
    return data;
  } catch (error) {
    console.error('Error al obtener datos de temperatura:', error);
    return [];
  }
}

export async function getHumidityData(): Promise<any[]> {
  const query = `
     from(bucket: "${process.env.NEXT_PUBLIC_INFLUXDB_BUCKET}")
      |> range(start: -1h)
      |> filter(fn: (r) => r["_measurement"] == "sensor_data")
      |> filter(fn: (r) => r["_field"] == "humidity")
      |> aggregateWindow(every: 5m, fn: mean, createEmpty: false)
      |> yield(name: "mean")
  `;
  try {
    const data = await queryInfluxDB(query);
    return data;
  } catch (error) {
    console.error('Error al obtener datos de humedad:', error);
    return [];
  }
}
