import { useState, useRef, useEffect, useCallback } from "react";
import { formatNumber, sanitizeText } from "@/lib/utils/format";
import { calculateExpression } from "@/lib/utils/calculator";
import { isValidExpression, isValidCombined } from "@/lib/utils/validation";
import {
  MAX_DISPLAY_LENGTH,
  MAX_HISTORY_ITEMS,
  CALCULATION_DELAY_MS,
  ERROR_DISPLAY_DURATION_MS,
} from "@/lib/constants/limits";
import type { HistoryItem } from "@/types";

export const useCalculator = () => {
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

  useEffect(() => {
    if (historyRef.current) historyRef.current.scrollTop = 0;
  }, [history]);

  useEffect(() => {
    return () => {
      if (calculationTimeoutRef.current) {
        window.clearTimeout(calculationTimeoutRef.current);
      }
      if (errorTimeoutRef.current) {
        window.clearTimeout(errorTimeoutRef.current);
      }
    };
  }, []);

  const errorTimeoutRef = useRef<number | null>(null);

  const handleError = useCallback((error: unknown) => {
    if (errorTimeoutRef.current) {
      window.clearTimeout(errorTimeoutRef.current);
    }

    const message =
      error instanceof Error ? error.message : "An error occurred";
    const safeMessage = sanitizeText(message);
    setError(safeMessage);

    errorTimeoutRef.current = window.setTimeout(() => {
      setError("");
      errorTimeoutRef.current = null;
    }, ERROR_DISPLAY_DURATION_MS);
  }, []);

  const clearCalculation = useCallback(() => {
    if (calculationTimeoutRef.current) {
      window.clearTimeout(calculationTimeoutRef.current);
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
    if (!isValidExpression(newExpression)) return;
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
      const newExpression = waitingForOperand
        ? expression.replace(/([\d.]+)\s*$/, "")
        : expression.slice(0, -1);

      if (!isValidCombined(newDisplayValue, newExpression)) return;

      setDisplayValue(newDisplayValue);
      setExpression(newExpression);
      setLastKey("⌫");
      setJustCalculated(false);
      setWaitingForOperand(false);
    }
  }, [isCalculating, displayValue, expression, waitingForOperand]);

  const handlePercentage = useCallback(() => {
    if (isCalculating) return;
    setError("");

    const needsValue = expression === "" || /[+\-x/]\s*$/.test(expression);
    const newExpression = needsValue
      ? expression + (displayValue || "0") + "%"
      : expression + "%";

    if (!isValidExpression(newExpression)) return;

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
      const newExpression = /[+\-x/]\s*$/.test(expression)
        ? expression.replace(/[+\-x/]\s*$/, ` ${key} `)
        : expression === ""
        ? displayValue + ` ${key} `
        : expression + ` ${key} `;

      if (!isValidExpression(newExpression)) return;
      setExpression(newExpression);
    },
    [isCalculating, expression, displayValue]
  );

  const handleEquals = useCallback(() => {
    if (isCalculating) return;
    setError("");
    setIsCalculating(true);
    clearCalculation();

    calculationTimeoutRef.current = window.setTimeout(() => {
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
            return newHistory.slice(0, MAX_HISTORY_ITEMS);
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
    }, CALCULATION_DELAY_MS);
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

    if (!isValidCombined(newDisplayValue, newExpression)) return;

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
      if (
        !/^\d$/.test(key) ||
        isCalculating ||
        displayValue.length >= MAX_DISPLAY_LENGTH
      )
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

      if (!isValidCombined(newDisplayValue, newExpression)) return;

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

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  return {
    displayValue,
    expression,
    history,
    activeButton,
    error,
    historyRef,
    setActiveButton,
    clearAll,
    clearEntry,
    clearHistory,
    handleBackspace,
    handlePercentage,
    handleOperator,
    handleEquals,
    handleDecimal,
    handleNumber,
  };
};
