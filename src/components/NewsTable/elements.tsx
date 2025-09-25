import { styled } from "@mui/material/styles";
import { Theme as MUITheme } from "@mui/material/styles";
import { CategoryColors } from "@/app/news-dashboard/interface";

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

const getPaletteColor = (theme: MUITheme, colorPath: string): string => {
  const [colorKey, shade] = colorPath.split('.') as [keyof MUITheme['palette'], string];
  const colorGroup = theme.palette[colorKey];
  
  if (colorGroup && typeof colorGroup === 'object' && shade in colorGroup) {
    return (colorGroup as Record<string, string>)[shade];
  }
  
  return colorPath;
};

export const NewsTableRoot = styled("div")(({ theme }) => ({
  width: "100%",
  overflowX: "auto",
  
  "&::-webkit-scrollbar": {
    height: "8px",
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: theme.palette.grey[50],
    borderRadius: "4px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: theme.palette.grey[300],
    borderRadius: "4px",
    "&:hover": {
      backgroundColor: theme.palette.grey[400],
    },
  },
}));

export const NewsTableContent = styled("div")(({ theme }) => ({
  minWidth: "800px",
  width: "100%",
  
  [theme.breakpoints.down("sm")]: {
    minWidth: "600px",
  },
}));

export const NewsTableHeader = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "2fr 1fr 1fr 1fr 120px",
  gap: "16px",
  padding: "12px 0",
  borderBottom: `1px solid ${theme.palette.grey[100]}`,
  fontSize: "12px",
  fontWeight: 600,
  color: theme.palette.grey[600],
  textTransform: "uppercase" as const,
  letterSpacing: "0.5px",
}));

export const NewsTableRow = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "2fr 1fr 1fr 1fr 120px",
  gap: "16px",
  padding: "16px 0",
  borderBottom: `1px solid ${theme.palette.grey[50]}`,
  alignItems: "center",
  transition: "all 0.2s ease",

  "&:hover": {
    backgroundColor: theme.palette.grey[50],
  },
}));

export const NewsTitle = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  minWidth: 0,
}));

export const NewsTitleText = styled("div")(({ theme }) => ({
  fontSize: "14px",
  fontWeight: 600,
  color: theme.palette.text.primary,
  lineHeight: 1.4,
  overflow: "hidden",
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  marginBottom: "4px",
  minWidth: 0,
}));

export const NewsAuthor = styled("div")(({ theme }) => ({
  fontSize: "14px",
  color: theme.palette.grey[600],
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap" as const,
}));

export const NewsDate = styled("div")(({ theme }) => ({
  fontSize: "14px",
  color: theme.palette.grey[600],
  whiteSpace: "nowrap" as const,
}));

export const NewsViews = styled("div")(({ theme }) => ({
  fontSize: "14px",
  color: theme.palette.grey[600],
  display: "flex",
  alignItems: "center",
  gap: "4px",
  whiteSpace: "nowrap" as const,
}));

export const ActionButtons = styled("div")(({ theme }) => ({
  display: "flex",
  gap: "4px",
  flexShrink: 0,
}));

export const ActionButton = styled("button")<{ variant?: "view" | "edit" | "delete" }>(({ theme, variant = "view" }) => ({
  width: "32px",
  height: "32px",
  borderRadius: "6px",
  border: "none",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 0.2s ease",
  flexShrink: 0,
  ...(variant === "view" && {
    backgroundColor: theme.palette.grey[100],
    color: theme.palette.grey[600],
    "&:hover": {
      backgroundColor: theme.palette.grey[200],
      color: theme.palette.grey[700],
    },
  }),
  ...(variant === "edit" && {
    backgroundColor: `${theme.palette.primary.main}15`,
    color: theme.palette.primary.main,
    "&:hover": {
      backgroundColor: `${theme.palette.primary.main}25`,
    },
  }),
  ...(variant === "delete" && {
    backgroundColor: theme.palette.error.light,
    color: theme.palette.error.main,
    "&:hover": {
      backgroundColor: `${theme.palette.error.main}CC`,
    },
  }),
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

export const SearchResultsHeader = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "16px",
  padding: "12px 0",
  borderBottom: `1px solid ${theme.palette.grey[100]}`,
  flexWrap: "wrap" as const,
  gap: "8px",
}));

export const SearchResultsCount = styled("div")(({ theme }) => ({
  fontSize: "14px",
  color: theme.palette.grey[600],
  fontWeight: 500,
}));

export const SearchQuery = styled("span")(({ theme }) => ({
  fontWeight: 600,
  color: theme.palette.text.primary,
}));

export const ClearSearchButton = styled("button")(({ theme }) => ({
  padding: "6px 12px",
  borderRadius: "6px",
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor: "transparent",
  color: theme.palette.grey[600],
  fontSize: "12px",
  cursor: "pointer",
  fontWeight: 500,
  transition: "all 0.2s ease",
  whiteSpace: "nowrap" as const,

  "&:hover": {
    backgroundColor: theme.palette.grey[50],
    borderColor: theme.palette.grey[400],
  },
}));

export const NoResults = styled("div")(({ theme }) => ({
  textAlign: "center",
  padding: "48px 24px",
  color: theme.palette.grey[600],
}));

export const NoResultsIcon = styled("div")(({ theme }) => ({
  width: "64px",
  height: "64px",
  borderRadius: "50%",
  backgroundColor: theme.palette.grey[100],
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 auto 16px",
  color: theme.palette.grey[400],
}));

export const NoResultsTitle = styled("h3")(({ theme }) => ({
  fontSize: "16px",
  fontWeight: 600,
  color: theme.palette.text.primary,
  margin: "0 0 8px",
}));

export const NoResultsText = styled("p")(({ theme }) => ({
  fontSize: "14px",
  color: theme.palette.grey[600],
  margin: 0,
  lineHeight: 1.5,
}));