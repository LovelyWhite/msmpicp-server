export interface DeviceUploadData {
  uniqueId: string;
  model: string;
  brand: string;
  data: ContextData[];
}
export interface ThreeAxisMeasurement {
  x: number;
  y: number;
  z: number;
}
export interface BarometerMeasurement {
  pressure: number;
  relativeAltitude?: number;
}
export interface LocationData {
  latitude: number;
  longitude: number;
  provider: string;
  time: number;
  accuracy: number;
  altitude: number;
}
interface ContextData {
  [key: string]: any;
  timeString: string;
  location: LocationData;
  accelerometerData: ThreeAxisMeasurement;
  barometerData: BarometerMeasurement;
  gyroscopeData: ThreeAxisMeasurement;
  magnetometerData: ThreeAxisMeasurement;
}
