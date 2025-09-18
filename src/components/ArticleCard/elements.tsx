"use client";

import Link from "next/link";
import Image from "next/image";
import { styled } from "@mui/material/styles";
import { palette } from "@/theme/pallete";

export const NewsSection = styled("section")(({ theme }) => ({
  width: '100%',
  backgroundColor: theme.palette.background.default,
}));

export const Container = styled("div")(({ theme }) => ({
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

export const TopSection = styled("div")(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: theme.spacing(4),
  marginBottom: theme.spacing(6),
  width: '100%', // Ensure full width of Container
  [theme.breakpoints.up('lg')]: {
    gridTemplateColumns: '1.5fr 1fr', // Make FeaturedArticleRoot wider than ArticleList
  },
}));

export const ArticleList = styled("div")(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  gap: theme.spacing(2),
  width: '100%', 
}));

export const BottomGrid = styled("div")(({ theme }) => ({
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

export const SectionDivider = styled("hr")(({ theme }) => ({
  border: 0,
  height: '1px',
  backgroundColor: theme.palette.divider,
  margin: `${theme.spacing(6)} 0`,
  [theme.breakpoints.down('sm')]: {
    margin: `${theme.spacing(4)} 0`,
  },
}));

export const SectionTitle = styled("h2")(({ theme }) => ({
  fontFamily: 'inherit',
  fontSize: '28px',
  fontWeight: theme.typography.fontWeightBold,
  color: theme.palette.text.primary,
  margin: `0 0 ${theme.spacing(3)} 0`,
  [theme.breakpoints.down('sm')]: {
    fontSize: '24px',
    margin: `0 0 ${theme.spacing(2)} 0`,
  },
}));

export const FeaturedArticleRoot = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  width: '100%',
  [theme.breakpoints.up('md')]: {
    gap: '20px',
  },
}));

export const FeaturedTitle = styled('h2')(({ theme }) => ({
  fontFamily: 'inherit',
  fontSize: '28px',
  fontWeight: theme.typography.fontWeightBold,
  color: theme.palette.text.primary,
  lineHeight: 1.25,
  margin: '0 0 12px 0',
  [theme.breakpoints.up('sm')]: {
    fontSize: '32px',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '36px',
  },
}));

export const FeaturedMeta = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  fontSize: '14px',
  color: theme.palette.text.secondary,
}));

export const FeaturedCategory = styled('span')(({ theme }) => ({
  color: palette.primary.main,
  fontWeight: theme.typography.fontWeightBold,
}));

export const FeaturedImageWrapper = styled('div')(({ theme }) => ({
  position: 'relative',
  width: '100%',
  maxWidth: '100%',
  height: '300px',
  borderRadius: '12px',
  overflow: 'hidden',
  [theme.breakpoints.up('xs')]: {
    height: '320px',
  },
  [theme.breakpoints.up('sm')]: {
    height: '380px',
  },
  [theme.breakpoints.up('md')]: {
    height: '430px',
  },
  [theme.breakpoints.up('lg')]: {
    height: '480px',
  },
}));

export const ListItemRoot = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  width: '100%',
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
  [theme.breakpoints.up('lg')]: {
    maxWidth: '550px', 
  },
}));

export const ListItemTextContent = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  minWidth: 0, 
});

export const ListItemTitle = styled('h3')(({ theme }) => ({
  fontFamily: 'inherit',
  fontSize: '16px',
  fontWeight: theme.typography.fontWeightBold,
  color: theme.palette.text.primary,
  lineHeight: 1.4,
  margin: 0,
  [theme.breakpoints.up('sm')]: {
    fontSize: '18px',
  },
}));

export const ListItemSummary = styled('p')(({ theme }) => ({
  fontSize: '14px',
  color: theme.palette.text.secondary,
  margin: '8px 0',
  lineHeight: 1.5,
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  [theme.breakpoints.down('sm')]: {
    WebkitLineClamp: 1,
  },
}));

export const ListItemMeta = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  fontSize: '13px',
  color: theme.palette.text.secondary,
  marginTop: 'auto',
  [theme.breakpoints.down('sm')]: {
    fontSize: '12px',
    gap: theme.spacing(1),
  },
}));

export const ListItemCategory = styled('span')(({ theme }) => ({
  color: palette.primary.main,
  fontWeight: theme.typography.fontWeightBold,
}));

export const ListItemImageWrapper = styled('div')(({ theme }) => ({
  position: 'relative',
  width: '25%', 
  height: '90px',
  flexShrink: 0,
  borderRadius: '8px',
  overflow: 'hidden',
  [theme.breakpoints.down('sm')]: {
    width: '25%', 
    height: '75px',
  },
}));

// Grid Card Styles
export const GridCardRoot = styled(Link)(({ theme }) => ({
  display: 'block',
  position: 'relative',
  width: '100%',
  height: '280px',
  borderRadius: '12px',
  overflow: 'hidden',
  boxShadow: theme.shadows[1],
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[4],
  },
  [theme.breakpoints.up('sm')]: {
    height: '320px',
  },
  [theme.breakpoints.up('md')]: {
    height: '350px',
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
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1.5),
  },
}));

export const GridCardTitle = styled('h3')(({ theme }) => ({
  fontFamily: 'inherit',
  fontSize: '16px',
  fontWeight: theme.typography.fontWeightBold,
  lineHeight: 1.3,
  margin: '0 0 8px 0',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  [theme.breakpoints.up('sm')]: {
    fontSize: '18px',
  },
}));

export const GridCardMeta = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  marginTop: theme.spacing(1),
  fontSize: '13px',
  opacity: 0.9,
  [theme.breakpoints.down('sm')]: {
    fontSize: '12px',
    gap: theme.spacing(1),
  },
}));

export const GridCardCategory = styled('span')({
  fontWeight: 700,
});

// Latest Articles Grid
export const LatestArticlesGrid = styled("div")(({ theme }) => ({
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

export const LatestArticleCardLink = styled(Link)({
  textDecoration: 'none',
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  height: 'fit-content',
});

export const LatestImageWrapper = styled("div")(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '300px',
  borderRadius: '12px',
  overflow: 'hidden',
  [theme.breakpoints.up('sm')]: {
    height: '180px',
  },
  [theme.breakpoints.up('md')]: {
    height: '160px',
  },
  [theme.breakpoints.up('lg')]: {
    height: '180px',
  },
}));

export const AuthorInfo = styled("div")(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  flexWrap: 'wrap',
  [theme.breakpoints.down('sm')]: {
    gap: '4px',
  },
}));

export const Avatar = styled(Image)({
  borderRadius: '50%',
  objectFit: 'cover',
});

export const LatestMetaText = styled("span")(({ theme }) => ({
  fontSize: '13px',
  color: theme.palette.text.secondary,
  [theme.breakpoints.down('sm')]: {
    fontSize: '12px',
  },
}));

export const LatestTitle = styled("h3")(({ theme }) => ({
  fontFamily: 'inherit',
  fontSize: '16px',
  fontWeight: theme.typography.fontWeightBold,
  color: theme.palette.text.primary,
  lineHeight: 1.4,
  margin: 0,
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  [theme.breakpoints.up('sm')]: {
    fontSize: '16px',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '15px',
  },
  [theme.breakpoints.up('lg')]: {
    fontSize: '16px',
  },
}));

export const LatestCategoryMeta = styled(LatestMetaText)({});

export const LatestCategory = styled('span')({
  color: palette.primary.main,
  fontWeight: 700,
});