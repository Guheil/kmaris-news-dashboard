"use client";

import { styled } from "@mui/material/styles";

export const ChartCard = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  borderRadius: "16px",
  padding: "24px",
  boxShadow: `0 4px 12px ${theme.palette.common.black}14`,
  border: `1px solid ${theme.palette.border.light}`,
}));

export const ChartTitle = styled("h3")(({ theme }) => ({
  fontSize: "18px",
  fontWeight: 600,
  color: theme.palette.navy.main,
  margin: "0 0 20px",
}));