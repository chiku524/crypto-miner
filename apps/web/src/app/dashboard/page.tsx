import { Suspense } from 'react';
import { DashboardContent } from './DashboardContent';
import { DashboardFallback } from './DashboardFallback';

export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardFallback />}>
      <DashboardContent />
    </Suspense>
  );
}
