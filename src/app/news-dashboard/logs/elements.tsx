"use client";

import { styled } from "@mui/material/styles";

// Main layout components
export const LogsRoot = styled("div")(({ theme }) => ({
  display: "flex",
  minHeight: "100vh",
  paddingTop: "1rem",
  backgroundColor: theme.palette.grey[50], // #FAFAFA
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

// Overlay for mobile sidebar
export const SidebarOverlay = styled("div")<{ show: boolean }>(
  ({ theme, show }) => ({
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black + "80", // rgba(0, 0, 0, 0.5)
    zIndex: 999,
    opacity: show ? 1 : 0,
    visibility: show ? "visible" : "hidden",
    transition: "all 0.3s ease",
    backdropFilter: "blur(4px)",
  })
);

// Card components
export const Card = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  borderRadius: "16px",
  padding: "24px",
  boxShadow: `0 4px 12px ${theme.palette.common.black}14`, // rgba(0,0,0,0.08)
  border: `1px solid ${theme.palette.border.light}`, // #E8ECEF
  transition: "all 0.2s ease",

  "&:hover": {
    boxShadow: `0 8px 24px ${theme.palette.common.black}1F`, // rgba(0,0,0,0.12)
  },

  [theme.breakpoints.down("md")]: {
    padding: "20px",
  },
}));

export const CardHeader = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "24px",
  flexWrap: "wrap",
  gap: "12px",
}));

export const CardTitle = styled("h1")(({ theme }) => ({
  fontSize: "24px",
  fontWeight: 700,
  color: theme.palette.text.primary, // #1A1A1A
  margin: 0,
  letterSpacing: "-0.5px",
}));

// Filter and search components
export const FiltersContainer = styled("div")(({ theme }) => ({
  display: "flex",
  gap: "12px",
  alignItems: "center",
  flexWrap: "wrap",
  marginBottom: "24px",

  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "stretch",
  },
}));

export const FilterButton = styled("button")<{ active?: boolean }>(
  ({ theme, active = false }) => ({
    padding: "8px 16px",
    borderRadius: "8px",
    border: active
      ? `1px solid ${theme.palette.primary.main}` // #DD1C23
      : `1px solid ${theme.palette.border.main}`, // #D1D5DB
    backgroundColor: active ? theme.palette.primary.main + "1A" : "transparent", // #DD1C2310
    color: active ? theme.palette.primary.main : theme.palette.grey[600], // #525252
    fontSize: "14px",
    fontWeight: 500,
    cursor: "pointer",
    transition: "all 0.2s ease",
    whiteSpace: "nowrap",

    "&:hover": {
      backgroundColor: active
        ? theme.palette.primary.main + "33" // #DD1C2320
        : theme.palette.grey[50], // #FAFAFA
      borderColor: active ? theme.palette.primary.main : theme.palette.border.dark, // #A3A8B0
    },
  })
);

export const SearchContainer = styled("div")(({ theme }) => ({
  position: "relative",
  flex: 1,
  minWidth: "200px",
  maxWidth: "400px",
}));

export const SearchInput = styled("input")(({ theme }) => ({
  width: "100%",
  padding: "10px 16px 10px 40px",
  borderRadius: "8px",
  border: `1px solid ${theme.palette.border.main}`, // #D1D5DB
  backgroundColor: theme.palette.common.white,
  fontSize: "14px",
  color: theme.palette.text.dark, // #0D0D0D
  outline: "none",
  transition: "all 0.2s ease",

  "&:focus": {
    borderColor: theme.palette.primary.main, // #DD1C23
    boxShadow: `0 0 0 3px ${theme.palette.primary.main}33`, // #DD1C2320
  },

  "&::placeholder": {
    color: theme.palette.grey[400], // #A3A3A3
  },
}));

export const SearchIcon = styled("div")(({ theme }) => ({
  position: "absolute",
  left: "12px",
  top: "50%",
  transform: "translateY(-50%)",
  color: theme.palette.grey[400], // #A3A3A3
  pointerEvents: "none",
}));

