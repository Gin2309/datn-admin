export const ACCESS_TOKEN = "ACCESS_TOKEN";

export const setAccessToken = (token: string) =>
  localStorage.setItem(ACCESS_TOKEN, token);

export const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN);

export const setItem = (key: string, value: any) =>
  localStorage.setItem(key, value);

export const getItem = (key: string) => localStorage.getItem(key);
