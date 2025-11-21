export function DisplaySkeleton() {
  return (
    <div className="mb-4 w-full animate-pulse">
      <div className="h-6 bg-gray-200 rounded-lg w-3/4 ml-auto mb-2"></div>
      <div className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl px-6 py-4 h-16 flex items-center justify-end">
        <div className="h-8 bg-gray-300 rounded-lg w-32"></div>
      </div>
    </div>
  );
}

export function CalculatorButtonGridSkeleton() {
  return (
    <div className="grid grid-cols-4 gap-2 md:gap-3 w-full">
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="h-16 bg-gray-200 rounded-xl border-2 border-gray-200 animate-pulse"
        ></div>
      ))}
    </div>
  );
}

export function HistorySkeleton() {
  return (
    <div className="w-full max-w-sm bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 p-4 shadow-xl shadow-black/10 animate-pulse">
      <div className="flex justify-between items-center mb-3">
        <div className="h-5 bg-gray-200 rounded-lg w-20"></div>
        <div className="h-6 bg-gray-200 rounded-md w-12"></div>
      </div>
      <ul className="space-y-2">
        {Array.from({ length: 3 }).map((_, idx) => (
          <li
            key={idx}
            className="flex justify-between items-center p-2 rounded-lg bg-gray-50"
          >
            <div className="h-4 bg-gray-200 rounded flex-1 mr-2"></div>
            <div className="h-6 bg-gray-200 rounded-md w-16 flex-shrink-0"></div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function CalculatorPageSkeleton() {
  return (
    <div className="w-full flex md:flex-row flex-col md:items-start justify-center gap-8 items-center">
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-white/20 p-4 md:p-6 w-full max-w-sm flex flex-col items-center shadow-2xl shadow-black/10">
        <DisplaySkeleton />
        <CalculatorButtonGridSkeleton />
      </div>
      <HistorySkeleton />
    </div>
  );
}

