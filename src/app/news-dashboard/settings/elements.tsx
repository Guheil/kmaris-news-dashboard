"use client";

import { styled } from "@mui/material/styles";
import { Theme as MUITheme } from "@mui/material/styles";

// Helper function to safely get nested palette colors
const getPaletteColor = (theme: MUITheme, colorPath: string): string => {
  const [colorKey, shade] = colorPath.split('.') as [keyof MUITheme['palette'], string];
  const colorGroup = theme.palette[colorKey];
  
  if (colorGroup && typeof colorGroup === 'object' && shade in colorGroup) {
    return (colorGroup as Record<string, string>)[shade];
  }
  
  return colorPath; // Fallback to the original string
};

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
  paddingTop: "1rem",
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

export const UnderDevelopmentContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "80px 40px",
  textAlign: "center",
  minHeight: "300px",
  backgroundColor: theme.palette.grey[50],
  borderRadius: "16px",
  border: `1px solid ${theme.palette.grey[100]}`,
  
  [theme.breakpoints.down("md")]: {
    padding: "60px 24px",
    minHeight: "200px",
  },
  
  [theme.breakpoints.down("sm")]: {
    padding: "40px 16px",
    minHeight: "180px",
  },
}));

export const MainIcon = styled("div")(({ theme }) => ({
  width: "80px",
  height: "80px",
  borderRadius: "50%",
  backgroundColor: theme.palette.grey[100],
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: "24px",
  
  [theme.breakpoints.down("sm")]: {
    width: "60px",
    height: "60px",
    marginBottom: "20px",
  },
}));

export const UnderDevTitle = styled("h1")(({ theme }) => ({
  fontSize: "28px",
  fontWeight: 600,
  color: theme.palette.text.primary,
  margin: "0 0 12px 0",
  letterSpacing: "-0.025em",
  lineHeight: 1.3,
  
  [theme.breakpoints.down("md")]: {
    fontSize: "24px",
  },
  
  [theme.breakpoints.down("sm")]: {
    fontSize: "20px",
  },
}));

export const UnderDevSubtitle = styled("p")(({ theme }) => ({
  fontSize: "16px",
  color: theme.palette.grey[500],
  margin: "0 0 32px 0",
  maxWidth: "500px",
  lineHeight: 1.5,
  
  [theme.breakpoints.down("md")]: {
    fontSize: "15px",
    maxWidth: "400px",
    margin: "0 0 24px 0",
  },
  
  [theme.breakpoints.down("sm")]: {
    fontSize: "14px",
    maxWidth: "300px",
    margin: "0 0 20px 0",
  },
}));

export const ComingSoonBadge = styled("div")(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  padding: "8px 16px",
  backgroundColor: theme.palette.warning.main,
  color: theme.palette.warning.light,
  fontSize: "14px",
  fontWeight: 500,
  borderRadius: "20px",
  textTransform: "uppercase" as const,
  letterSpacing: "0.025em",
  
  [theme.breakpoints.down("sm")]: {
    fontSize: "12px",
    padding: "6px 12px",
  },
}));

export const ComingSoonText = styled("div")(({ theme }) => ({
  fontSize: "14px",
  color: theme.palette.grey[400],
  fontStyle: "italic",
  marginTop: "16px",
  
  [theme.breakpoints.down("sm")]: {
    fontSize: "13px",
    marginTop: "12px",
  },
}));

export const SettingsList = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
}));

export const SettingItem = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: "12px 16px",
  borderRadius: "8px",
  backgroundColor: theme.palette.grey[50],
  border: `1px solid ${theme.palette.grey[100]}`,
  cursor: "not-allowed",
  opacity: 0.5,
}));

export const SettingIcon = styled("div")<{ color: string }>(({ theme, color }) => {
  const baseColor = getPaletteColor(theme, color);

  return {
    width: "32px",
    height: "32px",
    borderRadius: "6px",
    backgroundColor: `${baseColor}10`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: baseColor,
    marginRight: "12px",
    flexShrink: 0,
  };
});

export const SettingContent = styled("div")(({ theme }) => ({
  flex: 1,
}));

export const SettingTitle = styled("div")(({ theme }) => ({
  fontSize: "14px",
  fontWeight: 500,
  color: theme.palette.grey[700],
  marginBottom: "2px",
}));

export const SettingDescription = styled("div")(({ theme }) => ({
  fontSize: "12px",
  color: theme.palette.grey[400],
}));

export const SettingBadge = styled("div")(({ theme }) => ({
  padding: "2px 8px",
  borderRadius: "12px",
  backgroundColor: theme.palette.grey[50],
  color: theme.palette.grey[600],
  fontSize: "10px",
  fontWeight: 500,
  textTransform: "uppercase" as const,
  letterSpacing: "0.5px",
}));