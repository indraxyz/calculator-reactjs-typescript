const MAX_DISPLAY_LENGTH = 15;
const MAX_EXPRESSION_LENGTH = 50;

export const isValidExpression = (expr: string): boolean => {
  if (!expr || expr.length > MAX_EXPRESSION_LENGTH) return false;
  if (/[<>]|script/i.test(expr)) return false;
  return true;
};

export const isValidDisplayValue = (value: string): boolean => {
  if (!value || value.length > MAX_DISPLAY_LENGTH) return false;
  if (/[<>]|script/i.test(value)) return false;
  return true;
};

export const isValidCombined = (display: string, expr: string): boolean => {
  return isValidDisplayValue(display) && isValidExpression(expr);
};
