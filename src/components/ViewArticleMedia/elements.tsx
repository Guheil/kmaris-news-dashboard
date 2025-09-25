import { styled } from "@mui/material/styles";

export const ArticleMediaContainer = styled("div")(({ theme }) => ({
  marginBottom: "32px",
  borderRadius: "12px",
  overflow: "hidden",
  [theme.breakpoints.down("md")]: {
    marginBottom: "24px",
  },
}));

export const ArticleImage = styled("div")<{ backgroundImage?: string }>(({ theme, backgroundImage }) => ({
  width: "100%",
  height: "400px",
  backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
  backgroundColor: backgroundImage ? "transparent" : theme.palette.grey[100],
  backgroundSize: "cover",
  backgroundPosition: "center",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.grey[600],
  borderRadius: "12px",
}));

export const ArticleVideo = styled("div")(({ theme }) => ({
  width: "100%",
  height: "400px",
  position: "relative",
  borderRadius: "12px",
  overflow: "hidden",
}));