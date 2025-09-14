"use client";

import { styled } from "@mui/material/styles";
import { palette } from "@/theme/pallete";

export const CreateArticleRoot = styled("div")(({ theme }) => ({
  display: "flex",
  minHeight: "100vh",
  backgroundColor: "#F8F9FA",
  position: "relative",
}));

export const MainContent = styled("main")<{ sidebarOpen: boolean; isMobile: boolean }>(
  ({ theme, sidebarOpen, isMobile }) => ({
    flex: 1,
    padding: "84px 20px 20px",
    marginLeft: isMobile ? 0 : sidebarOpen ? "280px" : "80px",
    transition: "margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    minWidth: 0,
    
    [theme.breakpoints.down('md')]: {
      marginLeft: 0,
      padding: "74px 16px 16px",
    },
  })
);

// Overlay for mobile sidebar
export const SidebarOverlay = styled("div")<{ show: boolean }>(
  ({ show }) => ({
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 999,
    opacity: show ? 1 : 0,
    visibility: show ? "visible" : "hidden",
    transition: "all 0.3s ease",
    backdropFilter: "blur(4px)",
  })
);

// Form Container
export const FormContainer = styled("div")(({ theme }) => ({
  maxWidth: "800px",
  margin: "0 auto",
  backgroundColor: "#ffffff",
  borderRadius: "16px",
  padding: "32px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  border: "1px solid rgba(0,0,0,0.05)",

  [theme.breakpoints.down('md')]: {
    padding: "24px",
    margin: "0 8px",
  },
}));

export const FormHeader = styled("div")({
  marginBottom: "32px",
});

export const FormTitle = styled("h1")({
  fontSize: "28px",
  fontWeight: 600,
  color: "#0f172a",
  margin: "0 0 8px 0",
});

export const FormSubtitle = styled("p")({
  fontSize: "16px",
  color: "#64748b",
  margin: 0,
});

// Form Fields
export const FormSection = styled("div")({
  marginBottom: "32px",
});

export const SectionTitle = styled("h2")({
  fontSize: "18px",
  fontWeight: 600,
  color: "#0f172a",
  margin: "0 0 16px 0",
});

export const FormGrid = styled("div")({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "20px",

  "@media (max-width: 640px)": {
    gridTemplateColumns: "1fr",
    gap: "16px",
  },
});

export const FormField = styled("div")<{ fullWidth?: boolean }>(({ fullWidth }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  gridColumn: fullWidth ? "1 / -1" : "auto",
}));

export const Label = styled("label")({
  fontSize: "14px",
  fontWeight: 500,
  color: "#374151",
  display: "flex",
  alignItems: "center",
  gap: "4px",
});

export const RequiredIndicator = styled("span")({
  color: "#ef4444",
  fontSize: "14px",
});

export const Input = styled("input")<{ error?: boolean }>(({ error }) => ({
  padding: "12px 16px",
  borderRadius: "8px",
  border: `1px solid ${error ? "#ef4444" : "#e2e8f0"}`,
  backgroundColor: "#ffffff",
  fontSize: "14px",
  color: "#334155",
  transition: "all 0.2s ease",

  "&:focus": {
    outline: "none",
    borderColor: error ? "#ef4444" : palette.primary.main,
    boxShadow: `0 0 0 3px ${error ? "#ef444420" : palette.primary.main + "20"}`,
  },

  "&::placeholder": {
    color: "#94a3b8",
  },
}));

export const Select = styled("select")<{ error?: boolean }>(({ error }) => ({
  padding: "12px 16px",
  borderRadius: "8px",
  border: `1px solid ${error ? "#ef4444" : "#e2e8f0"}`,
  backgroundColor: "#ffffff",
  fontSize: "14px",
  color: "#334155",
  cursor: "pointer",
  transition: "all 0.2s ease",

  "&:focus": {
    outline: "none",
    borderColor: error ? "#ef4444" : palette.primary.main,
    boxShadow: `0 0 0 3px ${error ? "#ef444420" : palette.primary.main + "20"}`,
  },
}));

