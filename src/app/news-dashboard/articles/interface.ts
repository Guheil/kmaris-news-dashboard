"use client";

export interface ArticlesPageProps {
  sidebarOpen: boolean;
  onSidebarToggle: () => void;
  isMobile?: boolean;
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
  status?: 'published' | 'draft' | 'archived';
}

export interface FilterOptions {
  category: string;
  status: string;
  author: string;
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
}