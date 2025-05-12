import dayjs from "dayjs";
import { format } from "date-fns";
// import Avatars from "@/assets/Avatar.svg";
// import { setToken } from "@/helpers/storage";

export function formatCurrency(amount: number): string {
  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);

  return formattedAmount.replace("$", "").trim() + "$";
}

export function convertToSubCurrency(amount: number, factor = 100) {
  return Math.round(amount * factor);
}

export function formatTextDate(dateString: any) {
  const dayjsDate = dayjs(dateString);
  const day = dayjsDate.date();

  const suffix = (day: number): string => {
    if (day >= 11 && day <= 13) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  return dayjsDate.format(`ddd, MMM D[${suffix(day)}] YYYY`);
}

export function formatDateToShort(dateString: string): string {
  const date = new Date(dateString);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

// export function formatCurrencyWithoutSymbol(amount: number): string {
//   const formattedAmount = new Intl.NumberFormat("vi-VN", {
//     style: "decimal",
//     minimumFractionDigits: 0,
//   }).format(amount);

//   return formattedAmount.replace(/\./g, ",");
// }

// export function maskPhoneNumber(phoneNumber: string | any) {
//   const maskedNumber = phoneNumber.substring(0, 2) + "*****" + phoneNumber.substring(7);
//   return maskedNumber;
// }

// export const formatTime = (timestamp: string | any) => {
//   const adjustedDate = getAdjustedDate(timestamp);
//   return format(adjustedDate, "dd/MM/yyyy'  'HH:mm");
// };

export const formatDate = (timestamp: string | any) => {
  const date = new Date(timestamp);
  return format(date, "dd/MM/yyyy");
};

// export const formatTimeWithSeconds = (timestamp: string | any) => {
//   const adjustedDate = getAdjustedDate(timestamp);
//   return format(adjustedDate, "dd/MM/yyyy' - 'HH:mm:ss");
// };

export function formatTime(timestamp: string | any) {
  const date = new Date(timestamp);
  return format(date, "dd/MM/yyyy' - 'HH:mm");
}

// export const getValidImageUrl = (imageUrl: string | null | undefined): string => {
//   const defaultImage = Avatars;

//   if (!imageUrl || typeof imageUrl !== "string" || imageUrl.trim() === "") {
//     return defaultImage;
//   }

//   try {
//     const url = new URL(imageUrl);
//     if (url.protocol === "http:" || url.protocol === "https:") {
//       return imageUrl;
//     }
//   } catch (error) {
//     if (imageUrl.startsWith("/")) {
//       return imageUrl;
//     }
//   }

//   return defaultImage;
// };

// export const setTokenWithExpiry = (token: string, expiryDuration: number) => {
//   const expiry = Date.now() + expiryDuration * 1000;
//   setToken(token);
//   localStorage.setItem("tokenExpiry", expiry.toString());
// };

// export const getTokenExpiry = () => {
//   const expiry = localStorage.getItem("tokenExpiry");
//   return expiry ? parseInt(expiry, 10) : null;
// };
