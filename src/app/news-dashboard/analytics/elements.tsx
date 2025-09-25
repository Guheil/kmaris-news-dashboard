"use client";

import { styled } from "@mui/material/styles";

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

export const ChartsGrid = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "2fr 1fr",
  gap: "24px",
  marginBottom: "32px",

  [theme.breakpoints.down("lg")]: {
    gridTemplateColumns: "1fr",
  },
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