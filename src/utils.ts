import axios from "axios";
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
export interface LoginData {
  userName: string;
  password: string;
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
export interface ContextData {
  [key: string]: any;
  timeString: string;
  location: LocationData;
  accelerometerData: ThreeAxisMeasurement;
  barometerData: BarometerMeasurement;
  gyroscopeData: ThreeAxisMeasurement;
  magnetometerData: ThreeAxisMeasurement;
}

export const URL = "https://suxitech.work";
// export const URL = "http://localhost:5000";
export function fetchData(
  url: string,
  values: any,
  onUploadProgress?: (progressEvent: any) => void,
  token?: string
) {
  return axios.post(URL + url, values, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    onUploadProgress: onUploadProgress,
  });
}
export function showWarning(msg: string) {
  global["showWarning"](msg);
}
export function showError(msg: string) {
  global["showError"](msg);
}
