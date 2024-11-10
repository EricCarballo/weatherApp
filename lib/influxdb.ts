import { InfluxDB } from '@influxdata/influxdb-client';

const INFLUXDB_URL = process.env.NEXT_PUBLIC_INFLUXDB_URL || 'http://192.168.0.104:8086';
const INFLUXDB_TOKEN = process.env.NEXT_PUBLIC_INFLUXDB_TOKEN || '7Qpw_atdeNLtM6xIoGQW_42_DYmqJay_eiUvn90pKGkUwpicW2yslxsv9vcnRVjhyVHd1TKFIFNnQac1b0CSCQ==';
const INFLUXDB_ORG = process.env.NEXT_PUBLIC_INFLUXDB_ORG || '870f0f2922423d67';

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
