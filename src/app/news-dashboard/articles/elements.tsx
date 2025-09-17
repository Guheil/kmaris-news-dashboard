"use client";

import { styled } from "@mui/material/styles";
import { palette } from "@/theme/pallete";

export const ArticlesRoot = styled("div")({
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

// Filter and Sort Controls
export const ControlsContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "24px",
  gap: "16px",
  flexWrap: "wrap",

  [theme.breakpoints.down('md')]: {
    flexDirection: "column",
    alignItems: "stretch",
  },
}));

export const FiltersContainer = styled("div")({
  display: "flex",
  gap: "12px",
  alignItems: "center",
  flexWrap: "wrap",
});

export const FilterSelect = styled("select")({
  padding: "8px 12px",
  borderRadius: "8px",
  border: "1px solid #e2e8f0",
  backgroundColor: "#ffffff",
  fontSize: "14px",
  color: "#334155",
  cursor: "pointer",
  minWidth: "120px",
  
  "&:focus": {
    outline: "none",
    borderColor: palette.primary.main,
    boxShadow: `0 0 0 3px ${palette.primary.main}20`,
  },
});

export const SortContainer = styled("div")({
  display: "flex",
  gap: "8px",
  alignItems: "center",
});

export const ViewToggle = styled("div")({
  display: "flex",
  backgroundColor: "#f1f5f9",
  borderRadius: "8px",
  padding: "4px",
});

export const ViewToggleButton = styled("button")<{ active: boolean }>(({ active }) => ({
  padding: "8px 12px",
  borderRadius: "6px",
  border: "none",
  backgroundColor: active ? "#ffffff" : "transparent",
  color: active ? palette.primary.main : "#64748b",
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: 500,
  transition: "all 0.2s ease",
  display: "flex",
  alignItems: "center",
  gap: "6px",

  "&:hover": {
    backgroundColor: active ? "#ffffff" : "#e2e8f0",
  },
}));

// Articles Grid
export const ArticlesGrid = styled("div")<{ viewMode: 'grid' | 'list' }>(({ theme, viewMode }) => ({
  display: "grid",
  gap: "24px",
  gridTemplateColumns: viewMode === 'grid' ? "repeat(auto-fill, minmax(380px, 1fr))" : "1fr",

  [theme.breakpoints.down('lg')]: {
    gridTemplateColumns: viewMode === 'grid' ? "repeat(auto-fill, minmax(320px, 1fr))" : "1fr",
  },

  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: "1fr",
    gap: "16px",
  },
}));

// Article Card Components
export const ArticleCard = styled("div")<{ viewMode: 'grid' | 'list'; isArchived?: boolean }>(({ theme, viewMode, isArchived }) => ({
  backgroundColor: theme.palette.common.white,
  borderRadius: "16px",
  overflow: "hidden",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  border: "1px solid rgba(0,0,0,0.05)",
  transition: "all 0.3s ease",
  display: viewMode === 'list' ? 'flex' : 'block',
  position: 'relative',
  
  // Archived styling
  ...(isArchived && {
    opacity: 0.7,
    backgroundColor: '#f8fafc',
    border: "1px solid #e2e8f0",
    
    '&::before': {
      content: '"ARCHIVED"',
      position: 'absolute',
      top: '12px',
      right: '12px',
      backgroundColor: '#fbbf24',
      color: '#92400e',
      fontSize: '10px',
      fontWeight: 700,
      padding: '4px 8px',
      borderRadius: '4px',
      zIndex: 2,
      letterSpacing: '0.5px',
    },
  }),
  
  "&:hover": {
    boxShadow: isArchived ? "0 4px 12px rgba(0,0,0,0.08)" : "0 8px 24px rgba(0,0,0,0.12)",
    transform: isArchived ? "none" : "translateY(-4px)",
  },
}));

export const ArticleContent = styled("div")<{ viewMode: 'grid' | 'list' }>(({ viewMode }) => ({
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  flex: viewMode === 'list' ? 1 : 'none',
}));

export const ArticleImage = styled("div")<{ 
  backgroundImage?: string; 
  viewMode: 'grid' | 'list';
  hasVideo?: boolean;
  isArchived?: boolean;
}>(({ backgroundImage, viewMode, hasVideo, isArchived }) => ({
  width: viewMode === 'list' ? '200px' : '100%',
  height: viewMode === 'list' ? '140px' : '200px',
  backgroundColor: backgroundImage ? 'transparent' : '#f1f5f9',
  backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#64748b',
  position: 'relative',
  flexShrink: 0,

  // Archived image styling
  ...(isArchived && {
    filter: 'grayscale(50%)',
  }),

  ...(hasVideo && {
    '&::after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '48px',
      height: '48px',
      backgroundColor: 'rgba(0,0,0,0.7)',
      borderRadius: '50%',
      backgroundImage: `url("data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>')}")`,
      backgroundSize: '20px',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    },
  }),
}));


export const ArticleHeader = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: "12px",
});

export const ArticleTitle = styled("h3")<{ isArchived?: boolean }>(({ isArchived }) => ({
  fontSize: "18px",
  fontWeight: 600,
  color: isArchived ? "#64748b" : "#0f172a",
  margin: 0,
  lineHeight: 1.4,
  flex: 1,
}));

