// elements.tsx
"use client";

import { styled, keyframes } from "@mui/material/styles";
import { Box, Typography, CircularProgress } from "@mui/material";

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const LoadingContainer = styled(Box)<{ height?: string }>(({ theme, height = "400px" }) => ({
  maxWidth: "800px",
  margin: "0 auto",
  backgroundColor: theme.palette.common.white,
  borderRadius: "16px",
  padding: "32px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  border: `1px solid ${theme.palette.grey[200]}`,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: height,
  flexDirection: "column",
  gap: "16px",
  color: theme.palette.grey[600],
  minHeight: "200px",
}));

export const LoadingSpinner = styled(CircularProgress)<{ size?: number }>(({ theme, size = 32 }) => ({
  width: `${size}px !important`,
  height: `${size}px !important`,
  color: theme.palette.primary.main,
  animation: `${spin} 1s linear infinite`,
}));

export const LoadingText = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  fontWeight: 500,
  color: theme.palette.grey[600],
  textAlign: "center",
}));

export const LoadingSubtext = styled(Typography)(({ theme }) => ({
  fontSize: "14px",
  color: theme.palette.grey[500],
  textAlign: "center",
  marginTop: "4px",
}));

export const LoadingCard = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  borderRadius: "12px",
  padding: "24px",
  boxShadow: `0 2px 8px ${theme.palette.grey[200]}`,
  border: `1px solid ${theme.palette.grey[100]}`,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "12px",
  minWidth: "200px",
}));