import axiosClient from ".";

export function getOrderList(params: { page: number; itemsPerPage: number; status?: string; sortDesc?: boolean }) {
  return axiosClient.get("orders", {
    params,
  });
}

export function getOrderDetail(id: any) {
  return axiosClient.get(`orders/${id}`);
}

export function createOrder(payload: any) {
  return axiosClient.post(`orders`, payload);
}

export function updateOrder(payload: any, id: any) {
  return axiosClient.put(`orders/${id}`, payload);
}

export function generateOrderId() {
  return axiosClient.get(`orders/generate-id`);
}

export function deleteOrder(id: any, permanent: boolean) {
  return axiosClient.delete(`orders/${id}?permanent=${permanent}`);
}

export function getOrderStatus() {
  return axiosClient.get(`orders/count-by-status`);
}

export function getOrderById(id: any) {
  return axiosClient.get(`orders/${id}`);
}

export function assignedOrder(id: any, employeeId: any) {
  return axiosClient.patch(`orders/${id}/assign`, {
    employeeId,
  });
}