// Updated logs table components - Fixed for 3 columns
export const LogsTable = styled("div")(({ theme }) => ({
  width: "100%",
  overflow: "hidden",
}));

export const LogsTableContent = styled("div")(({ theme }) => ({
  width: "100%",
}));

export const LogsTableHeader = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "2fr 1fr 1fr",
  gap: "16px",
  padding: "16px 0",
  borderBottom: `2px solid ${theme.palette.grey[100]}`, // #F5F5F5
  fontSize: "12px",
  fontWeight: 700,
  color: theme.palette.grey[600], // #525252
  textTransform: "uppercase",
  letterSpacing: "0.8px",

  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "1fr",
    gap: "8px",
    "& > div:nth-of-type(n+2)": {
      display: "none",
    },
  },
}));

export const LogsTableRow = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "2fr 1fr 1fr",
  gap: "16px",
  padding: "20px 12px",
  borderBottom: `1px solid ${theme.palette.grey[50]}`, // #FAFAFA
  alignItems: "center",
  transition: "all 0.2s ease",
  borderRadius: "8px",

  "&:hover": {
    backgroundColor: theme.palette.grey[50], // #FAFAFA
  },

  "&:last-child": {
    borderBottom: "none",
  },

  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "1fr",
    gap: "8px",
    padding: "16px 12px",

    "&:hover": {
      backgroundColor: theme.palette.grey[50], // #FAFAFA
    },
  },
}));

// Log content components
export const LogTitle = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "flex-start",
  gap: "12px",
  minWidth: 0,

  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    gap: "8px",
  },
}));

export const LogIcon = styled("div")<{ actionType: string }>(
  ({ theme, actionType }) => {
    const getActionColor = () => {
      switch (actionType.toLowerCase()) {
        case "published":
          return { bg: theme.palette.success.light, color: theme.palette.success.dark }; // #DCFCE7, #15803D
        case "updated":
          return { bg: theme.palette.info.light, color: theme.palette.info.dark }; // #E0F2FE, #075985
        case "archived":
          return { bg: theme.palette.warning.light, color: theme.palette.warning.dark }; // #FEF3C7, #B45309
        case "restored":
          return { bg: theme.palette.success.main + "1A", color: theme.palette.success.main }; // #16A34A1A, #16A34A
        case "permanently deleted":
          return { bg: theme.palette.error.light, color: theme.palette.error.main }; // #FEE2E2, #DC2626
        default:
          return { bg: theme.palette.grey[50], color: theme.palette.grey[600] }; // #FAFAFA, #525252
      }
    };

    const colors = getActionColor();

    return {
      width: "40px",
      height: "40px",
      borderRadius: "10px",
      backgroundColor: colors.bg,
      color: colors.color,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      fontSize: "16px",
    };
  }
);

export const LogTitleText = styled("div")(({ theme }) => ({
  fontSize: "15px",
  fontWeight: 600,
  color: theme.palette.text.dark, // #0D0D0D
  lineHeight: 1.4,
  overflow: "hidden",
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  minWidth: 0,
  marginBottom: "8px",
}));

export const LogUser = styled("div")(({ theme }) => ({
  fontSize: "14px",
  color: theme.palette.grey[600], // #525252
  fontWeight: 500,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
}));

export const LogDate = styled("div")(({ theme }) => ({
  fontSize: "14px",
  color: theme.palette.grey[600], // #525252
  whiteSpace: "nowrap",

  [theme.breakpoints.down("sm")]: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "13px",
  },
}));

export const LogTime = styled("div")(({ theme }) => ({
  fontSize: "13px",
  color: theme.palette.grey[400], // #A3A3A3
  marginTop: "2px",
  whiteSpace: "nowrap",

  [theme.breakpoints.down("sm")]: {
    marginTop: 0,
    fontSize: "12px",
  },
}));

// Mobile datetime container
export const MobileDateTimeContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  fontSize: "13px",
  color: theme.palette.grey[600], // #525252
  marginTop: "8px",
  paddingTop: "8px",
  borderTop: `1px solid ${theme.palette.grey[100]}`, // #F5F5F5
}));

