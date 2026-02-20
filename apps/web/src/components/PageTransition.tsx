'use client';

import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useEffect } from 'react';

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  // Scroll to top on route change so content (e.g. home) is in view when navigating from dashboard
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  const isHome = pathname === '/';
  // Skip fade for app/dashboard routes so navigation never shows a blank screen
  const isAppOrDashboard = pathname === '/app' || pathname.startsWith('/dashboard');
  const skipInitialFade = reduceMotion || isHome || isAppOrDashboard;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={skipInitialFade ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={reduceMotion ? undefined : { opacity: 0 }}
        transition={reduceMotion ? { duration: 0 } : { duration: 0.2, ease: 'easeOut' }}
        className="min-h-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
