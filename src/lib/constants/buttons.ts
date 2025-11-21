export const BUTTONS = [
  ["%", "CE", "C", "⌫"],
  ["7", "8", "9", "/"],
  ["4", "5", "6", "x"],
  ["1", "2", "3", "+"],
  [".", "0", "=", "-"],
] as const;

export const KEY_MAP: Record<string, string> = {
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

export const getButtonClass = (key: string) => {
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

export const getAriaLabel = (key: string) => {
  const labels: Record<string, string> = {
    CE: "Clear Entry",
    C: "Clear All",
    "⌫": "Backspace",
  };
  return labels[key];
};

