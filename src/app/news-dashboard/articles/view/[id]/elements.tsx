// app/news-dashboard/articles/view/[id]/elements.tsx
"use client";

import { styled, keyframes } from "@mui/material/styles";
import { palette } from "@/theme/pallete";

// Root Container
export const ViewArticleRoot = styled("div")({
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

// Article Container
export const ArticleContainer = styled("div")(({ theme }) => ({
  maxWidth: "900px",
  margin: "0 auto",
  backgroundColor: "#ffffff",
  borderRadius: "16px",
  padding: "32px",
  boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
  border: "1px solid rgba(0,0,0,0.05)",

  [theme.breakpoints.down('md')]: {
    padding: "24px",
    margin: "0",
    borderRadius: "12px",
  },

  [theme.breakpoints.down('sm')]: {
    padding: "20px",
  },
}));

// Back Button
export const BackButton = styled("button")({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  padding: "10px 16px",
  borderRadius: "8px",
  border: "1px solid #e2e8f0",
  backgroundColor: "transparent",
  color: "#64748b",
  fontSize: "14px",
  fontWeight: 500,
  cursor: "pointer",
  marginBottom: "24px",
  transition: "all 0.2s ease",

  "&:hover": {
    backgroundColor: "#f8fafc",
    borderColor: "#cbd5e1",
    color: "#475569",
  },
});

// Article Header
export const ArticleHeader = styled("div")(({ theme }) => ({
  marginBottom: "32px",
  
  [theme.breakpoints.down('md')]: {
    marginBottom: "24px",
  },
}));

export const ArticleTitle = styled("h1")(({ theme }) => ({
  fontSize: "32px",
  fontWeight: 700,
  color: "#0f172a",
  lineHeight: 1.3,
  margin: "0 0 20px 0",

  [theme.breakpoints.down('md')]: {
    fontSize: "28px",
  },

  [theme.breakpoints.down('sm')]: {
    fontSize: "24px",
  },
}));

export const ArticleMeta = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "20px",
  marginBottom: "20px",
  flexWrap: "wrap",

  [theme.breakpoints.down('sm')]: {
    gap: "16px",
  },
}));

export const MetaItem = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: "6px",
  fontSize: "14px",
  color: "#64748b",
});

export const AuthorAvatar = styled("div")({
  width: "24px",
  height: "24px",
  borderRadius: "50%",
  backgroundColor: palette.primary.main,
  color: "#ffffff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "12px",
  fontWeight: 600,
});

export const AuthorName = styled("span")({
  fontWeight: 500,
  color: "#374151",
});

export const CategoryBadge = styled("span")<{ category: string }>(({ category }) => ({
  padding: "6px 12px",
  borderRadius: "8px",
  fontSize: "12px",
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.5px",
  display: "flex",
  alignItems: "center",
  gap: "6px",
  
  // Status badges
  ...(category === 'status-published' && {
    backgroundColor: '#dcfce7',
    color: '#166534',
    textTransform: 'capitalize',
  }),
  ...(category === 'status-draft' && {
    backgroundColor: '#fef3c7',
    color: '#92400e',
    textTransform: 'capitalize',
  }),
  ...(category === 'status-archived' && {
    backgroundColor: '#f3f4f6',
    color: '#6b7280',
    textTransform: 'capitalize',
  }),
  
  // Category badges
  ...(category.toLowerCase() === 'technology' && {
    backgroundColor: '#dbeafe',
    color: '#1d4ed8',
  }),
  ...(category.toLowerCase() === 'environment' && {
    backgroundColor: '#dcfce7',
    color: '#166534',
  }),
  ...(category.toLowerCase() === 'finance' && {
    backgroundColor: '#fef3c7',
    color: '#92400e',
  }),
  ...(category.toLowerCase() === 'science' && {
    backgroundColor: '#ede9fe',
    color: '#7c3aed',
  }),
  ...(category.toLowerCase() === 'sports' && {
    backgroundColor: '#fef2f2',
    color: '#dc2626',
  }),
  ...(category.toLowerCase() === 'health' && {
    backgroundColor: '#ecfdf5',
    color: '#059669',
  }),
  ...(!['technology', 'environment', 'finance', 'science', 'sports', 'health'].includes(category.toLowerCase()) && 
      !category.startsWith('status-') && {
    backgroundColor: '#f3f4f6',
    color: '#6b7280',
  }),
}));

// Article Actions
export const ArticleActions = styled("div")(({ theme }) => ({
  display: "flex",
  gap: "12px",
  alignItems: "center",

  [theme.breakpoints.down('sm')]: {
    flexDirection: "column",
    alignItems: "stretch",
  },
}));

