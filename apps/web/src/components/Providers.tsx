'use client';

import { AuthProvider } from '@/contexts/AuthContext';
import { ToastProvider } from '@/contexts/ToastContext';
import { OnboardingProvider } from '@/contexts/OnboardingContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ToastProvider>
        <OnboardingProvider>{children}</OnboardingProvider>
      </ToastProvider>
    </AuthProvider>
  );
}
