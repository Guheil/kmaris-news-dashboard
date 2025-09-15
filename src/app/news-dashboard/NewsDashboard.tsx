"use client";

import { FC, useState, useMemo, useEffect } from "react";
import {
  Home,
  FileText,
  BarChart3,
  Settings,
  Plus,
  Eye,
  Edit,
  Trash2,
  TrendingUp,
  Users,
  Calendar,
  ArchiveIcon,
  Play,
  Search,
} from "lucide-react";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { Header } from "@/components/header/Header";
import { DashboardProps, CardProps, NewsArticle } from "./interface";
import {
  DashboardRoot,
  MainContent,
  DashboardGrid,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  SidebarOverlay,
  StatsGrid,
  StatCard,
  StatIcon,
  StatNumber,
  StatLabel,
  NewsTable,
  NewsTableHeader,
  NewsTableRow,
  NewsTitle,
  MediaPreviewContainer,
  NewsImage,
  MediaPlaceholder,
  NewsTitleText,
  NewsAuthor,
  NewsDate,
  NewsViews,
  ActionButtons,
  ActionButton,
  CategoryBadge,
  QuickActionGrid,
  QuickActionButton,
  ActivityItem,
  ActivityIcon,
  ActivityContent,
  ActivityText,
  ActivityTime,
  NoResults,
  NoResultsIcon,
  NoResultsTitle,
  NoResultsText,
  SearchResultsHeader,
  SearchResultsCount,
  SearchQuery,
  ClearSearchButton,
} from "./elements";
import { styled } from "@mui/material/styles";
import { palette } from "@/theme/pallete";

// Updated MediaPreview component with consistent sizing
const MediaPreview: FC<{ article: NewsArticle }> = ({ article }) => {
  return (
    <MediaPreviewContainer>
      {article.newsImage ? (
        <NewsImage src={article.newsImage} alt={article.title} />
      ) : article.newsVideo ? (
        <MediaPlaceholder type="video">
          <Play size={16} />
        </MediaPlaceholder>
      ) : (
        <MediaPlaceholder type="document">
          <FileText size={16} />
        </MediaPlaceholder>
      )}
    </MediaPreviewContainer>
  );
};

const DashboardCard: FC<CardProps> = ({
  title,
  gridColumn = "span 4",
  children,
}) => (
  <Card style={{ gridColumn }}>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent>{children}</CardContent>
  </Card>
);

