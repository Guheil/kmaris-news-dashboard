"use client";

import React from "react";
import { FileText, Activity, Eye, Archive, ArrowUp, ArrowDown, Minus } from "lucide-react";
import { MetricsGridRoot, MetricCard, MetricHeader, MetricContent, MetricValue, MetricLabel, MetricChange, MetricIcon } from "./elements";
import { AnalyticsData } from "@/app/news-dashboard/analytics/interface";
import { palette } from "@/theme/palette";

interface MetricsGridProps {
  analyticsData: AnalyticsData;
}

const getChangeType = (current: number, previous: number): "positive" | "negative" | "neutral" => {
  if (current > previous) return "positive";
  if (current < previous) return "negative";
  return "neutral";
};

const getChangePercentage = (current: number, previous: number): string => {
  if (previous === 0) return current > 0 ? "+100%" : "0%";
  const change = ((current - previous) / previous) * 100;
  return `${change >= 0 ? "+" : ""}${change.toFixed(1)}%`;
};

const getChangeIcon = (type: "positive" | "negative" | "neutral") => {
  if (type === "positive") return <ArrowUp size={14} />;
  if (type === "negative") return <ArrowDown size={14} />;
  return <Minus size={14} />;
};

export const MetricsGrid: React.FC<MetricsGridProps> = ({ analyticsData }) => {
  const publicationChange = getChangePercentage(
    analyticsData.performanceMetrics.publicationTrend.thisMonth,
    analyticsData.performanceMetrics.publicationTrend.lastMonth
  );

  const viewsChange = getChangePercentage(
    analyticsData.performanceMetrics.viewsTrend.thisMonth,
    analyticsData.performanceMetrics.viewsTrend.lastMonth
  );

  const publicationChangeType = getChangeType(
    analyticsData.performanceMetrics.publicationTrend.thisMonth,
    analyticsData.performanceMetrics.publicationTrend.lastMonth
  );

  const viewsChangeType = getChangeType(
    analyticsData.performanceMetrics.viewsTrend.thisMonth,
    analyticsData.performanceMetrics.viewsTrend.lastMonth
  );

  return (
    <MetricsGridRoot>
      <MetricCard>
        <MetricHeader>
          <MetricContent>
            <MetricValue>
              {analyticsData.overview.totalArticles.toLocaleString()}
            </MetricValue>
            <MetricLabel>Total Articles</MetricLabel>
            <MetricChange type={publicationChangeType}>
              {getChangeIcon(publicationChangeType)}
              {publicationChange}
            </MetricChange>
          </MetricContent>
          <MetricIcon variant="total">
            <FileText size={24} />
          </MetricIcon>
        </MetricHeader>
      </MetricCard>

      <MetricCard>
        <MetricHeader>
          <MetricContent>
            <MetricValue>
              {analyticsData.overview.publishedArticles.toLocaleString()}
            </MetricValue>
            <MetricLabel>Published Articles</MetricLabel>
          </MetricContent>
          <MetricIcon variant="published">
            <Activity size={24} />
          </MetricIcon>
        </MetricHeader>
      </MetricCard>

      <MetricCard>
        <MetricHeader>
          <MetricContent>
            <MetricValue>
              {analyticsData.overview.totalViews.toLocaleString()}
            </MetricValue>
            <MetricLabel>Total Views</MetricLabel>
            <MetricChange type={viewsChangeType}>
              {getChangeIcon(viewsChangeType)}
              {viewsChange}
            </MetricChange>
          </MetricContent>
          <MetricIcon variant="views">
            <Eye size={24} />
          </MetricIcon>
        </MetricHeader>
      </MetricCard>

      <MetricCard>
        <MetricHeader>
          <MetricContent>
            <MetricValue>
              {analyticsData.overview.archivedArticles.toLocaleString()}
            </MetricValue>
            <MetricLabel>Archived Articles</MetricLabel>
          </MetricContent>
          <MetricIcon variant="archived">
            <Archive size={24} />
          </MetricIcon>
        </MetricHeader>
      </MetricCard>
    </MetricsGridRoot>
  );
};

export default MetricsGrid;