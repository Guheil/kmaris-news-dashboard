import { styled } from "@mui/material/styles";

export const ActivityItem = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "12px",
  padding: "12px 0",
  borderBottom: `1px solid ${theme.palette.grey[50]}`,

  "&:last-child": {
    borderBottom: "none",
  },
}));

export const ActivityIcon = styled("div")<{ color: string }>(({ theme, color }) => ({
  width: "32px",
  height: "32px",
  borderRadius: "8px",
  backgroundColor: `${color}15`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: color,
  flexShrink: 0,
}));

export const ActivityContent = styled("div")(({ theme }) => ({
  flex: 1,
  minWidth: 0,
}));

export const ActivityText = styled("div")(({ theme }) => ({
  fontSize: "14px",
  color: theme.palette.text.primary,
  fontWeight: 500,
  marginBottom: "2px",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap" as const,
}));

export const ActivityTime = styled("div")(({ theme }) => ({
  fontSize: "12px",
  color: theme.palette.grey[600],
}));

export const NoResultsText = styled("p")(({ theme }) => ({
  fontSize: "14px",
  color: theme.palette.grey[600],
  margin: 0,
  lineHeight: 1.5,
}));