"use client";

import React from "react";
import { FiltersContainer, FilterSelect } from "./elements";
import { FiltersProps } from "./interface";

export const Filters: React.FC<FiltersProps> = ({ timeRange, onTimeRangeChange }) => {
  return (
    <FiltersContainer>
      <div />
      <FilterSelect
        value={timeRange}
        onChange={(e) => onTimeRangeChange(e.target.value)}
      >
        <option value="1m">Last Month</option>
        <option value="3m">Last 3 Months</option>
        <option value="6m">Last 6 Months</option>
        <option value="12m">Last 12 Months</option>
      </FilterSelect>
    </FiltersContainer>
  );
};

export default Filters;