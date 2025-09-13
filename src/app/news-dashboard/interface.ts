export interface DashboardProps {
  sidebarOpen: boolean;
  onSidebarToggle: () => void;
  isMobile?: boolean;
}

export interface CardProps {
  title: string;
  gridColumn?: string;
  children: React.ReactNode;
}