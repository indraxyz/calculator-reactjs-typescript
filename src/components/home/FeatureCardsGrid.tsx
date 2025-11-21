import { FeatureCard } from "./FeatureCard";
import { featureCards } from "@/lib/constants/features";

export function FeatureCardsGrid() {
  return (
    <div className="mt-12">
      <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin lg:grid lg:grid-cols-4 lg:overflow-visible lg:pb-0">
        {featureCards.map((card) => (
          <FeatureCard key={card.title} {...card} />
        ))}
      </div>
    </div>
  );
}

