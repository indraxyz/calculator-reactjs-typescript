import type { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon | React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  iconColor: string;
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
  iconColor,
}: FeatureCardProps) {
  return (
    <div className="flex-shrink-0 w-[280px] snap-start lg:w-auto bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
      <Icon className={`size-8 ${iconColor} mx-auto mb-4`} />
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}
