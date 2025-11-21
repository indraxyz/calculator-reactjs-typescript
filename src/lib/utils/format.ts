export const formatNumber = (number: number): string => {
  if (!isFinite(number)) return number > 0 ? "∞" : "-∞";
  if (Math.abs(number) > 1e15) return "∞";
  if (Math.abs(number) < 1e-15 && number !== 0) return "0";
  return parseFloat(number.toFixed(8)).toString();
};

export const sanitizeText = (text: string, maxLength: number = 50): string => {
  return text.replace(/[<>]/g, "").substring(0, maxLength);
};

