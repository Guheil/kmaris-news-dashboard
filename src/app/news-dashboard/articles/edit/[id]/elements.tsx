"use client";

import { styled } from "@mui/material/styles";
import { palette } from "@/theme/pallete";
import { Pallet } from "@mui/icons-material";

export const EditArticleRoot = styled("div")(({ theme }) => ({
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

export const ContentContainer = styled("div")(({ theme }) => ({
  maxWidth: "1400px",
  margin: "0 auto",
  
  [theme.breakpoints.down('lg')]: {
    '& > div:last-child': {
      gridTemplateColumns: '1fr',
      gap: '24px',
    },
  },
}));

export const BackButton = styled("button")({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  padding: "8px 16px",
  backgroundColor: "transparent",
  border: "1px solid #e2e8f0",
  borderRadius: "8px",
  color: "#64748b",
  fontSize: "14px",
  fontWeight: 500,
  cursor: "pointer",
  transition: "all 0.2s ease",
  marginBottom: "24px",

  "&:hover": {
    backgroundColor: "#f8fafc",
    borderColor: "#cbd5e1",
    color: "#475569",
  },
});

export const PageHeader = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "32px",
  
  [theme.breakpoints.down('md')]: {
    flexDirection: "column",
    alignItems: "stretch",
    gap: "16px",
  },
}));

export const PageTitle = styled("h1")({
  fontSize: "32px",
  fontWeight: 700,
  color: "#0f172a",
  margin: 0,
});

export const ActionButtons = styled("div")(({ theme }) => ({
  display: "flex",
  gap: "12px",
  
  [theme.breakpoints.down('md')]: {
    justifyContent: "flex-end",
  },
}));

export const ActionButton = styled("button")<{ variant?: 'primary' | 'secondary' }>(({ variant = 'secondary' }) => ({
  padding: "12px 20px",
  borderRadius: "8px",
  border: variant === 'primary' ? "none" : "1px solid #e2e8f0",
  backgroundColor: variant === 'primary' ? palette.primary.main : "#ffffff",
  color: variant === 'primary' ? "#ffffff" : "#334155",
  fontSize: "14px",
  fontWeight: 600,
  cursor: "pointer",
  transition: "all 0.2s ease",
  display: "flex",
  alignItems: "center",
  gap: "8px",
  
  "&:hover": {
    backgroundColor: variant === 'primary' ? palette.primary.dark : "#f8fafc",
    borderColor: variant === 'primary' ? palette.primary.dark : "#cbd5e1",
    transform: "translateY(-1px)",
  },
  
  "&:disabled": {
    opacity: 0.6,
    cursor: "not-allowed",
    transform: "none",
  },
}));

export const FormContainer = styled("div")({
  backgroundColor: "#ffffff",
  borderRadius: "16px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  border: "1px solid rgba(0,0,0,0.05)",
  overflow: "hidden",
});

export const FormSection = styled("div")({
  padding: "32px",
  
  "&:not(:last-child)": {
    borderBottom: "1px solid #f1f5f9",
  },
});

export const FormRow = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "20px",
  marginBottom: "24px",
  
  "&:last-child": {
    marginBottom: 0,
  },
  
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: "1fr",
    gap: "16px",
  },
  
  // Single column for certain rows
  "&.single-column": {
    gridTemplateColumns: "1fr",
  },
}));

export const FormGroup = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
});

export const Label = styled("label")({
  fontSize: "14px",
  fontWeight: 600,
  color: "#374151",
  marginBottom: "4px",
});

export const Input = styled("input")({
  padding: "12px 16px",
  borderRadius: "8px",
  border: "1px solid #e2e8f0",
  fontSize: "16px",
  color: "#0f172a",
  backgroundColor: "#ffffff",
  transition: "all 0.2s ease",
  
  "&:focus": {
    outline: "none",
    borderColor: palette.primary.main,
    boxShadow: `0 0 0 3px ${palette.primary.main}20`,
  },
  
  "&::placeholder": {
    color: "#94a3b8",
  },
});

export const TextArea = styled("textarea")({
  padding: "12px 16px",
  borderRadius: "8px",
  border: "1px solid #e2e8f0",
  fontSize: "16px",
  color: "#0f172a",
  backgroundColor: "#ffffff",
  transition: "all 0.2s ease",
  resize: "vertical",
  fontFamily: "inherit",
  minHeight: "100px",
  
  "&:focus": {
    outline: "none",
    borderColor: palette.primary.main,
    boxShadow: `0 0 0 3px ${palette.primary.main}20`,
  },
  
  "&::placeholder": {
    color: "#94a3b8",
  },
});

