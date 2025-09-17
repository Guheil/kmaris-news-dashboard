// src/app/news-dashboard/analytics/interface.ts
export interface AnalyticsData {
  overview: {
    totalArticles: number;
    publishedArticles: number;
    archivedArticles: number;
    totalViews: number;
    averageViews: number;
  };
  categoryStats: Array<{
    name: string;
    count: number;
    views: number;
    published: number;
    archived: number;
  }>;
  monthlyStats: Array<{
    month: string;
    articles: number;
    views: number;
    published: number;
    archived: number;
  }>;
  topArticles: Array<{
    _id: string;
    title: string;
    category: string;
    views: number;
    date: string;
    status: string;
    readTime: string;
  }>;
  recentActivity: Array<{
    _id: string;
    title: string;
    category: string;
    date: string;
    status: string;
    views: number;
  }>;
  statusDistribution: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  viewsOverTime: Array<{
    date: string;
    views: number;
  }>;
  performanceMetrics: {
    averageViewsPerCategory: Array<{
      category: string;
      averageViews: number;
    }>;
    publicationTrend: {
      thisMonth: number;
      lastMonth: number;
    };
    viewsTrend: {
      thisMonth: number;
      lastMonth: number;
    };
  };
}

export interface AnalyticsPageProps {
  sidebarOpen: boolean;
  onSidebarToggle: () => void;
  isMobile?: boolean;
}