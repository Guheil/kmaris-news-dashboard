"use client";

import { FC } from "react";
import { ViewArticleContentProps } from "./interface";
import { ArticleContent, ArticleDescription } from "./elements";

export const ViewArticleContent: FC<ViewArticleContentProps> = ({ description }) => {
  return (
    <ArticleContent>
      <ArticleDescription>{description}</ArticleDescription>
    </ArticleContent>
  );
};

export default ViewArticleContent;