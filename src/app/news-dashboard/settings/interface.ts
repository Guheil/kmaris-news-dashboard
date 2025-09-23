"use client";

export interface SettingsDashboardProps {
  sidebarOpen: boolean;
  onSidebarToggle: () => void;
  isMobile?: boolean;
}

export interface SettingCardProps {
  title: string;
  gridColumn?: string;
  children: React.ReactNode;
}

export interface SettingCategory {
  title: string;
  items: SettingItem[];
}

export interface SettingItem {
  icon: React.ComponentType<{ size: number }>;
  title: string;
  description: string;
  color: string;
}