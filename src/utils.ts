import axios from "axios";
export const URL = "http://localhost:5000";
export function pushData(
  url: string,
  values: any,
  onUploadProgress?: (progressEvent: any) => void
) {
  return axios.post(URL + url, values, {
    headers: {
      "Content-Type": "application/json",
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
