// src/components/article-pagination/interface.ts
"use client";

export interface PaginationOptions {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
}

export interface ArticlePaginationProps {
  pagination: PaginationOptions;
  onPageChange: (page: number) => void;
}