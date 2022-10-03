export const currencyFormatter = (value: number) => {
  return value
    .toLocaleString("en-GB", {
      style: "currency",
      currency: "GBP",
    })
    .replace(/^(\D+)/, "$1 ");
};

export const dateFormatter = (date: string | number | Date) => {
  return Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  }).format(new Date(date));
};
