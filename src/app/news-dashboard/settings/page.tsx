'use client';

import { useState } from 'react';
import { SettingsDashboard } from './Settings'; 

export default function SettingsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true); 

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <SettingsDashboard
      sidebarOpen={sidebarOpen} 
      onSidebarToggle={handleSidebarToggle}
    />
  );
}