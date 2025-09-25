"use client";

import { Category } from "@/components/ArticleComponent/interface"; // Shared from article-card for Category

export interface FilterOptions {
  category: string;
  status: string;
  author?: string;
}

export interface SortOptions {
  field: 'date' | 'title' | 'author' | 'views' | 'category';
  direction: 'asc' | 'desc';
}

export type ViewMode = 'grid' | 'list';

export interface ArticleControlsProps {
  availableCategories: Category[];
  filters: FilterOptions;
  onFilterChange: (key: 'category' | 'status', value: string) => void;
  sortOptions: SortOptions;
  onSortChange: (options: SortOptions) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}