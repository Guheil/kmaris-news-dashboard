"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Swal from "sweetalert2";
import {
  BarChart3,
  Eye,
  FileText,
  Archive,
  Activity,
  Home,
  Plus,
  ArrowUp,
  ArrowDown,
  Minus,
  EyeIcon,
} from "lucide-react";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { Header } from "@/components/header/Header";
import { AnalyticsData, AnalyticsPageProps } from "./interface";
import { palette } from "@/theme/pallete";
import {
  AnalyticsRoot,
  SidebarOverlay,
  MainContent,
  LoadingState,
  LoadingSpinner,
  ErrorState,
  ErrorTitle,
  ErrorText,
  FilterSelect,
  FiltersContainer,
  MetricCard,
  MetricChange,
  MetricContent,
  MetricHeader,
  MetricIcon,
  MetricLabel,
  MetricValue,
  MetricsGrid,
  ChartCard,
  ChartTitle,
  ChartsGrid,
} from "./elements";

// Dynamically import Recharts components to avoid SSR issues
const LineChart = dynamic(
  () => import("recharts").then((mod) => mod.LineChart),
  { ssr: false }
);
const Line = dynamic(() => import("recharts").then((mod) => mod.Line), {
  ssr: false,
});
const BarChart = dynamic(() => import("recharts").then((mod) => mod.BarChart), {
  ssr: false,
});
const Bar = dynamic(() => import("recharts").then((mod) => mod.Bar), {
  ssr: false,
});
const XAxis = dynamic(() => import("recharts").then((mod) => mod.XAxis), {
  ssr: false,
});
const YAxis = dynamic(() => import("recharts").then((mod) => mod.YAxis), {
  ssr: false,
});
const CartesianGrid = dynamic(
  () => import("recharts").then((mod) => mod.CartesianGrid),
  { ssr: false }
);
const Tooltip = dynamic(() => import("recharts").then((mod) => mod.Tooltip), {
  ssr: false,
});
const ResponsiveContainer = dynamic(
  () => import("recharts").then((mod) => mod.ResponsiveContainer),
  { ssr: false }
);
const PieChart = dynamic(() => import("recharts").then((mod) => mod.PieChart), {
  ssr: false,
});
const Pie = dynamic(() => import("recharts").then((mod) => mod.Pie), {
  ssr: false,
});
const Cell = dynamic(() => import("recharts").then((mod) => mod.Cell), {
  ssr: false,
});

