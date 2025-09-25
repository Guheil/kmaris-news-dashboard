"use client";

import { FC } from "react";
import { SearchResultsHeaderProps } from "./interface";
import {
  SearchResultsHeader,
  SearchResultsCount,
  SearchQuery,
  ClearSearchButton,
} from "./elements";

export const SearchResultsHeaderComponent: FC<SearchResultsHeaderProps> = ({
  count,
  query,
  onClear,
}) => {
  return (
    <SearchResultsHeader>
      <SearchResultsCount>
        {count} result
        {count !== 1 ? "s" : ""} for{" "}
        <SearchQuery>&quot;{query}&quot;</SearchQuery>
      </SearchResultsCount>
      <ClearSearchButton onClick={onClear}>
        Clear Search
      </ClearSearchButton>
    </SearchResultsHeader>
  );
};

export default SearchResultsHeaderComponent;