"use client";

import React, { useState, useEffect } from "react";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { Header } from "@/components/header/Header";
import Swal from "sweetalert2";
import {
  Home,
  FileText,
  Plus,
  BarChart3,
  EyeIcon,
} from "lucide-react";
import { AnalyticsRoot, SidebarOverlay, MainContent, LoadingState, LoadingSpinner, ErrorState, ErrorTitle, ErrorText, ChartsGrid } from "./elements";
import { AnalyticsPageProps } from "./interface";
import { Filters } from "@/components/Filters/Filters";
import { MetricsGrid } from "@/components/MetricsGrid/MetricsGrid";
import { MonthlyPublicationsChart } from "@/components/MonthlyPublicationChart/MonthlyPublicationsChart";
import { StatusDistributionChart } from "@/components/StatusDistributionChart/StatusDistributionChart";
import { ViewsOverTimeChart } from "@/components/ViewsOverTimeChart/ViewsOverTimeChart";
import { AnalyticsData } from "./interface";
import { navSections, userName, userRoleConfig, userInitialConfig } from "@/config/navItems";

export const AnalyticsPage: React.FC<AnalyticsPageProps> = ({
  sidebarOpen,
  onSidebarToggle,
  isMobile = false,
}) => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState("12m");
  const [isClient, setIsClient] = useState(false);

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
               navSections={navSections}
               userName={userName}
               userRole={userRoleConfig}
               userInitials={userInitialConfig}
               collapsible={!isMobile}
               navItems={[]}
             />
             <Header
               title="View Article"
               onMenuToggle={onSidebarToggle}
               onSearch={() => {}}
               userName={userName}
               userRole={userRoleConfig}
               userInitials={userInitialConfig}
               notifications={3}
               isSidebarOpen={sidebarOpen}
               isMobile={isMobile}
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
               navSections={navSections}
               userName={userName}
               userRole={userRoleConfig}
               userInitials={userInitialConfig}
               collapsible={!isMobile}
               navItems={[]}
             />
             <Header
               title="View Article"
               onMenuToggle={onSidebarToggle}
               onSearch={() => {}}
               userName={userName}
               userRole={userRoleConfig}
               userInitials={userInitialConfig}
               notifications={3}
               isSidebarOpen={sidebarOpen}
               isMobile={isMobile}
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
        userName="Kmaris Admin"
        userRole="Editor"
        userInitials="KA"
        collapsible={!isMobile}
        navItems={[]}
      />
      <Header
        title="Analytics"
        onMenuToggle={onSidebarToggle}
        onSearch={() => {}}
        userName="Kmaris Admin"
        userRole="Editor"
        userInitials="KA"
        notifications={3}
        isSidebarOpen={sidebarOpen}
        isMobile={isMobile}
        onLogout={handleLogout}
      />
      <MainContent sidebarOpen={sidebarOpen} isMobile={isMobile}>
        <Filters timeRange={timeRange} onTimeRangeChange={setTimeRange} />
        <MetricsGrid analyticsData={analyticsData} />
        <ChartsGrid>
          <MonthlyPublicationsChart monthlyStats={analyticsData.monthlyStats} />
          <StatusDistributionChart statusDistribution={analyticsData.statusDistribution} />
        </ChartsGrid>
        <ViewsOverTimeChart viewsOverTime={analyticsData.viewsOverTime} />
      </MainContent>
    </AnalyticsRoot>
  );
};

export default AnalyticsPage;