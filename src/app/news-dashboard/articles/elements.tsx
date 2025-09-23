"use client";

import { styled } from "@mui/material/styles";

const getCategoryColor = (categoryName: string) => {
  const colors = [
    { bg: "info.light", text: "info.dark" },
    { bg: "success.light", text: "success.dark" },
    { bg: "warning.light", text: "warning.dark" },
    { bg: "secondary.light", text: "secondary.dark" },
    { bg: "error.light", text: "error.main" },
    { bg: "success.main", text: "success.dark" },
    { bg: "warning.main", text: "warning.dark" },
    { bg: "info.main", text: "info.dark" },
    { bg: "error.main", text: "error.main" },
    { bg: "secondary.main", text: "secondary.light" },
    { bg: "success.light", text: "success.dark" },
    { bg: "warning.light", text: "warning.dark" },
    { bg: "info.light", text: "info.dark" },
    { bg: "error.light", text: "error.main" },
    { bg: "grey.50", text: "grey.600" },
  ];

  let hash = 0;
  for (let i = 0; i < categoryName.length; i++) {
    const char = categoryName.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  
  const index = Math.abs(hash) % colors.length;
  return colors[index];
};

export const ArticlesRoot = styled("div")(({ theme }) => ({
  display: "flex",
  minHeight: "100vh",
  backgroundColor: theme.palette.grey[50],
  position: "relative",
}));

export const MainContent = styled("main")<{ sidebarOpen: boolean; isMobile: boolean }>(
  ({ theme, sidebarOpen, isMobile }) => ({
    flex: 1,
    padding: "84px 20px 20px",
    marginLeft: isMobile ? 0 : sidebarOpen ? "280px" : "80px",
    transition: "margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    minWidth: 0,
    
    [theme.breakpoints.down("md")]: {
      marginLeft: 0,
      padding: "74px 16px 16px",
    },
  })
);

export const SidebarOverlay = styled("div")<{ show: boolean }>(
  ({ theme, show }) => ({
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: `${theme.palette.common.black}80`,
    zIndex: 999,
    opacity: show ? 1 : 0,
    visibility: show ? "visible" : "hidden",
    transition: "all 0.3s ease",
    backdropFilter: "blur(4px)",
  })
);

export const ControlsContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "24px",
  gap: "16px",
  flexWrap: "wrap",

  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    alignItems: "stretch",
  },
}));

export const FiltersContainer = styled("div")(({ theme }) => ({
  display: "flex",
  gap: "12px",
  alignItems: "center",
  flexWrap: "wrap",
}));

export const FilterSelect = styled("select")(({ theme }) => ({
  padding: "8px 12px",
  borderRadius: "8px",
  border: `1px solid ${theme.palette.border.main}`,
  backgroundColor: theme.palette.common.white,
  fontSize: "14px",
  color: theme.palette.navy.main,
  cursor: "pointer",
  minWidth: "120px",
  
  "&:focus": {
    outline: "none",
    borderColor: theme.palette.primary.main,
    boxShadow: `0 0 0 3px ${theme.palette.primary.main}20`,
  },
}));

export const SortContainer = styled("div")(({ theme }) => ({
  display: "flex",
  gap: "8px",
  alignItems: "center",
}));

export const ViewToggle = styled("div")(({ theme }) => ({
  display: "flex",
  backgroundColor: theme.palette.grey[100],
  borderRadius: "8px",
  padding: "4px",
}));

export const ViewToggleButton = styled("button")<{ active: boolean }>(({ theme, active }) => ({
  padding: "8px 12px",
  borderRadius: "6px",
  border: "none",
  backgroundColor: active ? theme.palette.common.white : "transparent",
  color: active ? theme.palette.primary.main : theme.palette.grey[600],
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: 500,
  transition: "all 0.2s ease",
  display: "flex",
  alignItems: "center",
  gap: "6px",

  "&:hover": {
    backgroundColor: active ? theme.palette.common.white : theme.palette.border.main,
  },
}));

export const ArticlesGrid = styled("div")<{ viewMode: "grid" | "list" }>(({ theme, viewMode }) => ({
  display: "grid",
  gap: "24px",
  gridTemplateColumns: viewMode === "grid" ? "repeat(auto-fill, minmax(380px, 1fr))" : "1fr",

  [theme.breakpoints.down("lg")]: {
    gridTemplateColumns: viewMode === "grid" ? "repeat(auto-fill, minmax(320px, 1fr))" : "1fr",
  },

  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr",
    gap: "16px",
  },
}));

