// src/components/article-card/elements.tsx
"use client";

import { styled } from "@mui/material/styles";
import { Theme as MUITheme } from "@mui/material/styles";
import { CategoryColors } from "./interface";

const getCategoryColor = (categoryName: string): CategoryColors => {
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

// Helper function to safely get nested palette colors
const getPaletteColor = (theme: MUITheme, colorPath: string): string => {
  const [colorKey, shade] = colorPath.split('.') as [keyof MUITheme['palette'], string];
  const colorGroup = theme.palette[colorKey];
  
  if (colorGroup && typeof colorGroup === 'object' && shade in colorGroup) {
    return (colorGroup as Record<string, string>)[shade];
  }
  
  return colorPath; // Fallback to the original string
};

export const ArticleComponent = styled("div")<{ viewMode: "grid" | "list"; isArchived?: boolean }>(({ theme, viewMode, isArchived }) => ({
  backgroundColor: theme.palette.common.white,
  borderRadius: "16px",
  overflow: "hidden",
  boxShadow: `0 4px 12px ${theme.palette.common.black}14`,
  border: `1px solid ${theme.palette.divider}`,
  transition: "all 0.3s ease",
  display: viewMode === "list" ? "flex" : "block",
  position: "relative",

  ...(isArchived && {
    opacity: 0.7,
    backgroundColor: theme.palette.grey[50],
    border: `1px solid ${theme.palette.divider}`,

    ...(viewMode === "grid" && {
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
  color: isArchived ? theme.palette.grey[600] : theme.palette.text.primary,
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
      backgroundColor: theme.palette.grey[200],
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

export const CategoryBadge = styled("span")<{ category: string }>(({ theme, category }) => {
  const colors = getCategoryColor(category || "Uncategorized");
  const bgColor = getPaletteColor(theme, colors.bg);
  const textColor = getPaletteColor(theme, colors.text);

  return {
    padding: "2px 8px",
    borderRadius: "4px",
    fontSize: "11px",
    fontWeight: 600,
    textTransform: "uppercase" as const,
    letterSpacing: "0.5px",
    backgroundColor: bgColor,
    color: textColor,
    whiteSpace: "nowrap" as const,
    display: "inline-block",
    maxWidth: "120px",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };
});

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