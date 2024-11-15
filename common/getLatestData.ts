type DataItem = { [key: string]: number };

function getLatestData(data: any[], key: keyof any) {
  return data[data.length - 1]?.[key] || 0;
}