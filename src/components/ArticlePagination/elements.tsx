// src/components/article-pagination/elements.tsx
"use client";

import { styled } from "@mui/material/styles";

export const PaginationContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "48px",
  gap: "8px",
}));

export const PaginationButton = styled("button")<{ active?: boolean; disabled?: boolean }>(({ theme, active, disabled }) => ({
  width: "40px",
  height: "40px",
  borderRadius: "8px",
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor: active ? theme.palette.primary.main : theme.palette.common.white,
  color: active ? theme.palette.common.white : disabled ? theme.palette.grey[400] : theme.palette.text.primary,
  cursor: disabled ? "not-allowed" : "pointer",
  fontSize: "14px",
  fontWeight: 500,
  transition: "all 0.2s ease",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  "&:hover": {
    backgroundColor: disabled ? theme.palette.common.white : active ? theme.palette.primary.main : theme.palette.grey[50],
    borderColor: disabled ? theme.palette.divider : active ? theme.palette.primary.main : theme.palette.grey[400],
  },
}));

export const PaginationInfo = styled("div")(({ theme }) => ({
  fontSize: "14px",
  color: theme.palette.grey[600],
  margin: "0 16px",
}));