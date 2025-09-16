"use client";

import { HTMLAttributes, ReactNode } from 'react';

export interface NavItemProps {
  icon: ReactNode;
  text: string;
  href: string;
  active?: boolean;
  onClick?: (event?: React.MouseEvent<HTMLElement>) => void;
}

export interface NavItem {
  icon: ReactNode;
  text: string;
  href: string;
  active?: boolean;
}

export interface NavSection {
  title?: string;
  items: NavItemProps[];
}

export interface SidebarProps {
  isOpen?: boolean;
  onToggle?: () => void;
  navSections: NavSection[];
  navItems: NavItem[]; 
  userName: string;
  userRole: string;
  userInitials: string;
  logoSrc?: string;
  appName?: string;
  collapsible?: boolean;
}

export interface NewsDashboardNavigation {
  dashboard: NavItemProps;
  newsManagement: {
    title: string;
    items: {
      allNews: NavItemProps;
      createNews: NavItemProps;
      categories: NavItemProps;
    };
  };
  settings: NavItemProps;
}

// Extended NavItemProps for styled components
export interface NavItemProps extends HTMLAttributes<HTMLDivElement> {
  active?: boolean;
}