"use client";

import { FC, useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Home,
  FileText,
  BarChart3,
  Plus,
  Eye,
  Edit,
  Archive,
  Grid3X3,
  List,
  Calendar,
  Search,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Trash2,
  EyeIcon,
} from "lucide-react";
import Swal from "sweetalert2";
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
  Category, 
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
  if (!text) return "";
  return text.length > limit ? `${text.slice(0, limit)}...` : text;
};

// Utility function to get video embed details
const getVideoEmbedDetails = (url: string) => {
  // Helper to normalize URL (add https:// if missing)
  const normalizedUrl = url.startsWith("http") ? url : `https://${url}`;

  // Direct video file check (e.g., .mp4, .webm)
  const directVideoRegex = /\.(mp4|avi|mov|wmv|flv|webm|ogv|mkv)$/i;
  if (directVideoRegex.test(normalizedUrl)) {
    return { type: "video" as const, src: normalizedUrl };
  }

  // YouTube
  const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const youtubeMatch = normalizedUrl.match(youtubeRegex);
  if (youtubeMatch) {
    return { type: "iframe" as const, src: `https://www.youtube.com/embed/${youtubeMatch[1]}` };
  }

  // Vimeo
  const vimeoRegex = /(?:vimeo\.com\/|player\.vimeo\.com\/video\/)(\d+)/;
  const vimeoMatch = normalizedUrl.match(vimeoRegex);
  if (vimeoMatch) {
    return { type: "iframe" as const, src: `https://player.vimeo.com/video/${vimeoMatch[1]}` };
  }

  // Dailymotion
  const dailymotionRegex = /(?:dailymotion\.com\/video\/|dailymotion\.com\/embed\/video\/)([a-zA-Z0-9]+)/;
  const dailymotionMatch = normalizedUrl.match(dailymotionRegex);
  if (dailymotionMatch) {
    return { type: "iframe" as const, src: `https://www.dailymotion.com/embed/video/${dailymotionMatch[1]}` };
  }

  // Google Drive
  const driveRegex = /\/file\/d\/([a-zA-Z0-9-_]+)(?:\/[^\/\s]*)?|open\?id=([a-zA-Z0-9-_]+)/;
  const driveMatch = normalizedUrl.match(driveRegex);
  if (driveMatch) {
    const fileId = driveMatch[1] || driveMatch[2];
    return { type: "iframe" as const, src: `https://drive.google.com/file/d/${fileId}/preview` };
  }

  // Fallback: Generic iframe for other URLs
  return { type: "iframe" as const, src: normalizedUrl };
};

