// elements.tsx
"use client";

import { styled } from "@mui/material/styles";
import { Box, Typography, IconButton } from "@mui/material";

export const VideoContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  borderRadius: "8px",
  overflow: "hidden",
  height: "200px",
  width: "100%",
  marginTop: "8px",
  backgroundColor: theme.palette.grey[100],
  border: `1px solid ${theme.palette.grey[300]}`,
}));

export const RemoveButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: "8px",
  right: "8px",
  width: "24px",
  height: "24px",
  backgroundColor: "rgba(0, 0, 0, 0.7)",
  color: theme.palette.common.white,
  zIndex: 10,
  
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  
  "& .MuiSvgIcon-root": {
    fontSize: "14px",
  },
}));

export const GoogleDriveNote = styled(Typography)(({ theme }) => ({
  fontSize: "10px",
  color: theme.palette.grey[600],
  textAlign: "center",
  marginTop: "4px",
  fontStyle: "italic",
}));

export const VideoFrame = styled("video")(({ theme }) => ({
  width: "100%",
  height: "100%",
  borderRadius: "8px",
  objectFit: "cover",
}));

export const IFrame = styled("iframe")(({ theme }) => ({
  width: "100%",
  height: "100%",
  border: "none",
  borderRadius: "8px",
}));