export const Textarea = styled("textarea")<{ error?: boolean }>(({ error }) => ({
  padding: "12px 16px",
  borderRadius: "8px",
  border: `1px solid ${error ? "#ef4444" : "#e2e8f0"}`,
  backgroundColor: "#ffffff",
  fontSize: "14px",
  color: "#334155",
  minHeight: "120px",
  resize: "vertical",
  fontFamily: "inherit",
  transition: "all 0.2s ease",

  "&:focus": {
    outline: "none",
    borderColor: error ? "#ef4444" : palette.primary.main,
    boxShadow: `0 0 0 3px ${error ? "#ef444420" : palette.primary.main + "20"}`,
  },

  "&::placeholder": {
    color: "#94a3b8",
  },
}));

export const ErrorMessage = styled("span")({
  fontSize: "12px",
  color: "#ef4444",
  marginTop: "4px",
});

// Media Upload
export const MediaUploadContainer = styled("div")({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "20px",

  "@media (max-width: 640px)": {
    gridTemplateColumns: "1fr",
    gap: "16px",
  },
});

export const MediaUploadBox = styled("div")<{ hasMedia?: boolean }>(({ hasMedia }) => ({
  border: "2px dashed #d1d5db",
  borderRadius: "12px",
  padding: "24px",
  textAlign: "center",
  backgroundColor: hasMedia ? "#f8fafc" : "#fafbfc",
  transition: "all 0.2s ease",
  cursor: "pointer",
  position: "relative",

  "&:hover": {
    borderColor: palette.primary.main,
    backgroundColor: `${palette.primary.main}05`,
  },
}));

export const MediaUploadIcon = styled("div")({
  width: "48px",
  height: "48px",
  borderRadius: "50%",
  backgroundColor: "#f1f5f9",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 auto 12px",
  color: "#64748b",
});

export const MediaUploadText = styled("div")({
  fontSize: "14px",
  color: "#64748b",
  fontWeight: 500,
  marginBottom: "4px",
});

export const MediaUploadSubtext = styled("div")({
  fontSize: "12px",
  color: "#94a3b8",
});

export const MediaPreview = styled("div")({
  position: "relative",
  borderRadius: "8px",
  overflow: "hidden",
  marginTop: "12px",
});

export const MediaPreviewImage = styled("img")({
  width: "100%",
  height: "100px",
  objectFit: "cover",
  borderRadius: "8px",
});

export const MediaRemoveButton = styled("button")({
  position: "absolute",
  top: "8px",
  right: "8px",
  width: "24px",
  height: "24px",
  borderRadius: "50%",
  border: "none",
  backgroundColor: "rgba(0,0,0,0.7)",
  color: "white",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "14px",

  "&:hover": {
    backgroundColor: "rgba(0,0,0,0.8)",
  },
});

// Action Buttons
export const ActionButtons = styled("div")({
  display: "flex",
  justifyContent: "flex-end",
  gap: "12px",
  marginTop: "32px",
  paddingTop: "24px",
  borderTop: "1px solid #f1f5f9",

  "@media (max-width: 640px)": {
    flexDirection: "column-reverse",
  },
});

export const Button = styled("button")<{ 
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
}>(({ variant = 'primary', fullWidth }) => ({
  padding: "12px 24px",
  borderRadius: "8px",
  fontSize: "14px",
  fontWeight: 500,
  cursor: "pointer",
  transition: "all 0.2s ease",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  minWidth: fullWidth ? "100%" : "120px",
  border: "1px solid transparent",

  ...(variant === 'primary' && {
    backgroundColor: palette.primary.main,
    color: "#ffffff",
    "&:hover": {
      backgroundColor: palette.primary.dark || "#3b82f6",
      transform: "translateY(-1px)",
    },
  }),

  ...(variant === 'secondary' && {
    backgroundColor: "#f8fafc",
    color: "#64748b",
    "&:hover": {
      backgroundColor: "#f1f5f9",
    },
  }),

  ...(variant === 'outline' && {
    backgroundColor: "transparent",
    color: "#64748b",
    border: "1px solid #e2e8f0",
    "&:hover": {
      backgroundColor: "#f8fafc",
      borderColor: "#cbd5e1",
    },
  }),

  "&:disabled": {
    opacity: 0.5,
    cursor: "not-allowed",
    transform: "none",
  },
}));