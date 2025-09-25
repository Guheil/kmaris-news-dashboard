"use client";

import React from "react";
import dynamic from "next/dynamic";
import { palette } from "@/theme/palette";
import { ChartCard, ChartTitle } from "./elements";
import { StatusDistributionChartProps } from "./interface";

const PieChart = dynamic(() => import("recharts").then((mod) => mod.PieChart), {
  ssr: false,
});
const Pie = dynamic(() => import("recharts").then((mod) => mod.Pie), {
  ssr: false,
});
const Tooltip = dynamic(() => import("recharts").then((mod) => mod.Tooltip), {
  ssr: false,
});
const ResponsiveContainer = dynamic(
  () => import("recharts").then((mod) => mod.ResponsiveContainer),
  { ssr: false }
);

export const StatusDistributionChart: React.FC<StatusDistributionChartProps> = ({
  statusDistribution,
}) => {
  return (
    <ChartCard>
      <ChartTitle>Status Distribution</ChartTitle>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={statusDistribution.map((item, index) => ({
              ...item,
              fill: [palette.success.main, palette.error.main][index] || palette.primary.main,
            }))}
            cx="50%"
            cy="50%"
            outerRadius={100}
            dataKey="value"
             label={({
                name,
                percent,
                }: {
                name?: string;
                percent?: number;
                }) => {
                if (name && percent !== undefined) {
                    return `${name} ${(percent * 100).toFixed(0)}%`;
                }
                return "";
                    }}
                />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};

export default StatusDistributionChart;