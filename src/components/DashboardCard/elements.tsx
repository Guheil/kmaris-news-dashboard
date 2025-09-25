import { styled } from "@mui/material/styles";

export const Card = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  borderRadius: "16px",
  padding: "24px",
  boxShadow: `0 4px 12px ${theme.palette.common.black}14`,
  border: `1px solid ${theme.palette.divider}`,
  transition: "all 0.2s ease",
  
  "&:hover": {
    boxShadow: `0 8px 24px ${theme.palette.common.black}1F`,
    transform: "translateY(-2px)",
  },
  
  [theme.breakpoints.down("md")]: {
    padding: "20px",
  },
}));

export const CardHeader = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "20px",
}));

export const CardTitle = styled("h2")(({ theme }) => ({
  fontSize: "18px",
  fontWeight: 600,
  color: theme.palette.text.primary,
  margin: 0,
  letterSpacing: "-0.3px",
}));

export const CardContent = styled("div")(({ theme }) => ({
  width: "100%",
}));