export const Select = styled("select")({
  padding: "12px 16px",
  borderRadius: "8px",
  border: "1px solid #e2e8f0",
  fontSize: "16px",
  color: "#0f172a",
  backgroundColor: "#ffffff",
  cursor: "pointer",
  transition: "all 0.2s ease",
  
  "&:focus": {
    outline: "none",
    borderColor: palette.primary.main,
    boxShadow: `0 0 0 3px ${palette.primary.main}20`,
  },
});

export const FileUploadArea = styled("div")({
  border: "2px dashed #cbd5e1",
  borderRadius: "8px",
  backgroundColor: "#f8fafc",
  transition: "all 0.2s ease",
  cursor: "pointer",
  
  "&:hover": {
    borderColor: palette.primary.main,
    backgroundColor: `${palette.primary.main}05`,
  },
  
  "& label": {
    display: "block",
    cursor: "pointer",
  }
});
export const FormHeader = ({ children }: { children: React.ReactNode }) => (
  <div style={{ marginBottom: '32px' }}>{children}</div>
);

export const FormTitle = ({ children }: { children: React.ReactNode }) => (
  <h1 style={{ 
    fontSize: '28px', 
    fontWeight: 600, 
    color: '#0f172a', 
    margin: '0 0 8px 0' 
  }}>{children}</h1>
);

export const FormSubtitle = ({ children }: { children: React.ReactNode }) => (
  <p style={{ 
    fontSize: '16px', 
    color: '#64748b', 
    margin: 0 
  }}>{children}</p>
);

export const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 style={{ 
    fontSize: '18px', 
    fontWeight: 600, 
    color: '#0f172a', 
    margin: '0 0 16px 0' 
  }}>{children}</h2>
);

export const FormGrid = ({ children }: { children: React.ReactNode }) => (
  <div style={{
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px',
  }}>{children}</div>
);

export const FormField = ({ children, fullWidth = false }: { children: React.ReactNode; fullWidth?: boolean }) => (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    gridColumn: fullWidth ? '1 / -1' : 'auto',
  }}>{children}</div>
);

export const RequiredIndicator = () => (
  <span style={{ color: '#ef4444', fontSize: '14px' }}>*</span>
);

export const ErrorMessage = ({ children, style = {} }: { children: React.ReactNode; style?: React.CSSProperties }) => (
  <span style={{ 
    fontSize: '12px', 
    color: '#ef4444', 
    marginTop: '4px',
    ...style
  }}>{children}</span>
);

export const MediaUploadContainer = ({ children }: { children: React.ReactNode }) => (
  <div style={{
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px',
  }}>{children}</div>
);

export const MediaUploadBox = ({ 
  children, 
  hasMedia = false, 
  onClick 
}: { 
  children: React.ReactNode; 
  hasMedia?: boolean; 
  onClick?: () => void;
}) => (
  <div
    onClick={onClick}
    style={{
      border: '2px dashed #d1d5db',
      borderRadius: '12px',
      padding: '24px',
      textAlign: 'center',
      backgroundColor: hasMedia ? '#f8fafc' : '#fafbfc',
      transition: 'all 0.2s ease',
      cursor: 'pointer',
      position: 'relative',
      minHeight: '200px', // Set a minimum height to ensure uniformity
      display: 'flex', // Optional: Ensure content is aligned consistently
      alignItems: 'center', // Center content vertically
      justifyContent: 'center', // Center content horizontally
    }}
  >{children}</div>
);

export const Button = ({ 
  children, 
  variant = 'primary',
  onClick,
  disabled = false,
  type = 'button'
}: { 
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit';
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: palette.primary.main,
          color: '#ffffff',
        };
      case 'secondary':
        return {
          backgroundColor: '#f8fafc',
          color: '#64748b',
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          color: '#64748b',
          border: '1px solid #e2e8f0',
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
        padding: '12px 24px',
        borderRadius: '8px',
        fontSize: '14px',
        fontWeight: 500,
        cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'all 0.2s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        minWidth: '120px',
        border: 'none',
        opacity: disabled ? 0.5 : 1,
        ...getVariantStyles(),
      }}
    >
      {children}
    </button>
  );
};