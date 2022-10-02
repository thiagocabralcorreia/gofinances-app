export const currencyFormatter = (value: number) => {
  return value
    .toLocaleString("en-GB", {
      style: "currency",
      currency: "GBP",
    })
    .replace(/^(\D+)/, "$1 ");
};
