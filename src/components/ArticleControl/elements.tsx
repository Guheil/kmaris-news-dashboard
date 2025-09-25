"use client";

import { styled } from "@mui/material/styles";

export const ControlsContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "24px",
  gap: "16px",
  flexWrap: "wrap",

  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    alignItems: "stretch",
  },
}));

export const FiltersContainer = styled("div")(({ theme }) => ({
  display: "flex",
  gap: "12px",
  alignItems: "center",
  flexWrap: "wrap",
}));

export const FilterSelect = styled("select")(({ theme }) => ({
  padding: "8px 12px",
  borderRadius: "8px",
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.common.white,
  fontSize: "14px",
  color: theme.palette.text.primary,
  cursor: "pointer",
  minWidth: "120px",

  "&:focus": {
    outline: "none",
    borderColor: theme.palette.primary.main,
    boxShadow: `0 0 0 3px ${theme.palette.primary.main}20`,
  },
}));

export const SortContainer = styled("div")(({ theme }) => ({
  display: "flex",
  gap: "8px",
  alignItems: "center",
}));

export const ViewToggle = styled("div")(({ theme }) => ({
  display: "flex",
  backgroundColor: theme.palette.grey[100],
  borderRadius: "8px",
  padding: "4px",
}));

export const ViewToggleButton = styled("button")<{ active: boolean }>(({ theme, active }) => ({
  padding: "8px 12px",
  borderRadius: "6px",
  border: "none",
  backgroundColor: active ? theme.palette.common.white : "transparent",
  color: active ? theme.palette.primary.main : theme.palette.grey[600],
  cursor: "pointer",
  fontSize: "14px",
  fontWeight: 500,
  transition: "all 0.2s ease",
  display: "flex",
  alignItems: "center",
  gap: "6px",

  "&:hover": {
    backgroundColor: active ? theme.palette.common.white : theme.palette.grey[200],
  },
}));