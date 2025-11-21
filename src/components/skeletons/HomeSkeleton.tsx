export function HeroSkeleton() {
  return (
    <div className="my-8 animate-pulse">
      <div className="h-7 bg-gray-200 rounded-lg w-3/4 mx-auto mb-8"></div>
      <div className="h-14 bg-blue-200 rounded-xl w-48 mx-auto"></div>
    </div>
  );
}

export function FeatureCardsGridSkeleton() {
  return (
    <div className="mt-12 animate-pulse">
      <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin lg:grid lg:grid-cols-4 lg:overflow-visible lg:pb-0">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-[280px] snap-start lg:w-auto bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg"
          >
            <div className="size-8 bg-gray-200 rounded-lg mx-auto mb-4"></div>
            <div className="h-5 bg-gray-200 rounded-lg mb-2 w-3/4 mx-auto"></div>
            <div className="h-4 bg-gray-200 rounded-lg w-full"></div>
            <div className="h-4 bg-gray-200 rounded-lg w-5/6 mt-2"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function FeaturesListSkeleton() {
  return (
    <div className="mt-12 bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-lg animate-pulse">
      <div className="h-8 bg-gray-200 rounded-lg w-32 mb-4"></div>
      <div className="grid md:grid-cols-2 gap-4 text-left">
        {Array.from({ length: 2 }).map((_, columnIndex) => (
          <ul key={columnIndex} className="space-y-2">
            {Array.from({ length: 5 }).map((_, featureIndex) => (
              <li key={featureIndex} className="flex items-center gap-2">
                <div className="size-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded flex-1"></div>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

export function HomeSkeleton() {
  return (
    <div className="w-full max-w-4xl mx-auto text-center">
      <HeroSkeleton />
      <FeatureCardsGridSkeleton />
      <FeaturesListSkeleton />
    </div>
  );
}

