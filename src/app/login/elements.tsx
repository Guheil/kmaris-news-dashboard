"use client";

import { styled } from "@mui/material/styles";
import { palette } from "@/theme/pallete";
import Image from "next/image";

export const PageWrapper = styled("div")({
  minHeight: "100vh",
  width: "100%",
  display: "flex",
  background: "linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)",
  padding: "20px",
  alignItems: "center",
  justifyContent: "center",
});

export const Container = styled("div")(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  boxShadow: theme.shadows[10],
  margin: "auto",
  maxWidth: "1100px",
  borderRadius: "16px",
  overflow: "hidden",
  backgroundColor: theme.palette.common.white,

  [theme.breakpoints.up('md')]: {
    flexDirection: "row",
    height: "640px",
    maxHeight: "85vh",
  },
}));  

export const FormRoot = styled("div")(({ theme }) => ({
  width: "100%",
  padding: "30px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  [theme.breakpoints.up('md')]: {
    width: "50%",
    padding: "0 50px",
  },
}));

export const Title = styled("h1")(({ theme }) => ({
  fontSize: "30px",
  fontWeight: 700,
  color: palette.text.dark,
  textAlign: "center",
}));

export const Subtitle = styled("p")(({ theme }) => ({
  fontSize: "16px",
  color: palette.text.primary,
  textAlign: "center",
  margin: "0 auto 30px",
}));

export const Form = styled("form")({
  width: "100%",
  margin: "0 auto",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
});

export const InputGroup = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "6px",
});

export const Label = styled("label")(({ theme }) => ({
  fontSize: "14px",
  fontWeight: 500,
  color: palette.primary.main, 
}));

export const InputWrapper = styled("div")({
  position: "relative",
});

export const Input = styled("input")(({ theme }) => ({
  width: "100%",
  padding: "14px 48px 14px 18px",
  backgroundColor: theme.palette.common.white,
  fontSize: 15,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "8px",
  "&:focus": {
    outline: "none",
    borderColor: theme.palette.primary.main,
    boxShadow: `0 0 0 3px rgba(0,37,66,0.1)`,
  },
}));

export const PasswordIconButton = styled("button")(({ theme }) => ({
  position: "absolute",
  right: "12px",
  top: "50%",
  transform: "translateY(-50%)",
  background: "none",
  border: "none",
  cursor: "pointer",
  color: theme.palette.text.secondary,
}));

export const ForgotPassword = styled("a")(({ theme }) => ({
  fontSize: "14px",
  color: palette.primary.main, 
  textAlign: "right",
  fontWeight: 500,
  textDecoration: "none",
  marginTop: "-12px",
  "&:hover": { textDecoration: "underline" },
}));

export const Divider = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  color: theme.palette.text.primary,
  fontSize: "14px",
  "&::before, &::after": {
    content: '""',
    flex: 1,
    height: 1,
    background: theme.palette.divider,
  },
}));

export const SubmitButton = styled("button")(({ theme }) => ({
  width: "100%", 
  padding: "14px", 
  fontSize: "16px", 
  fontWeight: 600,
  color: palette.common.white, 
  backgroundColor: palette.primary.main, // Use theme color
  border: "none", 
  cursor: "pointer", 
  borderRadius: "8px",
  transition: "background-color 0.3s ease", // Smooth hover animation
  "&:hover": { backgroundColor: palette.primary.dark },
  "&:disabled": { 
    backgroundColor: palette.primary.light, 
    cursor: "not-allowed",
  },
}));

export const SignUpButton = styled(SubmitButton)(({ theme }) => ({
    color: palette.primary.main,
    backgroundColor: "rgba(0, 37, 66, 0.03)",
    border: `1px solid ${theme.palette.divider}`,
    transition: "all 0.3s ease", // Smooth hover animation
    "&:hover": {
        color: palette.primary.main,
        borderColor: palette.primary.main,
        backgroundColor: "rgba(221, 28, 35, 0.05)",
    },
}));

export const GoBackButton = styled(SubmitButton)(({ theme }) => ({
    color: theme.palette.text.secondary,
    backgroundColor: 'transparent',
    marginTop: '10px',
    "&:hover": {
        color: palette.primary.main,
        textDecoration: "underline",
        backgroundColor: 'transparent',
    },
}));

export const Panel = styled("div")(({ theme }) => ({
  display: "none",
  [theme.breakpoints.up('md')]: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    width: "50%",
    position: "relative",
    padding: "40px",
    color: theme.palette.common.white,
  },
}));

export const BackgroundImage = styled(Image)({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  zIndex: 0,
});

export const Overlay = styled("div")({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "linear-gradient(135deg, rgba(0,37,66,0.8) 0%, rgba(0,37,66,0.5) 100%)",
  zIndex: 1,
});

export const Content = styled("div")({
  position: "relative",
  zIndex: 2,
});

export const TitleSecondary = styled("h2")({
  fontSize: "32px",
  fontWeight: 700,
  marginBottom: "16px",
});

export const Text = styled("p")({
  fontSize: "16px",
  lineHeight: 1.6,
  maxWidth: "400px",
  marginBottom: "24px",
  opacity: 0.9,
});

export const FeatureList = styled("ul")({
  listStyle: "none",
  padding: 0,
  margin: 0,
  textAlign: "left",
  width: "100%",
  maxWidth: "300px",
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
});

export const FeatureItem = styled("li")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  fontSize: "15px",
  "&:before": {
    content: '"✓"',
    marginRight: "10px",
    color: palette.primary.main,
    fontWeight: "bold",
  }
}));