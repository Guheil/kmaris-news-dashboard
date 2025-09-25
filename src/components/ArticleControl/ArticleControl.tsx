
"use client";

import { FC } from "react";
import { Grid3X3, List } from "lucide-react";
import { ArticleControlsProps } from "./interface";
import {
  ControlsContainer,
  FiltersContainer,
  FilterSelect,
  SortContainer,
  ViewToggle,
  ViewToggleButton,
} from "./elements";

export const ArticleControls: FC<ArticleControlsProps> = ({
  availableCategories,
  filters,
  onFilterChange,
  sortOptions,
  onSortChange,
  viewMode,
  onViewModeChange,
}) => {
  return (
    <ControlsContainer>
      <FiltersContainer>
        <FilterSelect
          value={filters.category}
          onChange={(e) =>
            onFilterChange("category", e.target.value)
          }
        >
          <option value="all">All Categories</option>
          {availableCategories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.categoryName}
            </option>
          ))}
        </FilterSelect>

        <FilterSelect
          value={filters.status}
          onChange={(e) =>
            onFilterChange("status", e.target.value)
          }
        >
          <option value="all">All Status</option>
          <option value="published">Published</option>
          <option value="archived">Archived</option>
        </FilterSelect>
      </FiltersContainer>

      <SortContainer>
        <FilterSelect
          value={`${sortOptions.field}-${sortOptions.direction}`}
          onChange={(e) => {
            const [field, direction] = e.target.value.split("-");
            onSortChange({
              field: field as any, // Type assertion for simplicity; adjust if needed
              direction: direction as any,
            });
          }}
        >
          <option value="date-desc">Newest First</option>
          <option value="date-asc">Oldest First</option>
          <option value="title-asc">Title A-Z</option>
          <option value="title-desc">Title Z-A</option>
          <option value="views-desc">Most Views</option>
          <option value="views-asc">Least Views</option>
          <option value="category-asc">Category A-Z</option>
        </FilterSelect>

        <ViewToggle>
          <ViewToggleButton
            active={viewMode === "grid"}
            onClick={() => onViewModeChange("grid")}
          >
            <Grid3X3 size={16} />
            Grid
          </ViewToggleButton>
          <ViewToggleButton
            active={viewMode === "list"}
            onClick={() => onViewModeChange("list")}
          >
            <List size={16} />
            List
          </ViewToggleButton>
        </ViewToggle>
      </SortContainer>
    </ControlsContainer>
  );
};

export default ArticleControls;