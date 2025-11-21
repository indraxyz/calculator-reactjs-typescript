import { StrictMode, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "@/routes/_layout";
import ErrorPage from "@/routes/error";
import { HomeSkeleton, CalculatorPageSkeleton } from "@/components/skeletons";
import "@/index.css";

const Home = lazy(() => import("@/routes/index"));
const Calculator = lazy(() => import("@/routes/calculator"));

export const HomeWithSuspense = () => (
  <Suspense fallback={<HomeSkeleton />}>
    <Home />
  </Suspense>
);

export const CalculatorWithSuspense = () => (
  <Suspense fallback={<CalculatorPageSkeleton />}>
    <Calculator />
  </Suspense>
);

const router = createBrowserRouter(
  [
    {
      path: "/",
      Component: Layout,
      ErrorBoundary: ErrorPage,
      children: [
        {
          index: true,
          Component: HomeWithSuspense,
        },
        {
          path: "calculator",
          Component: CalculatorWithSuspense,
        },
      ],
    },
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
    },
  }
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
