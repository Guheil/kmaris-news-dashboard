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
  Play,
  Search,
  EyeIcon,
} from "lucide-react";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { Header } from "@/components/header/Header";
import {
  DashboardProps,
  CardProps,
  NewsArticle,
  ApiArticle,
} from "./interface";
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
import { palette } from "@/theme/pallete";
import Link from "next/link";

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
        const formattedArticles = data.map((article: ApiArticle) => ({
          // Updated type here
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
          status: article.status || "published",
        }));
        const sortedArticles = formattedArticles.sort(
          (a: NewsArticle, b: NewsArticle) => {
            // Updated types here
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

  // Enhanced search functionality with sorting
  const filteredNews = useMemo(() => {
    if (!searchQuery.trim()) {
      // Return sorted articles (already sorted from fetch)
      return articles;
    }

    const query = searchQuery.toLowerCase().trim();
    // Filter first
    let filtered = articles.filter(
      (article) =>
        article.title.toLowerCase().includes(query) ||
        article.author.toLowerCase().includes(query) ||
        article.category.toLowerCase().includes(query) ||
        article.description.toLowerCase().includes(query)
    );
    // Then sort by date descending (latest first)
    filtered = filtered.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateB - dateA;
    });
    return filtered;
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

  // Calculate statistics based on ALL filtered results (not limited to 5)
  const totalArticles = filteredNews.length;
  const uniqueCategories = new Set(
    filteredNews.map((article) => article.category)
  ).size;
  const totalViews = filteredNews.reduce(
    (sum, article) => sum + (article.views || 0),
    0
  );
  const averageViews = totalArticles > 0 ? totalViews / totalArticles : 0;

  const categoryCounts = filteredNews.reduce((acc, article) => {
    acc[article.category] = (acc[article.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const mostPopularCategory =
    Object.keys(categoryCounts).length > 0
      ? Object.keys(categoryCounts).reduce((a, b) =>
          categoryCounts[a] > categoryCounts[b] ? a : b
        )
      : "N/A";

  // Limit displayed news to 5 for the table
  const displayedNews = filteredNews.slice(0, 5);

  // Sort articles for activity feed (latest first)
  const sortedArticlesForActivity = articles.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA;
  });

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
            {/* Updated Statistics Cards - reflect ALL filtered results */}
            <StatsGrid>
              <StatCard>
                <StatIcon color={palette.primary.main}>
                  <FileText size={20} />
                </StatIcon>
                <StatNumber>{totalArticles}</StatNumber>
                <StatLabel>
                  {searchQuery ? "Found Articles" : "Total Published Articles"}
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
                  {averageViews >= 1000
                    ? `${(averageViews / 1000).toFixed(1)}k`
                    : averageViews.toFixed(1)}
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
                        {totalArticles} result{totalArticles !== 1 ? "s" : ""}{" "}
                        for <SearchQuery>&quot;{searchQuery}&quot;</SearchQuery>
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
                            <ActionButton
                              variant="delete"
                              title="Delete Article"
                            >
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
                        We couldn&apos;t find any articles matching &quot;
                        {searchQuery}&quot;.
                        <br />
                        Try adjusting your search terms or browse all articles.
                      </NoResultsText>
                    </NoResults>
                  )}
                </NewsTable>
              </DashboardCard>

              <DashboardCard title="Quick Actions" gridColumn="span 4">
                <QuickActionGrid>
                  <Link href="/news-dashboard/create-article" passHref>
                    <QuickActionButton>
                      <Plus size={16} />
                      Create New Article
                    </QuickActionButton>
                  </Link>
                  <QuickActionButton>
                    <FileText size={16} />
                    Manage Categories
                  </QuickActionButton>
                  
                  <Link href="/news-dashboard/analytics" passHref>
                    <QuickActionButton>
                      <BarChart3 size={16} />
                      View Analytics
                    </QuickActionButton>
                  </Link>
                  <QuickActionButton>
                    <Settings size={16} />
                    Dashboard Settings
                  </QuickActionButton>
                </QuickActionGrid>
              </DashboardCard>

              <DashboardCard
                title={
                  searchQuery ? "Recent Activity (All)" : "Recent Activity"
                }
                gridColumn="span 12"
              >
                <div>
                  {sortedArticlesForActivity.length > 0 ? (
                    <>
                      <ActivityItem>
                        <ActivityIcon color={palette.primary.main}>
                          <Plus size={16} />
                        </ActivityIcon>
                        <ActivityContent>
                          <ActivityText>
                            New article &quot;
                            {sortedArticlesForActivity[0]?.title}&quot; was
                            published
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
                            Article &quot;{sortedArticlesForActivity[1]?.title}
                            &quot; was updated
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
                            Draft &quot;{sortedArticlesForActivity[2]?.title}
                            &quot; saved
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
                            Article &quot;{sortedArticlesForActivity[3]?.title}
                            &quot; was archived
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
