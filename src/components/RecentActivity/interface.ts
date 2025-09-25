import { NewsArticle } from "@/app/news-dashboard/interface";

export interface RecentActivityProps {
  articles: NewsArticle[];
  searchQuery: string;
}