export const ActionButton = styled("button")<{ 
  variant?: 'edit' | 'archive' | 'share'; 
  disabled?: boolean 
}>(({ variant = 'edit', disabled }) => ({
  padding: "10px 16px",
  borderRadius: "8px",
  border: "none",
  cursor: disabled ? "not-allowed" : "pointer",
  display: "flex",
  alignItems: "center",
  gap: "8px",
  fontSize: "14px",
  fontWeight: 500,
  transition: "all 0.2s ease",
  opacity: disabled ? 0.6 : 1,
  
  ...(variant === 'edit' && {
    backgroundColor: `${palette.primary.main}15`,
    color: palette.primary.main,
    '&:hover': !disabled && {
      backgroundColor: `${palette.primary.main}25`,
      transform: "translateY(-1px)",
    },
  }),
  ...(variant === 'archive' && {
    backgroundColor: '#fef3c7',
    color: '#f59e0b',
    '&:hover': !disabled && {
      backgroundColor: '#fde68a',
      transform: "translateY(-1px)",
    },
  }),
  ...(variant === 'share' && {
    backgroundColor: '#f1f5f9',
    color: '#64748b',
    '&:hover': !disabled && {
      backgroundColor: '#e2e8f0',
      color: '#475569',
      transform: "translateY(-1px)",
    },
  }),
}));

// Media Container
export const ArticleMediaContainer = styled("div")(({ theme }) => ({
  marginBottom: "32px",
  borderRadius: "12px",
  overflow: "hidden",
  
  [theme.breakpoints.down('md')]: {
    marginBottom: "24px",
  },
}));

export const ArticleImage = styled("div")<{ backgroundImage?: string }>(({ backgroundImage }) => ({
  width: "100%",
  height: "400px",
  backgroundImage: backgroundImage ? `url(${backgroundImage})` : 'none',
  backgroundColor: backgroundImage ? 'transparent' : '#f1f5f9',
  backgroundSize: "cover",
  backgroundPosition: "center",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#64748b",
  borderRadius: "12px",
}));

export const ArticleVideo = styled("div")({
  width: "100%",
  height: "400px",
  position: "relative",
  borderRadius: "12px",
  overflow: "hidden",
});

export const PlayButton = styled("button")({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60px",
  height: "60px",
  borderRadius: "50%",
  backgroundColor: "rgba(0,0,0,0.7)",
  border: "none",
  color: "#ffffff",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 0.2s ease",
  
  "&:hover": {
    backgroundColor: "rgba(0,0,0,0.8)",
    transform: "translate(-50%, -50%) scale(1.1)",
  },
});

// Article Content
export const ArticleContent = styled("div")({
  lineHeight: 1.7,
});

export const ArticleDescription = styled("div")(({ theme }) => ({
  fontSize: "16px",
  color: "#374151",
  lineHeight: 1.7,
  whiteSpace: "pre-wrap",
  
  [theme.breakpoints.down('md')]: {
    fontSize: "15px",
  },
}));

// Loading State
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const LoadingContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "80px 24px",
  color: "#64748b",
  gap: "16px",
});

export const LoadingSpinner = styled("div")({
  width: "40px",
  height: "40px",
  border: "3px solid #f1f5f9",
  borderTop: `3px solid ${palette.primary.main}`,
  borderRadius: "50%",
  animation: `${spin} 1s linear infinite`,
});

// Error State
export const ErrorContainer = styled("div")({
  textAlign: "center",
  padding: "80px 24px",
  color: "#64748b",
});

export const ErrorIcon = styled("div")({
  width: "80px",
  height: "80px",
  borderRadius: "50%",
  backgroundColor: "#fef2f2",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 auto 24px",
  color: "#dc2626",
});

export const ErrorTitle = styled("h3")({
  fontSize: "20px",
  fontWeight: 600,
  color: "#0f172a",
  margin: "0 0 12px",
});

export const ErrorMessage = styled("p")({
  fontSize: "16px",
  color: "#64748b",
  margin: "0 0 24px",
  lineHeight: 1.6,
});

export const RetryButton = styled("button")({
  padding: "12px 20px",
  borderRadius: "8px",
  border: "none",
  backgroundColor: palette.primary.main,
  color: "#ffffff",
  fontSize: "14px",
  fontWeight: 500,
  cursor: "pointer",
  transition: "all 0.2s ease",

  "&:hover": {
    backgroundColor: palette.primary.dark || "#1e40af",
    transform: "translateY(-1px)",
  },
});