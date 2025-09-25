import { styled } from "@mui/material/styles";
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

const getPaletteColor = (theme: MUITheme, colorPath: string): string => {
  const [colorKey, shade] = colorPath.split('.') as [keyof MUITheme['palette'], string];
  const colorGroup = theme.palette[colorKey];

  if (colorGroup && typeof colorGroup === 'object' && shade in colorGroup) {
    return (colorGroup as Record<string, string>)[shade];
  }

  return colorPath;
};

export const ViewArticleHeader = styled("div")(({ theme }) => ({
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