"use client";

export interface SearchResultsHeaderProps {
  count: number;
  query: string;
  onClear: () => void;
}