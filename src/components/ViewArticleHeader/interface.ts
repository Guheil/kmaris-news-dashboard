export interface ViewArticleHeaderProps {
  title: string;
  date: string;
  author: string;
  views?: number;
  readTime?: string;
  status?: "published" | "archived";
  formatDate: (date: string) => string;
  formatViews: (views: number | undefined) => string;
}