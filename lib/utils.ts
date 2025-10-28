import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
  // Use a consistent formatting approach that works the same on server and client
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
}
