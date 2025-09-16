// app/news-dashboard/analytics/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { AnalyticsPage } from './AnalyticsPage';

export default function AnalyticsPageRoot() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile on mount
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 960); // md breakpoint
      // On mobile, default to closed
      if (window.innerWidth < 960) {
        setSidebarOpen(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <AnalyticsPage 
      sidebarOpen={sidebarOpen} 
      onSidebarToggle={handleSidebarToggle}
      isMobile={isMobile}
    />
  );
}