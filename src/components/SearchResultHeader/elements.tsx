"use client";

import { styled } from "@mui/material/styles";

export const SearchResultsHeader = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "24px",
  padding: "16px 0",
  borderBottom: `1px solid ${theme.palette.grey[100]}`,
}));

export const SearchResultsCount = styled("div")(({ theme }) => ({
  fontSize: "16px",
  color: theme.palette.grey[600],
  fontWeight: 500,
}));

export const SearchQuery = styled("span")(({ theme }) => ({
  fontWeight: 600,
  color: theme.palette.text.primary,
}));

export const ClearSearchButton = styled("button")(({ theme }) => ({
  padding: "8px 16px",
  borderRadius: "8px",
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor: "transparent",
  color: theme.palette.grey[600],
  fontSize: "14px",
  cursor: "pointer",
  fontWeight: 500,
  transition: "all 0.2s ease",

  "&:hover": {
    backgroundColor: theme.palette.grey[50],
    borderColor: theme.palette.grey[400],
  },
}));