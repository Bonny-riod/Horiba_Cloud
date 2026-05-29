export interface Sensor {
  name: string;
  value: number | string;
  unit: string;
  imageUrl: string;
}

export interface Device {
  id: string;
  name: string;
  type: string;
  status: "connected" | "disconnected";
  imageUrl: string;
  lastUpdated: string;
  readings: { [key: string]: string | number }; // This allows for dynamic sensor readings
  sensors: Sensor[]; // Now, the sensors property is an array of Sensor objects
}
