import { Link } from "react-router-dom";
import { Calculator, Zap, Shield, Keyboard } from "lucide-react";

export default function Home() {
  return (
    <div className="w-full max-w-4xl mx-auto text-center">
      <div className="mb-8">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Modern Calculator
        </h1>
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

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
          <Zap className="size-8 text-blue-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Fast</h3>
          <p className="text-gray-600 text-sm">
            Lightning-fast calculations with optimized performance
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
          <Shield className="size-8 text-green-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure</h3>
          <p className="text-gray-600 text-sm">
            Built with security best practices and input validation
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
          <Keyboard className="size-8 text-purple-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Keyboard Support
          </h3>
          <p className="text-gray-600 text-sm">
            Full keyboard navigation and shortcuts
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-lg">
          <Calculator className="size-8 text-orange-600 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">History</h3>
          <p className="text-gray-600 text-sm">
            Track your calculation history with visual feedback
          </p>
        </div>
      </div>

      <div className="mt-12 bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Features</h2>
        <div className="grid md:grid-cols-2 gap-4 text-left">
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-center gap-2">
              <span className="text-blue-600">✓</span>
              Basic arithmetic operations
            </li>
            <li className="flex items-center gap-2">
              <span className="text-blue-600">✓</span>
              Percentage calculations
            </li>
            <li className="flex items-center gap-2">
              <span className="text-blue-600">✓</span>
              Expression history
            </li>
            <li className="flex items-center gap-2">
              <span className="text-blue-600">✓</span>
              Real-time expression display
            </li>
          </ul>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-center gap-2">
              <span className="text-blue-600">✓</span>
              Responsive design
            </li>
            <li className="flex items-center gap-2">
              <span className="text-blue-600">✓</span>
              Glass morphism UI
            </li>
            <li className="flex items-center gap-2">
              <span className="text-blue-600">✓</span>
              Accessibility support
            </li>
            <li className="flex items-center gap-2">
              <span className="text-blue-600">✓</span>
              Type-safe with TypeScript
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
