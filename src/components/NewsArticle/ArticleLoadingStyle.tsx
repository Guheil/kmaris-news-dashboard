"use client";

import { styled } from '@mui/material/styles';
import { SkeletonBase } from '@/components/ArticleCard/NewsLoadingStyle';

// Override LoadingContainer specifically for article loading to ensure proper background
export const ArticleLoadingContainer = styled('div')(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  overflow: 'auto',
  zIndex: 1000,
}));

export const ArticleLoadingContent = styled('div')(({ theme }) => ({
  maxWidth: '1440px',
  margin: '0 auto',
  padding: theme.spacing(6, 2),
  fontFamily: theme.typography.fontFamily,
  minHeight: '100vh',
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(4, 2),
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(3, 1),
  },
}));

// Main article loading wrapper - matches your article layout
export const ArticleLoadingWrapper = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: theme.spacing(6),
  [theme.breakpoints.up('lg')]: {
    gridTemplateColumns: '2fr 1fr',
  },
}));

// Breadcrumb loading skeleton
export const BreadcrumbLoadingSkeleton = styled(SkeletonBase)(({ theme }) => ({
  height: '14px',
  width: '300px',
  marginBottom: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    width: '250px',
  },
}));

// Article title loading skeleton
export const ArticleTitleLoadingSkeleton = styled(SkeletonBase)(({ theme }) => ({
  height: '36px',
  width: '90%',
  marginBottom: theme.spacing(3),
  [theme.breakpoints.down('md')]: {
    height: '32px',
    width: '95%',
  },
  [theme.breakpoints.down('sm')]: {
    height: '28px',
    width: '100%',
  },
}));

// Article image loading skeleton
export const ArticleImageLoadingSkeleton = styled(SkeletonBase)(({ theme }) => ({
  width: '100%',
  aspectRatio: '16/9',
  borderRadius: '12px',
  margin: '24px 0',
  [theme.breakpoints.down('sm')]: {
    margin: '16px 0',
  },
}));

// Article body loading skeleton container
export const ArticleBodyLoadingSkeleton = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  marginTop: theme.spacing(2),
}));

// Individual article body line skeleton
export const ArticleBodyLineSkeleton = styled(SkeletonBase)(() => ({
  height: '18px',
  width: '100%',
}));

// Sidebar loading wrapper
export const SidebarLoadingWrapper = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

// Sidebar title loading skeleton
export const SidebarTitleLoadingSkeleton = styled(SkeletonBase)(({ theme }) => ({
  height: '20px',
  width: '150px',
  marginBottom: theme.spacing(3),
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: '-8px',
    left: 0,
    width: '60px',
    height: '2px',
    backgroundColor: theme.palette.primary.main,
    opacity: 0.3,
  },
}));

// Related articles container skeleton
export const RelatedArticleLoadingSkeleton = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
}));

// Individual related article item skeleton
export const RelatedArticleItemSkeleton = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: '12px',
  padding: theme.spacing(2),
  borderRadius: '8px',
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor: theme.palette.background.paper,
}));

// Related article image skeleton
export const RelatedArticleImageSkeleton = styled(SkeletonBase)(() => ({
  width: '80px',
  height: '60px',
  borderRadius: '8px',
  flexShrink: 0,
}));

// Related article content wrapper
export const RelatedArticleContentSkeleton = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  gap: '8px',
  justifyContent: 'space-between',
}));

// Related article title skeleton
export const RelatedArticleTitleSkeleton = styled(SkeletonBase)(() => ({
  height: '14px',
  width: '100%',
}));

// Related article meta skeleton
export const RelatedArticleMetaSkeleton = styled(SkeletonBase)(() => ({
  height: '12px',
  width: '100px',
  marginTop: 'auto',
}));