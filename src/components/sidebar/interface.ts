import { ReactNode } from 'react';

export interface NavItemProps {
  icon: ReactNode;
  text: string;
  href: string;
  active?: boolean;
  onClick?: () => void;
}

export interface NavSection {
  title?: string;
  items: NavItemProps[];
}

export interface SidebarProps {
  isOpen?: boolean;
  onToggle?: () => void;
  navSections: NavSection[];
  userName: string;
  userRole: string;
  userInitials: string;
  logoSrc?: string;
  appName?: string;
  collapsible?: boolean;
}