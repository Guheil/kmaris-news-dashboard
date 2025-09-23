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

export const DashboardRoot = styled("div")(({ theme }) => ({
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

export const DashboardGrid = styled("div")(({ theme }) => ({
  display: "grid",
  gap: "20px",
  gridTemplateColumns: "repeat(12, 1fr)",
  
  [theme.breakpoints.down("lg")]: {
    gridTemplateColumns: "repeat(8, 1fr)",
  },
  
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr",
    gap: "16px",
  },
}));

export const Card = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  borderRadius: "16px",
  padding: "24px",
  boxShadow: `0 4px 12px ${theme.palette.common.black}14`,
  border: `1px solid ${theme.palette.border.light}`,
  transition: "all 0.2s ease",
  
  "&:hover": {
    boxShadow: `0 8px 24px ${theme.palette.common.black}1F`,
    transform: "translateY(-2px)",
  },
  
  [theme.breakpoints.down("md")]: {
    padding: "20px",
  },
}));

export const CardHeader = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "20px",
}));

export const CardTitle = styled("h2")(({ theme }) => ({
  fontSize: "18px",
  fontWeight: 600,
  color: theme.palette.text.primary,
  margin: 0,
  letterSpacing: "-0.3px",
}));

export const CardContent = styled("div")(({ theme }) => ({
  width: "100%",
}));

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

export const StatsGrid = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "16px",
  paddingTop: "1rem",
  marginBottom: "24px",

  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "repeat(2, 1fr)",
  },
  
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "1fr",
  },
}));

export const StatCard = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  padding: "20px",
  borderRadius: "12px",
  border: `1px solid ${theme.palette.grey[100]}`,
  display: "flex",
  flexDirection: "column",
  gap: "8px",
}));

export const StatNumber = styled("div")(({ theme }) => ({
  fontSize: "28px",
  fontWeight: 700,
  color: theme.palette.navy.main,
  lineHeight: 1,
}));

export const StatLabel = styled("div")(({ theme }) => ({
  fontSize: "14px",
  color: theme.palette.grey[600],
  fontWeight: 500,
}));

export const StatIcon = styled("div")<{ color: string }>(({ theme, color }) => ({
  width: "40px",
  height: "40px",
  borderRadius: "10px",
  backgroundColor: `${color}15`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: color,
  marginBottom: "8px",
}));

export const NewsTable = styled("div")(({ theme }) => ({
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
    backgroundColor: theme.palette.border.main,
    borderRadius: "4px",
    "&:hover": {
      backgroundColor: theme.palette.border.dark,
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
  textTransform: "uppercase",
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

export const MediaPreviewContainer = styled("div")(({ theme }) => ({
  width: "44px",
  height: "44px",
  flexShrink: 0,
  borderRadius: "8px",
  overflow: "hidden",
  position: "relative",
  backgroundColor: theme.palette.grey[50],
  border: `1px solid ${theme.palette.grey[100]}`,
}));

export const NewsImage = styled("img")(({ theme }) => ({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
}));

export const MediaPlaceholder = styled("div")<{ type: "video" | "document" }>(({ theme, type }) => ({
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: type === "video" ? theme.palette.info.light : theme.palette.grey[50],
  color: type === "video" ? theme.palette.info.dark : theme.palette.grey[600],
  position: "relative",

  ...(type === "video" && {
    "&::after": {
      content: '""',
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "16px",
      height: "16px",
      backgroundColor: theme.palette.info.dark,
      borderRadius: "50%",
      backgroundImage: `url("data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>')}")`,
      backgroundSize: "8px",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
    },
  }),
}));

export const NewsTitleText = styled("div")(({ theme }) => ({
  fontSize: "14px",
  fontWeight: 600,
  color: theme.palette.navy.main,
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
  whiteSpace: "nowrap",
}));

export const NewsDate = styled("div")(({ theme }) => ({
  fontSize: "14px",
  color: theme.palette.grey[600],
  whiteSpace: "nowrap",
}));

export const NewsViews = styled("div")(({ theme }) => ({
  fontSize: "14px",
  color: theme.palette.grey[600],
  display: "flex",
  alignItems: "center",
  gap: "4px",
  whiteSpace: "nowrap",
}));

export const CategoryBadge = styled("span")<{ category: string }>(
  ({ theme, category }) => {
    const colors = getCategoryColor(category || "Uncategorized");
    const [bgKey, bgShade] = colors.bg.split(".") as [keyof typeof theme.palette, string];
    const [textKey, textShade] = colors.text.split(".") as [keyof typeof theme.palette, string];

    const bgColor =
      theme.palette[bgKey] && (theme.palette[bgKey] as any)[bgShade]
        ? (theme.palette[bgKey] as any)[bgShade]
        : colors.bg;

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
      backgroundColor: theme.palette.border.main,
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

export const QuickActionGrid = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "12px",
}));

export const QuickActionButton = styled("button")(({ theme }) => ({
  width: "100%",
  padding: "16px",
  borderRadius: "12px",
  border: "none",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: "12px",
  backgroundColor: theme.palette.grey[50],
  color: theme.palette.navy.main,
  fontSize: "14px",
  fontWeight: 500,
  transition: "all 0.2s ease",

  "&:hover": {
    backgroundColor: theme.palette.grey[100],
    transform: "translateY(-1px)",
  },
}));

export const ActivityItem = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  padding: "12px 0",
  borderBottom: `1px solid ${theme.palette.grey[50]}`,

  "&:last-child": {
    borderBottom: "none",
  },
}));

export const ActivityIcon = styled("div")<{ color: string }>(({ theme, color }) => ({
  width: "32px",
  height: "32px",
  borderRadius: "8px",
  backgroundColor: `${color}15`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: color,
  flexShrink: 0,
}));

export const ActivityContent = styled("div")(({ theme }) => ({
  flex: 1,
  minWidth: 0,
}));

export const ActivityText = styled("div")(({ theme }) => ({
  fontSize: "14px",
  color: theme.palette.navy.main,
  fontWeight: 500,
  marginBottom: "2px",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
}));

export const ActivityTime = styled("div")(({ theme }) => ({
  fontSize: "12px",
  color: theme.palette.grey[600],
}));

export const SearchResultsHeader = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "16px",
  padding: "12px 0",
  borderBottom: `1px solid ${theme.palette.grey[100]}`,
  flexWrap: "wrap",
  gap: "8px",
}));

export const SearchResultsCount = styled("div")(({ theme }) => ({
  fontSize: "14px",
  color: theme.palette.grey[600],
  fontWeight: 500,
}));

export const SearchQuery = styled("span")(({ theme }) => ({
  fontWeight: 600,
  color: theme.palette.navy.main,
}));

export const ClearSearchButton = styled("button")(({ theme }) => ({
  padding: "6px 12px",
  borderRadius: "6px",
  border: `1px solid ${theme.palette.border.main}`,
  backgroundColor: "transparent",
  color: theme.palette.grey[600],
  fontSize: "12px",
  cursor: "pointer",
  fontWeight: 500,
  transition: "all 0.2s ease",
  whiteSpace: "nowrap",

  "&:hover": {
    backgroundColor: theme.palette.grey[50],
    borderColor: theme.palette.border.dark,
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
  color: theme.palette.navy.main,
  margin: "0 0 8px",
}));

export const NoResultsText = styled("p")(({ theme }) => ({
  fontSize: "14px",
  color: theme.palette.grey[600],
  margin: 0,
  lineHeight: 1.5,
}));