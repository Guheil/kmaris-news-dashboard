"use client";

import Link from "next/link";
import Image from "next/image";
import { styled } from "@mui/material/styles";

export const NewsSection = styled("section")(({ theme }) => ({
  width: '100%',
  backgroundColor: theme.palette.background.default,
}));

export const Container = styled("div")(({ theme }) => ({
  maxWidth: '1440px',
  margin: '0 auto',
  padding: theme.spacing(6, 2),
  fontFamily: theme.typography.fontFamily,
}));

export const TopSection = styled("div")(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: theme.spacing(5),
  marginBottom: theme.spacing(6),
  [theme.breakpoints.up('lg')]: {
    gridTemplateColumns: '1.5fr 1fr',
  },
}));

export const ArticleList = styled("div")({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
});

export const BottomGrid = styled("div")(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: theme.spacing(3),
  [theme.breakpoints.up('sm')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
}));

export const SectionDivider = styled("hr")(({ theme }) => ({
  border: 0,
  height: '1px',
  backgroundColor: theme.palette.divider,
  margin: `${theme.spacing(6)} 0`,
}));

export const SectionTitle = styled("h2")(({ theme }) => ({
  fontFamily: 'inherit',
  fontSize: '28px',
  fontWeight: theme.typography.fontWeightBold,
  color: theme.palette.text.primary,
  margin: `0 0 ${theme.spacing(3)} 0`,
}));

export const FeaturedArticleRoot = styled(Link)({
  textDecoration: 'none',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
});

export const FeaturedTitle = styled('h2')(({ theme }) => ({
  fontFamily: 'inherit',
  fontSize: '36px',
  fontWeight: theme.typography.fontWeightBold,
  color: theme.palette.text.primary,
  lineHeight: 1.25,
  margin: '0 0 12px 0',
}));

export const FeaturedMeta = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  fontSize: '14px',
  color: theme.palette.text.secondary,
}));

export const FeaturedCategory = styled('span')(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: theme.typography.fontWeightBold,
}));

export const FeaturedImageWrapper = styled('div')({
  position: 'relative',
  width: '100%',
  aspectRatio: '16 / 9.5',
  borderRadius: '12px',
  overflow: 'hidden',
});

export const ListItemRoot = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  display: 'flex',
  gap: '16px',
  paddingTop: '1rem',
  paddingBottom: '2rem',
  borderBottom: `1px solid ${theme.palette.divider}`,
  '&:last-of-type': {
    borderBottom: 'none',
    paddingBottom: 0,
  },
}));

export const ListItemTextContent = styled('div')({
  display: 'flex',
  flexDirection: 'column',
});

export const ListItemTitle = styled('h3')(({ theme }) => ({
  fontFamily: 'inherit',
  fontSize: '16px',
  fontWeight: theme.typography.fontWeightBold,
  color: theme.palette.text.primary,
  lineHeight: 1.4,
  margin: 0,
}));

export const ListItemSummary = styled('p')<{ truncate?: boolean }>(({ theme, truncate = true }) => ({
  fontSize: '14px',
  color: theme.palette.text.secondary,
  margin: '8px 0',
  lineHeight: 1.5,
  ...(truncate && {
    display: '-webkit-box',
    WebkitLineClamp: 3, // Fixed: Changed from '-webkit-line-clamp'
    WebkitBoxOrient: 'vertical', // Fixed: Changed from '-webkit-box-orient'
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    lineClamp: 3, // Added for modern browser support
  }),
}));

export const ListItemMeta = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  fontSize: '13px',
  color: theme.palette.text.secondary,
  marginTop: 'auto',
}));

export const ListItemCategory = styled('span')(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: theme.typography.fontWeightBold,
}));

export const ListItemImageWrapper = styled('div')({
  position: 'relative',
  width: '120px',
  height: '100%',
  flexShrink: 0,
  borderRadius: '8px',
  overflow: 'hidden',
});

export const GridCardRoot = styled(Link)(({ theme }) => ({
  display: 'block',
  position: 'relative',
  width: '100%',
  aspectRatio: '16 / 10',
  borderRadius: '12px',
  overflow: 'hidden',
  boxShadow: theme.shadows[1],
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[4],
  },
}));

export const GridCardOverlay = styled('div')(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  padding: theme.spacing(2),
  color: theme.palette.common.white,
  background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)',
}));

export const GridCardTitle = styled('h3')(({ theme }) => ({
  fontFamily: 'inherit',
  fontSize: '18px',
  fontWeight: theme.typography.fontWeightBold,
  lineHeight: 1.3,
  margin: '0 0 8px 0',
}));

export const GridCardMeta = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  marginTop: theme.spacing(1),
  fontSize: '13px',
  opacity: 0.9,
}));

export const GridCardCategory = styled('span')({
  fontWeight: 700,
});

export const LatestArticlesGrid = styled("div")(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: theme.spacing(3),
  overflowX: 'auto',
  [theme.breakpoints.up('sm')]: {
    gridTemplateColumns: 'repeat(4, 1fr)',
  },
}));

export const LatestArticleCardLink = styled(Link)({
  textDecoration: 'none',
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
});

export const LatestImageWrapper = styled("div")({
  position: 'relative',
  width: '100%',
  aspectRatio: '16 / 10',
  borderRadius: '12px',
  overflow: 'hidden',
});

export const AuthorInfo = styled("div")({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

export const Avatar = styled(Image)({
  borderRadius: '50%',
  objectFit: 'cover',
});

export const LatestMetaText = styled("span")(({ theme }) => ({
  fontSize: '13px',
  color: theme.palette.text.secondary,
}));

export const LatestTitle = styled("h3")(({ theme }) => ({
  fontFamily: 'inherit',
  fontSize: '18px',
  fontWeight: theme.typography.fontWeightBold,
  color: theme.palette.text.primary,
  lineHeight: 1.4,
  margin: 0,
}));

export const LatestCategoryMeta = styled(LatestMetaText)({});

export const LatestCategory = styled('span')(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 700,
}));