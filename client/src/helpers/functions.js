export function formatPrice(price) {
  const roundedPrice = Math.round(price * 100) / 100;
  return `$${roundedPrice} CAD`;
}
