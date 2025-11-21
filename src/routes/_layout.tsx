import { Outlet, NavLink, useNavigation } from "react-router-dom";
import { Calculator, Home, Loader } from "lucide-react";

export default function Layout() {
  const navigation = useNavigation();
  const isNavigating = navigation.state === "loading";

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <nav className="bg-white/80 backdrop-blur-sm border-b border-white/20 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <Calculator className="size-6 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">
                Calculator
              </span>
            </div>
            <div className="flex items-center gap-4">
              <NavLink
                to="/"
                end
                className={({ isActive, isPending }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                    isActive
                      ? "bg-blue-100 text-blue-700 font-semibold"
                      : isPending
                      ? "text-gray-400"
                      : "text-gray-600 hover:bg-gray-100"
                  }`
                }
              >
                {({ isPending }) => (
                  <>
                    <Home className="size-4" />
                    {isPending && <Loader className="size-3 animate-spin" />}
                  </>
                )}
              </NavLink>
              <NavLink
                to="/calculator"
                className={({ isActive, isPending }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                    isActive
                      ? "bg-blue-100 text-blue-700 font-semibold"
                      : isPending
                      ? "text-gray-400"
                      : "text-gray-600 hover:bg-gray-100"
                  }`
                }
              >
                {({ isPending }) => (
                  <>
                    <Calculator className="size-4" />
                    {isPending && <Loader className="size-3 animate-spin" />}
                  </>
                )}
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
      <main className="flex-1 flex items-center justify-center p-4 relative">
        {isNavigating && (
          <div className="absolute top-4 right-4 z-10">
            <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg flex items-center gap-2 text-sm text-gray-600">
              <Loader className="size-4 animate-spin" />
              <span>Loading...</span>
            </div>
          </div>
        )}
        <Outlet />
      </main>
      <footer className="bg-white/80 backdrop-blur-sm border-t border-white/20 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-600">
          <p>
            ⚙️ React 19, TypeScript, Vite, Tailwind CSS v4, and React Router v7
          </p>
        </div>
      </footer>
    </div>
  );
}
