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
} from "./elements";
import Link from "next/link";
import { getSession } from "@/app/login/sessionUtils";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { styled } from "@mui/material/styles";

// Pagination button component
const PaginationContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "12px",
  marginTop: "24px",
  flexWrap: "wrap",
});

const PaginationButton = styled("button")<{ disabled?: boolean; active?: boolean }>(
  ({ disabled = false, active = false }) => ({
    padding: "8px 16px",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
    backgroundColor: active ? "#e2e8f0" : disabled ? "#f8fafc" : "#fff",
    color: disabled ? "#94a3b8" : "#64748b",
    fontSize: "14px",
    fontWeight: active ? 600 : 500,
    cursor: disabled ? "not-allowed" : "pointer",
    transition: "all 0.2s ease",

    "&:hover": {
      backgroundColor: disabled ? "#f8fafc" : active ? "#e2e8f0" : "#f1f5f9",
      borderColor: disabled ? "#e2e8f0" : "#cbd5e1",
    },
  })
);

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

  useEffect(() => {
    const session = getSession();
    if (!session) {
      router.push("/");
    }
  }, [router]);

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

  const getActionIcon = (actionType: string) => {
    switch (actionType.toLowerCase()) {
      case "published":
        return "✓";
      case "updated":
        return "✏️";
      case "archived":
        return "📦";
      case "restored":
        return "↩️";
      case "permanently deleted":
        return "🗑️";
      default:
        return "•";
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
        navSections={[
          {
            title: "Overview",
            items: [
              {
                icon: <Home size={20} />,
                text: "Dashboard",
                href: "/news-dashboard",
                active: false,
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
        userName="Kmaris Admin"
        userRole="Editor"
        userInitials="JD"
        collapsible={!isMobile}
        navItems={[]}
      />
      <Header
        title="Activity Logs"
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
                        {/* <div>Article & Action</div> */}
                        <div>User</div>
                        <div>Date</div>
                        <div>Time</div>
                        <div>View</div>
                      </LogsTableHeader>

                      {paginatedLogs.map((log) => (
                        <LogsTableRow key={log.id}>
                          <LogTitle>
                            {/* <LogIcon actionType={log.actionType}>
                              {getActionIcon(log.actionType)}
                            </LogIcon> */}
                            <div>
                              <LogTitleText>{log.articleTitle}</LogTitleText>
                              <ActionBadge actionType={log.actionType}>
                                {log.actionType}
                              </ActionBadge>
                            </div>
                          </LogTitle>
                          <LogUser>{log.user}</LogUser>
                          <LogDate>
                            <div>{formatDate(log.timestamp)}</div>
                            <LogTime>{getRelativeTime(log.timestamp)}</LogTime>
                          </LogDate>
                          <LogTime>{formatTime(log.timestamp)}</LogTime>
                          <div>
                            <ViewButton 
                              title="View Details"
                              onClick={() => {
                                console.log('View log details:', log);
                              }}
                            >
                              <Eye size={16} />
                            </ViewButton>
                          </div>
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

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <PaginationContainer>
                  <PaginationButton
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                  >
                    Previous
                  </PaginationButton>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <PaginationButton
                      key={page}
                      active={page === currentPage}
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </PaginationButton>
                  ))}
                  <PaginationButton
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                  >
                    Next
                  </PaginationButton>
                </PaginationContainer>
              )}
            </Card>
          </>
        )}
      </MainContent>
    </LogsRoot>
  );
};