export const NewsDashboard: FC<DashboardProps> = ({
  sidebarOpen,
  onSidebarToggle,
  isMobile = false,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch articles from /api/articles
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/articles");
        if (!response.ok) {
          throw new Error(`Failed to fetch articles: ${response.statusText}`);
        }
        const data = await response.json();
        // Ensure data conforms to NewsArticle interface
        const formattedArticles = data.map((article: any) => ({
          _id: article._id || "",
          title: article.title || "",
          author: article.author || "",
          date: article.date || new Date().toISOString(),
          newsImage: article.newsImage || "",
          newsVideo: article.newsVideo || "",
          readTime: article.readTime || "N/A",
          category: article.category || "Uncategorized",
          description: article.description || "",
          views: article.views || 0,
        }));
        setArticles(formattedArticles);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // Enhanced search functionality
  const filteredNews = useMemo(() => {
    if (!searchQuery.trim()) {
      return articles;
    }

    const query = searchQuery.toLowerCase().trim();
    return articles.filter(
      (article) =>
        article.title.toLowerCase().includes(query) ||
        article.author.toLowerCase().includes(query) ||
        article.category.toLowerCase().includes(query) ||
        article.description.toLowerCase().includes(query)
    );
  }, [searchQuery, articles]);

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

  // Calculate statistics based on filtered results
  const displayedNews = filteredNews;
  const totalArticles = displayedNews.length;
  const uniqueCategories = new Set(
    displayedNews.map((article) => article.category)
  ).size;
  const totalViews = displayedNews.reduce(
    (sum, article) => sum + (article.views || 0),
    0
  );
  const averageViews = totalArticles > 0 ? totalViews / totalArticles : 0;

  const categoryCounts = displayedNews.reduce((acc, article) => {
    acc[article.category] = (acc[article.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const mostPopularCategory =
    Object.keys(categoryCounts).length > 0
      ? Object.keys(categoryCounts).reduce((a, b) =>
          categoryCounts[a] > categoryCounts[b] ? a : b
        )
      : "N/A";

  return (
    <DashboardRoot>
      {/* Mobile overlay */}
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
                icon: <Plus size={20} />,
                text: "Create Article",
                href: "/news-dashboard/create-article",
              },
              {
                icon: <ArchiveIcon size={20} />,
                text: "Archive",
                href: "/news-dashboard/archive",
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
        title="News Dashboard"
        onMenuToggle={onSidebarToggle}
        onSearch={handleSearch}
        searchValue={searchQuery}
        userName="John Doe"
        userRole="Editor"
        userInitials="JD"
        notifications={3}
        isSidebarOpen={sidebarOpen}
        isMobile={isMobile}
      />

      <MainContent sidebarOpen={sidebarOpen} isMobile={isMobile}>
        {/* Loading State */}
        {loading && (
          <NoResults>
            <NoResultsIcon>
              <FileText size={28} />
            </NoResultsIcon>
            <NoResultsTitle>Loading dashboard...</NoResultsTitle>
          </NoResults>
        )}

        {/* Error State */}
        {error && !loading && (
          <NoResults>
            <NoResultsIcon>
              <FileText size={28} />
            </NoResultsIcon>
            <NoResultsTitle>Error loading dashboard</NoResultsTitle>
            <NoResultsText>{error}</NoResultsText>
          </NoResults>
        )}

        {!loading && !error && (
          <>
            {/* Updated Statistics Cards - now reflect search results */}
            <StatsGrid>
              <StatCard>
                <StatIcon color={palette.primary.main}>
                  <FileText size={20} />
                </StatIcon>
                <StatNumber>{totalArticles}</StatNumber>
                <StatLabel>
                  {searchQuery ? "Found Articles" : "Total Articles"}
                </StatLabel>
              </StatCard>
              <StatCard>
                <StatIcon color="#10b981">
                  <Settings size={20} />
                </StatIcon>
                <StatNumber>{uniqueCategories}</StatNumber>
                <StatLabel>
                  {searchQuery ? "Categories Found" : "Total Categories"}
                </StatLabel>
              </StatCard>
              <StatCard>
                <StatIcon color="#f59e0b">
                  <TrendingUp size={20} />
                </StatIcon>
                <StatNumber>
                  {averageViews.toFixed(1)}
                </StatNumber>
                <StatLabel>Average Views</StatLabel>
              </StatCard>
              <StatCard>
                <StatIcon color="#8b5cf6">
                  <Users size={20} />
                </StatIcon>
                <StatNumber
                  style={{
                    fontSize: mostPopularCategory.length > 10 ? "20px" : "28px",
                  }}
                >
                  {mostPopularCategory}
                </StatNumber>
                <StatLabel>Top Category</StatLabel>
              </StatCard>
            </StatsGrid>

            <DashboardGrid>
              <DashboardCard
                title={searchQuery ? "Search Results" : "Recent Articles"}
                gridColumn="span 8"
              >
                <NewsTable>
                  {/* Search results header */}
                  {searchQuery && (
                    <SearchResultsHeader>
                      <SearchResultsCount>
                        {totalArticles} result{totalArticles !== 1 ? "s" : ""} for{" "}
                        <SearchQuery>"{searchQuery}"</SearchQuery>
                      </SearchResultsCount>
                      <ClearSearchButton onClick={clearSearch}>
                        Clear Search
                      </ClearSearchButton>
                    </SearchResultsHeader>
                  )}

                  {totalArticles > 0 ? (
                    <>
                      <NewsTableHeader>
                        <div>Article</div>
                        <div>Author</div>
                        <div>Date</div>
                        <div>Views</div>
                        <div>Actions</div>
                      </NewsTableHeader>
                      {displayedNews.map((article) => (
                        <NewsTableRow key={article._id}>
                          <NewsTitle>
                            <MediaPreview article={article} />
                            <div>
                              <NewsTitleText>{article.title}</NewsTitleText>
                              <CategoryBadge category={article.category}>
                                {article.category}
                              </CategoryBadge>
                            </div>
                          </NewsTitle>
                          <NewsAuthor>{article.author}</NewsAuthor>
                          <NewsDate>
                            {new Date(article.date).toLocaleDateString()}
                          </NewsDate>
                          <NewsViews>
                            <Eye size={14} />
                            {(article.views || 0).toLocaleString()}
                          </NewsViews>
                          <ActionButtons>
                            <ActionButton variant="view" title="View Article">
                              <Eye size={14} />
                            </ActionButton>
                            <ActionButton variant="edit" title="Edit Article">
                              <Edit size={14} />
                            </ActionButton>
                            <ActionButton variant="delete" title="Delete Article">
                              <Trash2 size={14} />
                            </ActionButton>
                          </ActionButtons>
                        </NewsTableRow>
                      ))}
                    </>
                  ) : (
                    // No results state
                    <NoResults>
                      <NoResultsIcon>
                        <Search size={28} />
                      </NoResultsIcon>
                      <NoResultsTitle>No articles found</NoResultsTitle>
                      <NoResultsText>
                        We couldn't find any articles matching "{searchQuery}".
                        <br />
                        Try adjusting your search terms or browse all articles.
                      </NoResultsText>
                    </NoResults>
                  )}
                </NewsTable>
              </DashboardCard>

              <DashboardCard title="Quick Actions" gridColumn="span 4">
                <QuickActionGrid>
                  <QuickActionButton>
                    <Plus size={16} />
                    Create New Article
                  </QuickActionButton>
                  <QuickActionButton>
                    <FileText size={16} />
                    Manage Categories
                  </QuickActionButton>
                  <QuickActionButton>
                    <BarChart3 size={16} />
                    View Analytics
                  </QuickActionButton>
                  <QuickActionButton>
                    <Settings size={16} />
                    Dashboard Settings
                  </QuickActionButton>
                </QuickActionGrid>
              </DashboardCard>

              <DashboardCard
                title={searchQuery ? "Recent Activity (All)" : "Recent Activity"}
                gridColumn="span 12"
              >
                <div>
                  {articles.length > 0 ? (
                    <>
                      <ActivityItem>
                        <ActivityIcon color={palette.primary.main}>
                          <Plus size={16} />
                        </ActivityIcon>
                        <ActivityContent>
                          <ActivityText>
                            New article "{articles[0]?.title}" was published
                          </ActivityText>
                          <ActivityTime>2 minutes ago</ActivityTime>
                        </ActivityContent>
                      </ActivityItem>
                      <ActivityItem>
                        <ActivityIcon color="#10b981">
                          <Edit size={16} />
                        </ActivityIcon>
                        <ActivityContent>
                          <ActivityText>
                            Article "{articles[1]?.title}" was updated
                          </ActivityText>
                          <ActivityTime>15 minutes ago</ActivityTime>
                        </ActivityContent>
                      </ActivityItem>
                      <ActivityItem>
                        <ActivityIcon color="#f59e0b">
                          <FileText size={16} />
                        </ActivityIcon>
                        <ActivityContent>
                          <ActivityText>
                            Draft "{articles[2]?.title}" saved
                          </ActivityText>
                          <ActivityTime>1 hour ago</ActivityTime>
                        </ActivityContent>
                      </ActivityItem>
                      <ActivityItem>
                        <ActivityIcon color="#8b5cf6">
                          <Trash2 size={16} />
                        </ActivityIcon>
                        <ActivityContent>
                          <ActivityText>
                            Article "{articles[3]?.title}" was archived
                          </ActivityText>
                          <ActivityTime>3 hours ago</ActivityTime>
                        </ActivityContent>
                      </ActivityItem>
                    </>
                  ) : (
                    <NoResultsText>No recent activity</NoResultsText>
                  )}
                </div>
              </DashboardCard>
            </DashboardGrid>
          </>
        )}
      </MainContent>
    </DashboardRoot>
  );
};