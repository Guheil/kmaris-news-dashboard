// elements.tsx
"use client";

import { styled } from "@mui/material/styles";
import { Box, Typography, TextField, Select as MuiSelect, TextareaAutosize } from "@mui/material";

export const FormGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "20px",
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr",
    gap: "16px",
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

export const RequiredIndicator = styled("span")(({ theme }) => ({
  color: theme.palette.error.main,
  fontSize: "14px",
  marginLeft: "2px",
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

export const Select = styled(MuiSelect)(({ theme }) => ({
  borderRadius: "8px",
  backgroundColor: theme.palette.common.white,
  position: "relative",
  fontSize: "16px",
  
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.grey[300],
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.grey[400],
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: theme.palette.primary.main,
    boxShadow: `0 0 0 3px ${theme.palette.primary.main}20`,
  },
  "& .MuiSelect-select": {
    padding: "12px 16px",
    color: theme.palette.grey[900],
  },
  // Ensure the dropdown menu doesn't affect layout
  "& .MuiMenu-paper": {
    position: "absolute",
    zIndex: theme.zIndex.modal, // Ensure it appears above other elements
    maxHeight: "200px", // Limit dropdown height to prevent overflow issues
    overflowY: "auto", // Allow scrolling within the dropdown
  },
}));

export const TextArea = styled(TextareaAutosize)(({ theme }) => ({
  padding: "12px 16px",
  borderRadius: "8px",
  border: `1px solid ${theme.palette.grey[300]}`,
  fontSize: "16px",
  color: theme.palette.grey[900],
  backgroundColor: theme.palette.common.white,
  transition: "all 0.2s ease",
  resize: "vertical",
  fontFamily: theme.typography.fontFamily,
  minRows: 4,
  width: "100%",
  boxSizing: "border-box",
  
  "&:focus": {
    outline: "none",
    borderColor: theme.palette.primary.main,
    boxShadow: `0 0 0 3px ${theme.palette.primary.main}20`,
  },
  
  "&::placeholder": {
    color: theme.palette.grey[400],
  },
}));

export const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: "18px",
  fontWeight: 600,
  color: theme.palette.grey[900],
  margin: "0 0 16px 0",
  variant: "h6",
}));

export const ErrorMessage = styled(Typography)(({ theme }) => ({
  fontSize: "12px",
  color: theme.palette.error.main,
  marginTop: "4px",
  display: "block",
}));