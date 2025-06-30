import axiosClient from ".";

export function getNoti(params: { page?: number; receiverId: any; size?: number }) {
  return axiosClient.get("notification", {
    params,
  });
}

export function readNoti(ids: any) {
  return axiosClient.patch(`notification/mark-as-read`, {
    ids,
  });
}
