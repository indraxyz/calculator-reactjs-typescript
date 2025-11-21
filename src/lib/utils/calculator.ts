const MAX_EXPRESSION_LENGTH = 100;
const FORBIDDEN_PATTERNS =
  /eval|Function|constructor|import|require|process|window|document/i;

const validateExpression = (expr: string): boolean => {
  if (!expr || expr.length > MAX_EXPRESSION_LENGTH) return false;
  if (FORBIDDEN_PATTERNS.test(expr)) return false;
  if (/[+\-x/*]{2,}/.test(expr)) return false;
  if (/^[+x/*]/.test(expr)) return false;
  if (/[+\-x/*]\s*$/.test(expr)) return false;
  if (/\.{2,}/.test(expr)) return false;
  if (/%{2,}/.test(expr)) return false;
  return true;
};

const sanitizeExpression = (expr: string): string => {
  return expr.replace(/[^0-9+\-x/*%\s.]/g, "");
};

const processExpression = (expr: string): string => {
  let processed = expr.replace(/x/g, "*").replace(/\s+/g, "");

  if (processed.includes("%")) {
    processed = processed.replace(/(\d+(?:\.\d+)?)%/g, "($1/100)");
  }

  return processed;
};

export const calculateExpression = (expr: string): string => {
  try {
    const sanitized = sanitizeExpression(expr);

    if (
      !/^[\d+\-x/*%\s.]+$/.test(sanitized) ||
      !validateExpression(sanitized)
    ) {
      return "invalid input";
    }

    const processed = processExpression(sanitized);

    if (!processed || processed.trim() === "") {
      return "invalid input";
    }

    const result = eval(processed);

    if (result === null || result === undefined || !isFinite(result)) {
      return "invalid input";
    }

    if (typeof result !== "number") {
      return "invalid input";
    }

    return Number.isInteger(result)
      ? result.toString()
      : parseFloat(result.toFixed(8)).toString();
  } catch {
    return "invalid input";
  }
};