export const ArticleActions = styled("div")({
  display: "flex",
  gap: "8px",
  alignItems: "center",
  flexWrap: "wrap",
});

export const ActionButton = styled("button")<{ 
  variant?: 'edit' | 'archive' | 'view' | 'restore' | 'delete' 
}>(({ variant = 'view' }) => ({
  width: "36px",
  height: "36px",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 0.2s ease",
  fontSize: "14px",
  fontWeight: 500,
  
  ...(variant === 'edit' && {
    backgroundColor: `${palette.primary.main}15`,
    color: palette.primary.main,
    '&:hover': {
      backgroundColor: `${palette.primary.main}25`,
      transform: "scale(1.05)",
    },
  }),
  ...(variant === 'archive' && {
    backgroundColor: '#fef3c7',
    color: '#f59e0b',
    '&:hover': {
      backgroundColor: '#fde68a',
      transform: "scale(1.05)",
    },
  }),
  ...(variant === 'view' && {
    backgroundColor: '#f1f5f9',
    color: '#64748b',
    '&:hover': {
      backgroundColor: '#e2e8f0',
      color: '#475569',
      transform: "scale(1.05)",
    },
  }),
  ...(variant === 'restore' && {
    backgroundColor: '#d1fae5',
    color: '#059669',
    '&:hover': {
      backgroundColor: '#a7f3d0',
      transform: "scale(1.05)",
    },
  }),
  ...(variant === 'delete' && {
    backgroundColor: '#fee2e2',
    color: '#dc2626',
    '&:hover': {
      backgroundColor: '#fecaca',
      transform: "scale(1.05)",
    },
  }),
}));

export const ArticleMeta = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "16px",
  fontSize: "14px",
  color: "#64748b",
  flexWrap: "wrap",
});

export const MetaItem = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "6px",
});

export const CategoryBadge = styled("span")<{ category: string }>(({ category }) => ({
  padding: "4px 10px",
  borderRadius: "8px",
  fontSize: "12px",
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.5px",
  ...(category.toLowerCase() === 'technology' && {
    backgroundColor: '#dbeafe',
    color: '#1d4ed8',
  }),
  ...(category.toLowerCase() === 'environment' && {
    backgroundColor: '#dcfce7',
    color: '#166534',
  }),
  ...(category.toLowerCase() === 'finance' && {
    backgroundColor: '#fef3c7',
    color: '#92400e',
  }),
  ...(category.toLowerCase() === 'science' && {
    backgroundColor: '#ede9fe',
    color: '#7c3aed',
  }),
  ...(category.toLowerCase() === 'sports' && {
    backgroundColor: '#fef2f2',
    color: '#dc2626',
  }),
  ...(category.toLowerCase() === 'health' && {
    backgroundColor: '#ecfdf5',
    color: '#059669',
  }),
  ...(!['technology', 'environment', 'finance', 'science', 'sports', 'health'].includes(category.toLowerCase()) && {
    backgroundColor: '#f3f4f6',
    color: '#6b7280',
  }),
}));

export const ArticleDescription = styled("div")<{ viewMode: 'grid' | 'list'; isArchived?: boolean }>(({ viewMode, isArchived }) => ({
  fontSize: "14px",
  color: isArchived ? "#94a3b8" : "#64748b",
  lineHeight: 1.6,
  margin: 0,
  display: "-webkit-box",
  WebkitLineClamp: viewMode === 'grid' ? 3 : 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
}));

// Search Results Components
export const SearchResultsHeader = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "24px",
  padding: "16px 0",
  borderBottom: "1px solid #f1f5f9",
});

export const SearchResultsCount = styled("div")({
  fontSize: "16px",
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
  fontSize: "14px",
  cursor: "pointer",
  fontWeight: 500,
  transition: "all 0.2s ease",

  "&:hover": {
    backgroundColor: "#f8fafc",
    borderColor: "#cbd5e1",
  },
});

// No Results State
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
  margin: "0 auto 24px",
  color: "#94a3b8",
});

export const NoResultsTitle = styled("h3")({
  fontSize: "20px",
  fontWeight: 600,
  color: "#0f172a",
  margin: "0 0 12px",
});

export const NoResultsText = styled("p")({
  fontSize: "16px",
  color: "#64748b",
  margin: 0,
  lineHeight: 1.6,
});

// Pagination
export const PaginationContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "48px",
  gap: "8px",
});

export const PaginationButton = styled("button")<{ active?: boolean; disabled?: boolean }>(({ active, disabled }) => ({
  width: "40px",
  height: "40px",
  borderRadius: "8px",
  border: "1px solid #e2e8f0",
  backgroundColor: active ? palette.primary.main : "#ffffff",
  color: active ? "#ffffff" : disabled ? "#cbd5e1" : "#334155",
  cursor: disabled ? "not-allowed" : "pointer",
  fontSize: "14px",
  fontWeight: 500,
  transition: "all 0.2s ease",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  "&:hover": {
    backgroundColor: disabled ? "#ffffff" : active ? palette.primary.main : "#f8fafc",
    borderColor: disabled ? "#e2e8f0" : active ? palette.primary.main : "#cbd5e1",
  },
}));

export const PaginationInfo = styled("div")({
  fontSize: "14px",
  color: "#64748b",
  margin: "0 16px",
});