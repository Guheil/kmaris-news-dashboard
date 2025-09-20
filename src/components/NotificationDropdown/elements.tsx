"use client";

import { styled } from "@mui/material/styles";

export const NotificationsDropdown = styled("div")<{ isOpen: boolean }>(({ isOpen }) => ({
  position: "absolute",
  top: "calc(100% + 8px)",
  right: "0",
  width: "380px",
  maxHeight: "480px",
  backgroundColor: "#ffffff",
  borderRadius: "12px",
  boxShadow: "0 10px 40px rgba(0, 0, 0, 0.15)",
  border: "1px solid rgba(0, 0, 0, 0.06)",
  opacity: isOpen ? 1 : 0,
  visibility: isOpen ? "visible" : "hidden",
  transform: isOpen ? "translateY(0)" : "translateY(-8px)",
  transition: "all 0.2s ease",
  zIndex: 1000,
  overflow: "hidden",
}));

export const NotificationsHeader = styled("div")({
  padding: "16px 20px",
  borderBottom: "1px solid #f1f5f9",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export const NotificationsTitle = styled("h3")({
  fontSize: "16px",
  fontWeight: 600,
  color: "#0f172a",
  margin: 0,
});

export const MarkAllReadButton = styled("button")({
  background: "none",
  border: "none",
  fontSize: "13px",
  color: "#6366f1",
  cursor: "pointer",
  fontWeight: 500,
  padding: "4px 8px",
  borderRadius: "6px",
  transition: "background-color 0.2s ease",

  "&:hover": {
    backgroundColor: "#f8fafc",
  },
});

export const NotificationsList = styled("div")({
  maxHeight: "360px",
  overflowY: "auto",
  padding: "8px 0",

  "&::-webkit-scrollbar": {
    width: "4px",
  },
  "&::-webkit-scrollbar-track": {
    background: "#f1f5f9",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "#cbd5e1",
    borderRadius: "4px",
  },
});

export const NotificationItem = styled("div")<{ read: boolean }>(({ read }) => ({
  padding: "12px 20px",
  borderLeft: read ? "none" : "3px solid #6366f1",
  backgroundColor: read ? "transparent" : "#f8fafc",
  cursor: "pointer",
  transition: "background-color 0.2s ease",
  position: "relative",

  "&:hover": {
    backgroundColor: "#f8fafc",
  },
}));

export const NotificationContent = styled("div")({
  display: "flex",
  gap: "12px",
  alignItems: "flex-start",
});

export const NotificationIcon = styled("div")<{ type: 'info' | 'success' | 'warning' | 'error' }>(({ type }) => ({
  width: "32px",
  height: "32px",
  borderRadius: "8px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  
  ...(type === 'info' && {
    backgroundColor: "#dbeafe",
    color: "#2563eb",
  }),
  ...(type === 'success' && {
    backgroundColor: "#dcfce7",
    color: "#16a34a",
  }),
  ...(type === 'warning' && {
    backgroundColor: "#fef3c7",
    color: "#d97706",
  }),
  ...(type === 'error' && {
    backgroundColor: "#fee2e2",
    color: "#dc2626",
  }),
}));

export const NotificationText = styled("div")({
  flex: 1,
});

export const NotificationTitle = styled("div")({
  fontSize: "14px",
  fontWeight: 600,
  color: "#0f172a",
  marginBottom: "2px",
  lineHeight: 1.3,
});

export const NotificationMessage = styled("div")({
  fontSize: "13px",
  color: "#64748b",
  lineHeight: 1.4,
  marginBottom: "4px",
});

export const NotificationTime = styled("div")({
  fontSize: "12px",
  color: "#94a3b8",
  fontWeight: 500,
});

export const NotificationAction = styled("button")({
  fontSize: "12px",
  color: "#6366f1",
  background: "none",
  border: "none",
  cursor: "pointer",
  fontWeight: 500,
  padding: "2px 0",
  marginTop: "4px",

  "&:hover": {
    textDecoration: "underline",
  },
});

export const EmptyNotifications = styled("div")({
  padding: "40px 20px",
  textAlign: "center",
  color: "#64748b",
});

export const NotificationsContainer = styled("div")({
  position: "relative",
});