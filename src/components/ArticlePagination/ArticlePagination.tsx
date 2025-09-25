// src/components/article-pagination/ArticlePagination.tsx
"use client";

import { FC } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ArticlePaginationProps } from "./interface";
import {
  PaginationContainer,
  PaginationButton,
  PaginationInfo,
} from "./elements";

export const ArticlePagination: FC<ArticlePaginationProps> = ({
  pagination,
  onPageChange,
}) => {
  const totalPages = Math.ceil(pagination.totalItems / pagination.itemsPerPage);

  if (totalPages <= 1) return null;

  return (
    <PaginationContainer>
      <PaginationButton
        disabled={pagination.currentPage === 1}
        onClick={() => onPageChange(pagination.currentPage - 1)}
      >
        <ChevronLeft size={16} />
      </PaginationButton>

      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
        let pageNumber;
        if (totalPages <= 5) {
          pageNumber = i + 1;
        } else if (pagination.currentPage <= 3) {
          pageNumber = i + 1;
        } else if (pagination.currentPage >= totalPages - 2) {
          pageNumber = totalPages - 4 + i;
        } else {
          pageNumber = pagination.currentPage - 2 + i;
        }

        return (
          <PaginationButton
            key={pageNumber}
            active={pagination.currentPage === pageNumber}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </PaginationButton>
        );
      })}

      <PaginationButton
        disabled={pagination.currentPage === totalPages}
        onClick={() => onPageChange(pagination.currentPage + 1)}
      >
        <ChevronRight size={16} />
      </PaginationButton>

      <PaginationInfo>
        Showing{" "}
        {(pagination.currentPage - 1) * pagination.itemsPerPage + 1}{" "}
        to{" "}
        {Math.min(
          pagination.currentPage * pagination.itemsPerPage,
          pagination.totalItems
        )}{" "}
        of {pagination.totalItems} articles
      </PaginationInfo>
    </PaginationContainer>
  );
};

export default ArticlePagination;