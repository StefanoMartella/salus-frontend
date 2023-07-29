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

//sappiamo che l'orario per intero prevede una T al suo interno, che divide a sinistra la data e a destra l'orario. Con lo split andiamo proprio a dividere in queste due parti e teniamo la prima parte
export function getFormattedDate(date?: Date): string {
  return (date ?? new Date()).toISOString().split("T")[0];
}

export function getCurrentTime(): string {
  return new Date().toTimeString().split(" ")[0];
}
