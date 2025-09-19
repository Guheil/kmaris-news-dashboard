import { Article } from "@/components/ArticleCard/interface";

export interface NewsArticleProps {
  article: Article;
  relatedArticles: Article[];
}