// Action badge component
export const ActionBadge = styled("span")<{ actionType: string }>(
  ({ theme, actionType }) => {
    const getActionStyle = () => {
      switch (actionType.toLowerCase()) {
        case "published":
          return { bg: theme.palette.success.light, color: theme.palette.success.dark }; // #DCFCE7, #15803D
        case "updated":
          return { bg: theme.palette.info.light, color: theme.palette.info.dark }; // #E0F2FE, #075985
        case "archived":
          return { bg: theme.palette.warning.light, color: theme.palette.warning.dark }; // #FEF3C7, #B45309
        case "restored":
          return { bg: theme.palette.success.main + "1A", color: theme.palette.success.main }; // #16A34A1A, #16A34A
        case "permanently deleted":
          return { bg: theme.palette.error.light, color: theme.palette.error.main }; // #FEE2E2, #DC2626
        default:
          return { bg: theme.palette.grey[50], color: theme.palette.grey[600] }; // #FAFAFA, #525252
      }
    };

    const style = getActionStyle();

    return {
      padding: "6px 12px",
      borderRadius: "6px",
      fontSize: "12px",
      fontWeight: 600,
      textTransform: "capitalize" as const,
      backgroundColor: style.bg,
      color: style.color,
      whiteSpace: "nowrap" as const,
      display: "inline-flex",
      alignItems: "center",
      gap: "4px",

      "&::before": {
        fontSize: "10px",
      },
    };
  }
);

export const ViewButton = styled("button")(({ theme }) => ({
  width: "36px",
  height: "36px",
  borderRadius: "8px",
  border: `1px solid ${theme.palette.border.main}`, // #D1D5DB
  backgroundColor: theme.palette.grey[50], // #FAFAFA
  color: theme.palette.grey[600], // #525252
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 0.2s ease",

  "&:hover": {
    backgroundColor: theme.palette.grey[100], // #F5F5F5
    borderColor: theme.palette.border.dark, // #A3A8B0
    color: theme.palette.grey[700], // #404040
  },
}));

// Empty state components
export const NoResults = styled("div")(({ theme }) => ({
  textAlign: "center",
  padding: "80px 24px",
  color: theme.palette.grey[600], // #525252
}));

export const NoResultsIcon = styled("div")(({ theme }) => ({
  width: "80px",
  height: "80px",
  borderRadius: "50%",
  backgroundColor: theme.palette.grey[100], // #F5F5F5
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 auto 20px",
  color: theme.palette.grey[400], // #A3A3A3
}));

export const NoResultsTitle = styled("h3")(({ theme }) => ({
  fontSize: "18px",
  fontWeight: 600,
  color: theme.palette.text.dark, // #0D0D0D
  margin: "0 0 8px",
}));

export const NoResultsText = styled("p")(({ theme }) => ({
  fontSize: "14px",
  color: theme.palette.grey[600], // #525252
  margin: 0,
  lineHeight: 1.6,
  maxWidth: "400px",
  marginLeft: "auto",
  marginRight: "auto",
}));

// Stats components
export const StatsContainer = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(5, 1fr)",
  gap: "16px",
  marginBottom: "24px",

  [theme.breakpoints.down("lg")]: {
    gridTemplateColumns: "repeat(3, 1fr)",
  },

  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "repeat(2, 1fr)",
  },

  [theme.breakpoints.down("sm")]: {
    gridTemplateColumns: "1fr",
  },
}));

export const StatCard = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  padding: "20px",
  borderRadius: "12px",
  border: `1px solid ${theme.palette.grey[100]}`, // #F5F5F5
  textAlign: "center",
  transition: "all 0.2s ease",

  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: `0 8px 24px ${theme.palette.common.black}14`, // rgba(0,0,0,0.08)
  },
}));

export const StatNumber = styled("div")(({ theme }) => ({
  fontSize: "24px",
  fontWeight: 700,
  color: theme.palette.text.dark, // #0D0D0D
  marginBottom: "4px",
}));

