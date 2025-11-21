import { sanitizeText } from "@/lib/utils/format";
import type { DisplayProps } from "@/types";

export const Display = ({
  displayValue,
  expression,
  error,
}: DisplayProps) => (
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

