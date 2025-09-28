"use client"

import { FC, useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Home,
  FileText,
  BarChart3,
  Plus,
  Eye,
  EyeIcon,
  Activity,
} from "lucide-react";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { Header } from "@/components/header/Header";
import { LogsProps, LogEntry, FilterState, LogsStats } from "./interface";
import {
  LogsRoot,
  MainContent,
  SidebarOverlay,
  Card,
  CardHeader,
  CardTitle,
  FiltersContainer,
  FilterButton,
  LogsTable,
  LogsTableContent,
  LogsTableHeader,
  LogsTableRow,
  LogTitle,
  LogIcon,
  LogTitleText,
  LogUser,
  LogDate,
  LogTime,
  ActionBadge,
  ViewButton,
  NoResults,
  NoResultsIcon,
  NoResultsTitle,
  NoResultsText,
  StatsContainer,
  StatCard,
  StatNumber,
  StatLabel,
  SearchResultsHeader,
  SearchResultsCount,
  SearchQuery,
  ClearSearchButton,
  PaginationContainer,
  PaginationButton,
  PaginationInfo,
} from "./elements";
import Link from "next/link";
import { getSession } from "@/app/login/sessionUtils";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { navSections, userName, userRoleConfig, userInitialConfig } from "@/config/navItems";

// Mock data generator for logs - replace with API call
const generateMockLogs = (): LogEntry[] => {
  const actionTypes: LogEntry["actionType"][] = ["published", "updated", "archived", "restored", "permanently deleted"];
  const users = ["John Doe", "Jane Smith", "Mike Johnson", "Sarah Wilson", "David Brown"];
  const articles = [
    "Breaking News: Tech Innovation Breakthrough",
    "Climate Change: Latest Research Findings",
    "Economic Updates for 2024",
    "Sports Championship Results",
    "Entertainment Industry Trends",
    "Health and Wellness Tips",
    "Travel Destinations Guide",
    "Food and Recipe Collections",
    "Education System Reform",
    "Science Discovery Announcement",
    "Politics: Election Coverage",
    "Business Market Analysis",
    "Technology Product Launch",
    "Cultural Events and Festivals",
    "Environmental Conservation Efforts"
  ];

  const logs: LogEntry[] = [];
  
  for (let i = 0; i < 50; i++) {
    const randomDate = new Date();
    randomDate.setDate(randomDate.getDate() - Math.floor(Math.random() * 30));
    
    logs.push({
      id: `log-${i + 1}`,
      articleTitle: articles[Math.floor(Math.random() * articles.length)],
      actionType: actionTypes[Math.floor(Math.random() * actionTypes.length)],
      user: users[Math.floor(Math.random() * users.length)],
      timestamp: randomDate.toISOString(),
      articleId: `article-${Math.floor(Math.random() * 100) + 1}`,
    });
  }
  
  // Sort by timestamp (newest first)
  return logs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};

const formatDate = (timestamp: string): string => {
  const date = new Date(timestamp);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const formatTime = (timestamp: string): string => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getRelativeTime = (timestamp: string): string => {
  const now = new Date();
  const date = new Date(timestamp);
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) {
    return "Just now";
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  }
};

// Function to generate smart pagination range
const getPaginationRange = (currentPage: number, totalPages: number) => {
  const delta = 1; // Number of pages to show on each side of current page
  const maxButtons = 5; // Maximum number of page buttons to show (excluding prev/next)
  
  let pages: (number | string)[] = [];
  const left = Math.max(2, currentPage - delta);
  const right = Math.min(totalPages - 1, currentPage + delta);

  // Always show first page
  pages.push(1);

  // Add ellipsis if needed before the range
  if (left > 2) {
    pages.push("...");
  }

  // Add pages in the range, avoiding duplicates
  for (let i = left; i <= right; i++) {
    if (!pages.includes(i)) {
      pages.push(i);
    }
  }

  // Add ellipsis if needed after the range
  if (right < totalPages - 1) {
    pages.push("...");
  }

  // Always show last page if more than one page, avoiding duplicates
  if (totalPages > 1 && !pages.includes(totalPages)) {
    pages.push(totalPages);
  }

  // Trim to maxButtons if necessary
  if (pages.length > maxButtons) {
    if (currentPage <= Math.floor(maxButtons / 2)) {
      // Keep beginning, trim end
      pages = pages.slice(0, maxButtons - 1);
      if (totalPages > maxButtons - 1 && !pages.includes(totalPages)) {
        pages.push("...");
        pages.push(totalPages);
      }
    } else if (currentPage > totalPages - Math.floor(maxButtons / 2)) {
      // Keep end, trim start
      pages = pages.slice(-maxButtons + 1);
      if (pages[0] !== 1) {
        pages.unshift("...");
        if (!pages.includes(1)) {
          pages.unshift(1);
        }
      }
    } else {
      // Keep middle, trim both ends
      const startIndex = pages.indexOf(currentPage) - Math.floor((maxButtons - 2) / 2);
      pages = pages.slice(startIndex, startIndex + maxButtons - 2);
      if (!pages.includes(1)) {
        pages.unshift("...");
        pages.unshift(1);
      }
      if (!pages.includes(totalPages)) {
        pages.push("...");
        pages.push(totalPages);
      }
    }
  }

  return pages;
};

