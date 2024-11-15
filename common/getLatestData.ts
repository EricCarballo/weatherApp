type DataItem = { [key: string]: number };

function getLatestData<T extends DataItem>(data: T[], key: keyof T): number {
  return data[data.length - 1]?.[key] || 0;
}