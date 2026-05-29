export interface Sensor {
  id: string;
  parameter: string;  // e.g. "CO", "PM10"
  unit: string;       // e.g. "ppm", "µg/m³"
  value: number;
  isConnected: boolean;
  regulatoryLimit: number;
}
