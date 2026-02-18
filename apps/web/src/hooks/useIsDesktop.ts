'use client';

import { useState, useEffect } from 'react';

export function useIsDesktop(): boolean {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setIsDesktop(typeof window !== 'undefined' && window.electronAPI?.isDesktop === true);
  }, []);

  return isDesktop;
}
