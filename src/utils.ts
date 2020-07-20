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

// export const URL = "https://suxitech.work/server";
export const URL = "http://127.0.0.1:3001/server";
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
    timeout:8650000,
  });
}
export function showWarning(msg: string) {
  global["showWarning"](msg);
}
export function showError(msg: string) {
  global["showError"](msg);
}
export function disableWarning() {
  global["disableWarning"]();
}
export function disableError() {
  global["disableError"]();
}
export function getTimeString(timestamp: number): string {
  let msg = new Date(timestamp);
  let msgDate = msg.getDate();
  let msgYear = msg.getFullYear();
  let msgMouth = msg.getMonth() + 1;
  let msgHours = msg.getHours();
  let msgMinutes = msg.getMinutes();
  let msgSecond = msg.getSeconds();
  return (
    msgYear +
    "-" +
    msgMouth +
    "-" +
    msgDate +
    " " +
    msgHours +
    ":" +
    msgMinutes+":"+msgSecond
  );
}
