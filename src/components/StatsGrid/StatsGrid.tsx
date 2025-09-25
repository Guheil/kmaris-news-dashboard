import { FC } from "react";
import { FileText, Tag, TrendingUp, Users } from "lucide-react";
import { StatsGridProps } from "./interface";
import { StatsGridRoot, StatCard, StatIcon, StatNumber, StatLabel } from "./elements";
import { palette } from "@/theme/palette";

export const StatsGrid: FC<StatsGridProps> = ({
  totalArticles,
  totalCategories,
  uniqueCategories,
  averageViews,
  mostPopularCategory,
  searchQuery,
}) => {
  return (
    <StatsGridRoot>
      <StatCard>
        <StatIcon color="#3b82f6">
          <FileText size={20} />
        </StatIcon>
        <StatNumber>{totalArticles}</StatNumber>
        <StatLabel>
          {searchQuery ? "Articles Found" : "Total Articles"}
        </StatLabel>
      </StatCard>
      <StatCard>
        <StatIcon color="#8b5cf6">
          <Tag size={20} />
        </StatIcon>
        <StatNumber>
          {searchQuery ? uniqueCategories : totalCategories}
        </StatNumber>
        <StatLabel>
          {searchQuery ? "Categories Found" : "Total Categories"}
        </StatLabel>
      </StatCard>
      <StatCard>
        <StatIcon color="#f59e0b">
          <TrendingUp size={20} />
        </StatIcon>
        <StatNumber>
          {averageViews >= 1000
            ? `${(averageViews / 1000).toFixed(1)}k`
            : averageViews.toFixed(1)}
        </StatNumber>
        <StatLabel>Average Views</StatLabel>
      </StatCard>
      <StatCard>
        <StatIcon color="#8b5cf6">
          <Users size={20} />
        </StatIcon>
        <StatNumber
          style={{
            fontSize: mostPopularCategory.length > 10 ? "20px" : "28px",
          }}
        >
          {mostPopularCategory}
        </StatNumber>
        <StatLabel>Top Category</StatLabel>
      </StatCard>
    </StatsGridRoot>
  );
};