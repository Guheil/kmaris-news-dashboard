import { styled } from "@mui/material/styles";

export const ArticleContent = styled("div")(({ theme }) => ({
  lineHeight: 1.7,
}));

export const ArticleDescription = styled("div")(({ theme }) => ({
  fontSize: "16px",
  color: theme.palette.grey[700],
  lineHeight: 1.7,
  whiteSpace: "pre-wrap",
  [theme.breakpoints.down("md")]: {
    fontSize: "15px",
  },
}));