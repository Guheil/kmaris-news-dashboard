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
  imageUrl: string;
  summary: string;
  content: string;
  author: string;
  publishDate: string;
  category: string;
  views: number;
  status: 'published' | 'draft' | 'archived';
}