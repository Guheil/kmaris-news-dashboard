import { NewsArticle } from "@/app/news-dashboard/interface";

export interface NewsTableProps {
  articles: NewsArticle[];
  searchQuery: string;
  clearSearch: () => void;
  getCategoryName: (categoryId: string) => string;
}