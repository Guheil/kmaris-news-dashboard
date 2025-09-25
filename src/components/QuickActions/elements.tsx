import { styled } from "@mui/material/styles";

export const QuickActionGrid = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: "12px",
}));

export const QuickActionButton = styled("button")(({ theme }) => ({
  width: "100%",
  padding: "16px",
  borderRadius: "12px",
  border: "none",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: "12px",
  backgroundColor: theme.palette.grey[50],
  color: theme.palette.text.primary,
  fontSize: "14px",
  fontWeight: 500,
  transition: "all 0.2s ease",

  "&:hover": {
    backgroundColor: theme.palette.grey[100],
    transform: "translateY(-1px)",
  },
}));