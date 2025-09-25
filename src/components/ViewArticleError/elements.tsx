import { styled } from "@mui/material/styles";

export const ErrorContainer = styled("div")(({ theme }) => ({
  textAlign: "center",
  padding: "80px 24px",
  color: theme.palette.grey[600],
}));

export const ErrorIcon = styled("div")(({ theme }) => ({
  width: "80px",
  height: "80px",
  borderRadius: "50%",
  backgroundColor: theme.palette.error.light,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 auto 24px",
  color: theme.palette.error.main,
}));

export const ErrorTitle = styled("h3")(({ theme }) => ({
  fontSize: "20px",
  fontWeight: 600,
  color: theme.palette.text.primary,
  margin: "0 0 12px",
}));

export const ErrorMessage = styled("p")(({ theme }) => ({
  fontSize: "16px",
  color: theme.palette.grey[600],
  margin: "0 0 24px",
  lineHeight: 1.6,
}));

export const RetryButton = styled("button")(({ theme }) => ({
  padding: "12px 20px",
  borderRadius: "8px",
  border: "none",
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  fontSize: "14px",
  fontWeight: 500,
  cursor: "pointer",
  transition: "all 0.2s ease",
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
    transform: "translateY(-1px)",
  },
}));