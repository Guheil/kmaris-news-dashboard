"use client";

import { styled } from "@mui/material/styles";
import { palette } from "@/theme/palette";
import { NavItemProps } from "./interface";

export const SidebarRoot = styled("div")<{ isOpen: boolean }>(({ theme, isOpen }) => ({
  width: isOpen ? "280px" : "80px",
  height: "100vh",
  backgroundColor: palette.common.white,
  borderRight: `1px solid ${palette.grey[200]}`,
  display: "flex",
  flexDirection: "column",
  transition: "width 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  position: "fixed",
  left: 0,
  top: 0,
  zIndex: 1200,
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",

  [theme.breakpoints.down("md")]: {
    width: isOpen ? "280px" : "0",
    transform: isOpen ? "translateX(0)" : "translateX(-280px)",
    transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), width 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    overflow: "hidden",
  },
}));

export const MobileOverlay = styled("div")<{ isOpen: boolean }>(({ theme, isOpen }) => ({
  display: "none",
  [theme.breakpoints.down("md")]: {
    display: isOpen ? "block" : "none",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1199,
    opacity: isOpen ? 1 : 0,
    transition: "opacity 0.3s ease",
  },
}));

export const MobileBurgerButton = styled("button")(({ theme }) => ({
  display: "none",
  [theme.breakpoints.down("md")]: {
    display: "flex",
    position: "fixed",
    top: "16px",
    left: "16px",
    zIndex: 1300,
    width: "48px",
    height: "48px",
    borderRadius: "10px",
    backgroundColor: palette.common.white,
    border: `1px solid ${palette.grey[200]}`,
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "all 0.2s ease",
    color: palette.navy.main,
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
    "&:hover": {
      backgroundColor: palette.grey[100],
      transform: "scale(1.05)",
    },
    "&:focus": {
      outline: `2px solid ${palette.primary.main}`,
      outlineOffset: "2px",
    },
  },
}));

export const SidebarHeader = styled("div")(({ theme }) => ({
  padding: "20px",
  borderBottom: `1px solid ${palette.grey[200]}`,
  display: "flex",
  alignItems: "center",
  backgroundColor: palette.common.white,
  minHeight: "72px",
  [theme.breakpoints.down("md")]: {
    padding: "16px",
    minHeight: "64px",
  },
}));

export const SidebarHeaderContent = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "12px", 
  width: "100%",
});

export const Logo = styled("div")<{ isOpen: boolean }>(({ isOpen }) => ({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  fontSize: "20px",
  fontWeight: 800,
  color: palette.navy.main,
  letterSpacing: "-0.5px",
  opacity: isOpen ? 1 : 0,
  transform: isOpen ? "translateX(0)" : "translateX(-20px)",
  transition: "all 0.3s ease",
  overflow: "hidden",
  "& img": {
    width: "160px",
    height: "80px",
    objectFit: "contain",
    transition: "all 0.3s ease",
    opacity: isOpen ? 1 : 0,
  },
}));

