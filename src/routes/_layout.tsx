import { Outlet, Link, useLocation } from "react-router-dom";
import { Calculator, Home } from "lucide-react";

export default function Layout() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <nav className="bg-white/80 backdrop-blur-sm border-b border-white/20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Calculator className="size-6 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">
                Calculator App
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Link
                to="/"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                  isActive("/")
                    ? "bg-blue-100 text-blue-700 font-semibold"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Home className="size-4" />
                <span>Home</span>
              </Link>
              <Link
                to="/calculator"
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                  isActive("/calculator")
                    ? "bg-blue-100 text-blue-700 font-semibold"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Calculator className="size-4" />
                <span>Calculator</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <main className="flex-1 flex items-center justify-center p-4">
        <Outlet />
      </main>
      <footer className="bg-white/80 backdrop-blur-sm border-t border-white/20 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-600">
          <p>
            Built with React 19, TypeScript, Vite, Tailwind CSS v4, and React
            Router v7
          </p>
        </div>
      </footer>
    </div>
  );
}
