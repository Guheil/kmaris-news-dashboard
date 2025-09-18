"use client";

import { styled } from "@mui/material/styles";

export const MobileOnly = styled("div")(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  [theme.breakpoints.up('md')]: {
    display: 'none',
  },
}));

export const DesktopOnly = styled("div")(({ theme }) => ({
  display: 'none',
  alignItems: 'center',
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));