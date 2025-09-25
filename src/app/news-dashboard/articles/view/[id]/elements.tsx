"use client";

import { styled, keyframes } from "@mui/material/styles";
import { Theme as MUITheme } from "@mui/material/styles";

interface CategoryColors {
  bg: string;
  text: string;
}

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

export const ViewArticleRoot = styled("div")(({ theme }) => ({
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

export const ArticleContainer = styled("div")(({ theme }) => ({
  maxWidth: "900px",
  margin: "0 auto",
  backgroundColor: theme.palette.common.white,
  borderRadius: "16px",
  padding: "32px",
  boxShadow: `0 4px 16px ${theme.palette.common.black}14`,
  border: `1px solid ${theme.palette.divider}`,

  [theme.breakpoints.down("md")]: {
    padding: "24px",
    margin: "0",
    borderRadius: "12px",
  },

  [theme.breakpoints.down("sm")]: {
    padding: "20px",
  },
}));

export const BackButton = styled("button")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  padding: "10px 16px",
  borderRadius: "8px",
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor: "transparent",
  color: theme.palette.grey[600],
  fontSize: "14px",
  fontWeight: 500,
  cursor: "pointer",
  marginBottom: "24px",
  transition: "all 0.2s ease",

  "&:hover": {
    backgroundColor: theme.palette.grey[50],
    borderColor: theme.palette.grey[400],
    color: theme.palette.grey[700],
  },
}));

export const ArticleHeader = styled("div")(({ theme }) => ({
  marginBottom: "32px",
  
  [theme.breakpoints.down("md")]: {
    marginBottom: "24px",
  },
}));

export const ArticleTitle = styled("h1")(({ theme }) => ({
  fontSize: "32px",
  fontWeight: 700,
  color: theme.palette.text.primary,
  lineHeight: 1.3,
  margin: "0 0 20px 0",

  [theme.breakpoints.down("md")]: {
    fontSize: "28px",
  },

  [theme.breakpoints.down("sm")]: {
    fontSize: "24px",
  },
}));

export const ArticleMeta = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "20px",
  marginBottom: "20px",
  flexWrap: "wrap",

  [theme.breakpoints.down("sm")]: {
    gap: "16px",
  },
}));

export const MetaItem = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "6px",
  fontSize: "14px",
  color: theme.palette.grey[600],
}));

export const AuthorAvatar = styled("div")(({ theme }) => ({
  width: "24px",
  height: "24px",
  borderRadius: "50%",
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "12px",
  fontWeight: 600,
}));

export const AuthorName = styled("span")(({ theme }) => ({
  fontWeight: 500,
  color: theme.palette.grey[700],
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

export const ArticleActions = styled("div")(({ theme }) => ({
  display: "flex",
  gap: "12px",
  alignItems: "center",

  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "stretch",
  },
}));

export const ActionButton = styled("button")<{
  variant?: "edit" | "archive" | "share";
  disabled?: boolean;
}>(({ theme, variant = "edit", disabled }) => ({
  padding: "10px 16px",
  borderRadius: "8px",
  border: "none",
  cursor: disabled ? "not-allowed" : "pointer",
  display: "flex",
  alignItems: "center",
  gap: "8px",
  fontSize: "14px",
  fontWeight: 500,
  transition: "all 0.2s ease",
  opacity: disabled ? 0.6 : 1,
  
  ...(variant === "edit" && {
    backgroundColor: `${theme.palette.primary.main}15`,
    color: theme.palette.primary.main,
    "&:hover": !disabled && {
      backgroundColor: `${theme.palette.primary.main}25`,
      transform: "translateY(-1px)",
    },
  }),
  ...(variant === "archive" && {
    backgroundColor: theme.palette.warning.light,
    color: theme.palette.warning.main,
    "&:hover": !disabled && {
      backgroundColor: `${theme.palette.warning.main}CC`,
      transform: "translateY(-1px)",
    },
  }),
  ...(variant === "share" && {
    backgroundColor: theme.palette.grey[100],
    color: theme.palette.grey[600],
    "&:hover": !disabled && {
      backgroundColor: theme.palette.grey[200],
      color: theme.palette.grey[700],
      transform: "translateY(-1px)",
    },
  }),
}));

export const ArticleMediaContainer = styled("div")(({ theme }) => ({
  marginBottom: "32px",
  borderRadius: "12px",
  overflow: "hidden",
  
  [theme.breakpoints.down("md")]: {
    marginBottom: "24px",
  },
}));

export const ArticleImage = styled("div")<{ backgroundImage?: string }>(({ theme, backgroundImage }) => ({
  width: "100%",
  height: "400px",
  backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
  backgroundColor: backgroundImage ? "transparent" : theme.palette.grey[100],
  backgroundSize: "cover",
  backgroundPosition: "center",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.grey[600],
  borderRadius: "12px",
}));

export const ArticleVideo = styled("div")(({ theme }) => ({
  width: "100%",
  height: "400px",
  position: "relative",
  borderRadius: "12px",
  overflow: "hidden",
}));

export const PlayButton = styled("button")(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60px",
  height: "60px",
  borderRadius: "50%",
  backgroundColor: `${theme.palette.common.black}B3`,
  border: "none",
  color: theme.palette.common.white,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 0.2s ease",
  
  "&:hover": {
    backgroundColor: `${theme.palette.common.black}CC`,
    transform: "translate(-50%, -50%) scale(1.1)",
  },
}));

export const ArticleContent = styled("div")(({ theme }) => ({
  lineHeight: 1.7,
}));

export const ArticleDescription = styled("div")(({ theme }) => ({
  fontSize: "16px",
  color: theme.palette.grey[700],
  lineHeight: 1.7,
  whiteSpace: "pre-wrap",
  
  [theme.breakpoints.down("md")]: {
    fontSize: "15px",
  },
}));

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const LoadingContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "80px 24px",
  color: theme.palette.grey[600],
  gap: "16px",
}));

export const LoadingSpinner = styled("div")(({ theme }) => ({
  width: "40px",
  height: "40px",
  border: `3px solid ${theme.palette.grey[100]}`,
  borderTop: `3px solid ${theme.palette.primary.main}`,
  borderRadius: "50%",
  animation: `${spin} 1s linear infinite`,
}));

export const ErrorContainer = styled("div")(({ theme }) => ({
  textAlign: "center",
  padding: "80px 24px",
  color: theme.palette.grey[600],
}));

export const ErrorIcon = styled("div")(({ theme }) => ({
  width: "80px",
  height: "80px",
  borderRadius: "50%",
  backgroundColor: theme.palette.error.light,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 auto 24px",
  color: theme.palette.error.main,
}));

export const ErrorTitle = styled("h3")(({ theme }) => ({
  fontSize: "20px",
  fontWeight: 600,
  color: theme.palette.text.primary,
  margin: "0 0 12px",
}));

export const ErrorMessage = styled("p")(({ theme }) => ({
  fontSize: "16px",
  color: theme.palette.grey[600],
  margin: "0 0 24px",
  lineHeight: 1.6,
}));

export const RetryButton = styled("button")(({ theme }) => ({
  padding: "12px 20px",
  borderRadius: "8px",
  border: "none",
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  fontSize: "14px",
  fontWeight: 500,
  cursor: "pointer",
  transition: "all 0.2s ease",

  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
    transform: "translateY(-1px)",
  },
}));