"use client";

import { styled } from "@mui/material/styles";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

export const StyledSearchIcon = styled(SearchOutlinedIcon)({ fontSize: 24 });
export const StyledCartIcon = styled(ShoppingCartOutlinedIcon)({ fontSize: 24 });
export const StyledAccountIcon = styled(AccountCircleOutlinedIcon)({ fontSize: 24 });

export const IconRow = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: 12,
});

export const IconButton = styled("button")(({ theme }) => ({
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: 40,
  height: 40,
  border: "none",
  borderRadius: 8,
  backgroundColor: "transparent",
  color: theme.palette.text.primary,
  cursor: "pointer",
  transition: "all 200ms ease",
  "&:hover": {
    backgroundColor: "rgba(221, 28, 35, 0.08)",
    color: theme.palette.primary.main,
  },
}));

export const CartBadge = styled("span")(({ theme }) => ({
  position: "absolute",
  top: -6,
  right: -6,
  minWidth: 18,
  height: 18,
  padding: "0 5px",
  borderRadius: 999,
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  fontSize: 11,
  fontWeight: 600,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));