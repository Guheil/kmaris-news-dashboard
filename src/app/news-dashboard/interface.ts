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
  status: string;
  _id: string;
  title: string;
  author: string;
  date: string;
  newsImage?: string; 
  newsVideo?: string;
  readTime: string;
  category: string;
  description: string; 
  views?: number;
}

export interface ApiArticle {
  _id?: string;
  title?: string;
  author?: string;
  date?: string;
  newsImage?: string;
  newsVideo?: string;
  readTime?: string;
  category?: string;
  description?: string;
  views?: number;
  status?: string;
}

// Added: Category interface (copied from articles for consistency)
export interface Category {
  _id: string;
  categoryName: string;
  createdAt?: string;
  updatedAt?: string;
}