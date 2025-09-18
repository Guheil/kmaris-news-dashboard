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
  videoUrl?: string; // Made optional to align with newsImage and newsVideo
  status: 'published' | 'draft' | 'archived';
}

export interface FormErrors {
  title?: string;
  author?: string;
  category?: string;
  description?: string;
  videoUrl?: string; 
}