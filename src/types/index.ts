export interface HistoryItem {
  expression: string;
  result: string;
}

export interface DisplayProps {
  displayValue: string;
  expression: string;
  error?: string;
}

export interface CalculatorButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  ariaLabel?: string;
  isActive?: boolean;
  disabled?: boolean;
}

export interface HistoryProps {
  history: HistoryItem[];
  onClear: () => void;
}

