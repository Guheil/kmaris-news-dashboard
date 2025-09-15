"use client";

export interface CreateArticlePageProps {
  sidebarOpen: boolean;
  onSidebarToggle: () => void;
  isMobile?: boolean;
}

export interface ArticleFormData {
  title: string;
  author: string;
  category: string;
  description: string;
  newsImage?: string;
  newsVideo?: string;
  status: 'published' | 'draft' | 'archived';
}

export interface FormErrors {
  title?: string;
  author?: string;
  category?: string;
  description?: string;
}