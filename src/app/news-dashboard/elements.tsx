"use client";

import { styled } from "@mui/material/styles";
import { palette } from "@/theme/pallete";

// Added: Utility function for dynamic category colors (from your provided code)
const getCategoryColor = (categoryName: string) => {
  const colors = [
    { bg: '#dbeafe', text: '#1d4ed8' }, // Blue
    { bg: '#dcfce7', text: '#166534' }, // Green
    { bg: '#fef3c7', text: '#92400e' }, // Yellow
    { bg: '#ede9fe', text: '#7c3aed' }, // Purple
    { bg: '#fef2f2', text: '#dc2626' }, // Red
    { bg: '#ecfdf5', text: '#059669' }, // Emerald
    { bg: '#fff7ed', text: '#c2410c' }, // Orange
    { bg: '#f0f9ff', text: '#0284c7' }, // Sky
    { bg: '#fdf2f8', text: '#be185d' }, // Pink
    { bg: '#f5f3ff', text: '#6d28d9' }, // Violet
    { bg: '#ecfccb', text: '#365314' }, // Lime
    { bg: '#fefce8', text: '#a16207' }, // Amber
    { bg: '#f0fdfa', text: '#047857' }, // Teal
    { bg: '#fdf4ff', text: '#a21caf' }, // Fuchsia
    { bg: '#f8fafc', text: '#475569' }, // Slate (default/fallback)
  ];

  // Generate a hash from category name to consistently assign colors
  let hash = 0;
  for (let i = 0; i < categoryName.length; i++) {
    const char = categoryName.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  
  const index = Math.abs(hash) % colors.length;
  return colors[index];
};

export const DashboardRoot = styled("div")({
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
    minWidth: 0, // Prevents overflow issues
    
    [theme.breakpoints.down('md')]: {
      marginLeft: 0,
      padding: "74px 16px 16px",
    },
  })
);

// Updated: More responsive dashboard grid
export const DashboardGrid = styled("div")(({ theme }) => ({
  display: "grid",
  gap: "20px",
  gridTemplateColumns: "repeat(12, 1fr)",
  
  [theme.breakpoints.down('lg')]: {
    gridTemplateColumns: "repeat(8, 1fr)",
  },
  
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: "1fr",
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
  
  [theme.breakpoints.down('md')]: {
    padding: "20px",
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
  
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: '1fr',
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

// Updated: Responsive news table with horizontal scroll
export const NewsTable = styled('div')(({ theme }) => ({
  width: '100%',
  overflowX: 'auto',
  
  // Custom scrollbar styling
  '&::-webkit-scrollbar': {
    height: '8px',
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: '#f8fafc',
    borderRadius: '4px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#cbd5e1',
    borderRadius: '4px',
    '&:hover': {
      backgroundColor: '#94a3b8',
    },
  },
}));

// Updated: News table content with minimum width
export const NewsTableContent = styled('div')(({ theme }) => ({
  minWidth: '800px', // Ensures table doesn't collapse below this width
  width: '100%',
  
  [theme.breakpoints.down('sm')]: {
    minWidth: '600px', // Smaller minimum on mobile
  },
}));

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
  minWidth: 0, // Allows text to truncate
});

// Updated: Consistent media preview container
export const MediaPreviewContainer = styled('div')({
  width: '44px',
  height: '44px',
  flexShrink: 0,
  borderRadius: '8px',
  overflow: 'hidden',
  position: 'relative',
  backgroundColor: '#f8fafc',
  border: '1px solid #f1f5f9',
});

// Updated: Consistent image styling
export const NewsImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  display: 'block',
});

// Updated: Consistent placeholder styling
export const MediaPlaceholder = styled('div')<{ type: 'video' | 'document' }>(({ type }) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: type === 'video' ? '#f0f9ff' : '#f8fafc',
  color: type === 'video' ? '#0369a1' : '#64748b',
  position: 'relative',

  // Video play icon overlay
  ...(type === 'video' && {
    '&::after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '16px',
      height: '16px',
      backgroundColor: '#0369a1',
      borderRadius: '50%',
      backgroundImage: `url("data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>')}")`,
      backgroundSize: '8px',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    },
  }),
}));

export const NewsTitleText = styled('div')({
  fontSize: '14px',
  fontWeight: 600,
  color: '#0f172a',
  lineHeight: 1.4,
  overflow: 'hidden',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  marginBottom: '4px',
  minWidth: 0, // Allows proper truncation
});

export const NewsAuthor = styled('div')({
  fontSize: '14px',
  color: '#64748b',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

export const NewsDate = styled('div')({
  fontSize: '14px',
  color: '#64748b',
  whiteSpace: 'nowrap',
});

export const NewsViews = styled('div')({
  fontSize: '14px',
  color: '#64748b',
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  whiteSpace: 'nowrap',
});

// Updated: CategoryBadge now uses dynamic getCategoryColor
export const CategoryBadge = styled('span')<{ category: string }>(({ category }) => {
  const colors = getCategoryColor(category || 'Uncategorized'); // Fallback for empty category
  return {
    padding: '2px 8px',
    borderRadius: '4px',
    fontSize: '11px',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    backgroundColor: colors.bg,
    color: colors.text,
    whiteSpace: 'nowrap',
    display: 'inline-block',
    maxWidth: '120px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  };
});

export const ActionButtons = styled('div')({
  display: 'flex',
  gap: '4px',
  flexShrink: 0,
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
  flexShrink: 0,
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
  flexShrink: 0,
}));

export const ActivityContent = styled('div')({
  flex: 1,
  minWidth: 0, // Allows text to truncate
});

export const ActivityText = styled('div')({
  fontSize: '14px',
  color: '#0f172a',
  fontWeight: 500,
  marginBottom: '2px',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

export const ActivityTime = styled('div')({
  fontSize: '12px',
  color: '#64748b',
});

// New styled components for search functionality
export const SearchResultsHeader = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '16px',
  padding: '12px 0',
  borderBottom: '1px solid #f1f5f9',
  flexWrap: 'wrap',
  gap: '8px',
});

export const SearchResultsCount = styled('div')({
  fontSize: '14px',
  color: '#64748b',
  fontWeight: 500,
});

export const SearchQuery = styled('span')({
  fontWeight: 600,
  color: '#0f172a',
});

export const ClearSearchButton = styled('button')({
  padding: '6px 12px',
  borderRadius: '6px',
  border: '1px solid #e2e8f0',
  backgroundColor: 'transparent',
  color: '#64748b',
  fontSize: '12px',
  cursor: 'pointer',
  fontWeight: 500,
  transition: 'all 0.2s ease',
  whiteSpace: 'nowrap',

  '&:hover': {
    backgroundColor: '#f8fafc',
    borderColor: '#cbd5e1',
  },
});

export const NoResults = styled('div')({
  textAlign: 'center',
  padding: '48px 24px',
  color: '#64748b',
});

export const NoResultsIcon = styled('div')({
  width: '64px',
  height: '64px',
  borderRadius: '50%',
  backgroundColor: '#f1f5f9',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto 16px',
  color: '#94a3b8',
});

export const NoResultsTitle = styled('h3')({
  fontSize: '16px',
  fontWeight: 600,
  color: '#0f172a',
  margin: '0 0 8px',
});

export const NoResultsText = styled('p')({
  fontSize: '14px',
  color: '#64748b',
  margin: 0,
  lineHeight: 1.5,
});