export const Logs: FC<LogsProps> = ({
  sidebarOpen,
  onSidebarToggle,
  isMobile = false,
}) => {
  const router = useRouter();
  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.down("md"));
  
  const [searchQuery, setSearchQuery] = useState("");
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterState>({
    actionType: "all",
    dateRange: "all",
    user: "all",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const logsPerPage = 5;

  // useEffect(() => {
  //   const session = getSession();
  //   if (!session) {
  //     router.push("/");
  //   }
  // }, [router]);

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setLogs(generateMockLogs());
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // Filter and search functionality
  const filteredLogs = useMemo(() => {
    if (loading) return [];
    
    let filtered = [...logs];

    // Apply action filter
    if (filters.actionType !== "all") {
      filtered = filtered.filter(log => log.actionType === filters.actionType);
    }

    // Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(log =>
        log.articleTitle.toLowerCase().includes(query) ||
        log.user.toLowerCase().includes(query) ||
        log.actionType.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [logs, filters, searchQuery, loading]);

  // Pagination logic
  const totalPages = Math.ceil(filteredLogs.length / logsPerPage);
  const paginatedLogs = useMemo(() => {
    const startIndex = (currentPage - 1) * logsPerPage;
    return filteredLogs.slice(startIndex, startIndex + logsPerPage);
  }, [filteredLogs, currentPage]);

  // Calculate stats
  const stats: LogsStats = useMemo(() => {
    const baseStats = {
      total: filteredLogs.length,
      published: 0,
      updated: 0,
      archived: 0,
      restored: 0,
      permanentlyDeleted: 0,
    };

    return filteredLogs.reduce((acc, log) => {
      switch (log.actionType) {
        case "published":
          acc.published++;
          break;
        case "updated":
          acc.updated++;
          break;
        case "archived":
          acc.archived++;
          break;
        case "restored":
          acc.restored++;
          break;
        case "permanently deleted":
          acc.permanentlyDeleted++;
          break;
      }
      return acc;
    }, baseStats);
  }, [filteredLogs]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page on search
  };

  const clearSearch = () => {
    setSearchQuery("");
    setCurrentPage(1); // Reset to first page on clear
  };

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1); // Reset to first page on filter change
  };

  const handleOverlayClick = () => {
    if (isMobile) {
      onSidebarToggle();
    }
  };


  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <LogsRoot>
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
        {loading ? (
          <NoResults>
            <NoResultsIcon>
              <Activity size={32} />
            </NoResultsIcon>
            <NoResultsTitle>Loading activity logs...</NoResultsTitle>
          </NoResults>
        ) : (
          <>
            {/* Stats Cards */}
            <StatsContainer>
              <StatCard>
                <StatNumber>{stats.total}</StatNumber>
                <StatLabel>Total Actions</StatLabel>
              </StatCard>
              <StatCard>
                <StatNumber>{stats.published}</StatNumber>
                <StatLabel>Published</StatLabel>
              </StatCard>
              <StatCard>
                <StatNumber>{stats.updated}</StatNumber>
                <StatLabel>Updated</StatLabel>
              </StatCard>
              <StatCard>
                <StatNumber>{stats.archived}</StatNumber>
                <StatLabel>Archived</StatLabel>
              </StatCard>
              <StatCard>
                <StatNumber>{stats.permanentlyDeleted}</StatNumber>
                <StatLabel>Deleted</StatLabel>
              </StatCard>
            </StatsContainer>

            <Card>
              <CardHeader>
                <CardTitle>Activity Logs</CardTitle>
              </CardHeader>

              {/* Filters */}
              <FiltersContainer>
                <FilterButton
                  active={filters.actionType === "all"}
                  onClick={() => handleFilterChange("actionType", "all")}
                >
                  All Actions
                </FilterButton>
                <FilterButton
                  active={filters.actionType === "published"}
                  onClick={() => handleFilterChange("actionType", "published")}
                >
                  Published
                </FilterButton>
                <FilterButton
                  active={filters.actionType === "updated"}
                  onClick={() => handleFilterChange("actionType", "updated")}
                >
                  Updated
                </FilterButton>
                <FilterButton
                  active={filters.actionType === "archived"}
                  onClick={() => handleFilterChange("actionType", "archived")}
                >
                  Archived
                </FilterButton>
                <FilterButton
                  active={filters.actionType === "restored"}
                  onClick={() => handleFilterChange("actionType", "restored")}
                >
                  Restored
                </FilterButton>
                <FilterButton
                  active={filters.actionType === "permanently deleted"}
                  onClick={() => handleFilterChange("actionType", "permanently deleted")}
                >
                  Deleted
                </FilterButton>
              </FiltersContainer>

              <LogsTable>
                <LogsTableContent>
                  {searchQuery && (
                    <SearchResultsHeader>
                      <SearchResultsCount>
                        {filteredLogs.length} result{filteredLogs.length !== 1 ? 's' : ''}{' '}
                        for <SearchQuery>&quot;{searchQuery}&quot;</SearchQuery>
                      </SearchResultsCount>
                      <ClearSearchButton onClick={clearSearch}>
                        Clear Search
                      </ClearSearchButton>
                    </SearchResultsHeader>
                  )}

                  {paginatedLogs.length > 0 ? (
                    <>
                      <LogsTableHeader>
                        <div>Action</div>
                        <div>Date</div>
                        <div>Time</div>
                      </LogsTableHeader>

                      {paginatedLogs.map((log) => (
                        <LogsTableRow key={log.id}>
                          <LogTitle>
                            <div>
                              <LogTitleText>{log.articleTitle}</LogTitleText>
                              <ActionBadge actionType={log.actionType}>
                                {log.actionType}
                              </ActionBadge>
                            </div>
                          </LogTitle>
                          <LogDate>
                            <div>{formatDate(log.timestamp)}</div>
                            <LogTime>{getRelativeTime(log.timestamp)}</LogTime>
                          </LogDate>
                          <LogTime>{formatTime(log.timestamp)}</LogTime>
                        </LogsTableRow>
                      ))}
                    </>
                  ) : (
                    <NoResults>
                      <NoResultsIcon>
                        <Activity size={32} />
                      </NoResultsIcon>
                      <NoResultsTitle>
                        {searchQuery ? 'No logs found' : 'No activity logs'}
                      </NoResultsTitle>
                      <NoResultsText>
                        {searchQuery 
                          ? `We couldn't find any logs matching "${searchQuery}". Try adjusting your search terms or filters.`
                          : 'There are no activity logs to display at the moment.'
                        }
                      </NoResultsText>
                    </NoResults>
                  )}
                </LogsTableContent>
              </LogsTable>

              {/* Smart Pagination Controls */}
              {totalPages > 1 && (
                <PaginationContainer>
                  <PaginationButton
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                    variant="nav"
                    key="prev"
                  >
                    Previous
                  </PaginationButton>
                  {getPaginationRange(currentPage, totalPages).map((page, index) => (
                    typeof page === 'number' ? (
                      <PaginationButton
                        key={`page-${page}`}
                        active={page === currentPage}
                        onClick={() => handlePageChange(page)}
                      >
                        {page}
                      </PaginationButton>
                    ) : (
                      <PaginationButton
                        key={`ellipsis-${index}`}
                        variant="ellipsis"
                      >
                        ...
                      </PaginationButton>
                    )
                  ))}
                  <PaginationButton
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                    variant="nav"
                    key="next"
                  >
                    Next
                  </PaginationButton>
                  <PaginationInfo>
                    Page {currentPage} of {totalPages}
                  </PaginationInfo>
                </PaginationContainer>
              )}
            </Card>
          </>
        )}
      </MainContent>
    </LogsRoot>
  );
};