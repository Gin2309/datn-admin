import axiosClient from ".";

export function getBlogList(params: {
  page: number;
  itemsPerPage: number;
  search?: string;
  status?: any;
  sortBy?: string;
  sortDesc?: any;
  contentLength?: any;
}) {
  return axiosClient.get("posts", {
    params,
  });
}

export function getBlogBySlug(slug: any) {
  return axiosClient.get(`posts/slug/${slug}`);
}

export function getBlogById(id: any) {
  return axiosClient.get(`posts/id/${id}`);
}

export function updateBlog(id: any, data: any) {
  return axiosClient.patch(`posts/${id}`, data);
}

export function createBlog(data: any) {
  return axiosClient.post(`posts`, data);
}

export function deleteBlog(id: any) {
  return axiosClient.delete(`posts/${id}`);
}
