"use client";

import { FC } from "react";
import { LoadingContainer, LoadingSpinner } from "./elements";

export const ViewArticleLoading: FC = () => {
  return (
    <LoadingContainer>
      <LoadingSpinner />
      <div>Loading article...</div>
    </LoadingContainer>
  );
};

export default ViewArticleLoading;