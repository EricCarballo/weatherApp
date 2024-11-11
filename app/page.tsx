"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Droplets, Thermometer, Wind } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground mt-5 mb-5">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Monitoreo Ambiental en Tiempo Real
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Sistema avanzado de monitoreo para temperatura, calidad del aire y humedad. Diseñado para personal técnico, operadores de sistemas IoT y gestores de instalaciones.
                </p>
              </div>
              <div className="space-x-4">
                <Button asChild>
                  <Link href="/dashboard">Ver Dashboard</Link>
                </Button>
                <Button variant="outline">Más Información</Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Nuestros Indicadores Clave</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader>
                  <Thermometer className="h-8 w-8 mb-2" />
                  <CardTitle>Temperatura</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Monitoreo en tiempo real de la temperatura ambiente en °C.</p>
                  <ul className="list-disc list-inside mt-2">
                    <li>Gráfico de línea o área configurable</li>
                    <li>Alertas para valores superiores a 30°C</li>
                    <li>Datos del sensor DHT11 cada 5 segundos</li>
                    <li>Análisis de tendencias horarias y diarias</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Wind className="h-8 w-8 mb-2" />
                  <CardTitle>Calidad del Aire</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Medición de la calidad del aire en partes por millón (ppm).</p>
                  <ul className="list-disc list-inside mt-2">
                    <li>Gráfico de línea o medidor de nivel</li>
                    <li>Alertas cuando se supera 100 ppm</li>
                    <li>Datos del sensor MQ-2 cada 5 segundos</li>
                    <li>Reportes promedio por hora</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Droplets className="h-8 w-8 mb-2" />
                  <CardTitle>Humedad</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Nivel de humedad relativa en el entorno en porcentaje (%).</p>
                  <ul className="list-disc list-inside mt-2">
                    <li>Gráfico de líneas o medidor circular</li>
                    <li>Resaltado de valores anormales</li>
                    <li>Datos del sensor DHT11 cada 5 segundos</li>
                    <li>Análisis de promedios por hora y día</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Optimice su Entorno</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Nuestro sistema proporciona datos precisos y en tiempo real para ayudarle a tomar decisiones informadas sobre su entorno.
                </p>
              </div>
              <Button size="lg">
                Solicitar una Demostración
              </Button>
            </div>
          </div>
        </section>
      </main>
      
    </div>
  );
}
