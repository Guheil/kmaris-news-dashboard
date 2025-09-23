"use client";

import { styled } from "@mui/material/styles";
import { palette } from "@/theme/pallete";

// Main layout components
export const LogsRoot = styled("div")({
  display: "flex",
  minHeight: "100vh",
  backgroundColor: "#F8F9FA",
  position: "relative",
});

export const MainContent = styled("main")<{ sidebarOpen: boolean; isMobile: boolean }>(
  ({ theme, sidebarOpen, isMobile }) => ({
    flex: 1,
    padding: "84px 20px 20px",
    marginLeft: isMobile ? 0 : sidebarOpen ? "280px" : "80px",
    transition: "margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    minWidth: 0,
    
    [theme.breakpoints.down('md')]: {
      marginLeft: 0,
      padding: "74px 16px 16px",
    },
  })
);

// Overlay for mobile sidebar
export const SidebarOverlay = styled("div")<{ show: boolean }>(
  ({ show }) => ({
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 999,
    opacity: show ? 1 : 0,
    visibility: show ? "visible" : "hidden",
    transition: "all 0.3s ease",
    backdropFilter: "blur(4px)",
  })
);

// Card components
export const Card = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  borderRadius: "16px",
  padding: "24px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  border: "1px solid rgba(0,0,0,0.05)",
  transition: "all 0.2s ease",
  
  "&:hover": {
    boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
  },
  
  [theme.breakpoints.down('md')]: {
    padding: "20px",
  },
}));

export const CardHeader = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "24px",
  flexWrap: "wrap",
  gap: "12px",
});

export const CardTitle = styled("h1")({
  fontSize: "24px",
  fontWeight: 700,
  color: "#1a1a1a",
  margin: 0,
  letterSpacing: "-0.5px",
});

// Filter and search components
export const FiltersContainer = styled("div")(({ theme }) => ({
  display: "flex",
  gap: "12px",
  alignItems: "center",
  flexWrap: "wrap",
  marginBottom: "24px",
  
  [theme.breakpoints.down('sm')]: {
    flexDirection: "column",
    alignItems: "stretch",
  },
}));

export const FilterButton = styled("button")<{ active?: boolean }>(({ active = false }) => ({
  padding: "8px 16px",
  borderRadius: "8px",
  border: active ? `1px solid ${palette.primary.main}` : "1px solid #e2e8f0",
  backgroundColor: active ? `${palette.primary.main}10` : "transparent",
  color: active ? palette.primary.main : "#64748b",
  fontSize: "14px",
  fontWeight: 500,
  cursor: "pointer",
  transition: "all 0.2s ease",
  whiteSpace: "nowrap",

  "&:hover": {
    backgroundColor: active ? `${palette.primary.main}20` : "#f8fafc",
    borderColor: active ? palette.primary.main : "#cbd5e1",
  },
}));

export const SearchContainer = styled("div")({
  position: "relative",
  flex: 1,
  minWidth: "200px",
  maxWidth: "400px",
});

export const SearchInput = styled("input")({
  width: "100%",
  padding: "10px 16px 10px 40px",
  borderRadius: "8px",
  border: "1px solid #e2e8f0",
  backgroundColor: "#fff",
  fontSize: "14px",
  color: "#0f172a",
  outline: "none",
  transition: "all 0.2s ease",

  "&:focus": {
    borderColor: palette.primary.main,
    boxShadow: `0 0 0 3px ${palette.primary.main}20`,
  },

  "&::placeholder": {
    color: "#94a3b8",
  },
});

export const SearchIcon = styled("div")({
  position: "absolute",
  left: "12px",
  top: "50%",
  transform: "translateY(-50%)",
  color: "#94a3b8",
  pointerEvents: "none",
});

// Logs table components
export const LogsTable = styled("div")(({ theme }) => ({
  width: "100%",
  overflowX: "auto",
  
  "&::-webkit-scrollbar": {
    height: "8px",
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: "#f8fafc",
    borderRadius: "4px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#cbd5e1",
    borderRadius: "4px",
    "&:hover": {
      backgroundColor: "#94a3b8",
    },
  },
}));

export const LogsTableContent = styled("div")(({ theme }) => ({
  minWidth: "800px",
  width: "100%",
  
  [theme.breakpoints.down('sm')]: {
    minWidth: "600px",
  },
}));

export const LogsTableHeader = styled("div")({
  display: "grid",
  gridTemplateColumns: "2fr 1fr 1fr 1fr 120px",
  gap: "16px",
  padding: "16px 0",
  borderBottom: "2px solid #f1f5f9",
  fontSize: "12px",
  fontWeight: 700,
  color: "#64748b",
  textTransform: "uppercase",
  letterSpacing: "0.8px",
});

export const LogsTableRow = styled("div")({
  display: "grid",
  gridTemplateColumns: "2fr 1fr 1fr 1fr 120px",
  gap: "16px",
  padding: "20px 0",
  borderBottom: "1px solid #f8fafc",
  alignItems: "center",
  transition: "all 0.2s ease",

  "&:hover": {
    backgroundColor: "#f8fafc",
    borderRadius: "8px",
    margin: "0 -12px",
    padding: "20px 12px",
  },

  "&:last-child": {
    borderBottom: "none",
  },
});

// Log content components
export const LogTitle = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  minWidth: 0,
});

