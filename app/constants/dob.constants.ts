export const Days = Array.from({ length: 31 }, (_, i) => i + 1);
export const Months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export const Years = Array.from(
  { length: 60 },
  (_, i) => new Date().getFullYear() - i,
);
