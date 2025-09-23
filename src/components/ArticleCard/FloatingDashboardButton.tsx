"use client";

import React, { useState } from "react";
import Link from "next/link";
import { styled } from "@mui/material/styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { palette } from "@/theme/palette";

const FloatingButtonWrapper = styled("div")(({ theme }) => ({
  position: "fixed",
  bottom: theme.spacing(3),
  right: theme.spacing(3),
  zIndex: 1000,
  [theme.breakpoints.down("sm")]: {
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const FloatingButton = styled(Link)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "56px",
  height: "56px",
  borderRadius: "50%",
  backgroundColor: palette.primary.main,
  color: theme.palette.common.white,
  textDecoration: "none",
  boxShadow: theme.shadows[6],
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  "&:hover": {
    backgroundColor: palette.primary.dark,
    transform: "scale(1.1)",
    boxShadow: theme.shadows[12],
  },
  "&:active": {
    transform: "scale(0.95)",
  },
}));

const Tooltip = styled("div")<{ show: boolean }>(({ theme, show }) => ({
  position: "absolute",
  right: "64px",
  top: "50%",
  transform: "translateY(-50%)",
  backgroundColor: theme.palette.grey[800],
  color: theme.palette.common.white,
  padding: theme.spacing(1, 1.5),
  borderRadius: theme.spacing(0.5),
  fontSize: "14px",
  whiteSpace: "nowrap",
  opacity: show ? 1 : 0,
  visibility: show ? "visible" : "hidden",
  transition: "all 0.2s ease-in-out",
  pointerEvents: "none",
  "&::after": {
    content: '""',
    position: "absolute",
    left: "100%",
    top: "50%",
    transform: "translateY(-50%)",
    border: "6px solid transparent",
    borderLeftColor: theme.palette.grey[800],
  },
  [theme.breakpoints.down("sm")]: {
    right: "64px",
    fontSize: "12px",
    padding: theme.spacing(0.5, 1),
  },
}));

export const FloatingDashboardButton: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleMouseEnter = () => setShowTooltip(true);
  const handleMouseLeave = () => setShowTooltip(false);
  const handleFocus = () => setShowTooltip(true);
  const handleBlur = () => setShowTooltip(false);

  return (
    <FloatingButtonWrapper>
      <Tooltip show={showTooltip}>Back to Dashboard</Tooltip>
      <FloatingButton
        href="/news-dashboard"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        aria-label="Back to Dashboard"
      >
        <ArrowBackIcon fontSize="medium" />
      </FloatingButton>
    </FloatingButtonWrapper>
  );
};