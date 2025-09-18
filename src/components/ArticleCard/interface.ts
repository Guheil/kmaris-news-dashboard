// src/components/ArticleCard/interface.ts
export interface ApiArticle {
  _id?: string;
  title?: string;
  author?: string;
  date?: string;
  newsImage?: string | { url: string; alt?: string; width?: number; height?: number };
  newsVideo?: string | { url: string; title?: string; duration?: number };
  readTime?: string;
  category?: string;
  description?: string;
  views?: number;
  status?: string;
}

export interface Article {
  date: string | number | Date;
  status: string;
  newsVideo?: string | { url: string; title?: string; duration?: number };
  newsImage?: string | { url: string; alt?: string; width?: number; height?: number };
  _id: string;
  id: string;
  title: string;
  summary?: string;
  imageUrl: string;
  category: string;
  readTime: string;
  author?: string;
  publishedAt?: string;
}

export interface ArticleCardProps {
  article: Article;
  variant: "featured" | "list" | "grid";
  truncate?: boolean;
}