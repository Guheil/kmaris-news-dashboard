"use client";

import { FC } from "react";
import { ViewArticleErrorProps } from "./interface";
import { ErrorContainer, ErrorIcon, ErrorTitle, ErrorMessage, RetryButton } from "./elements";
import { FileText } from "lucide-react";

export const ViewArticleError: FC<ViewArticleErrorProps> = ({ error }) => {
  return (
    <ErrorContainer>
      <ErrorIcon>
        <FileText size={48} />
      </ErrorIcon>
      <ErrorTitle>Error Loading Article</ErrorTitle>
      <ErrorMessage>{error}</ErrorMessage>
      <RetryButton onClick={() => window.location.reload()}>Try Again</RetryButton>
    </ErrorContainer>
  );
};

export default ViewArticleError;