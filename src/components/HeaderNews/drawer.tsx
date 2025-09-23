"use client";

import { styled } from "@mui/material/styles";
import { palette } from "@/theme/palette";

export const MobileDrawerOverlay = styled("div", {
  shouldForwardProp: (prop) => prop !== "open",
})<{ open: boolean }>(({ open, theme }) => ({
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.5)",
  opacity: open ? 1 : 0,
  visibility: open ? "visible" : "hidden",
  transition: "opacity 300ms ease, visibility 300ms ease",
  zIndex: 1000,
  [theme.breakpoints.up("md")]: {
    display: "none",
  },
}));

export const MobileDrawerPanel = styled("div", {
  shouldForwardProp: (prop) => prop !== "open",
})<{ open: boolean }>(({ open, theme }) => ({
  position: "fixed",
  top: 0,
  right: 0,
  height: "100vh",
  width: "100%",
  maxWidth: 360,
  background: palette.navy.main,
  transform: open ? "translateX(0)" : "translateX(100%)",
  visibility: open ? "visible" : "hidden",
  transition: "transform 500ms ease, visibility 500ms ease",
  zIndex: 1001,
  display: "flex",
  flexDirection: "column",
  [theme.breakpoints.up("md")]: {
    display: "none",
  },
}));

export const MobileDrawerHeader = styled("div")({
  padding: "32px 24px 0 24px",
  marginBottom: 32,
});

export const DrawerCloseButton = styled("button")({
  position: "absolute",
  top: 32,
  right: 24,
  background: "transparent",
  border: "none",
  cursor: "pointer",
});

export const DrawerNav = styled("nav")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: "0 24px",
  fontFamily: theme.typography.fontFamily,
}));

export const DrawerLink = styled("div")(({ theme }) => ({
  color: theme.palette.common.white,
  textDecoration: "none",
  padding: "16px 0",
  fontSize: 16,
  fontWeight: 500,
  transition: "color 200ms ease",
  "&:hover": {
    color: theme.palette.primary.main,
  },
}));

export const DrawerIconSection = styled("div")(({ theme }) => ({
  marginTop: "auto",
  padding: "24px",
  borderTop: `1px solid rgba(255,255,255,0.1)`,

  "& button": {
    color: theme.palette.common.white,
    "&:hover": {
      backgroundColor: "rgba(255,255,255,0.1)",
      color: theme.palette.common.white,
    },
  },
}));
