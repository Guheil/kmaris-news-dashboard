'use client';

import { useState } from 'react';
import { NewsDashboard } from './NewsDashboard'; 

export default function NewsDashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true); 

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <NewsDashboard 
      sidebarOpen={sidebarOpen} 
      onSidebarToggle={handleSidebarToggle}
    />
  );
}