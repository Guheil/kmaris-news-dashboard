"use client";

import { ReactNode } from "react";

export interface Category {
  _id: string;
  categoryName: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ArticlesPageProps {
  sidebarOpen: boolean;
  onSidebarToggle: () => void;
  isMobile?: boolean;
}

export interface NewsArticle {
  videoUrl: string;
  readTime: ReactNode;
  _id: string; 
  createdAt: string | number | Date;
  id: string;
  title: string;
  author: string;
  date: string;
  newsImage?: string; 
  newsVideo?: string;
  category: string; // This will now store the category ID
  description: string; 
  views?: number;
  status?: 'published' | 'archived';
}

export interface FilterOptions {
  category: string;
  status: string;
  author?: string;
}

export interface SortOptions {
  field: 'date' | 'title' | 'author' | 'views' | 'category';
  direction: 'asc' | 'desc';
}

export interface PaginationOptions {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
}

export type ViewMode = 'grid' | 'list';

export interface ArticleCardProps {
  article: NewsArticle;
  viewMode: ViewMode;
  onEdit: (articleId: string) => void;
  onArchive: (articleId: string) => void;
  onView: (articleId: string) => void;
  onRestore?: (articleId: string) => void;
  onDelete?: (articleId: string) => void;
}