// elements.tsx
"use client";

import { styled } from "@mui/material/styles";
import { Box, Typography, TextField } from "@mui/material";

export const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: "18px",
  fontWeight: 600,
  color: theme.palette.grey[900],
  margin: "0 0 16px 0",
  variant: "h6",
}));

export const MediaUploadContainer = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "20px",
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr",
    gap: "16px",
  },
}));

export const MediaUploadBox = styled(Box)<{ hasMedia?: boolean }>(({ theme, hasMedia }) => ({
  border: `2px dashed ${hasMedia ? theme.palette.primary.main : theme.palette.grey[300]}`,
  borderRadius: "12px",
  padding: "24px",
  textAlign: "center",
  backgroundColor: hasMedia ? theme.palette.grey[50] : theme.palette.grey[100],
  transition: "all 0.2s ease",
  cursor: "pointer",
  position: "relative",
  minHeight: "200px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  
  "&:hover": {
    borderColor: theme.palette.primary.main,
    backgroundColor: `${theme.palette.primary.main}08`,
  },
}));

export const FormField = styled(Box)<{ fullWidth?: boolean }>(({ theme, fullWidth }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  gridColumn: fullWidth ? "1 / -1" : "auto",
}));

export const Label = styled(Typography)(({ theme }) => ({
  fontSize: "14px",
  fontWeight: 600,
  color: theme.palette.grey[700],
  marginBottom: "4px",
  display: "block",
}));

export const Input = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    backgroundColor: theme.palette.common.white,
    fontSize: "16px",
    
    "& fieldset": {
      borderColor: theme.palette.grey[300],
    },
    "&:hover fieldset": {
      borderColor: theme.palette.grey[400],
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.main,
      boxShadow: `0 0 0 3px ${theme.palette.primary.main}20`,
    },
  },
  "& .MuiInputBase-input": {
    padding: "12px 16px",
    color: theme.palette.grey[900],
    
    "&::placeholder": {
      color: theme.palette.grey[400],
      opacity: 1,
    },
  },
}));

export const ErrorMessage = styled(Typography)(({ theme }) => ({
  fontSize: "12px",
  color: theme.palette.error.main,
  marginTop: "4px",
  display: "block",
}));

export const UploadHint = styled(Typography)(({ theme }) => ({
  fontSize: "12px",
  color: theme.palette.grey[500],
  marginTop: "8px",
  textAlign: "center",
}));

export const MediaPreviewContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  borderRadius: "8px",
  overflow: "hidden",
  height: "100%",
  width: "100%",
  backgroundColor: theme.palette.grey[100],
}));

export const UploadIconContainer = styled(Box)(({ theme }) => ({
  width: "48px",
  height: "48px",
  borderRadius: "50%",
  backgroundColor: theme.palette.grey[200],
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 auto 12px",
  color: theme.palette.grey[600],
}));

export const UploadTitle = styled(Typography)(({ theme }) => ({
  fontSize: "14px",
  color: theme.palette.grey[700],
  fontWeight: 500,
  marginBottom: "4px",
}));

export const UploadSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: "12px",
  color: theme.palette.grey[500],
}));