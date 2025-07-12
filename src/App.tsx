import { useState, useRef, useEffect, useCallback } from "react";
import CalendarArrowDown from "./components/calendar-arrow-down";

// Utility functions
const formatNumber = (number: number): string => {
  if (!isFinite(number)) {
    return number > 0 ? "∞" : "-∞";
  }

  if (Math.abs(number) > 1e15) {
    return "∞";
  }

  if (Math.abs(number) < 1e-15 && number !== 0) {
    return "0";
  }

  return parseFloat(number.toFixed(8)).toString();
};

const calculateExpression = (expr: string): string => {
  try {
    // Sanitize input - remove any potentially dangerous characters
    const sanitizedExpr = expr.replace(/[^0-9+\-x/*%\s.]/g, "");

    // Validate expression format
    const validExpression = /^[\d+\-x/*%\s.]+$/.test(sanitizedExpr);
    if (!validExpression) {
      return "invalid input";
    }

    // Additional validations for expression structure
    if (
      /[+\-x/*]{2,}/.test(sanitizedExpr) || // Multiple operators in a row
      /^[+x/*]/.test(sanitizedExpr) || // Starts with operator (except minus)
      /[+\-x/*]\s*$/.test(sanitizedExpr) || // Ends with operator
      /\.{2,}/.test(sanitizedExpr) || // Multiple dots
      /%{2,}/.test(sanitizedExpr) // Multiple percentage signs
    ) {
      return "invalid input";
    }

    // Check for balanced parentheses (if any)
    const openParens = (sanitizedExpr.match(/\(/g) || []).length;
    const closeParens = (sanitizedExpr.match(/\)/g) || []).length;
    if (openParens !== closeParens) {
      return "invalid input";
    }

    // Process expression safely
    let processedExpr = sanitizedExpr.replace(/x/g, "*").replace(/\s+/g, "");

    // Handle percentage safely
    if (processedExpr.includes("%")) {
      processedExpr = processedExpr.replace(/(\d+(?:\.\d+)?)%/g, "($1/100)");
    }

    if (!processedExpr || processedExpr.trim() === "") {
      return "invalid input";
    }

    // Additional safety check before evaluation
    if (processedExpr.length > 100) {
      return "invalid input";
    }

    // Additional security checks
    if (
      processedExpr.includes("eval") ||
      processedExpr.includes("Function") ||
      processedExpr.includes("constructor")
    ) {
      return "invalid input";
    }

    // Evaluate expression safely
    const result = eval(processedExpr);

    if (result === null || result === undefined || !isFinite(result)) {
      return "invalid input";
    }

    // Format result safely
    if (typeof result === "number") {
      return Number.isInteger(result)
        ? result.toString()
        : parseFloat(result.toFixed(8)).toString();
    }

    return result.toString();
  } catch {
    return "invalid input";
  }
};

// Components
const Display = ({
  displayValue,
  expression,
  error,
}: {
  displayValue: string;
  expression: string;
  error?: string;
}) => {
  // Sanitize display values to prevent XSS
  const sanitizeText = (text: string): string => {
    return text.replace(/[<>]/g, "").substring(0, 50);
  };

  const safeDisplayValue = sanitizeText(displayValue || "");
  const safeExpression = sanitizeText(expression || "");
  const safeError = error ? sanitizeText(error) : "";

  return (
    <div className="mb-4 w-full select-text">
      {safeExpression && (
        <div
          className="text-right text-base text-gray-400 px-2 select-none min-h-[24px] font-mono truncate relative"
          aria-label="expression"
          title={safeExpression}
        >
          {safeExpression}
        </div>
      )}
      <div
        className={`bg-gradient-to-r from-gray-100 to-gray-200 text-gray-900 rounded-xl px-6 py-4 text-right font-bold select-text transition-all duration-300 shadow-inner border border-gray-300 overflow-hidden ${
          safeError ? "border-red-300 bg-red-50" : ""
        }`}
        aria-label="result"
        tabIndex={0}
      >
        <div
          className={`truncate relative text-2xl ${
            safeError ? "text-red-600" : ""
          }`}
          title={safeError || safeDisplayValue || "0"}
        >
          {safeError || safeDisplayValue || "0"}
        </div>
      </div>
    </div>
  );
};

const CalculatorButton = ({
  children,
  onClick,
  className = "",
  ariaLabel,
  isActive = false,
  disabled = false,
}: {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  ariaLabel?: string;
  isActive?: boolean;
  disabled?: boolean;
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`w-full h-16 rounded-xl flex items-center justify-center text-xl font-semibold border-2 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-400/30 active:scale-95 hover:scale-105 hover:shadow-lg ${
      isActive
        ? "border-blue-500 shadow-lg scale-95 ring-4 ring-blue-400/50"
        : "border-gray-200 hover:border-gray-300 hover:shadow-md"
    } ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
    aria-label={
      ariaLabel || (typeof children === "string" ? children : undefined)
    }
  >
    {children}
  </button>
);

const History = ({
  history,
  onClear,
}: {
  history: HistoryItem[];
  onClear: () => void;
}) => {
  // Sanitize history items to prevent XSS
  const sanitizeText = (text: string): string => {
    return text.replace(/[<>]/g, "").substring(0, 30);
  };

  return (
    <div className="mt-6 w-full max-w-lg bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 p-4 text-sm max-h-48 overflow-y-auto shadow-xl shadow-black/10">
      <div className="flex justify-between items-center mb-3">
        <span className="font-semibold text-gray-600 flex items-center gap-2">
          <CalendarArrowDown className="size-4 text-blue-600" />
          History
        </span>
        <button
          onClick={onClear}
          className="text-xs text-red-500 hover:text-red-700 hover:bg-red-50 px-2 py-1 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-300"
          aria-label="Clear history"
        >
          Clear
        </button>
      </div>
      <ul className="space-y-2">
        {history.map((item, idx) => {
          const safeExpression = sanitizeText(item.expression);
          const safeResult = sanitizeText(item.result);

          return (
            <li
              key={idx}
              className={`flex justify-between items-center p-2 rounded-lg hover:bg-gray-50 transition-all duration-300 ${
                idx === 0
                  ? "bg-blue-50/50 border border-blue-200/50 shadow-sm animate-pulse"
                  : "hover:bg-gray-50"
              }`}
            >
              <span
                className="text-gray-600 font-mono text-xs truncate flex-1 mr-2 relative"
                title={safeExpression}
              >
                {safeExpression}
              </span>
              <span
                className={`font-bold px-2 py-1 rounded-md truncate min-w-0 flex-shrink-0 relative ${
                  idx === 0
                    ? "text-blue-800 bg-blue-100 shadow-sm"
                    : "text-blue-700 bg-blue-50"
                }`}
                title={`= ${safeResult}`}
              >
                = {safeResult}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

// Constants
const BUTTONS = [
  ["%", "CE", "C", "⌫"],
  ["7", "8", "9", "/"],
  ["4", "5", "6", "x"],
  ["1", "2", "3", "+"],
  [".", "0", "=", "-"],
];

const KEY_MAP: Record<string, string> = {
  "+": "+",
  "-": "-",
  "/": "/",
  "*": "x",
  x: "x",
  "%": "%",
  ".": ".",
  Enter: "=",
  "=": "=",
  Backspace: "⌫",
  Escape: "C",
  c: "C",
  C: "C",
  Delete: "C",
  "⌫": "⌫",
};
for (let i = 0; i <= 9; i++) KEY_MAP[i.toString()] = i.toString();

const getButtonClass = (key: string) => {
  const isNumber = /^\d$/.test(key);
  const isOperator = ["+", "-", "x", "/"].includes(key);
  const isSpecial = ["C", "CE", ".", "=", "%", "⌫"].includes(key);

  if (key === "") return "invisible";
  if (isNumber)
    return "bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900 border-gray-200 hover:from-gray-100 hover:to-gray-200 hover:shadow-md";
  if (isOperator)
    return "bg-gradient-to-br from-blue-500 to-blue-600 text-white border-blue-600 hover:from-blue-600 hover:to-blue-700 hover:shadow-lg shadow-blue-500/25";
  if (isSpecial) {
    if (key === "C" || key === "CE")
      return "bg-gradient-to-br from-red-500 to-red-600 text-white border-red-600 hover:from-red-600 hover:to-red-700 hover:shadow-lg shadow-red-500/25";
    if (key === "=")
      return "bg-gradient-to-br from-green-500 to-green-600 text-white border-green-600 hover:from-green-600 hover:to-green-700 hover:shadow-lg shadow-green-500/25";
    if (key === "%")
      return "bg-gradient-to-br from-purple-500 to-purple-600 text-white border-purple-600 hover:from-purple-600 hover:to-purple-700 hover:shadow-lg shadow-purple-500/25";
    if (key === "⌫")
      return "bg-gradient-to-br from-orange-500 to-orange-600 text-white border-orange-600 hover:from-orange-600 hover:to-orange-700 hover:shadow-lg shadow-orange-500/25";
    return "bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900 border-gray-200 hover:from-gray-100 hover:to-gray-200 hover:shadow-md";
  }
  return "";
};

const getAriaLabel = (key: string) => {
  if (key === "CE") return "Clear Entry";
  if (key === "C") return "Clear All";
  if (key === "⌫") return "Backspace";
  return undefined;
};

// Types
type HistoryItem = { expression: string; result: string };

// Main Calculator App
export default function App() {
  const [displayValue, setDisplayValue] = useState("");
  const [expression, setExpression] = useState("");
  const [lastKey, setLastKey] = useState("");
  const [justCalculated, setJustCalculated] = useState(false);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [activeButton, setActiveButton] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isCalculating, setIsCalculating] = useState(false);
  const historyRef = useRef<HTMLDivElement>(null);
  const calculationTimeoutRef = useRef<number | null>(null);

  // Auto-scroll history
  useEffect(() => {
    if (historyRef.current) {
      historyRef.current.scrollTop = 0;
    }
  }, [history]);

  // Cleanup timeout
  useEffect(() => {
    return () => {
      if (calculationTimeoutRef.current) {
        clearTimeout(calculationTimeoutRef.current);
      }
    };
  }, []);

  const handleError = useCallback((error: unknown) => {
    const message =
      error instanceof Error ? error.message : "An error occurred";

    // Sanitize error message
    const safeMessage = message.replace(/[<>]/g, "").substring(0, 50);
    setError(safeMessage);
    setTimeout(() => setError(""), 3000);
  }, []);

  const clearCalculation = useCallback(() => {
    if (calculationTimeoutRef.current) {
      clearTimeout(calculationTimeoutRef.current);
      calculationTimeoutRef.current = null;
    }
    setIsCalculating(false);
  }, []);

  const clearAll = useCallback(() => {
    clearCalculation();
    setDisplayValue("");
    setExpression("");
    setLastKey("");
    setJustCalculated(false);
    setWaitingForOperand(false);
    setError("");
  }, [clearCalculation]);

  const clearEntry = useCallback(() => {
    clearCalculation();
    setDisplayValue("");

    // Safely clear entry from expression
    const newExpression = expression.replace(/([\d.]+)$/g, "");

    // Final validation before setting state
    if (
      newExpression.length > 50 ||
      newExpression.includes("<") ||
      newExpression.includes(">") ||
      newExpression.includes("script")
    ) {
      return;
    }

    setExpression(newExpression);
    setJustCalculated(false);
    setWaitingForOperand(false);
    setError("");
  }, [clearCalculation, expression]);

  const handleBackspace = useCallback(() => {
    if (isCalculating) return;
    setError("");

    if (displayValue.length > 0) {
      const newDisplayValue = displayValue.slice(0, -1);
      setDisplayValue(newDisplayValue);

      let newExpression = expression;
      if (waitingForOperand) {
        newExpression = expression.replace(/([\d.]+)\s*$/, "");
      } else {
        newExpression = expression.slice(0, -1);
      }

      // Final validation before setting state
      if (
        newExpression.length > 50 ||
        newDisplayValue.includes("<") ||
        newDisplayValue.includes(">") ||
        newDisplayValue.includes("script") ||
        newExpression.includes("<") ||
        newExpression.includes(">") ||
        newExpression.includes("script")
      ) {
        return;
      }

      setExpression(newExpression);
      setLastKey("⌫");
      setJustCalculated(false);
      setWaitingForOperand(false);
    }
  }, [isCalculating, displayValue, expression, waitingForOperand]);

  const handlePercentage = useCallback(() => {
    if (isCalculating) return;
    setError("");

    let newExpression: string;
    if (expression === "" || /[+\-x/]\s*$/.test(expression)) {
      const valueToUse = displayValue || "0";
      newExpression = expression + valueToUse + "%";
    } else if (/[\d.]$/.test(expression)) {
      newExpression = expression + "%";
    } else {
      newExpression = expression + "%";
    }

    // Final validation before setting state
    if (
      newExpression.length > 50 ||
      newExpression.includes("<") ||
      newExpression.includes(">") ||
      newExpression.includes("script")
    ) {
      return;
    }

    setExpression(newExpression);
    setLastKey("%");
    setJustCalculated(false);
    setWaitingForOperand(false);
  }, [isCalculating, expression, displayValue]);

  const handleOperator = useCallback(
    (key: string) => {
      // Validate operator key
      if (!["+", "-", "x", "/"].includes(key)) {
        return;
      }

      if (isCalculating) return;
      setError("");
      setJustCalculated(false);
      setWaitingForOperand(true);
      setLastKey(key);

      const newExpression = (() => {
        if (/[+\-x/]\s*$/.test(expression)) {
          return expression.replace(/[+\-x/]\s*$/, ` ${key} `);
        }
        if (expression === "") {
          return displayValue + ` ${key} `;
        }
        return expression + ` ${key} `;
      })();

      // Validate expression length
      if (newExpression.length > 50) {
        return;
      }

      // Final validation before setting state
      if (
        newExpression.includes("<") ||
        newExpression.includes(">") ||
        newExpression.includes("script")
      ) {
        return;
      }

      setExpression(newExpression);
    },
    [isCalculating, expression, displayValue]
  );

  const handleEquals = useCallback(() => {
    if (isCalculating) return;
    setError("");
    setIsCalculating(true);
    clearCalculation();

    calculationTimeoutRef.current = setTimeout(() => {
      try {
        let expressionToEvaluate = expression;

        if (/[+\-x/]\s*$/.test(expression)) {
          expressionToEvaluate = expression + displayValue;
        } else if (expression === "") {
          expressionToEvaluate = displayValue;
        } else if (
          /[%]\s*$/.test(expression) ||
          (expression.includes("%") && !/[+\-x/]\s*$/.test(expression))
        ) {
          expressionToEvaluate = expression;
        }

        if (!expressionToEvaluate || expressionToEvaluate.trim() === "") {
          setIsCalculating(false);
          return;
        }

        const cleanExpression = expressionToEvaluate.replace(/\s+/g, "");
        const result = calculateExpression(cleanExpression);

        if (result === "invalid input") {
          setError("Invalid expression");
          setIsCalculating(false);
          return;
        }

        const formattedResult = formatNumber(Number(result));

        // Validate result before setting state
        if (
          formattedResult.includes("<") ||
          formattedResult.includes(">") ||
          formattedResult.includes("script")
        ) {
          console.log("❌ Dangerous characters in result");
          setError("Invalid result");
          setIsCalculating(false);
          return;
        }

        setDisplayValue(formattedResult);

        if (expressionToEvaluate.trim() !== "") {
          setHistory((h) => {
            // Sanitize history items
            const safeExpression = expressionToEvaluate
              .replace(/\s+/g, " ")
              .trim()
              .replace(/[<>]/g, "")
              .substring(0, 30);
            const safeResult = formattedResult
              .replace(/[<>]/g, "")
              .substring(0, 20);

            const newHistory = [
              {
                expression: safeExpression,
                result: safeResult,
              },
              ...h,
            ];

            // Limit history to 20 items to prevent memory issues
            const limitedHistory = newHistory.slice(0, 20);
            return limitedHistory;
          });
        }

        setExpression("");
        setLastKey("=");
        setJustCalculated(true);
        setWaitingForOperand(false);
        setIsCalculating(false);
      } catch (error) {
        handleError(error);
        setIsCalculating(false);
      }
    }, 50);
  }, [isCalculating, expression, displayValue, clearCalculation, handleError]);

  const handleDecimal = useCallback(() => {
    if (isCalculating) return;
    setError("");

    let newDisplayValue: string;
    let newExpression: string;

    if (justCalculated || waitingForOperand) {
      newDisplayValue = "0.";
      newExpression =
        expression + (expression === "" || lastKey === "=" ? "0." : " 0.");
      setJustCalculated(false);
      setWaitingForOperand(false);
    } else if (!displayValue.includes(".")) {
      newDisplayValue = displayValue + ".";
      newExpression = expression + ".";
    } else {
      return;
    }

    // Final validation before setting state
    if (
      newDisplayValue.length > 15 ||
      newExpression.length > 50 ||
      newDisplayValue.includes("<") ||
      newDisplayValue.includes(">") ||
      newDisplayValue.includes("script") ||
      newExpression.includes("<") ||
      newExpression.includes(">") ||
      newExpression.includes("script")
    ) {
      return;
    }

    setDisplayValue(newDisplayValue);
    setExpression(newExpression);
    setLastKey(".");
  }, [
    isCalculating,
    justCalculated,
    waitingForOperand,
    expression,
    lastKey,
    displayValue,
  ]);

  const handleNumber = useCallback(
    (key: string) => {
      // Validate input key
      if (!/^\d$/.test(key)) {
        return;
      }

      if (isCalculating) {
        return;
      }
      setError("");

      // Limit input length to prevent overflow
      if (displayValue.length >= 15) {
        return;
      }

      let newDisplayValue: string;
      let newExpression: string;

      if (
        lastKey === "=" ||
        displayValue === "0" ||
        justCalculated ||
        waitingForOperand
      ) {
        newDisplayValue = key;
        newExpression = waitingForOperand ? expression + key : key;
        setJustCalculated(false);
        setWaitingForOperand(false);
      } else {
        newDisplayValue = displayValue + key;
        newExpression = expression + key;
      }

      // Final validation before setting state
      if (newDisplayValue.length > 15 || newExpression.length > 50) {
        return;
      }

      // Final security validation
      if (
        newDisplayValue.includes("<") ||
        newDisplayValue.includes(">") ||
        newDisplayValue.includes("script") ||
        newExpression.includes("<") ||
        newExpression.includes(">") ||
        newExpression.includes("script")
      ) {
        return;
      }

      setDisplayValue(newDisplayValue);
      setExpression(newExpression);
      setLastKey(key);
    },
    [
      isCalculating,
      displayValue,
      expression,
      lastKey,
      justCalculated,
      waitingForOperand,
    ]
  );

  // Keyboard handling
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const key = e.key;

      // Ignore space and other non-calculator keys
      if (
        key === " " ||
        key === "Spacebar" ||
        key === "Tab" ||
        key === "Shift" ||
        key === "Control" ||
        key === "Alt" ||
        key === "Meta"
      )
        return;

      if (KEY_MAP[key]) {
        e.preventDefault();
        const mappedKey = KEY_MAP[key];

        // Validate mapped key before processing
        if (
          !["C", "CE", "⌫", "%", "+", "-", "x", "/", "=", "."].includes(
            mappedKey
          ) &&
          !/^\d$/.test(mappedKey)
        ) {
          return;
        }

        if (mappedKey === "C") return clearAll();
        if (mappedKey === "CE") return clearEntry();
        if (mappedKey === "⌫") return handleBackspace();
        if (mappedKey === "%") return handlePercentage();
        if (["+", "-", "x", "/"].includes(mappedKey))
          return handleOperator(mappedKey);
        if (mappedKey === "=") return handleEquals();
        if (mappedKey === ".") return handleDecimal();
        if (/\d/.test(mappedKey)) {
          return handleNumber(mappedKey);
        }
      }
    },
    [
      clearAll,
      clearEntry,
      handleBackspace,
      handlePercentage,
      handleOperator,
      handleEquals,
      handleDecimal,
      handleNumber,
    ]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const handleButtonClick = (key: string) => {
    // Validate button key
    if (!key || key === "" || (isCalculating && key !== "C" && key !== "CE"))
      return;

    // Validate key is from allowed set
    const allowedKeys = [
      "C",
      "CE",
      "⌫",
      "%",
      "+",
      "-",
      "x",
      "/",
      "=",
      ".",
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
    ];
    if (!allowedKeys.includes(key)) {
      return;
    }

    setActiveButton(key);
    setTimeout(() => setActiveButton(""), 150);

    if (key === "C") return clearAll();
    if (key === "CE") return clearEntry();
    if (key === "⌫") return handleBackspace();
    if (key === "%") return handlePercentage();
    if (["+", "-", "x", "/"].includes(key)) return handleOperator(key);
    if (key === "=") return handleEquals();
    if (key === ".") return handleDecimal();
    if (/\d/.test(key)) return handleNumber(key);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 px-2">
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-white/20 p-4 md:p-6 w-full max-w-sm flex flex-col items-center shadow-2xl shadow-black/10">
        <Display
          displayValue={displayValue}
          expression={expression}
          error={error}
        />
        <div className="grid grid-cols-4 gap-2 md:gap-3 w-full">
          {BUTTONS.flat().map((key, i) => (
            <CalculatorButton
              key={key + i}
              onClick={() => handleButtonClick(key)}
              ariaLabel={getAriaLabel(key)}
              className={getButtonClass(key)}
              isActive={activeButton === key}
              disabled={!!error || key === ""}
            >
              {key}
            </CalculatorButton>
          ))}
        </div>
      </div>
      {history.length > 0 && (
        <History history={history} onClear={() => setHistory([])} />
      )}
    </div>
  );
}
