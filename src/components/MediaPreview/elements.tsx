import { styled } from "@mui/material/styles";

export const MediaPreviewContainer = styled("div")(({ theme }) => ({
  width: "44px",
  height: "44px",
  flexShrink: 0,
  borderRadius: "8px",
  overflow: "hidden",
  position: "relative",
  backgroundColor: theme.palette.grey[50],
  border: `1px solid ${theme.palette.grey[100]}`,
}));

export const NewsImage = styled("img")(({ theme }) => ({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
}));

export const MediaPlaceholder = styled("div")<{ type: "video" | "document" }>(({ theme, type }) => ({
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: type === "video" ? theme.palette.info.light : theme.palette.grey[50],
  color: type === "video" ? theme.palette.info.dark : theme.palette.grey[600],
  position: "relative",

  ...(type === "video" && {
    "&::after": {
      content: '""',
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "16px",
      height: "16px",
      backgroundColor: theme.palette.info.dark,
      borderRadius: "50%",
      backgroundImage: `url("data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>')}")`,
      backgroundSize: "8px",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
    },
  }),
}));