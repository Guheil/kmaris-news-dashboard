'use client';

import { useState } from 'react';
import { Logs } from './Logs';

export default function LogsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Logs 
      sidebarOpen={sidebarOpen} 
      onSidebarToggle={handleSidebarToggle}
    />
  );
}