// Article Card Component
const ArticleCardComponent: FC<ArticleCardProps & { categories: Category[] }> = ({
  article,
  viewMode,
  categories,
  onEdit,
  onArchive,
  onView,
  onRestore,
  onDelete,
}) => {
  const titleLimit = viewMode === "grid" ? 60 : 80;
  const descriptionLimit = viewMode === "grid" ? 120 : 150;
  const isArchived = article.status === "archived";

  const categoryObj = categories.find(cat => cat._id === article.category);
  const categoryName = categoryObj?.categoryName || article.category;

  const videoEmbedDetails = article.videoUrl
    ? getVideoEmbedDetails(article.videoUrl)
    : null;

  return (
    <ArticleCard viewMode={viewMode} isArchived={isArchived}>
      <ArticleImage
        backgroundImage={article.newsImage}
        viewMode={viewMode}
        hasVideo={!!article.newsVideo || !!article.videoUrl}
        isArchived={isArchived}
      >
        {videoEmbedDetails ? (
          videoEmbedDetails.type === "video" ? (
            <video
              width="100%"
              height="100%"
              src={videoEmbedDetails.src}
              controls
              style={{ borderRadius: "8px", objectFit: "cover" }}
            >
              Your browser does not support the video tag.
            </video>
          ) : (
            <>
              <iframe
                width="100%"
                height="100%"
                src={videoEmbedDetails.src}
                title="Video Preview"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ borderRadius: "8px" }}
              />
              {/drive\.google\.com/.test(article.videoUrl) && (
                <div
                  style={{
                    fontSize: "10px",
                    color: "#64748b",
                    textAlign: "center",
                    marginTop: "4px",
                  }}
                >
                  Drive: Must be publicly shared
                </div>
              )}
            </>
          )
        ) : !article.newsImage && !article.newsVideo ? (
          <FileText size={32} />
        ) : null}
      </ArticleImage>

      <ArticleContent viewMode={viewMode}>
        <ArticleHeader>
          <ArticleTitle title={article.title} isArchived={isArchived}>
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
            {isArchived ? (
              <>
                <ActionButton
                  variant="restore"
                  onClick={() => onRestore?.(article._id)}
                  title="Restore Article"
                >
                  <RotateCcw size={16} />
                </ActionButton>
                <ActionButton
                  variant="delete"
                  onClick={() => onDelete?.(article._id)}
                  title="Delete Permanently"
                >
                  <Trash2 size={16} />
                </ActionButton>
              </>
            ) : (
              <>
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
              </>
            )}
          </ArticleActions>
        </ArticleHeader>

        <ArticleMeta>
          <CategoryBadge category={categoryName}>
            {categoryName}
          </CategoryBadge>
          <MetaItem>
            <Calendar size={14} />
            {new Date(article.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
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

        <ArticleDescription viewMode={viewMode} isArchived={isArchived}>
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
    itemsPerPage: 9,
    totalItems: 0,
  });
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [categoriesError, setCategoriesError] = useState<string | null>(null);

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

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setCategoriesLoading(true);
        const response = await fetch("/api/categories");
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setCategories(data);
        setCategoriesError(null);
      } catch (err) {
        setCategoriesError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setCategoriesLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Get unique category IDs from articles for filters
  const availableCategoryIds = useMemo(
    () => [...new Set(articles.map((article) => article.category))].sort(),
    [articles]
  );

  // Filter available categories based on what's actually used in articles
  const availableCategories = useMemo(
    () => categories.filter(cat => availableCategoryIds.includes(cat._id)),
    [categories, availableCategoryIds]
  );

  // Filter and sort articles
  const filteredAndSortedArticles = useMemo(() => {
    let filtered = articles;

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (article) => {
          const categoryObj = categories.find(cat => cat._id === article.category);
          const categoryName = categoryObj?.categoryName || article.category;
          
          return (
            article.title.toLowerCase().includes(query) ||
            categoryName.toLowerCase().includes(query) ||
            article.description.toLowerCase().includes(query)
          );
        }
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
        (article) => (article.status || "published") === filters.status
      );
    } else {
      filtered = filtered.filter(
        (article) => (article.status || "published") === "published"
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue: string | number | undefined = a[sortOptions.field];
      let bValue: string | number | undefined = b[sortOptions.field];

      // Handle undefined values
      if (aValue === undefined) aValue = "";
      if (bValue === undefined) bValue = "";

      if (sortOptions.field === "date") {
        const aTime = new Date(aValue as string).getTime();
        const bTime = new Date(bValue as string).getTime();
        return sortOptions.direction === "asc" ? aTime - bTime : bTime - aTime;
      } else if (typeof aValue === "string" && typeof bValue === "string") {
        const aLower = aValue.toLowerCase();
        const bLower = bValue.toLowerCase();
        return sortOptions.direction === "asc"
          ? aLower < bLower
            ? -1
            : aLower > bLower
            ? 1
            : 0
          : aLower > bLower
          ? -1
          : aLower < bLower
          ? 1
          : 0;
      } else {
        const aNum = Number(aValue) || 0;
        const bNum = Number(bValue) || 0;
        return sortOptions.direction === "asc" ? aNum - bNum : bNum - aNum;
      }
    });

    return filtered;
  }, [searchQuery, filters, sortOptions, articles, categories]);

  // Paginate articles
  const paginatedArticles = useMemo(() => {
    const startIndex = (pagination.currentPage - 1) * pagination.itemsPerPage;
    const endIndex = startIndex + pagination.itemsPerPage;
    return filteredAndSortedArticles.slice(startIndex, endIndex);
  }, [filteredAndSortedArticles, pagination.currentPage, pagination.itemsPerPage]);

  // Update total items when filtered articles change
  useEffect(() => {
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

  const handleArchive = async (articleId: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Are you sure you want to archive this?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, archive it!",
      cancelButtonText: "No, keep it!",
    });

    if (!result.isConfirmed) return;

    try {
      const response = await fetch(`/api/articles/${articleId}/archive`, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${await response.text()}`);
      }

      setArticles((prevArticles) =>
        prevArticles.map((article) =>
          article._id === articleId
            ? { ...article, status: "archived" }
            : article
        )
      );

      await Swal.fire({
        title: "Success!",
        text: "Article archived successfully!",
        icon: "success",
        confirmButtonText: "OK",
        timer: 3000,
        timerProgressBar: true,
      });
    } catch (err) {
      console.error("Error archiving article:", err);
      await Swal.fire({
        title: "Error!",
        text: "Failed to archive article. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleRestore = async (articleId: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to restore this article? It will be moved back to published status!",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, restore it!",
      cancelButtonText: "No, keep it archived!",
    });

    if (!result.isConfirmed) return;

    try {
      const response = await fetch(`/api/articles/${articleId}/restore`, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${await response.text()}`);
      }

      setArticles((prevArticles) =>
        prevArticles.map((article) =>
          article._id === articleId
            ? { ...article, status: "published" }
            : article
        )
      );

      await Swal.fire({
        title: "Success!",
        text: "Article restored successfully!",
        icon: "success",
        confirmButtonText: "OK",
        timer: 3000,
        timerProgressBar: true,
      });
    } catch (err) {
      console.error("Error restoring article:", err);
      await Swal.fire({
        title: "Error!",
        text: "Failed to restore article. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleDelete = async (articleId: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This article will be permanently deleted. This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it!",
    });

    if (!result.isConfirmed) return;

    try {
      const response = await fetch(`/api/articles/${articleId}/delete`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${await response.text()}`);
      }

      setArticles((prevArticles) =>
        prevArticles.filter((article) => article._id !== articleId)
      );

      await Swal.fire({
        title: "Success!",
        text: "Article permanently deleted successfully!",
        icon: "success",
        confirmButtonText: "OK",
        timer: 3000,
        timerProgressBar: true,
      });
    } catch (err) {
      console.error("Error deleting article:", err);
      await Swal.fire({
        title: "Error!",
        text: "Failed to delete article. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleView = (articleId: string) => {
    router.push(`/news-dashboard/articles/view/${articleId}`);
  };

  const handlePageChange = (page: number) => {
    setPagination((prev) => ({
      ...prev,
      currentPage: page,
    }));
  };

  return (
    <ArticlesRoot>
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
        {(loading || categoriesLoading) && (
          <NoResults>
            <NoResultsIcon>
              <FileText size={48} />
            </NoResultsIcon>
            <NoResultsTitle>Loading articles...</NoResultsTitle>
          </NoResults>
        )}

        {(error || categoriesError) && !loading && !categoriesLoading && (
          <NoResults>
            <NoResultsIcon>
              <FileText size={48} />
            </NoResultsIcon>
            <NoResultsTitle>Error loading data</NoResultsTitle>
            <NoResultsText>{error || categoriesError}</NoResultsText>
          </NoResults>
        )}

        {!loading && !categoriesLoading && !error && !categoriesError && searchQuery && (
          <SearchResultsHeader>
            <SearchResultsCount>
              {filteredAndSortedArticles.length} result
              {filteredAndSortedArticles.length !== 1 ? "s" : ""} for{" "}
              <SearchQuery>&quot;{searchQuery}&quot;</SearchQuery>
            </SearchResultsCount>
            <ClearSearchButton onClick={clearSearch}>
              Clear Search
            </ClearSearchButton>
          </SearchResultsHeader>
        )}

        {!loading && !categoriesLoading && !error && !categoriesError && (
          <ControlsContainer>
            <FiltersContainer>
              <FilterSelect
                value={filters.category}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, category: e.target.value }))
                }
              >
                <option value="all">All Categories</option>
                {availableCategories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.categoryName}
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

        {!loading && !categoriesLoading && !error && !categoriesError && paginatedArticles.length > 0 ? (
          <>
            <ArticlesGrid viewMode={viewMode}>
              {paginatedArticles.map((article) => (
                <ArticleCardComponent
                  key={article._id}
                  article={article}
                  categories={categories}
                  viewMode={viewMode}
                  onEdit={handleEdit}
                  onArchive={handleArchive}
                  onView={handleView}
                  onRestore={handleRestore}
                  onDelete={handleDelete}
                />
              ))}
            </ArticlesGrid>

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
          !loading &&
          !categoriesLoading &&
          !error &&
          !categoriesError && (
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