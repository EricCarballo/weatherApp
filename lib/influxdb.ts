import { InfluxDB } from '@influxdata/influxdb-client';

const INFLUXDB_URL = process.env.INFLUXDB_URL!;
const INFLUXDB_TOKEN = process.env.INFLUXDB_TOKEN!;
const INFLUXDB_ORG = process.env.INFLUXDB_ORG!;

if (!INFLUXDB_URL || !INFLUXDB_TOKEN || !INFLUXDB_ORG) {
  throw new Error('Faltan variables de entorno para InfluxDB.');
}

// Crear el cliente de InfluxDB
const influxDBClient = new InfluxDB({
  url: INFLUXDB_URL,
  token: INFLUXDB_TOKEN,
});

// Obtener la API de consulta
const queryApi = influxDBClient.getQueryApi(INFLUXDB_ORG);

export async function queryInfluxDB(query: string): Promise<any[]> {
  const results: any[] = [];
  return new Promise((resolve, reject) => {
    queryApi.queryRows(query, {
      next(row: string[]) {
        results.push(row);
      },
      error(error: any) {
        console.error('Error al consultar InfluxDB:', error);
        reject(error);
      },
      complete() {
        resolve(results);
      },
    });
  });
}
