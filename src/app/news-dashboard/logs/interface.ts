"use client"

export interface LogsProps {
  sidebarOpen: boolean;
  onSidebarToggle: () => void;
  isMobile?: boolean;
}

export interface LogEntry {
  id: string;
  articleTitle: string;
  actionType: "published" | "updated" | "archived" | "restored" | "permanently deleted";
  user: string;
  timestamp: string;
  articleId?: string;
}

export interface FilterState {
  actionType: string;
  dateRange: string;
  user: string;
}

export interface LogsStats {
  total: number;
  published: number;
  updated: number;
  archived: number;
  restored: number;
  permanentlyDeleted: number;
}