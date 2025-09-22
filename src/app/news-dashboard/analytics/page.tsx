// app/news-dashboard/analytics/page.tsx
'use client';

import { useState } from 'react';
import { AnalyticsPage } from './AnalyticsPage';

export default function AnalyticsPageRoot() {
  const [sidebarOpen, setSidebarOpen] = useState(true);


  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <AnalyticsPage 
      sidebarOpen={sidebarOpen} 
      onSidebarToggle={handleSidebarToggle}
    />
  );
}