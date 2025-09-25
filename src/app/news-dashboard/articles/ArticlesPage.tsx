// Updated: ArticlesPage.tsx (main page)
"use client";

import { FC, useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { Header } from "@/components/header/Header";
import {
  ArticlesPageProps,
  // Removed most; now imported from subs
} from "./interface";
import {
  ArticlesRoot,
  MainContent,
  SidebarOverlay,
  ArticlesGrid,
} from "./elements";
import ArticleCard from "@/components/ArticleComponent/ArticleComponent";
import ArticleControls from "@/components/ArticleControl/ArticleControl";
import ArticlePagination from "@/components/ArticlePagination/ArticlePagination";
import SearchResultsHeaderComponent from "@/components/SearchResultHeader/SearchResultHeader";
import NoResultsComponent from "@/components/NoResults/NoResults";
import { Category } from "@/components/ArticleComponent/interface"; // Import shared
import { FilterOptions, SortOptions, ViewMode } from "@/components/ArticleControl/interface"; // Import shared
import { NewsArticle } from "@/components/ArticleComponent/interface"; // Import shared
import { PaginationOptions } from "@/components/ArticlePagination/interface"; // Import shared

// Icons
import { 
  Home,
  FileText,
  BarChart3,
  Plus,
  EyeIcon,
  Search,
} from "lucide-react";

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

    // Apply status filter (fixed: when "all", show all statuses)
    if (filters.status !== "all") {
      filtered = filtered.filter(
        (article) => (article.status || "published") === filters.status
      );
    }
    // Removed the else clause to show all when "all"

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

  const handleFilterChange = (key: keyof FilterOptions, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleSortChange = (options: SortOptions) => {
    setSortOptions(options);
  };

  const handleViewModeChange = (mode: ViewMode) => {
    setViewMode(mode);
  };

  const handlePageChange = (page: number) => {
    setPagination((prev) => ({
      ...prev,
      currentPage: page,
    }));
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

  const totalPages = Math.ceil(pagination.totalItems / pagination.itemsPerPage);

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
        userName="Kmaris Admin"
        userRole="Editor"
        userInitials="JD"
        collapsible={!isMobile}
        navItems={[]}
      />

      <Header
        title="All Articles"
        onMenuToggle={onSidebarToggle}
        onSearch={handleSearch}
        userName="Kmaris Admin"
        userRole="Editor"
        userInitials="JD"
        notifications={3}
        isSidebarOpen={sidebarOpen}
        isMobile={isMobile}
      />

      <MainContent sidebarOpen={sidebarOpen} isMobile={isMobile}>
        {(loading || categoriesLoading) && (
          <NoResultsComponent
            icon={<FileText size={48} />}
            title="Loading articles..."
          />
        )}

        {(error || categoriesError) && !loading && !categoriesLoading && (
          <NoResultsComponent
            icon={<FileText size={48} />}
            title="Error loading data"
            text={error || categoriesError}
          />
        )}

        {!loading && !categoriesLoading && !error && !categoriesError && searchQuery && (
          <SearchResultsHeaderComponent
            count={filteredAndSortedArticles.length}
            query={searchQuery}
            onClear={clearSearch}
          />
        )}

        {!loading && !categoriesLoading && !error && !categoriesError && (
          <ArticleControls
            availableCategories={availableCategories}
            filters={filters}
            onFilterChange={handleFilterChange}
            sortOptions={sortOptions}
            onSortChange={handleSortChange}
            viewMode={viewMode}
            onViewModeChange={handleViewModeChange}
          />
        )}

        {!loading && !categoriesLoading && !error && !categoriesError && paginatedArticles.length > 0 ? (
          <>
            <ArticlesGrid viewMode={viewMode}>
              {paginatedArticles.map((article) => (
                <ArticleCard
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
              <ArticlePagination
                pagination={pagination}
                onPageChange={handlePageChange}
              />
            )}
          </>
        ) : (
          !loading &&
          !categoriesLoading &&
          !error &&
          !categoriesError && (
            <NoResultsComponent
              icon={<Search size={48} />}
              title={
                searchQuery ? "No articles found" : "No articles available"
              }
              text={
                searchQuery
                  ? `We couldn't find any articles matching "${searchQuery}". Try adjusting your search terms or filters.`
                  : "There are currently no articles to display. Create your first article to get started!"
              }
            />
          )
        )}
      </MainContent>
    </ArticlesRoot>
  );
};

export default ArticlesPage;