import { styled, keyframes } from "@mui/material/styles";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const LoadingContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "80px 24px",
  color: theme.palette.grey[600],
  gap: "16px",
}));

export const LoadingSpinner = styled("div")(({ theme }) => ({
  width: "40px",
  height: "40px",
  border: `3px solid ${theme.palette.grey[100]}`,
  borderTop: `3px solid ${theme.palette.primary.main}`,
  borderRadius: "50%",
  animation: `${spin} 1s linear infinite`,
}));