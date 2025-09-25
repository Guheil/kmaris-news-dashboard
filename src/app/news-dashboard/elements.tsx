import { styled } from "@mui/material/styles";

export const DashboardRoot = styled("div")(({ theme }) => ({
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

export const DashboardGrid = styled("div")(({ theme }) => ({
  display: "grid",
  gap: "20px",
  gridTemplateColumns: "repeat(12, 1fr)",
  
  [theme.breakpoints.down("lg")]: {
    gridTemplateColumns: "repeat(8, 1fr)",
  },
  
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr",
    gap: "16px",
  },
}));

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

export const NoResults = styled("div")(({ theme }) => ({
  textAlign: "center",
  padding: "48px 24px",
  color: theme.palette.grey[600],
}));

export const NoResultsIcon = styled("div")(({ theme }) => ({
  width: "64px",
  height: "64px",
  borderRadius: "50%",
  backgroundColor: theme.palette.grey[100],
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 auto 16px",
  color: theme.palette.grey[400],
}));

export const NoResultsTitle = styled("h3")(({ theme }) => ({
  fontSize: "16px",
  fontWeight: 600,
  color: theme.palette.text.primary,
  margin: "0 0 8px",
}));

export const NoResultsText = styled("p")(({ theme }) => ({
  fontSize: "14px",
  color: theme.palette.grey[600],
  margin: 0,
  lineHeight: 1.5,
}));