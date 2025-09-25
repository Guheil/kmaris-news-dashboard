import { styled } from "@mui/material/styles";

export const ViewArticleRoot = styled("div")(({ theme }) => ({
  display: "flex",
  minHeight: "100vh",
  backgroundColor: theme.palette.grey[50],
  position: "relative",
}));

export const MainContent = styled("main")<{ sidebarOpen: boolean; isMobile: boolean }>(
  ({ theme, sidebarOpen, isMobile }) => ({
    flex: 1,
    padding: "84px 20px 20px",
    marginLeft: isMobile ? 0 : sidebarOpen ? "280px" : "80px",
    transition: "margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    minWidth: 0,
    [theme.breakpoints.down("md")]: {
      marginLeft: 0,
      padding: "74px 16px 16px",
    },
  })
);

export const SidebarOverlay = styled("div")<{ show: boolean }>(
  ({ theme, show }) => ({
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: `${theme.palette.common.black}80`,
    zIndex: 999,
    opacity: show ? 1 : 0,
    visibility: show ? "visible" : "hidden",
    transition: "all 0.3s ease",
    backdropFilter: "blur(4px)",
  })
);

export const ArticleContainer = styled("div")(({ theme }) => ({
  maxWidth: "900px",
  margin: "0 auto",
  backgroundColor: theme.palette.common.white,
  borderRadius: "16px",
  padding: "32px",
  boxShadow: `0 4px 16px ${theme.palette.common.black}14`,
  border: `1px solid ${theme.palette.divider}`,
  [theme.breakpoints.down("md")]: {
    padding: "24px",
    margin: "0",
    borderRadius: "12px",
  },
  [theme.breakpoints.down("sm")]: {
    padding: "20px",
  },
}));