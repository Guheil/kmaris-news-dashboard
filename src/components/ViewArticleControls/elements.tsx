import { styled } from "@mui/material/styles";

export const BackButton = styled("button")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "8px",
  padding: "10px 16px",
  borderRadius: "8px",
  border: `1px solid ${theme.palette.divider}`,
  backgroundColor: "transparent",
  color: theme.palette.grey[600],
  fontSize: "14px",
  fontWeight: 500,
  cursor: "pointer",
  marginBottom: "24px",
  transition: "all 0.2s ease",
  "&:hover": {
    backgroundColor: theme.palette.grey[50],
    borderColor: theme.palette.grey[400],
    color: theme.palette.grey[700],
  },
}));

export const ArticleActions = styled("div")(({ theme }) => ({
  display: "flex",
  gap: "12px",
  alignItems: "center",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "stretch",
  },
}));

export const ActionButton = styled("button")<{
  variant?: "edit" | "archive" | "share";
  disabled?: boolean;
}>(({ theme, variant = "edit", disabled }) => ({
  padding: "10px 16px",
  borderRadius: "8px",
  border: "none",
  cursor: disabled ? "not-allowed" : "pointer",
  display: "flex",
  alignItems: "center",
  gap: "8px",
  fontSize: "14px",
  fontWeight: 500,
  transition: "all 0.2s ease",
  opacity: disabled ? 0.6 : 1,
  ...(variant === "edit" && {
    backgroundColor: `${theme.palette.primary.main}15`,
    color: theme.palette.primary.main,
    "&:hover": !disabled && {
      backgroundColor: `${theme.palette.primary.main}25`,
      transform: "translateY(-1px)",
    },
  }),
  ...(variant === "archive" && {
    backgroundColor: theme.palette.warning.light,
    color: theme.palette.warning.main,
    "&:hover": !disabled && {
      backgroundColor: `${theme.palette.warning.main}CC`,
      transform: "translateY(-1px)",
    },
  }),
  ...(variant === "share" && {
    backgroundColor: theme.palette.grey[100],
    color: theme.palette.grey[600],
    "&:hover": !disabled && {
      backgroundColor: theme.palette.grey[200],
      color: theme.palette.grey[700],
      transform: "translateY(-1px)",
    },
  }),
}));