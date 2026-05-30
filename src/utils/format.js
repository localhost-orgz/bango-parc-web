/**
 * Formats a number to a short money format (Indonesian).
 * e.g., 2000000 -> Rp2 Jt, 2500000 -> Rp2.5 Jt, 150000 -> Rp150 Rb
 * 
 * @param {number|string} price 
 * @returns {string}
 */
export function formatMoneyShort(price) {
  if (price === undefined || price === null || isNaN(Number(price))) return "";
  const num = Number(price);
  if (num >= 1_000_000) {
    const formatted = parseFloat((num / 1_000_000).toFixed(2));
    return `Rp${formatted.toLocaleString("id-ID")} Jt`;
  }
  if (num >= 1_000) {
    const formatted = parseFloat((num / 1_000).toFixed(2));
    return `Rp${formatted.toLocaleString("id-ID")} Rb`;
  }
  return `Rp${num.toLocaleString("id-ID")}`;
}

export function formatMoney(price) {
  if (price === undefined || price === null || isNaN(Number(price))) return "";
  const num = Number(price);
  return `Rp${num.toLocaleString("id-ID")}`;
}
