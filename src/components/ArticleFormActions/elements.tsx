import { styled } from "@mui/material/styles";
import { Box, Button as MuiButton, Divider } from "@mui/material";

export const ActionsContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  gap: "12px",
  marginTop: "32px",
  paddingTop: "24px",
  borderTop: `1px solid ${theme.palette.grey[200]}`,
  flexWrap: "wrap",
  
  [theme.breakpoints.down("sm")]: {
    justifyContent: "stretch",
    "& > *": {
      flex: 1,
    },
  },
}));

export const Button = styled(MuiButton)<{ customVariant?: "primary" | "secondary" | "outline" }>(
  ({ theme, customVariant = "primary" }) => {
    const getVariantStyles = () => {
      switch (customVariant) {
        case "primary":
          return {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.common.white,
            border: "none",
            "&:hover": {
              backgroundColor: theme.palette.primary.dark,
              transform: "translateY(-1px)",
              boxShadow: `0 4px 12px ${theme.palette.primary.main}40`,
            },
            "&:disabled": {
              backgroundColor: theme.palette.grey[300],
              color: theme.palette.grey[500],
              transform: "none",
              boxShadow: "none",
            },
          };
        case "secondary":
          return {
            backgroundColor: theme.palette.grey[50],
            color: theme.palette.grey[700],
            border: `1px solid ${theme.palette.grey[200]}`,
            "&:hover": {
              backgroundColor: theme.palette.grey[100],
              borderColor: theme.palette.grey[300],
              transform: "translateY(-1px)",
            },
            "&:disabled": {
              backgroundColor: theme.palette.grey[100],
              color: theme.palette.grey[400],
              borderColor: theme.palette.grey[200],
              transform: "none",
            },
          };
        case "outline":
          return {
            backgroundColor: "transparent",
            color: theme.palette.grey[600],
            border: `1px solid ${theme.palette.grey[300]}`,
            "&:hover": {
              backgroundColor: theme.palette.grey[50],
              borderColor: theme.palette.grey[400],
              color: theme.palette.grey[700],
              transform: "translateY(-1px)",
            },
            "&:disabled": {
              backgroundColor: "transparent",
              color: theme.palette.grey[400],
              borderColor: theme.palette.grey[300],
              transform: "none",
            },
          };
        default:
          return {};
      }
    };

    return {
      // Map customVariant to Material-UI's variant
      ...(customVariant === "outline"
        ? { variant: "outlined" }
        : { variant: "contained" }), // Use "contained" for primary/secondary
      padding: "12px 24px",
      borderRadius: "8px",
      fontSize: "14px",
      fontWeight: 600,
      textTransform: "none",
      transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      minWidth: "120px",
      minHeight: "44px",
      ...getVariantStyles(),
    };
  }
);

export const ButtonGroup = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "8px",
  alignItems: "center",
  flexWrap: "wrap",
  
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    "& > *": {
      flex: 1,
    },
  },
}));

export const ActionsDivider = styled(Divider)(({ theme }) => ({
  height: "24px",
  margin: "0 4px",
  orientation: "vertical",
}));