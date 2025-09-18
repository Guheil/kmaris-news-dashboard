"use client";

import { styled } from "@mui/material/styles";

export const ProfileMenu = styled("div")({
  position: "relative",
  display: "inline-block",
});

export const DropdownContent = styled("div", {
  shouldForwardProp: (prop) => prop !== 'isOpen'
})<{ isOpen: boolean }>(({ isOpen }) => ({
  position: "absolute",
  right: 0,
  top: "calc(100% + 8px)",
  background: "white",
  minWidth: "180px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
  borderRadius: "4px",
  padding: "8px 0",
  opacity: isOpen ? 1 : 0,
  visibility: isOpen ? "visible" : "hidden",
  transform: isOpen ? "translateY(0)" : "translateY(-8px)",
  transition: "all 200ms ease",
  zIndex: 1000,
}));

export const MenuItem = styled("a")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  fontFamily: theme.typography.fontFamily,
  padding: "12px 16px",
  color: "#333",
  fontSize: "14px",
  textDecoration: "none",
  transition: "background 200ms ease",
  cursor: "pointer",
  "&:hover": {
    background: "#f5f5f5",
  }
}));