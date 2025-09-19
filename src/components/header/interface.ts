"use client";

import { ReactNode } from 'react';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: Date;
  read: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export interface HeaderProps {
  title: string;
  breadcrumb?: string[];
  onMenuToggle?: () => void;
  userName?: string;
  userRole?: string;
  userInitials?: string;
  searchValue?: string;
  onSearch?: (query: string) => void;
  notifications?: number;
  notificationsList?: Notification[];
  onNotificationClick?: (notification: Notification) => void;
  onMarkAllAsRead?: () => void;
  isSidebarOpen?: boolean;
  isMobile?: boolean;
  quickActions?: QuickAction[];
  onLogout?: () => void;
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