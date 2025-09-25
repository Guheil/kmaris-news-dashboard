export interface MonthlyPublicationsChartProps {
  monthlyStats: Array<{
    month: string;
    articles: number;
    views: number;
    published: number;
    archived: number;
  }>;
}