'use client';

import { useState, useEffect } from 'react';
import { NewsDashboard } from './NewsDashboard'; // Adjust this import path to match your file structure

export default function NewsDashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true); // Default to open
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
    <NewsDashboard 
      sidebarOpen={sidebarOpen} 
      onSidebarToggle={handleSidebarToggle}
      isMobile={isMobile}
    />
  );
}