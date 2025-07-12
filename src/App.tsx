import { useState, useRef, useEffect, useCallback } from "react";
import CalendarArrowDown from "./components/calendar-arrow-down";

// Utility functions
const formatNumber = (number: number): string => {
  if (!isFinite(number)) return number > 0 ? "∞" : "-∞";
  if (Math.abs(number) > 1e15) return "∞";
  if (Math.abs(number) < 1e-15 && number !== 0) return "0";
  return parseFloat(number.toFixed(8)).toString();
};

const sanitizeText = (text: string, maxLength: number = 50): string => {
  return text.replace(/[<>]/g, "").substring(0, maxLength);
};

const calculateExpression = (expr: string): string => {
  try {
    const sanitizedExpr = expr.replace(/[^0-9+\-x/*%\s.]/g, "");
    const validExpression = /^[\d+\-x/*%\s.]+$/.test(sanitizedExpr);

    if (
      !validExpression ||
      /[+\-x/*]{2,}/.test(sanitizedExpr) ||
      /^[+x/*]/.test(sanitizedExpr) ||
      /[+\-x/*]\s*$/.test(sanitizedExpr) ||
      /\.{2,}/.test(sanitizedExpr) ||
      /%{2,}/.test(sanitizedExpr) ||
      sanitizedExpr.length > 100 ||
      sanitizedExpr.includes("eval") ||
      sanitizedExpr.includes("Function") ||
      sanitizedExpr.includes("constructor")
    ) {
      return "invalid input";
    }

    let processedExpr = sanitizedExpr.replace(/x/g, "*").replace(/\s+/g, "");
    if (processedExpr.includes("%")) {
      processedExpr = processedExpr.replace(/(\d+(?:\.\d+)?)%/g, "($1/100)");
    }

    if (!processedExpr || processedExpr.trim() === "") return "invalid input";

    const result = eval(processedExpr);
    if (result === null || result === undefined || !isFinite(result))
      return "invalid input";

    return typeof result === "number"
      ? Number.isInteger(result)
        ? result.toString()
        : parseFloat(result.toFixed(8)).toString()
      : result.toString();
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
}) => (
  <div className="mb-4 w-full select-text">
    {expression && (
      <div
        className="text-right text-base text-gray-400 px-2 select-none min-h-[24px] font-mono truncate relative"
        aria-label="expression"
        title={sanitizeText(expression)}
      >
        {sanitizeText(expression)}
      </div>
    )}
    <div
      className={`bg-gradient-to-r from-gray-100 to-gray-200 text-gray-900 rounded-xl px-6 py-4 text-right font-bold select-text transition-all duration-300 shadow-inner border border-gray-300 overflow-hidden ${
        error ? "border-red-300 bg-red-50" : ""
      }`}
      aria-label="result"
      tabIndex={0}
    >
      <div
        className={`truncate relative text-2xl ${error ? "text-red-600" : ""}`}
        title={error || displayValue || "0"}
      >
        {error || displayValue || "0"}
      </div>
    </div>
  </div>
);

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
}) => (
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
      {history.map((item, idx) => (
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
            title={sanitizeText(item.expression, 30)}
          >
            {sanitizeText(item.expression, 30)}
          </span>
          <span
            className={`font-bold px-2 py-1 rounded-md truncate min-w-0 flex-shrink-0 relative ${
              idx === 0
                ? "text-blue-800 bg-blue-100 shadow-sm"
                : "text-blue-700 bg-blue-50"
            }`}
            title={`= ${sanitizeText(item.result, 20)}`}
          >
            = {sanitizeText(item.result, 20)}
          </span>
        </li>
      ))}
    </ul>
  </div>
);

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
  if (key === "") return "invisible";
  if (/^\d$/.test(key))
    return "bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900 border-gray-200 hover:from-gray-100 hover:to-gray-200 hover:shadow-md";
  if (["+", "-", "x", "/"].includes(key))
    return "bg-gradient-to-br from-blue-500 to-blue-600 text-white border-blue-600 hover:from-blue-600 hover:to-blue-700 hover:shadow-lg shadow-blue-500/25";
  if (["C", "CE"].includes(key))
    return "bg-gradient-to-br from-red-500 to-red-600 text-white border-red-600 hover:from-red-600 hover:to-red-700 hover:shadow-lg shadow-red-500/25";
  if (key === "=")
    return "bg-gradient-to-br from-green-500 to-green-600 text-white border-green-600 hover:from-green-600 hover:to-green-700 hover:shadow-lg shadow-green-500/25";
  if (key === "%")
    return "bg-gradient-to-br from-purple-500 to-purple-600 text-white border-purple-600 hover:from-purple-600 hover:to-purple-700 hover:shadow-lg shadow-purple-500/25";
  if (key === "⌫")
    return "bg-gradient-to-br from-orange-500 to-orange-600 text-white border-orange-600 hover:from-orange-600 hover:to-orange-700 hover:shadow-lg shadow-orange-500/25";
  return "bg-gradient-to-br from-gray-50 to-gray-100 text-gray-900 border-gray-200 hover:from-gray-100 hover:to-gray-200 hover:shadow-md";
};

const getAriaLabel = (key: string) => {
  const labels: Record<string, string> = {
    CE: "Clear Entry",
    C: "Clear All",
    "⌫": "Backspace",
  };
  return labels[key];
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
    if (historyRef.current) historyRef.current.scrollTop = 0;
  }, [history]);

  // Cleanup timeout
  useEffect(() => {
    return () => {
      if (calculationTimeoutRef.current)
        clearTimeout(calculationTimeoutRef.current);
    };
  }, []);

  const handleError = useCallback((error: unknown) => {
    const message =
      error instanceof Error ? error.message : "An error occurred";
    const safeMessage = sanitizeText(message);
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
    const newExpression = expression.replace(/([\d.]+)$/g, "");
    if (newExpression.length > 50 || /[<>]|script/.test(newExpression)) return;
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
      const newExpression = waitingForOperand
        ? expression.replace(/([\d.]+)\s*$/, "")
        : expression.slice(0, -1);
      if (
        newExpression.length > 50 ||
        /[<>]|script/.test(newDisplayValue + newExpression)
      )
        return;
      setExpression(newExpression);
      setLastKey("⌫");
      setJustCalculated(false);
      setWaitingForOperand(false);
    }
  }, [isCalculating, displayValue, expression, waitingForOperand]);

  const handlePercentage = useCallback(() => {
    if (isCalculating) return;
    setError("");
    const newExpression = (() => {
      if (expression === "" || /[+\-x/]\s*$/.test(expression)) {
        return expression + (displayValue || "0") + "%";
      } else if (/[\d.]$/.test(expression)) {
        return expression + "%";
      } else {
        return expression + "%";
      }
    })();
    if (newExpression.length > 50 || /[<>]|script/.test(newExpression)) return;
    setExpression(newExpression);
    setLastKey("%");
    setJustCalculated(false);
    setWaitingForOperand(false);
  }, [isCalculating, expression, displayValue]);

  const handleOperator = useCallback(
    (key: string) => {
      if (!["+", "-", "x", "/"].includes(key) || isCalculating) return;
      setError("");
      setJustCalculated(false);
      setWaitingForOperand(true);
      setLastKey(key);
      const newExpression = (() => {
        if (/[+\-x/]\s*$/.test(expression))
          return expression.replace(/[+\-x/]\s*$/, ` ${key} `);
        if (expression === "") return displayValue + ` ${key} `;
        return expression + ` ${key} `;
      })();
      if (newExpression.length > 50 || /[<>]|script/.test(newExpression))
        return;
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
        if (/[<>]|script/.test(formattedResult)) {
          setError("Invalid result");
          setIsCalculating(false);
          return;
        }

        setDisplayValue(formattedResult);

        if (expressionToEvaluate.trim() !== "") {
          setHistory((h) => {
            const safeExpression = sanitizeText(
              expressionToEvaluate.replace(/\s+/g, " ").trim(),
              30
            );
            const safeResult = sanitizeText(formattedResult, 20);
            const newHistory = [
              { expression: safeExpression, result: safeResult },
              ...h,
            ];
            return newHistory.slice(0, 20);
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

    if (!justCalculated && !waitingForOperand && displayValue.includes("."))
      return;

    const newDisplayValue =
      justCalculated || waitingForOperand ? "0." : displayValue + ".";
    const newExpression =
      justCalculated || waitingForOperand
        ? expression + (expression === "" || lastKey === "=" ? "0." : " 0.")
        : expression + ".";

    if (
      newDisplayValue.length > 15 ||
      newExpression.length > 50 ||
      /[<>]|script/.test(newDisplayValue + newExpression)
    )
      return;

    if (justCalculated || waitingForOperand) {
      setJustCalculated(false);
      setWaitingForOperand(false);
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
      if (!/^\d$/.test(key) || isCalculating || displayValue.length >= 15)
        return;
      setError("");

      const isNewNumber =
        lastKey === "=" ||
        displayValue === "0" ||
        justCalculated ||
        waitingForOperand;
      const newDisplayValue = isNewNumber ? key : displayValue + key;
      const newExpression = isNewNumber
        ? waitingForOperand
          ? expression + key
          : key
        : expression + key;

      if (
        newDisplayValue.length > 15 ||
        newExpression.length > 50 ||
        /[<>]|script/.test(newDisplayValue + newExpression)
      )
        return;

      if (isNewNumber) {
        setJustCalculated(false);
        setWaitingForOperand(false);
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
      if (
        [" ", "Spacebar", "Tab", "Shift", "Control", "Alt", "Meta"].includes(
          key
        )
      )
        return;

      if (KEY_MAP[key]) {
        e.preventDefault();
        const mappedKey = KEY_MAP[key];
        if (
          !["C", "CE", "⌫", "%", "+", "-", "x", "/", "=", "."].includes(
            mappedKey
          ) &&
          !/^\d$/.test(mappedKey)
        )
          return;

        const handlers: Record<string, () => void> = {
          C: clearAll,
          CE: clearEntry,
          "⌫": handleBackspace,
          "%": handlePercentage,
          "=": handleEquals,
          ".": handleDecimal,
        };

        if (handlers[mappedKey]) return handlers[mappedKey]();
        if (["+", "-", "x", "/"].includes(mappedKey))
          return handleOperator(mappedKey);
        if (/\d/.test(mappedKey)) return handleNumber(mappedKey);
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
    if (
      !key ||
      key === "" ||
      (isCalculating && key !== "C" && key !== "CE") ||
      !allowedKeys.includes(key)
    )
      return;

    setActiveButton(key);
    setTimeout(() => setActiveButton(""), 150);

    const handlers: Record<string, () => void> = {
      C: clearAll,
      CE: clearEntry,
      "⌫": handleBackspace,
      "%": handlePercentage,
      "=": handleEquals,
      ".": handleDecimal,
    };

    if (handlers[key]) return handlers[key]();
    if (["+", "-", "x", "/"].includes(key)) return handleOperator(key);
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
