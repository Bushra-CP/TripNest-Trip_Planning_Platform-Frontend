import ErrorFallback from "@/features/traveler(user)/error-pages/pages/ErrorBoundaryPage";
import { Component, type ErrorInfo, type ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("Error Boundary caught an error:", error);
    console.error("Error information:", errorInfo);
  }

  handleRetry = (): void => {
    this.setState({
      hasError: false,
    });
  };

  handleGoHome = (): void => {
    window.location.href = "/";
  };

  handleContactSupport = (): void => {
    window.location.href = "/contact";
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <ErrorFallback
          onRetry={this.handleRetry}
          onGoHome={this.handleGoHome}
          onContactSupport={this.handleContactSupport}
        />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