export const CollapseButton = styled("button")(({ theme }) => ({
  width: "36px",
  height: "36px",
  borderRadius: "8px",
  backgroundColor: palette.grey[100],
  border: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  transition: "all 0.2s ease",
  color: palette.navy.main,
  "&:hover": {
    backgroundColor: palette.grey[200],
    transform: "scale(1.05)",
  },
  "&:focus": {
    outline: `2px solid ${palette.primary.main}`,
    outlineOffset: "2px",
  },
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

export const NavigationList = styled("nav")({
  flex: 1,
  overflowY: "auto",
  padding: "16px 12px",
  display: "flex",
  flexDirection: "column",
  gap: "8px",
});

export const NavItem = styled("div")<NavItemProps>(({ theme, active }) => ({
  display: "flex",
  alignItems: "center",
  padding: "12px 16px",
  gap: "12px",
  textDecoration: "none",
  color: active ? palette.primary.main : palette.navy.main,
  backgroundColor: active ? palette.grey[100] : "transparent",
  borderRadius: "10px",
  transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
  cursor: "pointer",
  fontWeight: active ? 700 : 600,
  "&:hover": {
    backgroundColor: active ? palette.grey[100] : palette.grey[50],
    transform: "translateX(2px)",
  },
  "&::before": {
    content: '""',
    position: "absolute",
    left: 0,
    top: "50%",
    transform: "translateY(-50%)",
    width: active ? "4px" : "0",
    height: "20px",
    backgroundColor: palette.primary.main,
    borderRadius: "0 4px 4px 0",
    transition: "width 0.2s ease",
  },
  "&:hover::before": {
    width: "4px",
  },
  [theme.breakpoints.down("md")]: {
    padding: "12px 16px",
    gap: "12px",
  },
}));

export const NavIcon = styled("div")(({ active }: { active?: boolean }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "24px",
  height: "24px",
  color: "inherit",
  minWidth: "24px",
}));

export const NavText = styled("span")<{ isOpen?: boolean }>(({ isOpen = true }) => ({
  fontSize: "15px",
  fontWeight: "inherit",
  letterSpacing: "-0.2px",
  opacity: isOpen ? 1 : 0,
  width: isOpen ? "auto" : 0,
  overflow: "hidden",
  transition: "all 0.3s ease",
  color: "inherit",
  whiteSpace: "nowrap",
}));

export const SidebarFooter = styled("div")(({ theme }) => ({
  padding: "16px",
  borderTop: `1px solid ${palette.grey[200]}`,
  backgroundColor: palette.common.white,
  [theme.breakpoints.down("md")]: {
    padding: "12px",
  },
}));

export const UserProfile = styled("div")<{ isOpen?: boolean }>(({ isOpen = true, theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: isOpen ? "flex-start" : "center",
  gap: isOpen ? "12px" : "0",
  padding: isOpen ? "12px" : "12px 0",
  borderRadius: "10px",
  transition: "all 0.2s ease",
  cursor: "pointer",
  width: "100%",
  "&:hover": {
    backgroundColor: palette.grey[50],
  },
  [theme.breakpoints.down("md")]: {
    justifyContent: "flex-start",
    gap: "12px",
    padding: "12px",
  },
}));

export const UserAvatar = styled("div")(({ theme }) => ({
  width: "40px",
  height: "40px",
  borderRadius: "10px",
  background: `linear-gradient(135deg, ${palette.primary.main}, ${palette.primary.light})`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: palette.common.white,
  fontSize: "16px",
  fontWeight: 700,
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
  minWidth: "40px",
  [theme.breakpoints.down("md")]: {
    display: "flex",
  },
}));

export const UserInfo = styled("div")<{ isOpen: boolean }>(({ isOpen, theme }) => ({
  display: "flex",
  flexDirection: "column",
  flex: 1,
  opacity: isOpen ? 1 : 0,
  width: isOpen ? "auto" : 0,
  overflow: "hidden",
  transition: "all 0.3s ease",
  [theme.breakpoints.down("md")]: {
    opacity: 1,
    width: "auto",
  },
}));

export const UserName = styled("span")({
  fontSize: "15px",
  fontWeight: 700,
  color: palette.navy.main,
  lineHeight: 1.4,
});

export const UserRole = styled("span")({
  fontSize: "13px",
  color: palette.grey[600],
  fontWeight: 600,
  lineHeight: 1.3,
});

export const NavSection = styled("div")({
  marginBottom: "20px",
});

export const NavSectionTitle = styled("div")<{ isOpen?: boolean }>(({ isOpen = true }) => ({
  fontSize: "12px",
  fontWeight: 700,
  color: palette.grey[500],
  textTransform: "uppercase",
  letterSpacing: "1px",
  padding: "0 16px 8px 16px",
  marginBottom: "8px",
  opacity: isOpen ? 1 : 0,
  width: isOpen ? "auto" : 0,
  overflow: "hidden",
  transition: "all 0.3s ease",
  whiteSpace: "nowrap",
}));