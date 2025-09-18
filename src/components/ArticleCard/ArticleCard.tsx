"use client";

import React from "react";
import Image from "next/image";
import { ArticleCardProps } from "./interface";
import {
  FeaturedArticleRoot, FeaturedTitle, FeaturedMeta, FeaturedCategory, FeaturedImageWrapper,
  ListItemRoot, ListItemTextContent, ListItemTitle, ListItemSummary, ListItemMeta, ListItemCategory, ListItemImageWrapper,
  GridCardRoot, GridCardOverlay, GridCardTitle, GridCardMeta, GridCardCategory
} from "./elements";

export function ArticleCard({ article, variant, truncate = true }: ArticleCardProps) {
  if (variant === 'featured') {
    return (
      <FeaturedArticleRoot href={`/News/${article.id}`}>
        <div>
          <FeaturedTitle>{article.title}</FeaturedTitle>
          <FeaturedMeta>
            <FeaturedCategory>{article.category}</FeaturedCategory>
            <span>|</span>
            <span>{article.readTime}</span>
          </FeaturedMeta>
        </div>
        <FeaturedImageWrapper>
          <Image src={article.imageUrl} alt={article.title} fill style={{ objectFit: 'cover' }} />
        </FeaturedImageWrapper>
      </FeaturedArticleRoot>
    );
  }
  if (variant === 'list') {

    const truncatedSummary = truncate && article.summary
      ? article.summary.split(' ').slice(0, 20).join(' ') + (article.summary.split(' ').length > 20 ? '...' : '')
      : article.summary;

    return (
      <ListItemRoot href={`/News/${article.id}`}>
        <ListItemTextContent>
          <ListItemTitle>{article.title}</ListItemTitle>
          {truncatedSummary && <ListItemSummary>{truncatedSummary}</ListItemSummary>}
          <ListItemMeta>
            <ListItemCategory>{article.category}</ListItemCategory>
            <span>|</span>
            <span>{article.readTime}</span>
          </ListItemMeta>
        </ListItemTextContent>
        <ListItemImageWrapper>
          <Image src={article.imageUrl} alt={article.title} fill style={{ objectFit: 'cover' }} />
        </ListItemImageWrapper>
      </ListItemRoot>
    );
  }
  if (variant === 'grid') {
    return (
      <GridCardRoot href={`/News/${article.id}`}>
        <Image src={article.imageUrl} alt={article.title} fill style={{ objectFit: 'cover' }} />
        <GridCardOverlay>
          <GridCardTitle>{article.title}</GridCardTitle>
          <GridCardMeta>
            <GridCardCategory>{article.category}</GridCardCategory>
            <span>|</span>
            <span>{article.readTime}</span>
          </GridCardMeta>
        </GridCardOverlay>
      </GridCardRoot>
    );
  }
  return null;
}
