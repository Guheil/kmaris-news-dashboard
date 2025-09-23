"use client";

import { theme } from "@/theme/theme";
import { styled } from "@mui/material/styles";

export const EditArticleRoot = styled("div")(({ theme }) => ({
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

export const ContentContainer = styled("div")(({ theme }) => ({
  maxWidth: "1400px",
  margin: "0 auto",
  
  [theme.breakpoints.down("lg")]: {
    "& > div:last-child": {
      gridTemplateColumns: "1fr",
      gap: "24px",
    },
  },
}));

export const BackButton = styled("button")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  padding: "8px 16px",
  backgroundColor: "transparent",
  border: `1px solid ${theme.palette.border.main}`,
  borderRadius: "8px",
  color: theme.palette.grey[600],
  fontSize: "14px",
  fontWeight: 500,
  cursor: "pointer",
  transition: "all 0.2s ease",
  marginBottom: "24px",

  "&:hover": {
    backgroundColor: theme.palette.grey[50],
    borderColor: theme.palette.border.dark,
    color: theme.palette.grey[700],
  },
}));

export const PageHeader = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "32px",
  
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    alignItems: "stretch",
    gap: "16px",
  },
}));

export const PageTitle = styled("h1")(({ theme }) => ({
  fontSize: "32px",
  fontWeight: 700,
  color: theme.palette.navy.main,
  margin: 0,
}));

export const ActionButtons = styled("div")(({ theme }) => ({
  display: "flex",
  gap: "12px",
  
  [theme.breakpoints.down("md")]: {
    justifyContent: "flex-end",
  },
}));

export const ActionButton = styled("button")<{ variant?: "primary" | "secondary" }>(({ theme, variant = "secondary" }) => ({
  padding: "12px 20px",
  borderRadius: "8px",
  border: variant === "primary" ? "none" : `1px solid ${theme.palette.border.main}`,
  backgroundColor: variant === "primary" ? theme.palette.primary.main : theme.palette.common.white,
  color: variant === "primary" ? theme.palette.common.white : theme.palette.navy.main,
  fontSize: "14px",
  fontWeight: 600,
  cursor: "pointer",
  transition: "all 0.2s ease",
  display: "flex",
  alignItems: "center",
  gap: "8px",
  
  "&:hover": {
    backgroundColor: variant === "primary" ? theme.palette.primary.main : theme.palette.grey[50],
    borderColor: variant === "primary" ? theme.palette.primary.main : theme.palette.border.dark,
    transform: "translateY(-1px)",
  },
  
  "&:disabled": {
    opacity: 0.6,
    cursor: "not-allowed",
    transform: "none",
  },
}));

export const FormContainer = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  borderRadius: "16px",
  boxShadow: `0 4px 12px ${theme.palette.common.black}14`,
  border: `1px solid ${theme.palette.border.light}`,
  overflow: "hidden",
}));

export const FormSection = styled("div")(({ theme }) => ({
  padding: "32px",
  
  "&:not(:last-child)": {
    borderBottom: `1px solid ${theme.palette.grey[100]}`,
  },
}));

export const FormRow = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "20px",
  marginBottom: "24px",
  
  "&:last-child": {
    marginBottom: 0,
  },
  
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr",
    gap: "16px",
  },
  
  "&.single-column": {
    gridTemplateColumns: "1fr",
  },
}));

export const FormGroup = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
}));

export const Label = styled("label")(({ theme }) => ({
  fontSize: "14px",
  fontWeight: 600,
  color: theme.palette.grey[700],
  marginBottom: "4px",
}));

export const Input = styled("input")(({ theme }) => ({
  padding: "12px 16px",
  borderRadius: "8px",
  border: `1px solid ${theme.palette.border.main}`,
  fontSize: "16px",
  color: theme.palette.navy.main,
  backgroundColor: theme.palette.common.white,
  transition: "all 0.2s ease",
  
  "&:focus": {
    outline: "none",
    borderColor: theme.palette.primary.main,
    boxShadow: `0 0 0 3px ${theme.palette.primary.main}20`,
  },
  
  "&::placeholder": {
    color: theme.palette.grey[400],
  },
}));

