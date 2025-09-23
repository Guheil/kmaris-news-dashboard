"use client";

import { styled } from "@mui/material/styles";
import { palette } from "@/theme/palette";

export const HeaderRoot = styled("header")<{ isSidebarOpen: boolean; isMobile: boolean }>(
  ({ theme, isSidebarOpen, isMobile }) => ({
    height: "80px",
    width: isMobile ? "100%" : isSidebarOpen ? "calc(100% - 280px)" : "calc(100% - 80px)",
    marginLeft: isMobile ? "0" : isSidebarOpen ? "280px" : "80px",
    backgroundColor: theme.palette.common.white,
    borderBottom: `1px solid rgba(0, 0, 0, 0.06)`,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 32px",
    position: "fixed",
    top: 0,
    right: 0,
    zIndex: 900,
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",

    [theme.breakpoints.down('md')]: {
      width: "100%",
      marginLeft: 0,
      padding: "0 20px",
      height: "72px",
    },
  })
);

export const LeftSection = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "16px",
  minWidth: "200px",
  flex: 1,

  [theme.breakpoints.down('md')]: {
    minWidth: "auto",
    flex: "0 1 auto",
  },
}));

export const MenuButton = styled("button")(({ theme }) => ({
  background: "none",
  border: "none",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "44px",
  height: "44px",
  borderRadius: "12px",
  transition: "all 0.2s ease",
  color: "#64748b",

  "&:hover": {
    backgroundColor: "#f8fafc",
    color: "#334155",
  },

  [theme.breakpoints.up('md')]: {
    display: "none",
  },
}));

export const PageTitle = styled("h1")(({ theme }) => ({
  fontSize: "28px",
  fontWeight: 700,
  color: "#0f172a",
  margin: 0,
  letterSpacing: "-0.6px",
  lineHeight: 1.2,

  [theme.breakpoints.down('md')]: {
    fontSize: "22px",
  },
}));

export const CenterSection = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flex: 2,
  maxWidth: "600px",

  [theme.breakpoints.down('md')]: {
    display: "none",
  },
}));

export const RightSection = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  minWidth: "200px",
  flex: 1,
  justifyContent: "flex-end",

  [theme.breakpoints.down('md')]: {
    minWidth: "auto",
    flex: "0 1 auto",
  },
}));

export const SearchBar = styled("div")(() => ({
  position: "relative",
  width: "100%",
  maxWidth: "480px",
}));

export const SearchInput = styled("input")(({ theme }) => ({
  width: "100%",
  height: "48px",
  padding: "0 20px 0 52px",
  borderRadius: "24px",
  border: "1px solid #e2e8f0",
  backgroundColor: "#f8fafc",
  fontSize: "15px",
  color: "#0f172a",
  transition: "all 0.2s ease",
  fontWeight: 400,

  "&:focus": {
    outline: "none",
    backgroundColor: theme.palette.common.white,
    borderColor: palette.primary.main,
    boxShadow: `0 0 0 4px ${palette.primary.main}08`,
  },

  "&::placeholder": {
    color: "#94a3b8",
    fontWeight: 400,
  },
}));

export const SearchIcon = styled("div")({
  position: "absolute",
  left: "18px",
  top: "50%",
  transform: "translateY(-50%)",
  color: "#94a3b8",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  pointerEvents: "none",
});

export const ActionButtons = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "4px",
});

export const IconButton = styled("button")(() => ({
  background: "none",
  border: "none",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "44px",
  height: "44px",
  borderRadius: "12px",
  color: "#64748b",
  transition: "all 0.2s ease",
  position: "relative",

  "&:hover": {
    backgroundColor: "#f8fafc",
    color: "#334155",
  },
}));

export const NotificationBadge = styled("span")({
  position: "absolute",
  top: "12px",
  right: "12px",
  width: "8px",
  height: "8px",
  borderRadius: "50%",
  backgroundColor: "#ef4444",
  border: "2px solid white",
});

export const NotificationCount = styled("span")({
  position: "absolute",
  top: "8px",
  right: "8px",
  minWidth: "20px",
  height: "20px",
  borderRadius: "10px",
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

// User Dropdown Styles
export const UserDropdownContainer = styled("div")({
  position: "relative",
  marginLeft: "12px",
});

export const UserButton = styled("button")({
  background: "none",
  border: "none",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: "12px",
  padding: "8px 12px 8px 8px",
  borderRadius: "16px",
  transition: "all 0.2s ease",

  "&:hover": {
    backgroundColor: "#f8fafc",
  },
});

export const UserAvatar = styled("div")({
  width: "40px",
  height: "40px",
  borderRadius: "14px",
  background: `linear-gradient(135deg, ${palette.primary.main}, ${palette.primary.light})`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: palette.common.white,
  fontSize: "15px",
  fontWeight: 600,
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
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
  fontSize: "15px",
  fontWeight: 600,
  color: "#0f172a",
  lineHeight: 1.3,
});

export const UserRole = styled("span")({
  fontSize: "13px",
  color: "#64748b",
  lineHeight: 1.2,
  fontWeight: 500,
});

// Dropdown Menu
export const DropdownMenu = styled("div")<{ isOpen: boolean }>(({ isOpen }) => ({
  position: "absolute",
  top: "calc(100% + 8px)",
  right: "0",
  minWidth: "200px",
  backgroundColor: "#ffffff",
  borderRadius: "12px",
  boxShadow: "0 10px 40px rgba(0, 0, 0, 0.15)",
  border: "1px solid rgba(0, 0, 0, 0.06)",
  opacity: isOpen ? 1 : 0,
  visibility: isOpen ? "visible" : "hidden",
  transform: isOpen ? "translateY(0)" : "translateY(-8px)",
  transition: "all 0.2s ease",
  zIndex: 1000,
  overflow: "hidden",
}));

export const DropdownHeader = styled("div")({
  padding: "16px",
  borderBottom: "1px solid #f1f5f9",
});

export const DropdownUserName = styled("div")({
  fontSize: "16px",
  fontWeight: 600,
  color: "#0f172a",
  marginBottom: "2px",
});

export const DropdownUserRole = styled("div")({
  fontSize: "14px",
  color: "#64748b",
});

export const DropdownItem = styled("button")<{ variant?: 'default' | 'danger' }>(({ variant = 'default' }) => ({
  width: "100%",
  display: "flex",
  alignItems: "center",
  gap: "12px",
  padding: "12px 16px",
  border: "none",
  backgroundColor: "transparent",
  fontSize: "14px",
  fontWeight: 500,
  cursor: "pointer",
  transition: "all 0.2s ease",
  textAlign: "left",

  ...(variant === 'default' && {
    color: "#334155",
    "&:hover": {
      backgroundColor: "#f8fafc",
    },
  }),

  ...(variant === 'danger' && {
    color: "#ef4444",
    "&:hover": {
      backgroundColor: "#fef2f2",
    },
  }),
}));

// Remove breadcrumb, quick actions, and other complex elements for minimalist design
export const QuickActions = styled("div")({
  display: "none", // Hidden for minimalist design
});

export const QuickActionButton = styled("button")({
  display: "none", // Hidden for minimalist design
});

export const Breadcrumb = styled("div")({
  display: "none", // Hidden for minimalist design
});

export const BreadcrumbItem = styled("span")({
  display: "none", // Hidden for minimalist design
});