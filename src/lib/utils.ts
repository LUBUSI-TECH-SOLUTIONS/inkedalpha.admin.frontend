import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


/**
 * Formats a date string (YYYY-MM-DD) or a Date object into a readable format like "01 ene 2024".
 * If no date is provided, the current date is used.
 *
 * @param {string | Date} [inputDate] - Optional date string in 'YYYY-MM-DD' format or a Date object.
 * @returns {string} - Formatted date string in the format "dd mon yyyy".
 * @throws {Error} - Throws if the string format is invalid.
 */
export const months = [
  "ene", "feb", "mar", "abr", "may", "jun",
  "jul", "ago", "sep", "oct", "nov", "dic"
];

export const formaterDate = (inputDate?: string | Date): string => {

  let dateObj: Date;

  if (!inputDate) {
    dateObj = new Date(); // use current date if none provided
  } else if (typeof inputDate === "string") {
    const [year, month, day] = inputDate.split("-");
    if (!year || !month || !day) {
      throw new Error("Invalid date format. Use 'YYYY-MM-DD'.");
    }
    dateObj = new Date(Number(year), Number(month) - 1, Number(day));
  } else {
    dateObj = inputDate;
  }

  const day = dateObj.getDate().toString().padStart(2, "0");
  const month = months[dateObj.getMonth()];
  const year = dateObj.getFullYear();

  return `${day} ${month} ${year}`;
};

export const formatDate = (date?: Date) => date ? date.toISOString().split('T')[0] : undefined;
