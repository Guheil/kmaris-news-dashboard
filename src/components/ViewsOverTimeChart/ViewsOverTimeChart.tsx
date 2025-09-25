"use client";

import React from "react";
import dynamic from "next/dynamic";
import { palette } from "@/theme/palette";
import { ChartCard, ChartTitle } from "./elements";
import { ViewsOverTimeChartProps } from "./interface";

const LineChart = dynamic(() => import("recharts").then((mod) => mod.LineChart), {
  ssr: false,
});
const Line = dynamic(() => import("recharts").then((mod) => mod.Line), {
  ssr: false,
});
const XAxis = dynamic(() => import("recharts").then((mod) => mod.XAxis), {
  ssr: false,
});
const YAxis = dynamic(() => import("recharts").then((mod) => mod.YAxis), {
  ssr: false,
});
const CartesianGrid = dynamic(
  () => import("recharts").then((mod) => mod.CartesianGrid),
  { ssr: false }
);
const Tooltip = dynamic(() => import("recharts").then((mod) => mod.Tooltip), {
  ssr: false,
});
const ResponsiveContainer = dynamic(
  () => import("recharts").then((mod) => mod.ResponsiveContainer),
  { ssr: false }
);

export const ViewsOverTimeChart: React.FC<ViewsOverTimeChartProps> = ({
  viewsOverTime,
}) => {
  return (
    <ChartCard style={{ marginBottom: "32px" }}>
      <ChartTitle>Views Over Time (Last 30 Days)</ChartTitle>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={viewsOverTime}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 12, fill: "#64748b" }}
            axisLine={{ stroke: "#e2e8f0" }}
          />
          <YAxis
            tick={{ fontSize: 12, fill: "#64748b" }}
            axisLine={{ stroke: "#e2e8f0" }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          />
          <Line
            type="monotone"
            dataKey="views"
            stroke={palette.primary.main}
            strokeWidth={2}
            dot={{ fill: palette.primary.main, strokeWidth: 2, r: 4 }}
            activeDot={{
              r: 6,
              stroke: palette.primary.main,
              strokeWidth: 2,
              fill: "#ffffff",
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};

export default ViewsOverTimeChart;