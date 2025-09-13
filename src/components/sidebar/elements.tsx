"use client";

import { styled } from "@mui/material/styles";
import { palette } from "@/theme/pallete";

export const SidebarRoot = styled("div")<{ isOpen: boolean }>(({ theme, isOpen }) => ({
  width: isOpen ? "280px" : "80px",
  height: "100vh",
  backgroundColor: palette.navy.main,
  borderRight: "none",
  display: "flex",
  flexDirection: "column",
  transition: "width 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  position: "fixed",
  left: 0,
  top: 0,
  zIndex: 1000,
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",

  [theme.breakpoints.down('md')]: {
    zIndex: 1001, // Higher z-index on mobile to appear above overlay
  },
}));

export const SidebarHeader = styled("div")(({ theme }) => ({
  padding: "24px 20px",
  borderBottom: "1px solid rgba(0, 0, 0, 0.06)",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: palette.navy.main,
  minHeight: "80px",
  position: "relative",
}));

export const SidebarHeaderContent = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
});

export const Logo = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  fontSize: "22px",
  fontWeight: 700,
  color: "#1a1a1a",
  letterSpacing: "-0.5px",
});

export const CollapseButton = styled("button")(({ theme }) => ({
  width: "32px",
  height: "32px",
  borderRadius: "8px",
  backgroundColor: "rgba(107, 114, 128, 0.1)",
  border: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  transition: "all 0.2s ease",

  "&:hover": {
    backgroundColor: "rgba(107, 114, 128, 0.15)",
    transform: "scale(1.05)",
  },
}));

export const NavigationList = styled("nav")({
  flex: 1,
  overflowY: "auto",
  padding: "16px 12px",
  display: "flex",
  flexDirection: "column",
  gap: "4px",
});

export const NavItem = styled("a")(({ theme, active }: { theme?: any; active?: boolean }) => ({
  display: "flex",
  alignItems: "center",
  padding: "14px 16px",
  gap: "14px",
  textDecoration: "none",
  color: active ? palette.primary.main : "#6b7280",
  backgroundColor: active ? palette.primary.main + '12' : 'transparent',
  borderRadius: "12px",
  transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
  cursor: "pointer",
  position: "relative",
  fontWeight: active ? 600 : 500,
  margin: "2px 0",

  "&::before": {
    content: '""',
    position: "absolute",
    left: 0,
    top: "50%",
    transform: "translateY(-50%)",
    width: active ? "4px" : "0",
    height: "24px",
    backgroundColor: palette.primary.main,
    borderRadius: "0 4px 4px 0",
    transition: "width 0.2s ease",
  },

  "&:hover": {
    backgroundColor: active ? palette.primary.main + '12' : palette.primary.main + '08',
    color: active ? palette.primary.main : "#374151",
    transform: "translateX(2px)",
    
    "&::before": {
      width: "4px",
    },
  },
}));

export const NavIcon = styled("div")(({ active }: { active?: boolean }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "22px",
  height: "22px",
  opacity: active ? 1 : 0.7,
  transition: "opacity 0.2s ease",
}));

export const NavText = styled("span")<{ isOpen?: boolean }>(({ isOpen = true }) => ({
  fontSize: "15px",
  fontWeight: "inherit",
  letterSpacing: "-0.2px",
  opacity: isOpen ? 1 : 0,
  width: isOpen ? "auto" : 0,
  overflow: "hidden",
  transition: "all 0.3s ease",
}));

export const SidebarFooter = styled("div")(({ theme }) => ({
  padding: "20px",
  borderTop: "1px solid rgba(0, 0, 0, 0.06)",
  backgroundColor: theme.palette.common.white,
}));

export const UserProfile = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  padding: "12px",
  borderRadius: "12px",
  transition: "all 0.2s ease",
  cursor: "pointer",

  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.03)",
  },
});

export const UserAvatar = styled("div")({
  width: "40px",
  height: "40px",
  borderRadius: "12px",
  background: `linear-gradient(135deg, ${palette.primary.main}, ${palette.primary.light})`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: palette.common.white,
  fontSize: "16px",
  fontWeight: 600,
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
});

export const UserInfo = styled("div")<{ isOpen: boolean }>(({ isOpen }) => ({
  display: "flex",
  flexDirection: "column",
  flex: 1,
  opacity: isOpen ? 1 : 0,
  width: isOpen ? "auto" : 0,
  overflow: "hidden",
  transition: "all 0.3s ease",
}));

export const UserName = styled("span")({
  fontSize: "15px",
  fontWeight: 600,
  color: "#1a1a1a",
  lineHeight: 1.4,
});

export const UserRole = styled("span")({
  fontSize: "13px",
  color: "#6b7280",
  lineHeight: 1.3,
});

export const NavSection = styled("div")({
  marginBottom: "24px",
});

export const NavSectionTitle = styled("div")<{ isOpen?: boolean }>(({ isOpen = true }) => ({
  fontSize: "11px",
  fontWeight: 600,
  color: "#9ca3af",
  textTransform: "uppercase",
  letterSpacing: "1px",
  padding: "0 16px 8px 16px",
  marginBottom: "8px",
  opacity: isOpen ? 1 : 0,
  width: isOpen ? "auto" : 0,
  overflow: "hidden",
  transition: "all 0.3s ease",
}));