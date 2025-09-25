"use client";

import { FC } from "react";
import { ViewArticleHeaderProps } from "./interface";
import {
  ViewArticleHeader as StyledViewArticleHeader,
  ArticleTitle,
  ArticleMeta,
  MetaItem,
  CategoryBadge,
  AuthorName,
} from "./elements";
import { Calendar, User, Eye, Clock } from "lucide-react";

export const ViewArticleHeader: FC<ViewArticleHeaderProps> = ({
  title,
  date,
  author,
  views,
  readTime,
  status,
  formatDate,
  formatViews,
}) => {
  return (
    <StyledViewArticleHeader>
      <ArticleTitle>{title}</ArticleTitle>
      <ArticleMeta>
        <MetaItem>
          <Calendar size={16} />
          {formatDate(date)}
        </MetaItem>
        <MetaItem>
          <User size={16} />
          <AuthorName>{author}</AuthorName>
        </MetaItem>
        {views !== undefined && (
          <MetaItem>
            <Eye size={16} />
            {formatViews(views)} views
          </MetaItem>
        )}
        {readTime && (
          <MetaItem>
            <Clock size={16} />
            {readTime}
          </MetaItem>
        )}
        {status && (
          <CategoryBadge category={`status-${status}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </CategoryBadge>
        )}
      </ArticleMeta>
    </StyledViewArticleHeader>
  );
};

export default ViewArticleHeader;