export const LogIcon = styled("div")<{ actionType: string }>(({ actionType }) => {
  const getActionColor = () => {
    switch (actionType.toLowerCase()) {
      case "published":
        return { bg: "#dcfce7", color: "#166534" };
      case "updated":
        return { bg: "#dbeafe", color: "#1d4ed8" };
      case "archived":
        return { bg: "#fef3c7", color: "#92400e" };
      case "restored":
        return { bg: "#ecfdf5", color: "#059669" };
      case "permanently deleted":
        return { bg: "#fef2f2", color: "#dc2626" };
      default:
        return { bg: "#f8fafc", color: "#64748b" };
    }
  };

  const colors = getActionColor();
  
  return {
    width: "40px",
    height: "40px",
    borderRadius: "10px",
    backgroundColor: colors.bg,
    color: colors.color,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    fontSize: "16px",
  };
});

export const LogTitleText = styled("div")({
  fontSize: "15px",
  fontWeight: 600,
  color: "#0f172a",
  lineHeight: 1.4,
  overflow: "hidden",
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  minWidth: 0,
});

export const LogUser = styled("div")({
  fontSize: "14px",
  color: "#64748b",
  fontWeight: 500,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const LogDate = styled("div")({
  fontSize: "14px",
  color: "#64748b",
  whiteSpace: "nowrap",
});

export const LogTime = styled("div")({
  fontSize: "13px",
  color: "#94a3b8",
  marginTop: "2px",
  whiteSpace: "nowrap",
});

// Action badge component
export const ActionBadge = styled("span")<{ actionType: string }>(({ actionType }) => {
  const getActionStyle = () => {
    switch (actionType.toLowerCase()) {
      case "published":
        return { bg: "#dcfce7", color: "#166534", icon: "✓" };
      case "updated":
        return { bg: "#dbeafe", color: "#1d4ed8", icon: "✏️" };
      case "archived":
        return { bg: "#fef3c7", color: "#92400e", icon: "📦" };
      case "restored":
        return { bg: "#ecfdf5", color: "#059669", icon: "↩️" };
      case "permanently deleted":
        return { bg: "#fef2f2", color: "#dc2626", icon: "🗑️" };
      default:
        return { bg: "#f8fafc", color: "#64748b", icon: "•" };
    }
  };

  const style = getActionStyle();
  
  return {
    padding: "6px 12px",
    borderRadius: "6px",
    fontSize: "12px",
    fontWeight: 600,
    textTransform: "capitalize" as const,
    backgroundColor: style.bg,
    color: style.color,
    whiteSpace: "nowrap" as const,
    display: "inline-flex",
    alignItems: "center",
    gap: "4px",
    
    "&::before": {
      content: `"${style.icon}"`,
      fontSize: "10px",
    },
  };
});

export const ViewButton = styled("button")({
  width: "36px",
  height: "36px",
  borderRadius: "8px",
  border: "1px solid #e2e8f0",
  backgroundColor: "#f8fafc",
  color: "#64748b",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 0.2s ease",
  
  "&:hover": {
    backgroundColor: "#f1f5f9",
    borderColor: "#cbd5e1",
    color: "#475569",
  },
});

// Empty state components
export const NoResults = styled("div")({
  textAlign: "center",
  padding: "80px 24px",
  color: "#64748b",
});

export const NoResultsIcon = styled("div")({
  width: "80px",
  height: "80px",
  borderRadius: "50%",
  backgroundColor: "#f1f5f9",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 auto 20px",
  color: "#94a3b8",
});

export const NoResultsTitle = styled("h3")({
  fontSize: "18px",
  fontWeight: 600,
  color: "#0f172a",
  margin: "0 0 8px",
});

export const NoResultsText = styled("p")({
  fontSize: "14px",
  color: "#64748b",
  margin: 0,
  lineHeight: 1.6,
  maxWidth: "400px",
  marginLeft: "auto",
  marginRight: "auto",
});

// Stats components
export const StatsContainer = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(5, 1fr)",
  gap: "16px",
  marginBottom: "24px",
  
  [theme.breakpoints.down('lg')]: {
    gridTemplateColumns: "repeat(3, 1fr)",
  },
  
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: "repeat(2, 1fr)",
  },
  
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: "1fr",
  },
}));

export const StatCard = styled("div")({
  backgroundColor: "#fff",
  padding: "20px",
  borderRadius: "12px",
  border: "1px solid #f1f5f9",
  textAlign: "center",
  transition: "all 0.2s ease",
  
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
  },
});

export const StatNumber = styled("div")({
  fontSize: "24px",
  fontWeight: 700,
  color: "#0f172a",
  marginBottom: "4px",
});

export const StatLabel = styled("div")({
  fontSize: "12px",
  color: "#64748b",
  fontWeight: 500,
  textTransform: "uppercase",
  letterSpacing: "0.5px",
});

// Search results header
export const SearchResultsHeader = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "20px",
  padding: "16px 0",
  borderBottom: "1px solid #f1f5f9",
  flexWrap: "wrap",
  gap: "12px",
});

export const SearchResultsCount = styled("div")({
  fontSize: "14px",
  color: "#64748b",
  fontWeight: 500,
});

export const SearchQuery = styled("span")({
  fontWeight: 600,
  color: "#0f172a",
});

export const ClearSearchButton = styled("button")({
  padding: "8px 16px",
  borderRadius: "8px",
  border: "1px solid #e2e8f0",
  backgroundColor: "transparent",
  color: "#64748b",
  fontSize: "12px",
  cursor: "pointer",
  fontWeight: 500,
  transition: "all 0.2s ease",
  whiteSpace: "nowrap",

  "&:hover": {
    backgroundColor: "#f8fafc",
    borderColor: "#cbd5e1",
    color: "#475569",
  },
});