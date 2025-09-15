// app/news-dashboard/articles/page.tsx
"use client";

import { FC, useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Home,
  FileText,
  BarChart3,
  Settings,
  Plus,
  Eye,
  Edit,
  Archive,
  Grid3X3,
  List,
  Calendar,
  User,
  Search,
  ChevronLeft,
  ChevronRight,
  Play,
  ArchiveIcon,
} from "lucide-react";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { Header } from "@/components/header/Header";
import {
  ArticlesPageProps,
  NewsArticle,
  FilterOptions,
  SortOptions,
  ViewMode,
  ArticleCardProps,
  PaginationOptions,
} from "./interface";
import {
  ArticlesRoot,
  MainContent,
  SidebarOverlay,
  ControlsContainer,
  FiltersContainer,
  FilterSelect,
  SortContainer,
  ViewToggle,
  ViewToggleButton,
  ArticlesGrid,
  ArticleCard,
  ArticleImage,
  ArticleContent,
  ArticleHeader,
  ArticleTitle,
  ArticleActions,
  ActionButton,
  ArticleMeta,
  MetaItem,
  CategoryBadge,
  ArticleDescription,
  SearchResultsHeader,
  SearchResultsCount,
  SearchQuery,
  ClearSearchButton,
  NoResults,
  NoResultsIcon,
  NoResultsTitle,
  NoResultsText,
  PaginationContainer,
  PaginationButton,
  PaginationInfo,
} from "./elements";

// Utility function to truncate text
const truncateText = (text: string, limit: number): string => {
  if (!text) return '';
  return text.length > limit ? `${text.slice(0, limit)}...` : text;
};

// Article Card Component
const ArticleCardComponent: FC<ArticleCardProps> = ({
  article,
  viewMode,
  onEdit,
  onArchive,
  onView,
}) => {
  const titleLimit = viewMode === 'grid' ? 60 : 80;
  const descriptionLimit = viewMode === 'grid' ? 120 : 150;

  return (
    <ArticleCard viewMode={viewMode}>
      <ArticleImage
        backgroundImage={article.newsImage}
        viewMode={viewMode}
        hasVideo={!!article.newsVideo}
      >
        {!article.newsImage && !article.newsVideo && <FileText size={32} />}
      </ArticleImage>

      <ArticleContent viewMode={viewMode}>
        <ArticleHeader>
          <ArticleTitle title={article.title}>
            {truncateText(article.title, titleLimit)}
          </ArticleTitle>
          <ArticleActions>
            <ActionButton
              variant="view"
              onClick={() => onView(article._id)}
              title="View Article"
            >
              <Eye size={16} />
            </ActionButton>
            <ActionButton
              variant="edit"
              onClick={() => onEdit(article._id)}
              title="Edit Article"
            >
              <Edit size={16} />
            </ActionButton>
            <ActionButton
              variant="archive"
              onClick={() => onArchive(article._id)}
              title="Archive Article"
            >
              <Archive size={16} />
            </ActionButton>
          </ArticleActions>
        </ArticleHeader>

        <ArticleMeta>
          <CategoryBadge category={article.category}>
            {article.category}
          </CategoryBadge>
          <MetaItem>
            <Calendar size={14} />
            {new Date(article.date).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })}
          </MetaItem>
          {article.views !== undefined && (
            <MetaItem>
              <Eye size={14} />
              {article.views.toLocaleString()}
            </MetaItem>
          )}
          {article.readTime && (
            <MetaItem>
              <Calendar size={14} />
              {article.readTime}
            </MetaItem>
          )}
        </ArticleMeta>

        <ArticleDescription viewMode={viewMode}>
          {truncateText(article.description, descriptionLimit)}
        </ArticleDescription>
      </ArticleContent>
    </ArticleCard>
  );
};

