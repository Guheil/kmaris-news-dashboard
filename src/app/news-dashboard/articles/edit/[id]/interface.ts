// components/articles/interface.ts
export interface NewsArticle {
  _id: string;
  title: string;
  author: string;
  category: string;
  description: string;
  content: string;
  date: string;
  views?: number;
  readTime: string;
  newsImage?: string | null;
  newsVideo?: string | null;
  status: "draft" | "published" | "archived";
}

export interface EditArticleFormData {
  title: string;
  author: string;
  category: string;
  description: string;
  content: string;
  status: "draft" | "published" | "archived";
  newsImage: string | null;
  newsVideo: string | null;
}

export interface ArticlesPageProps {
  sidebarOpen: boolean;
  onSidebarToggle: () => void;
  isMobile?: boolean;
}

// Fixed: Updated interface to match how it's being used
export interface EditArticlePageProps {
  sidebarOpen: boolean;
  onSidebarToggle: () => void;
  isMobile: boolean;
  articleId: string; // Changed from params object to direct articleId
}

export interface FilterOptions {
  category: string;
  status: string;
  author: string;
}

export interface SortOptions {
  field: "date" | "title" | "author" | "views";
  direction: "asc" | "desc";
}

export type ViewMode = "grid" | "list";

export interface ArticleCardProps {
  article: NewsArticle;
  viewMode: ViewMode;
  onEdit: (id: string) => void;
  onArchive: (id: string) => void;
  onView: (id: string) => void;
}

export interface PaginationOptions {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
}