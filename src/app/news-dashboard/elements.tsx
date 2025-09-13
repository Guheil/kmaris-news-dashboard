"use client";

import { styled } from "@mui/material/styles";
import { palette } from "@/theme/pallete";

export const DashboardRoot = styled("div")(({ theme }) => ({
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
    minWidth: 0, // Prevents overflow issues
    
    [theme.breakpoints.down('md')]: {
      marginLeft: 0,
      padding: "74px 16px 16px",
    },
  })
);

export const DashboardGrid = styled("div")(({ theme }) => ({
  display: "grid",
  gap: "20px",
  gridTemplateColumns: "repeat(12, 1fr)",
  
  [theme.breakpoints.down('lg')]: {
    gridTemplateColumns: "repeat(8, 1fr)",
  },
  
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "16px",
  },
}));

export const Card = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  borderRadius: "16px",
  padding: "24px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  border: "1px solid rgba(0,0,0,0.05)",
  transition: "all 0.2s ease",
  
  "&:hover": {
    boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
    transform: "translateY(-2px)",
  },
}));

export const CardHeader = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "20px",
});

export const CardTitle = styled("h2")({
  fontSize: "18px",
  fontWeight: 600,
  color: "#1a1a1a",
  margin: 0,
  letterSpacing: "-0.3px",
});

export const CardContent = styled("div")({
  width: "100%",
});

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
// Styled components for news content
export const StatsGrid = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: '16px',
  marginBottom: '24px',

  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
}));

export const StatCard = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  padding: '20px',
  borderRadius: '12px',
  border: '1px solid #f1f5f9',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
}));

export const StatNumber = styled('div')({
  fontSize: '28px',
  fontWeight: 700,
  color: '#0f172a',
  lineHeight: 1,
});

export const StatLabel = styled('div')({
  fontSize: '14px',
  color: '#64748b',
  fontWeight: 500,
});

export const StatIcon = styled('div')<{ color: string }>(({ color }) => ({
  width: '40px',
  height: '40px',
  borderRadius: '10px',
  backgroundColor: `${color}15`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: color,
  marginBottom: '8px',
}));

export const NewsTable = styled('div')({
  width: '100%',
});

export const NewsTableHeader = styled('div')({
  display: 'grid',
  gridTemplateColumns: '2fr 1fr 1fr 1fr 120px',
  gap: '16px',
  padding: '12px 0',
  borderBottom: '1px solid #f1f5f9',
  fontSize: '12px',
  fontWeight: 600,
  color: '#64748b',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
});

export const NewsTableRow = styled('div')({
  display: 'grid',
  gridTemplateColumns: '2fr 1fr 1fr 1fr 120px',
  gap: '16px',
  padding: '16px 0',
  borderBottom: '1px solid #f8fafc',
  alignItems: 'center',
  transition: 'all 0.2s ease',

  '&:hover': {
    backgroundColor: '#f8fafc',
  },
});

export const NewsTitle = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
});

export const NewsImage = styled('img')({
  width: '48px',
  height: '48px',
  borderRadius: '8px',
  objectFit: 'cover',
});

export const NewsTitleText = styled('div')({
  fontSize: '14px',
  fontWeight: 600,
  color: '#0f172a',
  lineHeight: 1.4,
  overflow: 'hidden',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
});

export const NewsAuthor = styled('div')({
  fontSize: '14px',
  color: '#64748b',
});

export const NewsDate = styled('div')({
  fontSize: '14px',
  color: '#64748b',
});

export const NewsViews = styled('div')({
  fontSize: '14px',
  color: '#64748b',
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
});

export const StatusBadge = styled('span')<{ status: string }>(({ status }) => ({
  padding: '4px 8px',
  borderRadius: '6px',
  fontSize: '11px',
  fontWeight: 600,
  textTransform: 'uppercase',
  ...(status === 'published' && {
    backgroundColor: '#dcfce7',
    color: '#166534',
  }),
  ...(status === 'draft' && {
    backgroundColor: '#fef3c7',
    color: '#92400e',
  }),
  ...(status === 'archived' && {
    backgroundColor: '#f3f4f6',
    color: '#6b7280',
  }),
}));

export const ActionButtons = styled('div')({
  display: 'flex',
  gap: '4px',
});

export const ActionButton = styled('button')<{ variant?: 'view' | 'edit' | 'delete' }>(({ variant = 'view' }) => ({
  width: '32px',
  height: '32px',
  borderRadius: '6px',
  border: 'none',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'all 0.2s ease',
  ...(variant === 'view' && {
    backgroundColor: '#f1f5f9',
    color: '#64748b',
    '&:hover': {
      backgroundColor: '#e2e8f0',
      color: '#475569',
    },
  }),
  ...(variant === 'edit' && {
    backgroundColor: `${palette.primary.main}15`,
    color: palette.primary.main,
    '&:hover': {
      backgroundColor: `${palette.primary.main}25`,
    },
  }),
  ...(variant === 'delete' && {
    backgroundColor: '#fef2f2',
    color: '#dc2626',
    '&:hover': {
      backgroundColor: '#fee2e2',
    },
  }),
}));

export const QuickActionGrid = styled('div')({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '12px',
});

export const QuickActionButton = styled('button')({
  width: '100%',
  padding: '16px',
  borderRadius: '12px',
  border: 'none',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  backgroundColor: '#f8fafc',
  color: '#334155',
  fontSize: '14px',
  fontWeight: 500,
  transition: 'all 0.2s ease',

  '&:hover': {
    backgroundColor: '#f1f5f9',
    transform: 'translateY(-1px)',
  },
});

export const ActivityItem = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
  padding: '12px 0',
  borderBottom: '1px solid #f8fafc',

  '&:last-child': {
    borderBottom: 'none',
  },
});

export const ActivityIcon = styled('div')<{ color: string }>(({ color }) => ({
  width: '32px',
  height: '32px',
  borderRadius: '8px',
  backgroundColor: `${color}15`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: color,
}));

export const ActivityContent = styled('div')({
  flex: 1,
});

export const ActivityText = styled('div')({
  fontSize: '14px',
  color: '#0f172a',
  fontWeight: 500,
  marginBottom: '2px',
});

export const ActivityTime = styled('div')({
  fontSize: '12px',
  color: '#64748b',
});
