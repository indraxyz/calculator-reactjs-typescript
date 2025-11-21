import { StrictMode, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "@/routes/_layout";
import ErrorPage from "@/routes/error";
import "@/index.css";

const Home = lazy(() => import("@/routes/index"));
const Calculator = lazy(() => import("@/routes/calculator"));

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-gray-600">Loading...</div>
  </div>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "calculator",
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Calculator />
          </Suspense>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
