# Dashboard de Monitoreo Ambiental

Este proyecto proporciona un dashboard para visualizar datos de **temperatura**, **humedad** y **calidad del aire** obtenidos de una base de datos **InfluxDB**. Los datos se presentan en un formato visual fácil de entender, con gráficos y alertas que indican los niveles de cada parámetro.

## Tecnologías Utilizadas

- **React** (con Next.js)
- **InfluxDB** (Base de datos de series temporales)
- **TailwindCSS** (Estilos)
- **Recharts** (Gráficos)
- **Lucide Icons** (Iconos para la interfaz de usuario)

## Funcionalidades

- Monitoreo de temperatura, humedad y calidad del aire en tiempo real.
- Gráficos interactivos para cada KPI (Indicador Clave de Rendimiento).
- Alertas cuando un parámetro supera los umbrales definidos.

## Imágenes del Proyecto

### 1. Dashboard Principal

Aquí se visualizan los tres indicadores clave (temperatura, humedad y calidad del aire) en un formato de tarjeta con gráficos interactivos.

![Dashboard](./assets/dashboard.png)

### 2. Datos de InfluxDB

Ejemplo de cómo se almacenan los datos de **temperatura**, **humedad** y **calidad del aire** en InfluxDB.

![Datos InfluxDB](./assets/influxdb-data.png)

## Instalación y Ejecución

### Requisitos

1. Tener **Node.js** instalado en tu máquina (versión 16.x o superior).
2. Tener acceso a una instancia de **InfluxDB** corriendo y configurada con los datos necesarios.

### 1. Clonar el Repositorio

```git clone https://github.com/EricCarballo/weatherApp.git```
``` cd tu-repositorio```

### 2. Descargar Dependencias

```npm install```

### 3. Configuración de Variables de Entorno

Crea un archivo .env en la raíz del proyecto y agrega las variables del .env.template

### 4. Correr el proyecto

``` npm run dev ``` 