export const TextArea = styled("textarea")(({ theme }) => ({
  padding: "12px 16px",
  borderRadius: "8px",
  border: `1px solid ${theme.palette.border.main}`,
  fontSize: "16px",
  color: theme.palette.navy.main,
  backgroundColor: theme.palette.common.white,
  transition: "all 0.2s ease",
  resize: "vertical",
  fontFamily: "inherit",
  minHeight: "100px",
  
  "&:focus": {
    outline: "none",
    borderColor: theme.palette.primary.main,
    boxShadow: `0 0 0 3px ${theme.palette.primary.main}20`,
  },
  
  "&::placeholder": {
    color: theme.palette.grey[400],
  },
}));

export const Select = styled("select")(({ theme }) => ({
  padding: "12px 16px",
  borderRadius: "8px",
  border: `1px solid ${theme.palette.border.main}`,
  fontSize: "16px",
  color: theme.palette.navy.main,
  backgroundColor: theme.palette.common.white,
  cursor: "pointer",
  transition: "all 0.2s ease",
  
  "&:focus": {
    outline: "none",
    borderColor: theme.palette.primary.main,
    boxShadow: `0 0 0 3px ${theme.palette.primary.main}20`,
  },
}));

export const FileUploadArea = styled("div")(({ theme }) => ({
  border: `2px dashed ${theme.palette.border.main}`,
  borderRadius: "8px",
  backgroundColor: theme.palette.grey[50],
  transition: "all 0.2s ease",
  cursor: "pointer",
  
  "&:hover": {
    borderColor: theme.palette.primary.main,
    backgroundColor: `${theme.palette.primary.main}05`,
  },
  
  "& label": {
    display: "block",
    cursor: "pointer",
  },
}));

export const FormHeader = ({ children }: { children: React.ReactNode }) => (
  <div style={{ marginBottom: "32px" }}>{children}</div>
);

export const FormTitle = ({ children }: { children: React.ReactNode }) => (
  <h1
    style={{
      fontSize: "28px",
      fontWeight: 600,
      color: theme.palette.navy.main,
      margin: "0 0 8px 0",
    }}
  >
    {children}
  </h1>
);

export const FormSubtitle = ({ children }: { children: React.ReactNode }) => (
  <p style={{ fontSize: "16px", color: theme.palette.grey[600], margin: 0 }}>
    {children}
  </p>
);

export const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2
    style={{
      fontSize: "18px",
      fontWeight: 600,
      color: theme.palette.navy.main,
      margin: "0 0 16px 0",
    }}
  >
    {children}
  </h2>
);

export const FormGrid = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "20px",
    }}
  >
    {children}
  </div>
);

export const FormField = ({
  children,
  fullWidth = false,
  style = {},
}: {
  children: React.ReactNode;
  fullWidth?: boolean;
  style?: React.CSSProperties;
}) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: "8px",
      gridColumn: fullWidth ? "1 / -1" : "auto",
      ...style,
    }}
  >
    {children}
  </div>
);

export const RequiredIndicator = () => (
  <span style={{ color: theme.palette.error.main, fontSize: "14px" }}>*</span>
);

export const ErrorMessage = ({
  children,
  style = {},
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) => (
  <span
    style={{
      fontSize: "12px",
      color: theme.palette.error.main,
      marginTop: "4px",
      ...style,
    }}
  >
    {children}
  </span>
);

export const MediaUploadContainer = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "20px",
    }}
  >
    {children}
  </div>
);

export const MediaUploadBox = ({
  children,
  hasMedia = false,
  onClick,
}: {
  children: React.ReactNode;
  hasMedia?: boolean;
  onClick?: () => void;
}) => (
  <div
    onClick={onClick}
    style={{
      border: `2px dashed ${theme.palette.border.main}`,
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
    }}
  >
    {children}
  </div>
);

export const Button = ({
  children,
  variant = "primary",
  onClick,
  disabled = false,
  type = "button",
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit";
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return {
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.common.white,
        };
      case "secondary":
        return {
          backgroundColor: theme.palette.grey[50],
          color: theme.palette.grey[600],
        };
      case "outline":
        return {
          backgroundColor: "transparent",
          color: theme.palette.grey[600],
          border: `1px solid ${theme.palette.border.main}`,
        };
      default:
        return {};
    }
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: "12px 24px",
        borderRadius: "8px",
        fontSize: "14px",
        fontWeight: 500,
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "all 0.2s ease",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        minWidth: "120px",
        border: "none",
        opacity: disabled ? 0.5 : 1,
        ...getVariantStyles(),
      }}
    >
      {children}
    </button>
  );
};