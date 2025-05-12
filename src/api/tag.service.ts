import axiosClient from ".";

export function getTagsList(params: { page: number; itemsPerPage: number; sortDesc?: any }) {
  return axiosClient.get("tag", {
    params,
  });
}

export function createTags(data: any) {
  return axiosClient.post(`tag`, data);
}

export function getTagsById(id: any) {
  return axiosClient.get(`tag/${id}`);
}

export function updateTags(id: any, data: any) {
  return axiosClient.put(`tag/${id}`, data);
}

export function deleteTags(id: any) {
  return axiosClient.delete(`tag/${id}`);
}