export const ArticleCard = styled("div")<{ viewMode: "grid" | "list"; isArchived?: boolean }>(({ theme, viewMode, isArchived }) => ({
  backgroundColor: theme.palette.common.white,
  borderRadius: "16px",
  overflow: "hidden",
  boxShadow: `0 4px 12px ${theme.palette.common.black}14`,
  border: `1px solid ${theme.palette.border.light}`,
  transition: "all 0.3s ease",
  display: viewMode === "list" ? "flex" : "block",
  position: "relative",
  
  ...(isArchived && {
    opacity: 0.7,
    backgroundColor: theme.palette.grey[50],
    border: `1px solid ${theme.palette.border.main}`,
    
    "&::before": {
      content: '"ARCHIVED"',
      position: "absolute",
      top: "12px",
      right: "12px",
      backgroundColor: theme.palette.warning.main,
      color: theme.palette.warning.dark,
      fontSize: "10px",
      fontWeight: 700,
      padding: "4px 8px",
      borderRadius: "4px",
      zIndex: 2,
      letterSpacing: "0.5px",
    },
  }),
  
  "&:hover": {
    boxShadow: isArchived ? `0 4px 12px ${theme.palette.common.black}14` : `0 8px 24px ${theme.palette.common.black}1F`,
    transform: isArchived ? "none" : "translateY(-4px)",
  },
}));

export const ArticleContent = styled("div")<{ viewMode: "grid" | "list" }>(({ theme, viewMode }) => ({
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  flex: viewMode === "list" ? 1 : "none",
}));

export const ArticleImage = styled("div")<{
  backgroundImage?: string;
  viewMode: "grid" | "list";
  hasVideo?: boolean;
  isArchived?: boolean;
}>(({ theme, backgroundImage, viewMode, hasVideo, isArchived }) => ({
  width: viewMode === "list" ? "200px" : "100%",
  height: viewMode === "list" ? "140px" : "200px",
  backgroundColor: backgroundImage ? "transparent" : theme.palette.grey[100],
  backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
  backgroundSize: "cover",
  backgroundPosition: "center",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.grey[600],
  position: "relative",
  flexShrink: 0,

  ...(isArchived && {
    filter: "grayscale(50%)",
  }),

  ...(hasVideo && {
    "&::after": {
      content: '""',
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "48px",
      height: "48px",
      backgroundColor: `${theme.palette.common.black}B3`,
      borderRadius: "50%",
      backgroundImage: `url("data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>')}")`,
      backgroundSize: "20px",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
    },
  }),
}));

export const ArticleHeader = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: "12px",
}));

export const ArticleTitle = styled("h3")<{ isArchived?: boolean }>(({ theme, isArchived }) => ({
  fontSize: "18px",
  fontWeight: 600,
  color: isArchived ? theme.palette.grey[600] : theme.palette.navy.main,
  margin: 0,
  lineHeight: 1.4,
  flex: 1,
}));

export const ArticleActions = styled("div")(({ theme }) => ({
  display: "flex",
  gap: "8px",
  alignItems: "center",
  flexWrap: "wrap",
}));

export const ActionButton = styled("button")<{
  variant?: "edit" | "archive" | "view" | "restore" | "delete";
}>(({ theme, variant = "view" }) => ({
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
  
  ...(variant === "edit" && {
    backgroundColor: `${theme.palette.primary.main}15`,
    color: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: `${theme.palette.primary.main}25`,
      transform: "scale(1.05)",
    },
  }),
  ...(variant === "archive" && {
    backgroundColor: theme.palette.warning.light,
    color: theme.palette.warning.main,
    "&:hover": {
      backgroundColor: `${theme.palette.warning.main}CC`,
      transform: "scale(1.05)",
    },
  }),
  ...(variant === "view" && {
    backgroundColor: theme.palette.grey[100],
    color: theme.palette.grey[600],
    "&:hover": {
      backgroundColor: theme.palette.border.main,
      color: theme.palette.grey[700],
      transform: "scale(1.05)",
    },
  }),
  ...(variant === "restore" && {
    backgroundColor: theme.palette.success.light,
    color: theme.palette.success.main,
    "&:hover": {
      backgroundColor: `${theme.palette.success.main}CC`,
      transform: "scale(1.05)",
    },
  }),
  ...(variant === "delete" && {
    backgroundColor: theme.palette.error.light,
    color: theme.palette.error.main,
    "&:hover": {
      backgroundColor: `${theme.palette.error.main}CC`,
      transform: "scale(1.05)",
    },
  }),
}));

export const ArticleMeta = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "16px",
  fontSize: "14px",
  color: theme.palette.grey[600],
  flexWrap: "wrap",
}));

export const MetaItem = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "6px",
}));

