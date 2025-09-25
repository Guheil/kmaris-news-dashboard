"use client";

import { styled } from "@mui/material/styles";

export const NoResults = styled("div")(({ theme }) => ({
  textAlign: "center",
  padding: "80px 24px",
  color: theme.palette.grey[600],
}));

export const NoResultsIcon = styled("div")(({ theme }) => ({
  width: "80px",
  height: "80px",
  borderRadius: "50%",
  backgroundColor: theme.palette.grey[100],
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 auto 24px",
  color: theme.palette.grey[400],
}));

export const NoResultsTitle = styled("h3")(({ theme }) => ({
  fontSize: "20px",
  fontWeight: 600,
  color: theme.palette.text.primary,
  margin: "0 0 12px",
}));

export const NoResultsText = styled("p")(({ theme }) => ({
  fontSize: "16px",
  color: theme.palette.grey[600],
  margin: 0,
  lineHeight: 1.6,
}));