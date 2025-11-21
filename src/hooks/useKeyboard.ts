import { useEffect, useCallback, useRef } from "react";
import { KEY_MAP } from "@/lib/constants/buttons";

interface KeyboardHandlers {
  clearAll: () => void;
  clearEntry: () => void;
  handleBackspace: () => void;
  handlePercentage: () => void;
  handleOperator: (key: string) => void;
  handleEquals: () => void;
  handleDecimal: () => void;
  handleNumber: (key: string) => void;
}

const IGNORED_KEYS = [" ", "Spacebar", "Tab", "Shift", "Control", "Alt", "Meta"] as const;
const OPERATOR_KEYS = ["+", "-", "x", "/"] as const;
const SPECIAL_KEYS = ["C", "CE", "⌫", "%", "=", "."] as const;

export const useKeyboard = (handlers: KeyboardHandlers) => {
  const handlersRef = useRef(handlers);
  
  useEffect(() => {
    handlersRef.current = handlers;
  }, [handlers]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const key = e.key;
    
    if (IGNORED_KEYS.includes(key as typeof IGNORED_KEYS[number])) {
      return;
    }

    const mappedKey = KEY_MAP[key];
    if (!mappedKey) return;

    e.preventDefault();

    if (
      !SPECIAL_KEYS.includes(mappedKey as typeof SPECIAL_KEYS[number]) &&
      !OPERATOR_KEYS.includes(mappedKey as typeof OPERATOR_KEYS[number]) &&
      !/^\d$/.test(mappedKey)
    ) {
      return;
    }

    const currentHandlers = handlersRef.current;

    switch (mappedKey) {
      case "C":
        return currentHandlers.clearAll();
      case "CE":
        return currentHandlers.clearEntry();
      case "⌫":
        return currentHandlers.handleBackspace();
      case "%":
        return currentHandlers.handlePercentage();
      case "=":
        return currentHandlers.handleEquals();
      case ".":
        return currentHandlers.handleDecimal();
      default:
        if (OPERATOR_KEYS.includes(mappedKey as typeof OPERATOR_KEYS[number])) {
          return currentHandlers.handleOperator(mappedKey);
        }
        if (/\d/.test(mappedKey)) {
          return currentHandlers.handleNumber(mappedKey);
        }
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);
};

