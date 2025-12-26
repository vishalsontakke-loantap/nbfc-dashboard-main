import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// format a number into Indian number format
export function formatIndianNumber(value: string): string {
  const cleaned = value.replace(/[^0-9]/g, "");
  const num = parseInt(cleaned, 10);
  if (isNaN(num)) return "";

  return num.toLocaleString("en-IN"); // Indian number format
}

export function clampPercentage(value: number): number | "" {
  return Math.min(100, Math.max(0, value));
}

export const getFormattedDateTime = () => {
  const now = new Date();
  const parts = now
    .toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
    .replace(",", "")
    .split(" ");

  // Insert comma after month
  return `${parts[0]} ${parts[1]}, ${parts[2]} ${parts[3]}`;
};

export function assetPath(path: string): string {
  const base = (import.meta.env.BASE_URL ?? "/").replace(/\/*$/, "/");
  return `${base}${path.replace(/^\//, "")}`;
}

export function formatIndianCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
  }).format(amount);
}