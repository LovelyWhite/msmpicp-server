import axios from "axios";
export const URL = "http://localhost:5000";
export function fetchData(
  url: string,
  values: any,
  onUploadProgress?: (progressEvent: any) => void,
  token?:string
) {
  return axios.post(URL + url, values, {
    headers: {
      "Content-Type": "application/json",
      "Authorization":token
    },
    onUploadProgress: onUploadProgress,
  });
}
export function showWarning(msg: string) {
  global["showWarning"](msg);
}
export function showError(msg: string) {
  global["showWarning"](msg);
}