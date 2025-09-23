"use client";

import { styled } from "@mui/material/styles";
import { palette } from "@/theme/pallete";

export const ManageCategoriesRoot = styled("div")({
  display: "flex",
  minHeight: "100vh",
  backgroundColor: "#F8F9FA",
  position: "relative",
});

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

// Page Container
export const PageContainer = styled("div")(({ theme }) => ({
  maxWidth: "1200px",
  margin: "0 auto",

  [theme.breakpoints.down('md')]: {
    margin: "0 8px",
  },
}));

export const PageHeader = styled("div")({
  marginBottom: "32px",
});

export const PageTitle = styled("h1")({
  fontSize: "32px",
  fontWeight: 600,
  color: "#0f172a",
  margin: "0 0 8px 0",
});

export const PageSubtitle = styled("p")({
  fontSize: "16px",
  color: "#64748b",
  margin: 0,
});

// Content Section
export const ContentSection = styled("div")({
  display: "grid",
  paddingTop: "1rem",
  gap: "32px",
});

// Create Section
export const CreateSection = styled("div")({
  backgroundColor: "#ffffff",
  borderRadius: "16px",
  padding: "32px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  border: "1px solid rgba(0,0,0,0.05)",
});

export const CreateSectionTitle = styled("h2")({
  fontSize: "20px",
  fontWeight: 600,
  color: "#0f172a",
  margin: "0 0 24px 0",
});

// Form Fields
export const FormGrid = styled("div")({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "20px",
  marginBottom: "24px",
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

export const ErrorMessage = styled("span")({
  fontSize: "12px",
  color: "#ef4444",
  marginTop: "4px",
});

// Action Buttons
export const ActionButtons = styled("div")({
  display: "flex",
  justifyContent: "flex-end",
  gap: "12px",

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

// Categories Section
export const CategoriesSection = styled("div")({
  backgroundColor: "#ffffff",
  borderRadius: "16px",
  padding: "32px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  border: "1px solid rgba(0,0,0,0.05)",
});

export const CategoriesSectionTitle = styled("h2")({
  fontSize: "20px",
  fontWeight: 600,
  color: "#0f172a",
  margin: "0 0 24px 0",
});

export const CategoriesGrid = styled("div")({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
  gap: "16px",

  "@media (max-width: 640px)": {
    gridTemplateColumns: "1fr",
  },
});

export const CategoryCard = styled("div")({
  backgroundColor: "#f8fafc",
  border: "1px solid #e2e8f0",
  borderRadius: "12px",
  padding: "20px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  transition: "all 0.2s ease",

  "&:hover": {
    backgroundColor: "#f1f5f9",
    borderColor: "#cbd5e1",
    transform: "translateY(-2px)",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  },
});

export const CategoryName = styled("div")({
  fontSize: "16px",
  fontWeight: 500,
  color: "#0f172a",
  flex: 1,
});

export const CategoryActions = styled("div")({
  display: "flex",
  gap: "8px",
});

export const IconButton = styled("button")<{ variant?: 'default' | 'danger' }>(({ variant = 'default' }) => ({
  width: "36px",
  height: "36px",
  borderRadius: "8px",
  border: "1px solid #e2e8f0",
  backgroundColor: "#ffffff",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 0.2s ease",
  color: variant === 'danger' ? "#ef4444" : "#64748b",

  "&:hover": {
    backgroundColor: variant === 'danger' ? "#fef2f2" : "#f8fafc",
    borderColor: variant === 'danger' ? "#ef4444" : "#cbd5e1",
    color: variant === 'danger' ? "#dc2626" : "#475569",
  },
}));

// Empty State
export const EmptyState = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "64px 32px",
  textAlign: "center",
});

export const EmptyStateIcon = styled("div")({
  width: "80px",
  height: "80px",
  borderRadius: "50%",
  backgroundColor: "#f1f5f9",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 0 24px 0",
  color: "#64748b",
});

export const EmptyStateText = styled("div")({
  fontSize: "18px",
  fontWeight: 500,
  color: "#0f172a",
  marginBottom: "8px",
});

export const EmptyStateSubtext = styled("div")({
  fontSize: "14px",
  color: "#64748b",
  maxWidth: "400px",
});