export const ArticlesPage: FC<ArticlesPageProps> = ({
  sidebarOpen,
  onSidebarToggle,
  isMobile = false,
}) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [filters, setFilters] = useState<FilterOptions>({
    category: "all",
    status: "all",
  });
  const [sortOptions, setSortOptions] = useState<SortOptions>({
    field: "date",
    direction: "desc",
  });
  const [pagination, setPagination] = useState<PaginationOptions>({
    currentPage: 1,
    itemsPerPage: 12,
    totalItems: 0,
  });
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch articles from API
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/articles");
        if (!response.ok) {
          throw new Error("Failed to fetch articles");
        }
        const data = await response.json();
        setArticles(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // Get unique categories for filters
  const uniqueCategories = useMemo(
    () => [...new Set(articles.map((article) => article.category))].sort(),
    [articles]
  );

  // Filter and sort articles
  const filteredAndSortedArticles = useMemo(() => {
    let filtered = articles;

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (article) =>
          article.title.toLowerCase().includes(query) ||
          article.category.toLowerCase().includes(query) ||
          article.description.toLowerCase().includes(query)
      );
    }

    // Apply category filter
    if (filters.category !== "all") {
      filtered = filtered.filter(
        (article) => article.category === filters.category
      );
    }

    // Apply status filter
    if (filters.status !== "all") {
      filtered = filtered.filter(
        (article) => (article.status || 'published') === filters.status
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue: any = a[sortOptions.field];
      let bValue: any = b[sortOptions.field];

      if (sortOptions.field === "date") {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      } else if (typeof aValue === "string") {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sortOptions.direction === "asc") {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    return filtered;
  }, [searchQuery, filters, sortOptions, articles]);

  // Paginate articles
  const paginatedArticles = useMemo(() => {
    const startIndex = (pagination.currentPage - 1) * pagination.itemsPerPage;
    const endIndex = startIndex + pagination.itemsPerPage;
    return filteredAndSortedArticles.slice(startIndex, endIndex);
  }, [
    filteredAndSortedArticles,
    pagination.currentPage,
    pagination.itemsPerPage,
  ]);

  // Update total items when filtered articles change
  useMemo(() => {
    setPagination((prev) => ({
      ...prev,
      totalItems: filteredAndSortedArticles.length,
      currentPage: 1,
    }));
  }, [filteredAndSortedArticles.length]);

  const totalPages = Math.ceil(pagination.totalItems / pagination.itemsPerPage);

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

  const handleEdit = (articleId: string) => {
    router.push(`/news-dashboard/articles/edit/${articleId}`);
  };

  const handleArchive = (articleId: string) => {
    console.log("Archive article:", articleId);
    // Implement archive functionality
  };

  const handleView = (articleId: string) => {
    console.log("View article:", articleId);
    // Navigate to article detail page
  };

  const handlePageChange = (page: number) => {
    setPagination((prev) => ({
      ...prev,
      currentPage: page,
    }));
  };

  return (
    <ArticlesRoot>
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
                active: true,
              },
              {
                icon: <Plus size={20} />,
                text: "Create Article",
                href: "/news-dashboard/create-article",
              },
              {
                icon: <ArchiveIcon size={20} />,
                text: "Archive",
                href: "/news-dashboard/archive-news",
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
        title="All Articles"
        onMenuToggle={onSidebarToggle}
        onSearch={handleSearch}
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
              <FileText size={48} />
            </NoResultsIcon>
            <NoResultsTitle>Loading articles...</NoResultsTitle>
          </NoResults>
        )}

        {/* Error State */}
        {error && !loading && (
          <NoResults>
            <NoResultsIcon>
              <FileText size={48} />
            </NoResultsIcon>
            <NoResultsTitle>Error loading articles</NoResultsTitle>
            <NoResultsText>{error}</NoResultsText>
          </NoResults>
        )}

        {/* Search Results Header */}
        {!loading && !error && searchQuery && (
          <SearchResultsHeader>
            <SearchResultsCount>
              {filteredAndSortedArticles.length} result
              {filteredAndSortedArticles.length !== 1 ? "s" : ""} for{" "}
              <SearchQuery>"{searchQuery}"</SearchQuery>
            </SearchResultsCount>
            <ClearSearchButton onClick={clearSearch}>
              Clear Search
            </ClearSearchButton>
          </SearchResultsHeader>
        )}

        {/* Controls */}
        {!loading && !error && (
          <ControlsContainer>
            <FiltersContainer>
              <FilterSelect
                value={filters.category}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, category: e.target.value }))
                }
              >
                <option value="all">All Categories</option>
                {uniqueCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </FilterSelect>

              <FilterSelect
                value={filters.status}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, status: e.target.value }))
                }
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
              </FilterSelect>
            </FiltersContainer>

            <SortContainer>
              <FilterSelect
                value={`${sortOptions.field}-${sortOptions.direction}`}
                onChange={(e) => {
                  const [field, direction] = e.target.value.split("-");
                  setSortOptions({
                    field: field as SortOptions["field"],
                    direction: direction as SortOptions["direction"],
                  });
                }}
              >
                <option value="date-desc">Newest First</option>
                <option value="date-asc">Oldest First</option>
                <option value="title-asc">Title A-Z</option>
                <option value="title-desc">Title Z-A</option>
                <option value="views-desc">Most Views</option>
                <option value="views-asc">Least Views</option>
                <option value="category-asc">Category A-Z</option>
              </FilterSelect>

              <ViewToggle>
                <ViewToggleButton
                  active={viewMode === "grid"}
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3X3 size={16} />
                  Grid
                </ViewToggleButton>
                <ViewToggleButton
                  active={viewMode === "list"}
                  onClick={() => setViewMode("list")}
                >
                  <List size={16} />
                  List
                </ViewToggleButton>
              </ViewToggle>
            </SortContainer>
          </ControlsContainer>
        )}

        {/* Articles Grid/List */}
        {!loading && !error && paginatedArticles.length > 0 ? (
          <>
            <ArticlesGrid viewMode={viewMode}>
              {paginatedArticles.map((article) => (
                <ArticleCardComponent
                  key={article._id}
                  article={article}
                  viewMode={viewMode}
                  onEdit={handleEdit}
                  onArchive={handleArchive}
                  onView={handleView}
                />
              ))}
            </ArticlesGrid>

            {/* Pagination */}
            {totalPages > 1 && (
              <PaginationContainer>
                <PaginationButton
                  disabled={pagination.currentPage === 1}
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                >
                  <ChevronLeft size={16} />
                </PaginationButton>

                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNumber;
                  if (totalPages <= 5) {
                    pageNumber = i + 1;
                  } else if (pagination.currentPage <= 3) {
                    pageNumber = i + 1;
                  } else if (pagination.currentPage >= totalPages - 2) {
                    pageNumber = totalPages - 4 + i;
                  } else {
                    pageNumber = pagination.currentPage - 2 + i;
                  }

                  return (
                    <PaginationButton
                      key={pageNumber}
                      active={pagination.currentPage === pageNumber}
                      onClick={() => handlePageChange(pageNumber)}
                    >
                      {pageNumber}
                    </PaginationButton>
                  );
                })}

                <PaginationButton
                  disabled={pagination.currentPage === totalPages}
                  onClick={() => handlePageChange(pagination.currentPage + 1)}
                >
                  <ChevronRight size={16} />
                </PaginationButton>

                <PaginationInfo>
                  Showing{" "}
                  {(pagination.currentPage - 1) * pagination.itemsPerPage + 1}{" "}
                  to{" "}
                  {Math.min(
                    pagination.currentPage * pagination.itemsPerPage,
                    pagination.totalItems
                  )}{" "}
                  of {pagination.totalItems} articles
                </PaginationInfo>
              </PaginationContainer>
            )}
          </>
        ) : (
          // No Results State
          !loading &&
          !error && (
            <NoResults>
              <NoResultsIcon>
                <Search size={48} />
              </NoResultsIcon>
              <NoResultsTitle>
                {searchQuery ? "No articles found" : "No articles available"}
              </NoResultsTitle>
              <NoResultsText>
                {searchQuery
                  ? `We couldn't find any articles matching "${searchQuery}". Try adjusting your search terms or filters.`
                  : "There are currently no articles to display. Create your first article to get started!"}
              </NoResultsText>
            </NoResults>
          )
        )}
      </MainContent>
    </ArticlesRoot>
  );
};

export default ArticlesPage;