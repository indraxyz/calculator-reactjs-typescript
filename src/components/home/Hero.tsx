import { Link } from "react-router-dom";
import { Calculator } from "lucide-react";

export function Hero() {
  return (
    <div className="my-8">
      <p className="text-xl text-gray-600 mb-8">
        A beautiful, secure, and feature-rich calculator built with modern web
        technologies
      </p>
      <Link
        to="/calculator"
        className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
      >
        <Calculator className="size-5" />
        Start Calculating
      </Link>
    </div>
  );
}
