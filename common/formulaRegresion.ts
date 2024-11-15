type DataPoint = { x: number; y: number };

export function calculateRegression(data: DataPoint[]) {
  const n = data.length;

  if (n === 0) {
    return { a: 0, b: 0 }; // Evitar división por cero si no hay datos.
  }

  let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;

  for (let i = 0; i < n; i++) {
    sumX += data[i].x;
    sumY += data[i].y;
    sumXY += data[i].x * data[i].y;
    sumX2 += data[i].x * data[i].x;
  }

  const a = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  const b = (sumY - a * sumX) / n;

  return { a, b };
}
