"use client";

import { styled } from "@mui/material/styles";
import { palette } from "@/theme/pallete";

export const HeaderRoot = styled("header")<{ isSidebarOpen: boolean; isMobile: boolean }>(
  ({ theme, isSidebarOpen, isMobile }) => ({
    height: "64px",
    width: isMobile ? "100%" : isSidebarOpen ? "calc(100% - 280px)" : "calc(100% - 80px)",
    marginLeft: isMobile ? "0" : isSidebarOpen ? "280px" : "80px",
    backgroundColor: theme.palette.common.white,
    borderBottom: "none",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 24px",
    position: "fixed",
    top: 0,
    right: 0,
    zIndex: 900,
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    backdropFilter: "blur(10px)",

    [theme.breakpoints.down('md')]: {
      width: "100%",
      marginLeft: 0,
      padding: "0 16px",
      height: "56px",
    },
  })
);

export const LeftSection = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "20px",

  [theme.breakpoints.down('md')]: {
    gap: "12px",
  },
}));

export const MenuButton = styled("button")(({ theme }) => ({
  background: "none",
  border: "none",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "40px",
  height: "40px",
  borderRadius: "10px",
  transition: "all 0.2s ease",
  color: "#6b7280",

  "&:hover": {
    backgroundColor: "rgba(107, 114, 128, 0.1)",
    color: "#374151",
    transform: "scale(1.05)",
  },

  [theme.breakpoints.up('md')]: {
    display: "none", // Hide on desktop since sidebar has its own toggle
  },
}));

export const PageTitle = styled("h1")(({ theme }) => ({
  fontSize: "24px",
  fontWeight: 700,
  color: "#1a1a1a",
  margin: 0,
  letterSpacing: "-0.5px",

  [theme.breakpoints.down('md')]: {
    fontSize: "20px",
  },
}));

export const Breadcrumb = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  fontSize: "14px",
  color: "#6b7280",
  marginTop: "2px",
});

export const BreadcrumbItem = styled("span")({
  "&:not(:last-child)::after": {
    content: '"/"',
    marginLeft: "8px",
    color: "#d1d5db",
  },
});

export const RightSection = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "12px",
});

export const SearchBar = styled("div")(({ theme }) => ({
  position: "relative",
  width: "320px",

  [theme.breakpoints.down('lg')]: {
    width: "240px",
  },

  [theme.breakpoints.down('md')]: {
    display: "none",
  },
}));

export const SearchInput = styled("input")(({ theme }) => ({
  width: "100%",
  height: "40px",
  padding: "0 16px 0 44px",
  borderRadius: "12px",
  border: "1px solid rgba(0, 0, 0, 0.08)",
  backgroundColor: "#f8f9fa",
  fontSize: "14px",
  color: "#1a1a1a",
  transition: "all 0.2s ease",
  fontWeight: 400,

  "&:focus": {
    outline: "none",
    backgroundColor: theme.palette.common.white,
    borderColor: palette.primary.main,
    boxShadow: `0 0 0 3px ${palette.primary.main}15`,
  },

  "&::placeholder": {
    color: "#9ca3af",
    fontWeight: 400,
  },
}));

export const SearchIcon = styled("div")({
  position: "absolute",
  left: "14px",
  top: "50%",
  transform: "translateY(-50%)",
  color: "#9ca3af",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  pointerEvents: "none",
});

export const ActionButtons = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "6px",
});

export const IconButton = styled("button")<{ hasNotification?: boolean }>(({ hasNotification }) => ({
  background: "none",
  border: "none",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "40px",
  height: "40px",
  borderRadius: "10px",
  color: "#6b7280",
  transition: "all 0.2s ease",
  position: "relative",

  "&:hover": {
    backgroundColor: "rgba(107, 114, 128, 0.1)",
    color: "#374151",
    transform: "scale(1.05)",
  },
}));

export const NotificationBadge = styled("span")({
  position: "absolute",
  top: "8px",
  right: "8px",
  width: "8px",
  height: "8px",
  borderRadius: "50%",
  backgroundColor: "#ef4444",
  border: "2px solid white",
});

export const NotificationCount = styled("span")({
  position: "absolute",
  top: "6px",
  right: "6px",
  minWidth: "18px",
  height: "18px",
  borderRadius: "9px",
  backgroundColor: "#ef4444",
  color: "white",
  fontSize: "11px",
  fontWeight: 600,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "2px solid white",
  lineHeight: 1,
});

export const UserButton = styled("button")({
  background: "none",
  border: "none",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: "12px",
  padding: "8px 12px",
  borderRadius: "12px",
  transition: "all 0.2s ease",
  marginLeft: "8px",

  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.04)",
  },
});

export const UserAvatar = styled("div")({
  width: "36px",
  height: "36px",
  borderRadius: "10px",
  background: `linear-gradient(135deg, ${palette.primary.main}, ${palette.primary.light})`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: palette.common.white,
  fontSize: "14px",
  fontWeight: 600,
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
});

export const UserInfo = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  textAlign: "left",

  [theme.breakpoints.down('lg')]: {
    display: "none",
  },
}));

export const UserName = styled("span")({
  fontSize: "14px",
  fontWeight: 600,
  color: "#1a1a1a",
  lineHeight: 1.2,
});

export const UserRole = styled("span")({
  fontSize: "12px",
  color: "#6b7280",
  lineHeight: 1.2,
});

export const QuickActions = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  marginRight: "12px",

  [theme.breakpoints.down('md')]: {
    display: "none",
  },
}));

export const QuickActionButton = styled("button")({
  background: `linear-gradient(135deg, ${palette.primary.main}, ${palette.primary.light})`,
  border: "none",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: "8px",
  padding: "8px 16px",
  borderRadius: "10px",
  color: "white",
  fontSize: "13px",
  fontWeight: 600,
  transition: "all 0.2s ease",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",

  "&:hover": {
    transform: "translateY(-1px)",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
  },

  "&:active": {
    transform: "translateY(0)",
  },
});