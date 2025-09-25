"use client";

import { FC, useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Home,
  FileText,
  BarChart3,
  Settings,
  EyeIcon,
  LogOut,
  LogsIcon,
} from "lucide-react";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { Header } from "@/components/header/Header";
import { DashboardProps, NewsArticle, ApiArticle, Category } from "./interface";
import { DashboardRoot, MainContent, DashboardGrid, SidebarOverlay, NoResults, NoResultsIcon, NoResultsTitle, NoResultsText } from "./elements";
import { getSession, clearSession } from "@/app/login/sessionUtils";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { StatsGrid } from "@/components/StatsGrid/StatsGrid";
import { NewsTable } from "@/components/NewsTable/NewsTable";
import { QuickActions } from "@/components/QuickActions/QuickActions";
import { RecentActivity } from "@/components/RecentActivity/RecentActivity";
import { DashboardCard } from "@/components/DashboardCard/DashboardCard";

export const NewsDashboard: FC<DashboardProps> = ({
  sidebarOpen,
  onSidebarToggle,
  isMobile = false,
}) => {
  const router = useRouter();
  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down("md"));
  const [searchQuery, setSearchQuery] = useState("");
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [categoriesError, setCategoriesError] = useState<string | null>(null);

  useEffect(() => {
    const session = getSession();
    if (!session) {
      router.push("/");
    }
  }, [router]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/articles");
        if (!response.ok) {
          throw new Error(`Failed to fetch articles: ${response.statusText}`);
        }
        const data = await response.json();
        const formattedArticles = data.map((article: ApiArticle) => ({
          _id: article._id || "",
          title: article.title || "",
          author: article.author || "",
          date: article.date || new Date().toISOString(),
          newsImage: article.newsImage || "",
          newsVideo: article.newsVideo || "",
          readTime: article.readTime || "N/A",
          category: article.category || "",
          description: article.description || "",
          views: article.views || 0,
          status: article.status || "published",
        }));
        const sortedArticles = formattedArticles.sort(
          (a: NewsArticle, b: NewsArticle) => {
            const dateA = new Date(a.date).getTime();
            const dateB = new Date(b.date).getTime();
            return dateB - dateA;
          }
        );
        setArticles(sortedArticles);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setCategoriesLoading(true);
        const response = await fetch("/api/categories");
        if (!response.ok) {
          throw new Error(`Failed to fetch categories: ${response.statusText}`);
        }
        const data = await response.json();
        setCategories(data);
        setCategoriesError(null);
      } catch (err) {
        setCategoriesError(
          err instanceof Error ? err.message : "Failed to load categories"
        );
      } finally {
        setCategoriesLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const getCategoryName = (categoryId: string): string => {
    const category = categories.find((cat) => cat._id === categoryId);
    return category ? category.categoryName : "Uncategorized";
  };

  const filteredNews = useMemo(() => {
    if (!searchQuery.trim()) {
      return articles;
    }

    const query = searchQuery.toLowerCase().trim();
    let filtered = articles.filter((article) => {
      const categoryName = getCategoryName(article.category).toLowerCase();
      return (
        article.title.toLowerCase().includes(query) ||
        article.author.toLowerCase().includes(query) ||
        categoryName.includes(query) ||
        article.description.toLowerCase().includes(query)
      );
    });
    filtered = filtered.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateB - dateA;
    });
    return filtered;
  }, [searchQuery, articles, categories]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  const handleOverlayClick = () => {
    if (isMobile) {
      onSidebarToggle();
    }
  };

  const handleLogout = () => {
    clearSession();
    router.push("/login");
  };

  const totalArticles = filteredNews.length;
  const totalCategoriesFromDB =
    categoriesError || categoriesLoading ? 0 : categories.length;
  const uniqueCategories = new Set(
    filteredNews.map((article) => article.category)
  ).size;
  const totalViews = filteredNews.reduce(
    (sum, article) => sum + (article.views || 0),
    0
  );
  const averageViews = totalArticles > 0 ? totalViews / totalArticles : 0;

  const categoryCounts = filteredNews.reduce((acc, article) => {
    const categoryName = getCategoryName(article.category);
    acc[categoryName] = (acc[categoryName] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const mostPopularCategory =
    Object.keys(categoryCounts).length > 0
      ? Object.keys(categoryCounts).reduce((a, b) =>
          categoryCounts[a] > categoryCounts[b] ? a : b
        )
      : "N/A";

  const isLoading = loading || categoriesLoading;
  const hasError = !isLoading && (error || categoriesError);

  return (
    <DashboardRoot>
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
                active: true,
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
                icon: <FileText size={20} />,
                text: "Create Article",
                href: "/news-dashboard/create-article",
              },
              {
                icon: <BarChart3 size={20} />,
                text: "Analytics",
                href: "/news-dashboard/analytics",
                active: false,
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
        userInitials="JD"
        collapsible={!isMobile}
        navItems={[]}
      />
      <Header
        title="News Dashboard"
        onMenuToggle={onSidebarToggle}
        onSearch={handleSearch}
        searchValue={searchQuery}
        userName="Kmaris Admin"
        userRole="Editor"
        userInitials="JD"
        notifications={3}
        isSidebarOpen={sidebarOpen}
        isMobile={isMobile}
      />
      <MainContent sidebarOpen={sidebarOpen} isMobile={isMobile}>
        {isLoading && (
          <NoResults>
            <NoResultsIcon>
              <FileText size={28} />
            </NoResultsIcon>
            <NoResultsTitle>Loading dashboard...</NoResultsTitle>
          </NoResults>
        )}
        {hasError && (
          <NoResults>
            <NoResultsIcon>
              <FileText size={28} />
            </NoResultsIcon>
            <NoResultsTitle>Error loading dashboard</NoResultsTitle>
            <NoResultsText>
              {error || categoriesError || "An unexpected error occurred."}
            </NoResultsText>
          </NoResults>
        )}
        {!isLoading && !hasError && (
          <>
            <StatsGrid
              totalArticles={totalArticles}
              totalCategories={totalCategoriesFromDB}
              uniqueCategories={uniqueCategories}
              averageViews={averageViews}
              mostPopularCategory={mostPopularCategory}
              searchQuery={searchQuery}
            />
            <DashboardGrid>
              <DashboardCard
                title={searchQuery ? "Search Results" : "Recent Articles"}
                gridColumn={isMobileView ? "1fr" : "span 8"}
              >
                <NewsTable
                  articles={filteredNews}
                  searchQuery={searchQuery}
                  clearSearch={clearSearch}
                  getCategoryName={getCategoryName}
                />
              </DashboardCard>
              <DashboardCard
                title="Quick Actions"
                gridColumn={isMobileView ? "1fr" : "span 4"}
              >
                <QuickActions />
              </DashboardCard>
              <DashboardCard
                title={searchQuery ? "Recent Activity (All)" : "Recent Activity"}
                gridColumn={isMobileView ? "1fr" : "span 12"}
              >
                <RecentActivity articles={filteredNews} searchQuery={searchQuery} />
              </DashboardCard>
            </DashboardGrid>
          </>
        )}
      </MainContent>
    </DashboardRoot>
  );
};