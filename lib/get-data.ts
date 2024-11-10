import { queryInfluxDB } from './influxdb';

export async function getTemperatureData(): Promise<any[]> {
  const query = `
    from(bucket: "Prueba")
      |> range(start: -1h)
      |> filter(fn: (r) => r._measurement == "temperature")
      |> filter(fn: (r) => r._field == "value")
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
    from(bucket: "Prueba")
      |> range(start: -1h)
      |> filter(fn: (r) => r._measurement == "humidity")
      |> filter(fn: (r) => r._field == "value")
  `;
  try {
    const data = await queryInfluxDB(query);
    return data;
  } catch (error) {
    console.error('Error al obtener datos de humedad:', error);
    return [];
  }
}
