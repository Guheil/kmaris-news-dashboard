"use client";

import { styled } from "@mui/material/styles";
import { palette } from "@/theme/pallete";
import { NavItemProps } from "./interface";

export const SidebarRoot = styled("div")<{ isOpen: boolean }>(({ theme, isOpen }) => ({
  width: isOpen ? "280px" : "80px",
  height: "100vh",
  backgroundColor: palette.navy.main,
  borderRight: `1px solid ${palette.navy.dark}`,
  display: "flex",
  flexDirection: "column",
  transition: "width 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  position: "fixed",
  left: 0,
  top: 0,
  zIndex: 1000,
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.15)",

  [theme.breakpoints.down('md')]: {
    width: isOpen ? "280px" : "0px",
    transform: isOpen ? "translateX(0)" : "translateX(-100%)",
    zIndex: 1300,
    transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  },
}));

// Mobile overlay backdrop
export const MobileOverlay = styled("div")<{ isOpen: boolean }>(({ theme, isOpen }) => ({
  display: "none",
  
  [theme.breakpoints.down('md')]: {
    display: isOpen ? "block" : "none",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1299,
    opacity: isOpen ? 1 : 0,
    transition: "opacity 0.3s ease",
  },
}));

// Mobile burger button
export const MobileBurgerButton = styled("button")(({ theme }) => ({
  display: "none",
  
  [theme.breakpoints.down('md')]: {
    display: "flex",
    position: "fixed",
    top: "20px",
    left: "20px",
    zIndex: 1301,
    width: "44px",
    height: "44px",
    borderRadius: "12px",
    backgroundColor: palette.navy.main,
    border: "none",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "all 0.2s ease",
    color: palette.common.white,
    boxShadow: "0 2px 12px rgba(0, 0, 0, 0.2)",

    "&:hover": {
      backgroundColor: palette.navy.dark,
      transform: "scale(1.05)",
    },
  },
}));

export const SidebarHeader = styled("div")(({ theme }) => ({
  padding: "24px 20px",
  borderBottom: `1px solid ${palette.navy.dark}`,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: palette.navy.main,
  minHeight: "80px",
  position: "relative",

  [theme.breakpoints.down('md')]: {
    padding: "20px 16px",
    minHeight: "70px",
  },
}));

export const SidebarHeaderContent = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
});

export const Logo = styled("div")<{ isOpen: boolean }>(({ isOpen }) => ({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  fontSize: "22px",
  fontWeight: 800,
  color: palette.common.white,
  letterSpacing: "-0.5px",
  opacity: isOpen ? 1 : 0,
  transform: isOpen ? "scale(1)" : "scale(0.8)",
  transition: "all 0.3s ease",
  transformOrigin: "left center",
  overflow: "hidden",
  
  "& img": {
    transition: "all 0.3s ease",
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? "scale(1)" : "scale(0)",
  },
}));



export const CollapseButton = styled("button")(({ theme }) => ({
  width: "32px",
  height: "32px",
  borderRadius: "8px",
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  border: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  transition: "all 0.2s ease",
  color: palette.common.white,

  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    transform: "scale(1.05)",
  },

  [theme.breakpoints.down('md')]: {
    display: "none", // Hide on mobile since we use burger menu
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

export const NavItem = styled("div")<NavItemProps>(({ theme, active }) => ({
  display: "flex",
  alignItems: "center",
  padding: "14px 16px",
  gap: "14px",
  textDecoration: "none",
  color: active ? palette.primary.main : palette.common.white,
  backgroundColor: active ? "rgba(255, 255, 255, 0.15)" : "transparent",
  borderRadius: "12px",
  transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
  cursor: "pointer",
  position: "relative",
  fontWeight: active ? 700 : 600,
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
    backgroundColor: active ? "rgba(255, 255, 255, 0.15)" : "rgba(255, 255, 255, 0.1)",
    color: active ? palette.primary.main : palette.common.white,
    transform: "translateX(2px)",
    
    "&::before": {
      width: "4px",
    },
  },

  [theme.breakpoints.down('md')]: {
    padding: "16px 16px",
    gap: "16px",
  },
}));

export const NavIcon = styled("div")(({ }: { active?: boolean }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "22px",
  height: "22px",
  opacity: 1,
  transition: "opacity 0.2s ease",
  color: "inherit",
  minWidth: "22px", // Prevent shrinking
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
  padding: "20px",
  borderTop: `1px solid ${palette.navy.dark}`,
  backgroundColor: palette.navy.main,

  [theme.breakpoints.down('md')]: {
    padding: "16px",
  },
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
    backgroundColor: "rgba(255, 255, 255, 0.1)",
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
  fontWeight: 700,
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
  minWidth: "40px", // Prevent shrinking
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
  fontWeight: 700,
  color: palette.common.white,
  lineHeight: 1.4,
});

export const UserRole = styled("span")({
  fontSize: "13px",
  color: "rgba(255, 255, 255, 0.7)",
  fontWeight: 600,
  lineHeight: 1.3,
});

export const NavSection = styled("div")({
  marginBottom: "24px",
});

export const NavSectionTitle = styled("div")<{ isOpen?: boolean }>(({ isOpen = true }) => ({
  fontSize: "11px",
  fontWeight: 700,
  color: "rgba(255, 255, 255, 0.6)",
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