export const CategoryBadge = styled("span")<{ category: string }>(
  ({ theme, category }) => {
    const colors = getCategoryColor(category || "Uncategorized");

    // split "primary.main" → ["primary", "main"]
    const [bgKey, bgShade] = colors.bg.split(".") as [keyof typeof theme.palette, string];
    const [textKey, textShade] = colors.text.split(".") as [keyof typeof theme.palette, string];

    // safely resolve colors
    const bgColor =
      theme.palette[bgKey] && (theme.palette[bgKey] as any)[bgShade]
        ? (theme.palette[bgKey] as any)[bgShade]
        : colors.bg; // fallback to raw string if not found

    const textColor =
      theme.palette[textKey] && (theme.palette[textKey] as any)[textShade]
        ? (theme.palette[textKey] as any)[textShade]
        : colors.text;

    return {
      padding: "2px 8px",
      borderRadius: "4px",
      fontSize: "11px",
      fontWeight: 600,
      textTransform: "uppercase",
      letterSpacing: "0.5px",
      backgroundColor: bgColor,
      color: textColor,
      whiteSpace: "nowrap",
      display: "inline-block",
      maxWidth: "120px",
      overflow: "hidden",
      textOverflow: "ellipsis",
    };
  }
);


export const ArticleDescription = styled("div")<{ viewMode: "grid" | "list"; isArchived?: boolean }>(({ theme, viewMode, isArchived }) => ({
  fontSize: "14px",
  color: isArchived ? theme.palette.grey[400] : theme.palette.grey[600],
  lineHeight: 1.6,
  margin: 0,
  display: "-webkit-box",
  WebkitLineClamp: viewMode === "grid" ? 3 : 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
}));

export const SearchResultsHeader = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "24px",
  padding: "16px 0",
  borderBottom: `1px solid ${theme.palette.grey[100]}`,
}));

export const SearchResultsCount = styled("div")(({ theme }) => ({
  fontSize: "16px",
  color: theme.palette.grey[600],
  fontWeight: 500,
}));

export const SearchQuery = styled("span")(({ theme }) => ({
  fontWeight: 600,
  color: theme.palette.navy.main,
}));

export const ClearSearchButton = styled("button")(({ theme }) => ({
  padding: "8px 16px",
  borderRadius: "8px",
  border: `1px solid ${theme.palette.border.main}`,
  backgroundColor: "transparent",
  color: theme.palette.grey[600],
  fontSize: "14px",
  cursor: "pointer",
  fontWeight: 500,
  transition: "all 0.2s ease",

  "&:hover": {
    backgroundColor: theme.palette.grey[50],
    borderColor: theme.palette.border.dark,
  },
}));

export const NoResults = styled("div")(({ theme }) => ({
  textAlign: "center",
  padding: "80px 24px",
  color: theme.palette.grey[600],
}));

export const NoResultsIcon = styled("div")(({ theme }) => ({
  width: "80px",
  height: "80px",
  borderRadius: "50%",
  backgroundColor: theme.palette.grey[100],
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 auto 24px",
  color: theme.palette.grey[400],
}));

export const NoResultsTitle = styled("h3")(({ theme }) => ({
  fontSize: "20px",
  fontWeight: 600,
  color: theme.palette.navy.main,
  margin: "0 0 12px",
}));

export const NoResultsText = styled("p")(({ theme }) => ({
  fontSize: "16px",
  color: theme.palette.grey[600],
  margin: 0,
  lineHeight: 1.6,
}));

export const PaginationContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "48px",
  gap: "8px",
}));

export const PaginationButton = styled("button")<{ active?: boolean; disabled?: boolean }>(({ theme, active, disabled }) => ({
  width: "40px",
  height: "40px",
  borderRadius: "8px",
  border: `1px solid ${theme.palette.border.main}`,
  backgroundColor: active ? theme.palette.primary.main : theme.palette.common.white,
  color: active ? theme.palette.common.white : disabled ? theme.palette.grey[400] : theme.palette.navy.main,
  cursor: disabled ? "not-allowed" : "pointer",
  fontSize: "14px",
  fontWeight: 500,
  transition: "all 0.2s ease",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  "&:hover": {
    backgroundColor: disabled ? theme.palette.common.white : active ? theme.palette.primary.main : theme.palette.grey[50],
    borderColor: disabled ? theme.palette.border.main : active ? theme.palette.primary.main : theme.palette.border.dark,
  },
}));

export const PaginationInfo = styled("div")(({ theme }) => ({
  fontSize: "14px",
  color: theme.palette.grey[600],
  margin: "0 16px",
}));