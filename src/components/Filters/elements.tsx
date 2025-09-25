"use client";

import { styled } from "@mui/material/styles";

export const FiltersContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "24px",
  gap: "16px",

  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    alignItems: "stretch",
  },
}));

export const FilterSelect = styled("select")(({ theme }) => ({
  padding: "8px 12px",
  borderRadius: "8px",
  border: `1px solid ${theme.palette.border.main}`,
  backgroundColor: theme.palette.common.white,
  fontSize: "14px",
  color: theme.palette.navy.main,
  cursor: "pointer",
  minWidth: "150px",

  "&:focus": {
    outline: "none",
    borderColor: theme.palette.primary.main,
    boxShadow: `0 0 0 3px ${theme.palette.primary.main}20`,
  },
}));