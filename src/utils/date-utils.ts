export const SERVER_DATE_FORMAT = "YYYY-MM-DD";
export const LONG_DATE_FORMAT = "dddd, DD MMMM YYYY";

export function getCurrentMonthName(): string {
  return new Date().toLocaleDateString("it", { month: "long" });
}

export function getCurrentDayName(): string {
  return new Date().toLocaleDateString("it", { weekday: "long" });
}

export function getCurrentDayNumber(): string {
  return new Date().toLocaleDateString("it", { day: "numeric" });
}

export function getCurrentYearNumber(): string {
  return new Date().toLocaleDateString("it", { year: "numeric" });
}

export function getFormattedDate(date?: Date): string {
  return (date ?? new Date()).toISOString().split("T")[0];
}

export function getCurrentTime(): string {
  return new Date().toTimeString().split(" ")[0];
}
