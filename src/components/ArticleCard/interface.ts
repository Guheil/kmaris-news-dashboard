export interface Article {
  status: string;
  newsVideo: any;
  newsImage: any;
  _id: string;
  id: string;
  title: string;
  summary?: string;
  imageUrl: string;
  category: string;
  readTime: string;
  author?: {
    name: string;
  };
  publishedAt?: string;
}

export interface ArticleCardProps {
  article: Article;
  variant: "featured" | "list" | "grid";
  truncate?: boolean;
}
