const colors: string[] = [
  "#b91c1c",
  "#ea580c",
  "#4d7c0f",
  "#0284c7",
  "#6d28d9",
  "#e11d48",
  "#451a03",
  "#fde047",
  "#4c0519",
  "#ef4444",
];

export const getCustomColor = (): string => {
  return colors[Math.floor(Math.random() * colors.length)];
};
