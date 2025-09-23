"use client";

import { styled } from "@mui/material/styles";

const getMetricIconColor = (variant: string = "default") => {
  const colors = [
    { bg: "primary.main", text: "common.white" },
    { bg: "success.light", text: "success.dark" },
    { bg: "info.light", text: "info.dark" },
    { bg: "warning.light", text: "warning.dark" },
  ];

  const variantMap: { [key: string]: number } = {
    total: 0,
    published: 1,
    views: 2,
    archived: 3,
    default: 0,
  };

  const index = variantMap[variant] !== undefined ? variantMap[variant] : 0;
  return colors[index];
};

export const AnalyticsRoot = styled("div")(({ theme }) => ({
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

export const PageHeader = styled("div")(({ theme }) => ({
  marginBottom: "32px",
}));

export const PageTitle = styled("h1")(({ theme }) => ({
  fontSize: "28px",
  fontWeight: 700,
  color: theme.palette.navy.main,
  margin: "0 0 8px",
}));

export const PageSubtitle = styled("p")(({ theme }) => ({
  fontSize: "16px",
  color: theme.palette.grey[600],
  margin: 0,
}));

export const FiltersContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "24px",
  gap: "16px",

  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    alignItems: "stretch",
  },
}));

export const FilterSelect = styled("select")(({ theme }) => ({
  padding: "8px 12px",
  borderRadius: "8px",
  border: `1px solid ${theme.palette.border.main}`,
  backgroundColor: theme.palette.common.white,
  fontSize: "14px",
  color: theme.palette.navy.main,
  cursor: "pointer",
  minWidth: "150px",

  "&:focus": {
    outline: "none",
    borderColor: theme.palette.primary.main,
    boxShadow: `0 0 0 3px ${theme.palette.primary.main}20`,
  },
}));

export const MetricsGrid = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "24px",
  marginBottom: "32px",

  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr",
    gap: "16px",
  },
}));

export const MetricCard = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  borderRadius: "16px",
  padding: "24px",
  boxShadow: `0 4px 12px ${theme.palette.common.black}14`,
  border: `1px solid ${theme.palette.border.light}`,
  transition: "all 0.3s ease",

  "&:hover": {
    boxShadow: `0 8px 24px ${theme.palette.common.black}1F`,
    transform: "translateY(-4px)",
  },
}));

export const MetricHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  marginBottom: "16px",
  gap: "12px",
}));

export const MetricIcon = styled("div")<{ variant?: string }>(
  ({ theme, variant = "default" }) => {
    const colors = getMetricIconColor(variant);

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
      width: "48px",
      height: "48px",
      borderRadius: "12px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      backgroundColor: bgColor,
      color: textColor,
    };
  }
);


export const MetricContent = styled("div")(({ theme }) => ({
  flex: 1,
  minWidth: 0,
}));

export const MetricValue = styled("div")(({ theme }) => ({
  fontSize: "28px",
  fontWeight: 700,
  color: theme.palette.navy.main,
  marginBottom: "4px",
  lineHeight: 1.2,
}));

export const MetricLabel = styled("div")(({ theme }) => ({
  fontSize: "14px",
  color: theme.palette.grey[600],
  fontWeight: 500,
  marginBottom: "8px",
}));

export const MetricChange = styled("div")<{
  type?: "positive" | "negative" | "neutral";
}>(({ theme, type }) => ({
  display: "flex",
  alignItems: "center",
  gap: "4px",
  fontSize: "14px",
  fontWeight: 500,
  color:
    type === "positive"
      ? theme.palette.success.main
      : type === "negative"
      ? theme.palette.error.main
      : theme.palette.grey[600],
}));

export const ChartsGrid = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "2fr 1fr",
  gap: "24px",
  marginBottom: "32px",

  [theme.breakpoints.down("lg")]: {
    gridTemplateColumns: "1fr",
  },
}));

export const ChartCard = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  borderRadius: "16px",
  padding: "24px",
  boxShadow: `0 4px 12px ${theme.palette.common.black}14`,
  border: `1px solid ${theme.palette.border.light}`,
}));

export const ChartTitle = styled("h3")(({ theme }) => ({
  fontSize: "18px",
  fontWeight: 600,
  color: theme.palette.navy.main,
  margin: "0 0 20px",
}));

export const LoadingState = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "400px",
  color: theme.palette.grey[600],
}));

export const LoadingSpinner = styled("div")(({ theme }) => ({
  width: "40px",
  height: "40px",
  border: `3px solid ${theme.palette.grey[100]}`,
  borderTop: `3px solid ${theme.palette.primary.main}`,
  borderRadius: "50%",
  animation: "spin 1s linear infinite",
  marginBottom: "16px",

  "@keyframes spin": {
    "0%": { transform: "rotate(0deg)" },
    "100%": { transform: "rotate(360deg)" },
  },
}));

export const ErrorState = styled("div")(({ theme }) => ({
  textAlign: "center",
  padding: "48px 24px",
  color: theme.palette.grey[600],
}));

export const ErrorTitle = styled("h3")(({ theme }) => ({
  fontSize: "18px",
  fontWeight: 600,
  color: theme.palette.error.main,
  margin: "0 0 8px",
}));

export const ErrorText = styled("div")(({ theme }) => ({
  fontSize: "14px",
  color: theme.palette.grey[600],
  margin: 0,
}));