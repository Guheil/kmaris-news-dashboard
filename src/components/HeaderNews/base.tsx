"use client";

import { styled } from "@mui/material/styles";
import { palette } from "@/theme/pallete";

export const HeaderRoot = styled("header")(({ theme }) => ({
  width: "100%",
  backgroundColor: palette.navy.main, 
  padding: "12px 8px 22px 8px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "8px",
  position: "sticky",
  top: 0,
  zIndex: 1000,
  [theme.breakpoints.up('md')]: {
    paddingLeft: 32,
    paddingRight: 32,
  },
}));

export const AddressBar = styled("div")(({ theme }) => ({
  width: "100%",
  maxWidth: theme.breakpoints.values.xl, 
  minHeight: 28,
  display: "flex",
  alignItems: "center",
  gap: 6,
  padding: "8px 24px", 
  color: "#D9E6F2",
  fontSize: 14,
  fontFamily: theme.typography.fontFamily,
  justifyContent: "flex-start",
  [theme.breakpoints.down('md')]: {
    fontSize: 13,
    padding: "6px 12px",
    justifyContent: "center",
    textAlign: "center",
  },
}));

export const Bar = styled("div")(({ theme }) => ({
  width: "100%",
  maxWidth: theme.breakpoints.values.xl,
  backgroundColor: theme.palette.common.white,
  borderRadius: 14,
  height: 80,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0 16px",
  gap: 24,
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  transition: "box-shadow 0.2s ease, transform 0.2s ease",
  "&:hover": {
    boxShadow: "0 6px 20px rgba(0,0,0,0.12)",
  },
}));

export const Nav = styled("nav")({
  display: 'flex',
  alignItems: 'center',
  gap: '20px',
  
});

export const RightSection = styled("div")({
  display: 'flex',
  alignItems: 'center',
  gap: '20px',
});

export const LogoWrap = styled("div")({
  display: 'flex',
  alignItems: 'center',
  transition: "transform 0.2s ease",
  "&:hover": {
    transform: "scale(1.02)",
  },
});

export const LinkItem = styled("div")(({ theme }) => ({
  color: theme.palette.text.primary,
  textDecoration: "none",
  fontSize: 14,
  fontWeight: 500,
  fontFamily: theme.typography.fontFamily,
  padding: "8px 12px",
  borderRadius: 8,
  position: "relative",
  transition: "all 200ms ease",
  "&::after": {
    content: '""',
    position: "absolute",
    left: 8,
    right: 8,
    bottom: 2,
    height: 2,
    background: palette.primary.main,
    opacity: 0,
    transform: "scaleX(0)",
    transition: "all 220ms ease",
  },
  "&:hover": { 
    backgroundColor: "rgba(221,28,35,0.05)",
    color: palette.primary.main,
  },
  "&:hover::after": { 
    opacity: 1,
    transform: "scaleX(1)",
  },
}));