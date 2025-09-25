import { styled } from "@mui/material/styles";
import { Theme as MUITheme } from "@mui/material/styles";

export const StatsGridRoot = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "16px",
  paddingTop: "1rem",
  marginBottom: "24px",

  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "repeat(2, 1fr)",
  },
  
  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "1fr",
  },
}));

export const StatCard = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  padding: "20px",
  borderRadius: "12px",
  border: `1px solid ${theme.palette.grey[100]}`,
  display: "flex",
  flexDirection: "column",
  gap: "8px",
}));

export const StatNumber = styled("div")(({ theme }) => ({
  fontSize: "28px",
  fontWeight: 700,
  color: theme.palette.text.primary,
  lineHeight: 1,
}));

export const StatLabel = styled("div")(({ theme }) => ({
  fontSize: "14px",
  color: theme.palette.grey[600],
  fontWeight: 500,
}));

export const StatIcon = styled("div")<{ color: string }>(({ theme, color }) => ({
  width: "40px",
  height: "40px",
  borderRadius: "10px",
  backgroundColor: `${color}15`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: color,
  marginBottom: "8px",
}));