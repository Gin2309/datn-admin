import axiosClient from ".";

export function sendMail(payload: any) {
  return axiosClient.post("mail/test", payload);
}