export const StatLabel = styled("div")(({ theme }) => ({
  fontSize: "12px",
  color: theme.palette.grey[600], // #525252
  fontWeight: 500,
  textTransform: "uppercase",
  letterSpacing: "0.5px",
}));

// Search results header
export const SearchResultsHeader = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "20px",
  padding: "16px 0",
  borderBottom: `1px solid ${theme.palette.grey[100]}`, // #F5F5F5
  flexWrap: "wrap",
  gap: "12px",
}));

export const SearchResultsCount = styled("div")(({ theme }) => ({
  fontSize: "14px",
  color: theme.palette.grey[600], // #525252
  fontWeight: 500,
}));

export const SearchQuery = styled("span")(({ theme }) => ({
  fontWeight: 600,
  color: theme.palette.text.dark, // #0D0D0D
}));

export const ClearSearchButton = styled("button")(({ theme }) => ({
  padding: "8px 16px",
  borderRadius: "8px",
  border: `1px solid ${theme.palette.border.main}`, // #D1D5DB
  backgroundColor: "transparent",
  color: theme.palette.grey[600], // #525252
  fontSize: "12px",
  cursor: "pointer",
  fontWeight: 500,
  transition: "all 0.2s ease",
  whiteSpace: "nowrap",

  "&:hover": {
    backgroundColor: theme.palette.grey[50], // #FAFAFA
    borderColor: theme.palette.border.dark, // #A3A8B0
    color: theme.palette.grey[700], // #404040
  },
}));

// Enhanced Pagination Components
export const PaginationContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "8px",
  marginTop: "32px",
  padding: "16px 0",
  flexWrap: "wrap",

  [theme.breakpoints.down("sm")]: {
    gap: "4px",
    padding: "12px 0",
  },
}));

export const PaginationButton = styled("button")<{
  disabled?: boolean;
  active?: boolean;
  variant?: "default" | "ellipsis" | "nav";
}>(({ theme, disabled = false, active = false, variant = "default" }) => ({
  minWidth: variant === "ellipsis" ? "auto" : variant === "nav" ? "80px" : "40px",
  height: "40px",
  padding: variant === "ellipsis" ? "0 8px" : variant === "nav" ? "0 16px" : "0 12px",
  borderRadius: "8px",
  border: `1px solid ${theme.palette.border.main}`, // #D1D5DB
  backgroundColor: active
    ? theme.palette.primary.main // #DD1C23
    : disabled
    ? theme.palette.grey[50] // #FAFAFA
    : theme.palette.common.white,
  color: disabled
    ? theme.palette.grey[400] // #A3A3A3
    : active
    ? theme.palette.common.white
    : theme.palette.grey[600], // #525252
  fontSize: "14px",
  fontWeight: active ? 600 : 500,
  cursor: disabled || variant === "ellipsis" ? "default" : "pointer",
  transition: "all 0.2s ease",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  "&:hover": {
    backgroundColor: disabled || variant === "ellipsis"
      ? active
        ? theme.palette.primary.main // #DD1C23
        : theme.palette.grey[50] // #FAFAFA
      : active
      ? theme.palette.primary.main // #DD1C23
      : theme.palette.grey[100], // #F5F5F5
    borderColor: disabled || variant === "ellipsis" ? theme.palette.border.main : theme.palette.border.dark, // #A3A8B0
    transform: disabled || variant === "ellipsis" ? "none" : "translateY(-1px)",
  },

  [theme.breakpoints.down("sm")]: {
    minWidth: variant === "nav" ? "60px" : variant === "ellipsis" ? "auto" : "36px",
    height: "36px",
    fontSize: "13px",
  },
}));

export const PaginationInfo = styled("div")(({ theme }) => ({
  fontSize: "14px",
  color: theme.palette.grey[600], // #525252
  marginLeft: "16px",
  whiteSpace: "nowrap",
  fontWeight: 500,

  [theme.breakpoints.down("md")]: {
    marginLeft: "12px",
    fontSize: "13px",
  },

  [theme.breakpoints.down("sm")]: {
    marginLeft: 0,
    marginTop: "8px",
    fontSize: "12px",
    width: "100%",
    textAlign: "center",
  },
}));