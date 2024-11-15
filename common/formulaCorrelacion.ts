/** FORMULA:    
           Σ((x_i - x̄) * (y_i - ȳ)) 
    r =  ---------------------------------
          √( Σ(x_i - x̄)² * Σ(y_i - ȳ)² )
 */
export function calculateCorrelation(data: { x: number; y: number }[]): number {
    const n = data.length;
    let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0, sumY2 = 0;
  
    for (let i = 0; i < n; i++) {
      sumX += data[i].x;
      sumY += data[i].y;
      sumXY += data[i].x * data[i].y;
      sumX2 += data[i].x * data[i].x;
      sumY2 += data[i].y * data[i].y;
    }
  
    const numerator = n * sumXY - sumX * sumY;
    const denominator = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));
  
    const r = numerator / denominator;
    return r;
  }
  