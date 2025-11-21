import { History as HistoryIcon } from "lucide-react";
import { sanitizeText } from "@/lib/utils/format";
import type { HistoryProps } from "@/types";

export const History = ({ history, onClear }: HistoryProps) => {
  const handleClear = () => {
    onClear();
  };

  return (
    <div className="mt-6 w-full max-w-sm bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 p-4 text-sm  shadow-xl shadow-black/10">
      <div className="flex justify-between items-center mb-3">
        <span className="font-semibold text-gray-600 flex items-center gap-2">
          <HistoryIcon className="size-4 text-blue-600" />
          History
        </span>
        <button
          onClick={handleClear}
          className="text-xs text-red-500 hover:text-red-700 hover:bg-red-50 px-2 py-1 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-300"
          aria-label="Clear history"
        >
          Clear
        </button>
      </div>
      <ul className="space-y-2 max-h-32 overflow-y-auto">
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
};