const getChangeType = (
  current: number,
  previous: number
): "positive" | "negative" | "neutral" => {
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

// Main Analytics Component
export const AnalyticsPage: React.FC<AnalyticsPageProps> = ({
  sidebarOpen,
  onSidebarToggle,
  isMobile = false,
}) => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState("12m");
  const [isClient, setIsClient] = useState(false);

  // Fix hydration by ensuring client-side rendering
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/analytics");
        if (!response.ok) {
          throw new Error("Failed to fetch analytics data");
        }
        const data = await response.json();
        setAnalyticsData(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (isClient) {
      fetchAnalytics();
    }
  }, [isClient]);

  const handleOverlayClick = () => {
    if (isMobile) {
      onSidebarToggle();
    }
  };

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to log out? You'll be redirected to the login page!",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, log out!",
      cancelButtonText: "No, stay logged in!",
    });

    if (!result.isConfirmed) return;

    try {
      if (typeof window !== "undefined") {
        localStorage.removeItem("user");
        localStorage.removeItem("sessionId");
      }
      await Swal.fire({
        icon: "success",
        title: "Success!",
        text: "You have been logged out successfully!",
        confirmButtonText: "OK",
        timer: 3000,
        timerProgressBar: true,
      });
      setTimeout(() => {
        if (typeof window !== "undefined") {
          window.location.href = "http://localhost:3000";
        }
      }, 3000);
    } catch (err) {
      console.error("Error during logout:", err);
      await Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to log out. Please try again.",
        confirmButtonText: "OK",
      });
    }
  };

  // Don't render anything until client-side hydration is complete
  if (!isClient) {
    return null;
  }

  if (loading) {
    return (
      <AnalyticsRoot>
        <SidebarOverlay
          show={isMobile && sidebarOpen}
          onClick={handleOverlayClick}
        />
        <Sidebar
          isOpen={sidebarOpen}
          onToggle={onSidebarToggle}
          navSections={[
            {
              title: "Overview",
              items: [
                {
                  icon: <Home size={20} />,
                  text: "Dashboard",
                  href: "/news-dashboard",
                },
              ],
            },
            {
              title: "News Management",
              items: [
                {
                  icon: <FileText size={20} />,
                  text: "All Articles",
                  href: "/news-dashboard/articles",
                },
                {
                  icon: <Plus size={20} />,
                  text: "Create Article",
                  href: "/news-dashboard/create-article",
                },
                {
                  icon: <BarChart3 size={20} />,
                  text: "Analytics",
                  href: "/news-dashboard/analytics",
                  active: true,
                },
              ],
            },
            {
              title: "Preview",
              items: [
                {
                  icon: <EyeIcon size={20} />,
                  text: "News Preview",
                  href: "/news-preview",
                  active: false,
                },
              ],
            },
          ]}
          userName="John Doe"
          userRole="Editor"
          userInitials="JD"
          collapsible={!isMobile}
          navItems={[]}
        />
        <Header
          title="Analytics"
          onMenuToggle={onSidebarToggle}
          onSearch={() => {}}
          userName="John Doe"
          userRole="Editor"
          userInitials="JD"
          notifications={3}
          isSidebarOpen={sidebarOpen}
          isMobile={isMobile}
          onLogout={handleLogout}
        />
        <MainContent sidebarOpen={sidebarOpen} isMobile={isMobile}>
          <LoadingState>
            <LoadingSpinner />
            <div>Loading analytics data...</div>
          </LoadingState>
        </MainContent>
      </AnalyticsRoot>
    );
  }

  if (error) {
    return (
      <AnalyticsRoot>
        <SidebarOverlay
          show={isMobile && sidebarOpen}
          onClick={handleOverlayClick}
        />
        <Sidebar
          isOpen={sidebarOpen}
          onToggle={onSidebarToggle}
          navSections={[
            {
              title: "Overview",
              items: [
                {
                  icon: <Home size={20} />,
                  text: "Dashboard",
                  href: "/news-dashboard",
                },
              ],
            },
            {
              title: "News Management",
              items: [
                {
                  icon: <FileText size={20} />,
                  text: "All Articles",
                  href: "/news-dashboard/articles",
                },
                {
                  icon: <Plus size={20} />,
                  text: "Create Article",
                  href: "/news-dashboard/create-article",
                },
                {
                  icon: <BarChart3 size={20} />,
                  text: "Analytics",
                  href: "/news-dashboard/analytics",
                  active: true,
                },
              ],
            },
            {
              title: "Preview",
              items: [
                {
                  icon: <EyeIcon size={20} />,
                  text: "News Preview",
                  href: "/news-preview",
                  active: false,
                },
              ],
            },
          ]}
          userName="John Doe"
          userRole="Editor"
          userInitials="JD"
          collapsible={!isMobile}
          navItems={[]}
        />
        <Header
          title="Analytics"
          onMenuToggle={onSidebarToggle}
          onSearch={() => {}}
          userName="John Doe"
          userRole="Editor"
          userInitials="JD"
          notifications={3}
          isSidebarOpen={sidebarOpen}
          isMobile={isMobile}
          onLogout={handleLogout}
        />
        <MainContent sidebarOpen={sidebarOpen} isMobile={isMobile}>
          <ErrorState>
            <ErrorTitle>Error loading analytics</ErrorTitle>
            <ErrorText>{error}</ErrorText>
          </ErrorState>
        </MainContent>
      </AnalyticsRoot>
    );
  }

  if (!analyticsData) return null;

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
    <AnalyticsRoot>
      <SidebarOverlay
        show={isMobile && sidebarOpen}
        onClick={handleOverlayClick}
      />
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={onSidebarToggle}
        navSections={[
          {
            title: "Overview",
            items: [
              {
                icon: <Home size={20} />,
                text: "Dashboard",
                href: "/news-dashboard",
              },
            ],
          },
          {
            title: "News Management",
            items: [
              {
                icon: <FileText size={20} />,
                text: "All Articles",
                href: "/news-dashboard/articles",
              },
              {
                icon: <Plus size={20} />,
                text: "Create Article",
                href: "/news-dashboard/create-article",
              },
              {
                icon: <BarChart3 size={20} />,
                text: "Analytics",
                href: "/news-dashboard/analytics",
                active: true,
              },
            ],
          },
          {
            title: "Preview",
            items: [
              {
                icon: <EyeIcon size={20} />,
                text: "News Preview",
                href: "/news-preview",
                active: false,
              },
            ],
          },
        ]}
        userName="John Doe"
        userRole="Editor"
        userInitials="JD"
        collapsible={!isMobile}
        navItems={[]}
      />
      <Header
        title="Analytics"
        onMenuToggle={onSidebarToggle}
        onSearch={() => {}}
        userName="John Doe"
        userRole="Editor"
        userInitials="JD"
        notifications={3}
        isSidebarOpen={sidebarOpen}
        isMobile={isMobile}
        onLogout={handleLogout}
      />
      <MainContent sidebarOpen={sidebarOpen} isMobile={isMobile}>
        <FiltersContainer>
          <div />
          <FilterSelect
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="1m">Last Month</option>
            <option value="3m">Last 3 Months</option>
            <option value="6m">Last 6 Months</option>
            <option value="12m">Last 12 Months</option>
          </FilterSelect>
        </FiltersContainer>

        {/* Metrics Grid */}
        <MetricsGrid>
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
        </MetricsGrid>

        {/* Charts */}
        <ChartsGrid>
          <ChartCard>
            <ChartTitle>Monthly Publications</ChartTitle>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={analyticsData.monthlyStats}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12, fill: "#64748b" }}
                  axisLine={{ stroke: "#e2e8f0" }}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "#64748b" }}
                  axisLine={{ stroke: "#e2e8f0" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "8px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                />
                <Bar
                  dataKey="articles"
                  fill={palette.primary.main}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard>
            <ChartTitle>Status Distribution</ChartTitle>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={analyticsData.statusDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({
                    name,
                    percent,
                  }: {
                    name?: string;
                    percent?: number;
                  }) => {
                    if (name && percent !== undefined) {
                      return `${name} ${(percent * 100).toFixed(0)}%`;
                    }
                    return "";
                  }}
                >
                  {analyticsData.statusDistribution.map(
                    (entry, index: number) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    )
                  )}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </ChartsGrid>

        {/* Views Over Time */}
        <ChartCard style={{ marginBottom: "32px" }}>
          <ChartTitle>Views Over Time (Last 30 Days)</ChartTitle>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analyticsData.viewsOverTime}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12, fill: "#64748b" }}
                axisLine={{ stroke: "#e2e8f0" }}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "#64748b" }}
                axisLine={{ stroke: "#e2e8f0" }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
              />
              <Line
                type="monotone"
                dataKey="views"
                stroke={palette.primary.main}
                strokeWidth={2}
                dot={{ fill: palette.primary.main, strokeWidth: 2, r: 4 }}
                activeDot={{
                  r: 6,
                  stroke: palette.primary.main,
                  strokeWidth: 2,
                  fill: "#ffffff",
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </MainContent>
    </AnalyticsRoot>
  );
};

export default AnalyticsPage;
