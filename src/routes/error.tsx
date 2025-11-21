import { useRouteError, isRouteErrorResponse, Link } from "react-router-dom";
import { AlertCircle, Home } from "lucide-react";

export default function ErrorPage() {
  const error = useRouteError();

  let errorMessage = "An unexpected error occurred";
  let errorStatus = 500;

  if (isRouteErrorResponse(error)) {
    errorMessage = error.statusText || error.data || errorMessage;
    errorStatus = error.status;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-white/20 p-8 max-w-md w-full text-center shadow-2xl">
        <AlertCircle className="size-16 text-red-500 mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-gray-900 mb-2">{errorStatus}</h1>
        <p className="text-xl text-gray-600 mb-6">{errorMessage}</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors duration-200"
        >
          <Home className="size-4" />
          Go Home
        </Link>
      </div>
    </div>
  );
}
