import { Display, CalculatorButton, History } from "@/components/calculator";
import { useCalculator } from "@/hooks/useCalculator";
import { useKeyboard } from "@/hooks/useKeyboard";
import { BUTTONS, getButtonClass, getAriaLabel } from "@/lib/constants/buttons";
import { BUTTON_ACTIVE_DURATION_MS } from "@/lib/constants/limits";

export default function Calculator() {
  const {
    displayValue,
    expression,
    history,
    activeButton,
    error,
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
  } = useCalculator();

  useKeyboard({
    clearAll,
    clearEntry,
    handleBackspace,
    handlePercentage,
    handleOperator,
    handleEquals,
    handleDecimal,
    handleNumber,
  });

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
    if (!key || key === "" || !allowedKeys.includes(key)) return;

    setActiveButton(key);
    setTimeout(() => setActiveButton(""), BUTTON_ACTIVE_DURATION_MS);

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
    <div className="w-full flex flex-col items-center">
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-white/20 p-4 md:p-6 w-full max-w-sm flex flex-col items-center shadow-2xl shadow-black/10">
        <Display
          displayValue={displayValue}
          expression={expression}
          error={error}
        />
        <div className="grid grid-cols-4 gap-2 md:gap-3 w-full">
          {BUTTONS.flat().map((key, i) => {
            if (!key) return null;
            return (
              <CalculatorButton
                key={key + i}
                onClick={() => handleButtonClick(key)}
                ariaLabel={getAriaLabel(key)}
                className={getButtonClass(key)}
                isActive={activeButton === key}
                disabled={!!error}
              >
                {key}
              </CalculatorButton>
            );
          })}
        </div>
      </div>
      {history.length > 0 && (
        <History history={history} onClear={clearHistory} />
      )}
    </div>
  );
}
