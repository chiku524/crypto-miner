'use client';

import React from 'react';

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends React.Component<{ children: React.ReactNode }, State> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-surface-950 px-4 py-12 text-center">
          <h1 className="font-display text-xl font-bold text-white">Something went wrong</h1>
          <p className="mt-2 max-w-sm text-sm text-gray-400">
            An unexpected error occurred. Reload the page to try again.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-6 rounded-xl bg-accent-cyan px-6 py-2.5 font-medium text-surface-950 transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-accent-cyan focus:ring-offset-2 focus:ring-offset-surface-950"
          >
            Reload
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
