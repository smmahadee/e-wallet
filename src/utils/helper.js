export function formatCurrency(price = 0) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',
  }).format(price);
}

export const generateRandomNumber = (min, max) => {
  return Math.ceil(Math.random() * (max - min) + min);
};
