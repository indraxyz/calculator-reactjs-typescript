import type { CalculatorButtonProps } from "@/types";

export const CalculatorButton = ({
  children,
  onClick,
  className = "",
  ariaLabel,
  isActive = false,
  disabled = false,
}: CalculatorButtonProps) => (
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

