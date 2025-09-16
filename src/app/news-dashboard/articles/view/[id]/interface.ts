// app/news-dashboard/articles/view/[id]/interface.ts
export interface NewsArticle {
  _id: string;
  title: string;
  author: string;
  category: string;
  description: string;
  status:  "published" | "archived";
  newsImage: string | null; // Base64 string or URL
  newsVideo: string | null; // Base64 string or URL
  date: string;
  views?: number;
  readTime?: string;
}

export interface ViewArticlePageProps {
  sidebarOpen: boolean;
  onSidebarToggle: () => void;
  isMobile?: boolean;
  articleId: string;
}