import { format } from "date-fns";

export const formatCurrency = (amount: number) => {
  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  return formatter.format(amount);
};

export const convertUnixTimestampToISO = (timestamp: any) => {
  return format(new Date(timestamp), "dd/MM/yyyy' - 'HH:mm");
};
