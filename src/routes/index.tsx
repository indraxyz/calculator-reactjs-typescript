import { Hero, FeatureCardsGrid, FeaturesList } from "@/components/home";

export default function Home() {
  return (
    <div className="w-full max-w-4xl mx-auto text-center">
      <Hero />
      <FeatureCardsGrid />
      <FeaturesList />
    </div>
  );
}
