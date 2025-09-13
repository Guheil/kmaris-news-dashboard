import { ReactNode } from 'react';

export interface HeaderProps {
  title: string;
  breadcrumb?: string[];
  onMenuToggle?: () => void;
  userName?: string;
  userRole?: string;
  userInitials?: string;
  onSearch?: (query: string) => void;
  notifications?: number;
  isSidebarOpen?: boolean;
  isMobile?: boolean;
  quickActions?: QuickAction[];
}

export interface IconButtonProps {
  icon: ReactNode;
  onClick?: () => void;
  hasNotification?: boolean;
  notificationCount?: number;
}

export interface QuickAction {
  label: string;
  icon: ReactNode;
  onClick: () => void;
}