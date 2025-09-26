// LoadingState.tsx
"use client";

import React from "react";
import { LoadingContainer, LoadingSpinner, LoadingText, LoadingCard } from "./elements";
import { LoadingStateProps } from "./interface";

export const LoadingState: React.FC<LoadingStateProps> = ({ 
  message = "Loading...",
  height = "400px" 
}) => {
  return (
    <LoadingContainer height={height}>
      <LoadingCard>
        <LoadingSpinner size={32} />
        <LoadingText>{message}</LoadingText>
      </LoadingCard>
    </LoadingContainer>
  );
};