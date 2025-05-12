import axiosClient from ".";

export function getUserList(params: { page: number; itemsPerPage: number; search?: string; sortDesc?: any }) {
  return axiosClient.get("user", {
    params,
  });
}

export function getUserDetail(id: any) {
  return axiosClient.get(`user/${id}`);
}

export function getEmployeeList() {
  return axiosClient.get(`user/employees`);
}

export function updateUser(id: any, data: any) {
  return axiosClient.put(`user/${id}`, data);
}

export function deleteUser(id: any) {
  return axiosClient.delete(`user/${id}`);
}
