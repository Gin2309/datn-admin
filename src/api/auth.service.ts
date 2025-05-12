import axiosClient from ".";

export function Login(payload: { email: string; password: string }) {
  return axiosClient.post("/admin/login", payload);
}

export function getRefreshToken(payload: { token: string }) {
  return axiosClient.post("refresh-token", payload);
}

export function getProfile() {
  return axiosClient.get("profile");
}

export function updateProfile(payload: any) {
  return axiosClient.put("update-profile", payload);
}

export function changePassword(payload: { password: string; newPassword: string; confirmNewPassword: string }) {
  return axiosClient.post("change-password", payload);
}

export function getFeedback(id: any) {
  return axiosClient.get(`feedback?orderId=${id}`);
}

export const uploadFile = async (file: any) => {
  const formData = new FormData();
  formData.append("file", file);
  return axiosClient.post("file/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
