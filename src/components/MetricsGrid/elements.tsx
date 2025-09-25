"use client";

import { styled } from "@mui/material/styles";
import type { Palette, Theme } from "@mui/material/styles";

const getMetricIconColor = (variant: string = "default") => {
  const colors = [
    { bg: "primary.main", text: "common.white" },
    { bg: "success.light", text: "success.dark" },
    { bg: "info.light", text: "info.dark" },
    { bg: "warning.light", text: "warning.dark" },
  ];

  const variantMap: { [key: string]: number } = {
    total: 0,
    published: 1,
    views: 2,
    archived: 3,
    default: 0,
  };

  const index = variantMap[variant] !== undefined ? variantMap[variant] : 0;
  return colors[index];
};

export const MetricsGridRoot = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "24px",
  marginBottom: "32px",

  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr",
    gap: "16px",
  },
}));

export const MetricCard = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  borderRadius: "16px",
  padding: "24px",
  boxShadow: `0 4px 12px ${theme.palette.common.black}14`,
  border: `1px solid ${theme.palette.border.light}`,
  transition: "all 0.3s ease",

  "&:hover": {
    boxShadow: `0 8px 24px ${theme.palette.common.black}1F`,
    transform: "translateY(-4px)",
  },
}));

export const MetricHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  marginBottom: "16px",
  gap: "12px",
}));

export const MetricIcon = styled("div")<{ variant?: string }>(
  ({ theme, variant = "default" }) => {
    const colors = getMetricIconColor(variant);

    const [bgKey, bgShade] = colors.bg.split(".") as [keyof Palette, string];
    const [textKey, textShade] = colors.text.split(".") as [keyof Palette, string];

    const resolveColor = (key: keyof Palette, shade: string, fallback: string): string => {
      const paletteEntry = theme.palette[key] as Record<string, string> | undefined;
      return paletteEntry && paletteEntry[shade] ? paletteEntry[shade] : fallback;
    };

    const bgColor = resolveColor(bgKey, bgShade, colors.bg);
    const textColor = resolveColor(textKey, textShade, colors.text);

    return {
      width: "48px",
      height: "48px",
      borderRadius: "12px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      backgroundColor: bgColor,
      color: textColor,
    };
  }
);

export const MetricContent = styled("div")(({ theme }) => ({
  flex: 1,
  minWidth: 0,
}));

export const MetricValue = styled("div")(({ theme }) => ({
  fontSize: "28px",
  fontWeight: 700,
  color: theme.palette.navy.main,
  marginBottom: "4px",
  lineHeight: 1.2,
}));

export const MetricLabel = styled("div")(({ theme }) => ({
  fontSize: "14px",
  color: theme.palette.grey[600],
  fontWeight: 500,
  marginBottom: "8px",
}));

export const MetricChange = styled("div")<{
  type?: "positive" | "negative" | "neutral";
}>(({ theme, type }) => ({
  display: "flex",
  alignItems: "center",
  gap: "4px",
  fontSize: "14px",
  fontWeight: 500,
  color:
    type === "positive"
      ? theme.palette.success.main
      : type === "negative"
      ? theme.palette.error.main
      : theme.palette.grey[600],
}));