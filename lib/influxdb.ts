import { InfluxDB } from '@influxdata/influxdb-client';

const INFLUXDB_URL = 'http://192.168.0.104:8086'; // URL de tu servidor InfluxDB
const INFLUXDB_TOKEN = '7Qpw_atdeNLtM6xIoGQW_42_DYmqJay_eiUvn90pKGkUwpicW2yslxsv9vcnRVjhyVHd1TKFIFNnQac1b0CSCQ=='; // Tu token de InfluxDB
const INFLUXDB_ORG = '870f0f2922423d67'; // Tu organización en InfluxDB
const INFLUXDB_BUCKET = 'Prueba'; // Tu bucket en InfluxDB

// Crear el cliente InfluxDB
const influxDBClient = new InfluxDB({
  url: INFLUXDB_URL,
  token: INFLUXDB_TOKEN,
});

// Obtener la API de consulta
const queryApi = influxDBClient.getQueryApi(INFLUXDB_ORG);

// Método para hacer consultas
const queryData = async (query: string) => {
  const results: any[] = [];
  try {
    // Ejecutar la consulta usando Flux
    await queryApi.queryRows(query, {
      next(row: string[]) {
        // Guardar cada fila de datos en los resultados
        results.push(row);
      },
      error(error: any) {
        console.error('Error al consultar InfluxDB:', error);
      },
      complete() {
        console.log('Consulta completada.');
      },
    });
  } catch (error) {
    console.error('Error al consultar InfluxDB:', error);
  }
  return results;
};

export { queryData };
