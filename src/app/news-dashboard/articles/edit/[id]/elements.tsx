// elements.tsx
"use client";

import { theme } from "@/theme/theme";
import { styled } from "@mui/material/styles";

export const EditArticleRoot = styled("div")(({ theme }) => ({
  display: "flex",
  minHeight: "100vh",
  paddingTop: "1rem",
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

export const FormContainer = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      maxWidth: "800px",
      margin: "0 auto",
      backgroundColor: "#ffffff",
      borderRadius: "16px",
      padding: "32px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
      border: "1px solid rgba(0,0,0,0.05)",
    }}
  >
    {children}
  </div>
);

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