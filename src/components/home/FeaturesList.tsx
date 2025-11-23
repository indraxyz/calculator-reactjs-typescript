import { featuresList } from "@/lib/constants/features";

export function FeaturesList() {
  return (
    <div className="mt-12 bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-lg">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Features</h2>
      <div className="grid md:grid-cols-2 gap-4 text-left">
        {featuresList.map((column, columnIndex) => (
          <ul key={columnIndex} className="space-y-2 text-gray-600">
            {column.map((feature, featureIndex) => (
              <li key={featureIndex} className="flex items-center gap-2">
                <span className="text-blue-600">✓</span>
                {feature.text}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
