export function formatPrice(price) {
  const roundedPrice = Math.round(price);
  return `$${roundedPrice} CAD`;
}
