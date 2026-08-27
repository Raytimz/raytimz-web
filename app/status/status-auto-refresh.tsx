'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const refreshIntervalMilliseconds = 60_000;

export default function StatusAutoRefresh() {
  const router = useRouter();

  useEffect(() => {
    const refresh = () => router.refresh();
    const interval = window.setInterval(refresh, refreshIntervalMilliseconds);
    const refreshWhenVisible = () => {
      if (document.visibilityState === 'visible') refresh();
    };

    document.addEventListener('visibilitychange', refreshWhenVisible);

    return () => {
      window.clearInterval(interval);
      document.removeEventListener('visibilitychange', refreshWhenVisible);
    };
  }, [router]);

  return null;
}
