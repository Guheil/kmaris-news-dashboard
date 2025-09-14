"use client";

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

export interface NewsArticle {
  id: string;
  title: string;
  author: string;
  date: string;
  newsImage?: string; 
  newsVideo?: string;
  category: string;
  description: string; 
  views?: number;
}