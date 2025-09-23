"use client";

import { styled } from "@mui/material/styles";

export const ManageCategoriesRoot = styled("div")(({ theme }) => ({
  display: "flex",
  minHeight: "100vh",
  backgroundColor: theme.palette.grey[50],
  position: "relative",
}));

export const MainContent = styled("main")<{ sidebarOpen: boolean; isMobile: boolean }>(
  ({ theme, sidebarOpen, isMobile }) => ({
    flex: 1,
    padding: "84px 20px 20px",
    marginLeft: isMobile ? 0 : sidebarOpen ? "280px" : "80px",
    transition: "margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    minWidth: 0,
    
    [theme.breakpoints.down("md")]: {
      marginLeft: 0,
      padding: "74px 16px 16px",
    },
  })
);

export const SidebarOverlay = styled("div")<{ show: boolean }>(
  ({ theme, show }) => ({
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: `${theme.palette.common.black}80`,
    zIndex: 999,
    opacity: show ? 1 : 0,
    visibility: show ? "visible" : "hidden",
    transition: "all 0.3s ease",
    backdropFilter: "blur(4px)",
  })
);

export const PageContainer = styled("div")(({ theme }) => ({
  maxWidth: "1200px",
  margin: "0 auto",

  [theme.breakpoints.down("md")]: {
    margin: "0 8px",
  },
}));

export const PageHeader = styled("div")(({ theme }) => ({
  marginBottom: "32px",
}));

export const PageTitle = styled("h1")(({ theme }) => ({
  fontSize: "32px",
  fontWeight: 600,
  color: theme.palette.navy.main,
  margin: "0 0 8px 0",
}));

export const PageSubtitle = styled("p")(({ theme }) => ({
  fontSize: "16px",
  color: theme.palette.grey[600],
  margin: 0,
}));

export const ContentSection = styled("div")(({ theme }) => ({
  display: "grid",
  paddingTop: "1rem",
  gap: "32px",
}));

export const CreateSection = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  borderRadius: "16px",
  padding: "32px",
  boxShadow: `0 4px 12px ${theme.palette.common.black}14`,
  border: `1px solid ${theme.palette.border.light}`,
}));

export const CreateSectionTitle = styled("h2")(({ theme }) => ({
  fontSize: "20px",
  fontWeight: 600,
  color: theme.palette.navy.main,
  margin: "0 0 24px 0",
}));

export const FormGrid = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "20px",
  marginBottom: "24px",
}));

export const FormField = styled("div")<{ fullWidth?: boolean }>(({ theme, fullWidth }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  gridColumn: fullWidth ? "1 / -1" : "auto",
}));

export const Label = styled("label")(({ theme }) => ({
  fontSize: "14px",
  fontWeight: 500,
  color: theme.palette.grey[700],
  display: "flex",
  alignItems: "center",
  gap: "4px",
}));

export const RequiredIndicator = styled("span")(({ theme }) => ({
  color: theme.palette.error.main,
  fontSize: "14px",
}));

export const Input = styled("input")<{ error?: boolean }>(({ theme, error }) => ({
  padding: "12px 16px",
  borderRadius: "8px",
  border: `1px solid ${error ? theme.palette.error.main : theme.palette.border.main}`,
  backgroundColor: theme.palette.common.white,
  fontSize: "14px",
  color: theme.palette.navy.main,
  transition: "all 0.2s ease",

  "&:focus": {
    outline: "none",
    borderColor: error ? theme.palette.error.main : theme.palette.primary.main,
    boxShadow: `0 0 0 3px ${error ? theme.palette.error.main + "20" : theme.palette.primary.main + "20"}`,
  },

  "&::placeholder": {
    color: theme.palette.grey[400],
  },
}));

export const ErrorMessage = styled("span")(({ theme }) => ({
  fontSize: "12px",
  color: theme.palette.error.main,
  marginTop: "4px",
}));

export const ActionButtons = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
  gap: "12px",

  "@media (max-width: 640px)": {
    flexDirection: "column-reverse",
  },
}));

export const Button = styled("button")<{
  variant?: "primary" | "secondary" | "outline";
  fullWidth?: boolean;
}>(({ theme, variant = "primary", fullWidth }) => ({
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

  ...(variant === "primary" && {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      transform: "translateY(-1px)",
    },
  }),

  ...(variant === "secondary" && {
    backgroundColor: theme.palette.grey[50],
    color: theme.palette.grey[600],
    "&:hover": {
      backgroundColor: theme.palette.grey[100],
    },
  }),

  ...(variant === "outline" && {
    backgroundColor: "transparent",
    color: theme.palette.grey[600],
    border: `1px solid ${theme.palette.border.main}`,
    "&:hover": {
      backgroundColor: theme.palette.grey[50],
      borderColor: theme.palette.border.dark,
    },
  }),

  "&:disabled": {
    opacity: 0.5,
    cursor: "not-allowed",
    transform: "none",
  },
}));

export const CategoriesSection = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  borderRadius: "16px",
  padding: "32px",
  boxShadow: `0 4px 12px ${theme.palette.common.black}14`,
  border: `1px solid ${theme.palette.border.light}`,
}));

export const CategoriesSectionTitle = styled("h2")(({ theme }) => ({
  fontSize: "20px",
  fontWeight: 600,
  color: theme.palette.navy.main,
  margin: "0 0 24px 0",
}));

export const CategoriesGrid = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
  gap: "16px",

  "@media (max-width: 640px)": {
    gridTemplateColumns: "1fr",
  },
}));

export const CategoryCard = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.grey[50],
  border: `1px solid ${theme.palette.border.main}`,
  borderRadius: "12px",
  padding: "20px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  transition: "all 0.2s ease",

  "&:hover": {
    backgroundColor: theme.palette.grey[100],
    borderColor: theme.palette.border.dark,
    transform: "translateY(-2px)",
    boxShadow: `0 4px 12px ${theme.palette.common.black}14`,
  },
}));

export const CategoryName = styled("div")(({ theme }) => ({
  fontSize: "16px",
  fontWeight: 500,
  color: theme.palette.navy.main,
  flex: 1,
}));

export const CategoryActions = styled("div")(({ theme }) => ({
  display: "flex",
  gap: "8px",
}));

export const IconButton = styled("button")<{ variant?: "default" | "danger" }>(({ theme, variant = "default" }) => ({
  width: "36px",
  height: "36px",
  borderRadius: "8px",
  border: `1px solid ${theme.palette.border.main}`,
  backgroundColor: theme.palette.common.white,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 0.2s ease",
  color: variant === "danger" ? theme.palette.error.main : theme.palette.grey[600],

  "&:hover": {
    backgroundColor: variant === "danger" ? theme.palette.error.light : theme.palette.grey[50],
    borderColor: variant === "danger" ? theme.palette.error.main : theme.palette.border.dark,
    color: variant === "danger" ? theme.palette.error.main : theme.palette.grey[700],
  },
}));

export const EmptyState = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "64px 32px",
  textAlign: "center",
}));

export const EmptyStateIcon = styled("div")(({ theme }) => ({
  width: "80px",
  height: "80px",
  borderRadius: "50%",
  backgroundColor: theme.palette.grey[100],
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 0 24px 0",
  color: theme.palette.grey[600],
}));

export const EmptyStateText = styled("div")(({ theme }) => ({
  fontSize: "18px",
  fontWeight: 500,
  color: theme.palette.navy.main,
  marginBottom: "8px",
}));

export const EmptyStateSubtext = styled("div")(({ theme }) => ({
  fontSize: "14px",
  color: theme.palette.grey[600],
  maxWidth: "400px",
}));