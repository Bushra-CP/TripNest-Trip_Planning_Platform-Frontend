import { Headphones, Home, RefreshCw } from "lucide-react";

interface ErrorFallbackProps {
  onRetry?: () => void;
  onGoHome?: () => void;
  onContactSupport?: () => void;
}

const ErrorFallback = ({
  onRetry = () => window.location.reload(),
  onGoHome = () => {
    window.location.href = "/";
  },
  onContactSupport = () => {
    window.location.href = "/contact";
  },
}: ErrorFallbackProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-slate-50">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-lg border border-slate-200 overflow-hidden">
        {/* Top Accent */}
        <div className="h-1.5 w-full bg-linear-to-r from-[#006064] via-[#2e7d32] to-[#bf360c]" />

        <div className="p-8 md:p-12 flex flex-col items-center text-center">
          {/* Error Illustration */}
          <div className="relative mb-8">
            <div className="w-28 h-28 rounded-full border border-[#ff8a65]/30 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-[#fff3e0] flex items-center justify-center text-[#bf360c]">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 2v4" />
                  <path d="M12 18v4" />
                  <path d="m4.93 4.93 2.83 2.83" />
                  <path d="m16.24 16.24 2.83 2.83" />
                  <path d="M2 12h4" />
                  <path d="M18 12h4" />
                  <path d="m4.93 19.07 2.83-2.83" />
                  <path d="m16.24 7.76 2.83-2.83" />
                </svg>
              </div>
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-4">
            Something went wrong
          </h1>

          {/* Description */}
          <p className="text-slate-500 text-base md:text-lg leading-relaxed max-w-xl mb-8">
            We encountered an unexpected error while loading this page. Please
            try again. If the problem continues, you can return to the home page
            or contact our support team.
          </p>

          {/* Primary Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center mb-8">
            <button
              type="button"
              onClick={onRetry}
              className="h-12 px-7 bg-[#1b5e20] hover:bg-[#134216] text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-3 w-full sm:w-auto"
            >
              <RefreshCw size={19} aria-hidden="true" />
              Try Again
            </button>

            <button
              type="button"
              onClick={onGoHome}
              className="h-12 px-7 bg-white border-2 border-[#bf360c] text-[#bf360c] font-semibold rounded-xl hover:bg-[#fff3e0] transition-all flex items-center justify-center gap-3 w-full sm:w-auto"
            >
              <Home size={19} aria-hidden="true" />
              Go to Home
            </button>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-slate-100 mb-6" />

          {/* Support */}
          <button
            type="button"
            onClick={onContactSupport}
            className="flex items-center gap-2 text-sm font-semibold text-[#1b5e20] hover:text-[#134216] transition-colors"
          >
            <Headphones size={18} aria-hidden="true" />
            Contact Support
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 flex items-center gap-2 opacity-50">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-slate-900"
          aria-hidden="true"
        >
          <path
            d="M12 3L4 9V21H20V9L12 3Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9 21V12H15V21"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <span className="text-lg font-bold tracking-tight text-slate-900">
          TripNest
        </span>
      </div>
    </div>
  );
};

export default ErrorFallback;
