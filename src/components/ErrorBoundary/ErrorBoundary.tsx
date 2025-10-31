import { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './ErrorBoundary.module.css';
import type { ErrorBoundaryProps, ErrorBoundaryState } from './ErrorBoundary.types';

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Only log errors in development to avoid exposing sensitive information in production
    if (import.meta.env.DEV) {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }
    // In production, you should send errors to an error tracking service (e.g., Sentry, LogRocket)
    // Example: errorTrackingService.captureException(error, { extra: errorInfo });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.container}>
          <h1 className={styles.title}>Something went wrong</h1>
          <p className={styles.message}>
            {this.state.error?.message || 'An unexpected error occurred'}
          </p>
          <Link to="/" className={styles.button} onClick={this.handleReset}>
            Go Home
          </Link>
        </div>
      );
    }

    return this.props.children;
  }
}
