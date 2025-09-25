// Updated: elements.tsx (main, reduced)
"use client";

import { styled } from "@mui/material/styles";

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