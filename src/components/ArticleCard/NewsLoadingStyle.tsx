"use client";

import { styled, keyframes } from '@mui/material/styles';

// Shimmer animation
export const shimmer = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

// Pulse animation
export const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
`;

// Styled components
export const LoadingContainer = styled('div')(({ theme }) => ({
  maxWidth: '1440px',
  margin: '0 auto',
  padding: theme.spacing(6, 2),
  fontFamily: theme.typography.fontFamily,
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(4, 2),
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(3, 1),
  },
}));

export const SkeletonBase = styled('div')(() => ({
  background: 'linear-gradient(90deg, #f0f0f0 0px, #e0e0e0 40px, #f0f0f0 80px)',
  backgroundSize: '200px',
  animation: `${shimmer} 1.5s infinite linear`,
  borderRadius: '8px',
}));

export const TopLoadingSection = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: theme.spacing(4),
  marginBottom: theme.spacing(6),
  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: '1.2fr 1fr',
    gap: theme.spacing(5),
  },
  [theme.breakpoints.up('lg')]: {
    gridTemplateColumns: '1.5fr 1fr',
  },
}));

export const FeaturedSkeleton = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  [theme.breakpoints.up('md')]: {
    gap: '20px',
  },
}));

export const FeaturedTitleSkeleton = styled(SkeletonBase)(({ theme }) => ({
  height: '36px',
  width: '85%',
  marginBottom: '12px',
  [theme.breakpoints.down('md')]: {
    height: '32px',
  },
  [theme.breakpoints.down('sm')]: {
    height: '28px',
  },
}));

export const FeaturedMetaSkeleton = styled(SkeletonBase)(() => ({
  height: '14px',
  width: '200px',
  marginBottom: '16px',
}));

export const FeaturedImageSkeleton = styled(SkeletonBase)(({ theme }) => ({
  width: '100%',
  height: '300px',
  [theme.breakpoints.up('sm')]: {
    height: '350px',
  },
  [theme.breakpoints.up('md')]: {
    height: '400px',
  },
  [theme.breakpoints.up('lg')]: {
    height: '450px',
  },
  borderRadius: '12px',
}));

export const ListLoadingSkeleton = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  gap: theme.spacing(2),
}));

export const ListItemSkeleton = styled('div')(({ theme }) => ({
  display: 'flex',
  gap: '16px',
  paddingTop: '3rem',
  paddingBottom: '1.5rem',
  borderBottom: `1px solid ${theme.palette.divider}`,
  '&:last-of-type': {
    borderBottom: 'none',
    paddingBottom: 0,
  },
  [theme.breakpoints.down('sm')]: {
    gap: '12px',
    paddingTop: '0.75rem',
    paddingBottom: '1.25rem',
  },
}));

export const ListTextContent = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  gap: '8px',
}));

export const ListTitleSkeleton = styled(SkeletonBase)(() => ({
  height: '18px',
  width: '90%',
}));

export const ListSummarySkeleton = styled(SkeletonBase)(() => ({
  height: '14px',
  width: '100%',
  marginTop: '4px',
}));

export const ListMetaSkeleton = styled(SkeletonBase)(() => ({
  height: '13px',
  width: '150px',
  marginTop: 'auto',
}));

export const ListImageSkeleton = styled(SkeletonBase)(({ theme }) => ({
  width: '120px',
  height: '90px',
  flexShrink: 0,
  borderRadius: '12px',
  [theme.breakpoints.down('sm')]: {
    width: '100px',
    height: '75px',
  },
}));

export const BottomGridSkeleton = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: theme.spacing(3),
  [theme.breakpoints.up('sm')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
  [theme.breakpoints.up('lg')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: theme.spacing(4),
  },
}));

export const GridCardSkeleton = styled(SkeletonBase)(({ theme }) => ({
  width: '100%',
  height: '280px',
  [theme.breakpoints.up('sm')]: {
    height: '320px',
  },
  [theme.breakpoints.up('md')]: {
    height: '350px',
  },
  borderRadius: '12px',
}));

export const SectionDividerSkeleton = styled(SkeletonBase)(({ theme }) => ({
  height: '1px',
  width: '100%',
  margin: `${theme.spacing(6)} 0`,
  [theme.breakpoints.down('sm')]: {
    margin: `${theme.spacing(4)} 0`,
  },
}));

export const SectionTitleSkeleton = styled(SkeletonBase)(({ theme }) => ({
  height: '28px',
  width: '200px',
  margin: `0 0 ${theme.spacing(3)} 0`,
  [theme.breakpoints.down('sm')]: {
    height: '24px',
    margin: `0 0 ${theme.spacing(2)} 0`,
  },
}));

export const LatestGridSkeleton = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: theme.spacing(3),
  [theme.breakpoints.up('sm')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
  [theme.breakpoints.up('md')]: {
    gridTemplateColumns: 'repeat(3, 1fr)',
  },
  [theme.breakpoints.up('lg')]: {
    gridTemplateColumns: 'repeat(4, 1fr)',
  },
}));

export const LatestCardSkeleton = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
}));

export const LatestImageSkeleton = styled(SkeletonBase)(({ theme }) => ({
  width: '100%',
  height: '200px',
  [theme.breakpoints.up('sm')]: {
    height: '180px',
  },
  [theme.breakpoints.up('md')]: {
    height: '160px',
  },
  [theme.breakpoints.up('lg')]: {
    height: '180px',
  },
  borderRadius: '12px',
}));

export const LatestTitleSkeleton = styled(SkeletonBase)(() => ({
  height: '16px',
  width: '85%',
}));

export const LatestMetaSkeleton = styled(SkeletonBase)(() => ({
  height: '14px',
  width: '200px',
  marginBottom: '16px',
}));

export const LoadingText = styled('div')(({ theme }) => ({
  textAlign: 'center',
  fontSize: '16px',
  color: theme.palette.text.secondary,
  fontWeight: 500,
  marginBottom: theme.spacing(1),
}));

export const LoadingDots = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  margin: theme.spacing(4, 0),
  '& span': {
    width: '8px',
    height: '8px',
    backgroundColor: theme.palette.primary.main,
    borderRadius: '50%',
    animation: `${pulse} 1.4s infinite ease-in-out both`,
    '&:nth-of-type(1)': { animationDelay: '-0.32s' },
    '&:nth-of-type(2)': { animationDelay: '-0.16s' },
    '&:nth-of-type(3)': { animationDelay: '0s' },
  },
}));