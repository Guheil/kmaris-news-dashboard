"use client";

import { styled } from "@mui/material/styles";
import { palette } from "@/theme/pallete";

export const AnalyticsRoot = styled("div")(({ theme }) => ({
  display: "flex",
  minHeight: "100vh",
  backgroundColor: "#F8F9FA",
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

export const SidebarOverlay = styled("div")<{ show: boolean }>(({ show }) => ({
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
}));

export const PageHeader = styled("div")({
  marginBottom: "32px",
});

export const PageTitle = styled("h1")({
  fontSize: "28px",
  fontWeight: 700,
  color: "#0f172a",
  margin: "0 0 8px",
});

export const PageSubtitle = styled("p")({
  fontSize: "16px",
  color: "#64748b",
  margin: 0,
});

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

export const FilterSelect = styled("select")({
  padding: "8px 12px",
  borderRadius: "8px",
  border: "1px solid #e2e8f0",
  backgroundColor: "#ffffff",
  fontSize: "14px",
  color: "#334155",
  cursor: "pointer",
  minWidth: "150px",

  "&:focus": {
    outline: "none",
    borderColor: palette.primary.main,
    boxShadow: `0 0 0 3px ${palette.primary.main}20`,
  },
});

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

export const MetricCard = styled("div")({
  backgroundColor: "#ffffff",
  borderRadius: "16px",
  padding: "24px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  border: "1px solid rgba(0,0,0,0.05)",
  transition: "all 0.3s ease",

  "&:hover": {
    boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
    transform: "translateY(-4px)",
  },
});

export const MetricHeader = styled("div")({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  marginBottom: "16px",
  gap: "12px",
});

export const MetricIcon = styled("div")<{ variant?: string }>(
  ({ variant = "default" }) => ({
    width: "48px",
    height: "48px",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    ...(variant === "total" && {
      backgroundColor: `${palette.primary.main}15`,
      color: palette.primary.main,
    }),
    ...(variant === "published" && {
      backgroundColor: "#dcfce7",
      color: "#166534",
    }),
    ...(variant === "views" && {
      backgroundColor: "#dbeafe",
      color: "#1d4ed8",
    }),
    ...(variant === "archived" && {
      backgroundColor: "#fef3c7",
      color: "#f59e0b",
    }),
  })
);

export const MetricContent = styled("div")({
  flex: 1,
  minWidth: 0,
});

export const MetricValue = styled("div")({
  fontSize: "28px",
  fontWeight: 700,
  color: "#0f172a",
  marginBottom: "4px",
  lineHeight: 1.2,
});

export const MetricLabel = styled("div")({
  fontSize: "14px",
  color: "#64748b",
  fontWeight: 500,
  marginBottom: "8px",
});

export const MetricChange = styled("div")<{
  type?: "positive" | "negative" | "neutral";
}>(({ type }) => ({
  display: "flex",
  alignItems: "center",
  gap: "4px",
  fontSize: "14px",
  fontWeight: 500,
  color:
    type === "positive"
      ? "#10b981"
      : type === "negative"
      ? "#ef4444"
      : "#64748b",
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

export const ChartCard = styled("div")({
  backgroundColor: "#ffffff",
  borderRadius: "16px",
  padding: "24px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  border: "1px solid rgba(0,0,0,0.05)",
});

export const ChartTitle = styled("h3")({
  fontSize: "18px",
  fontWeight: 600,
  color: "#0f172a",
  margin: "0 0 20px",
});

export const LoadingState = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "400px",
  color: "#64748b",
});

export const LoadingSpinner = styled("div")({
  width: "40px",
  height: "40px",
  border: "3px solid #f1f5f9",
  borderTop: "3px solid #3b82f6",
  borderRadius: "50%",
  animation: "spin 1s linear infinite",
  marginBottom: "16px",

  "@keyframes spin": {
    "0%": { transform: "rotate(0deg)" },
    "100%": { transform: "rotate(360deg)" },
  },
});

export const ErrorState = styled("div")({
  textAlign: "center",
  padding: "48px 24px",
  color: "#64748b",
});

export const ErrorTitle = styled("h3")({
  fontSize: "18px",
  fontWeight: 600,
  color: "#ef4444",
  margin: "0 0 8px",
});

export const ErrorText = styled("div")({
  fontSize: "14px",
  color: "#64748b",
  margin: 0,
});