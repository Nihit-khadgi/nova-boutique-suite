import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Nepali Rupee formatter. Source prices are small USD-style numbers;
// we scale them to feel realistic in NPR.
export const NPR_RATE = 100;

export function formatNPR(amount: number): string {
  const value = Math.round(amount * NPR_RATE);
  return `Rs ${value.toLocaleString("en-IN")}`;
}
