"use client";

import React, { useState } from "react";
import Swal from "sweetalert2";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  FormRoot,
  Title,
  Subtitle,
  Form,
  InputGroup,
  Label,
  Input,
  InputWrapper,
  PasswordIconButton,
  ForgotPassword,
  SubmitButton,
} from "./elements";
import { styled } from "@mui/material/styles";
import { LoginProps } from "./interface";
import { createSession } from "./sessionUtils";

const ErrorMessage = styled("div")(({ theme }) => ({
  color: theme.palette.error.main,
  fontSize: "14px",
  textAlign: "center",
  marginTop: "10px",
}));

export function LoginForm({ onForgotPassword, isLoading }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    // Hardcoded credentials for testing
    const hardcodedEmail = "admin@kmaris.com";
    const hardcodedPassword = "admin123";
    const user = { email: hardcodedEmail, role: "admin" };

    try {
      if (email === hardcodedEmail && password === hardcodedPassword) {
        // Create a session with 1-hour expiration
        createSession(user, 60 * 60 * 1000); // 1 hour in milliseconds

        await Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: "Redirecting to News Dashboard...",
          timer: 1500,
          showConfirmButton: false,
        });
        window.location.href = "/news-dashboard";
      } else {
        setLoginError("Invalid admin credentials.");
        await Swal.fire({
          icon: "error",
          title: "Access Denied",
          text: "Invalid admin credentials.",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      setLoginError("Something went wrong! Please try again later.");
      await Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong! Please try again later.",
      });
    }
  };

  return (
    <FormRoot>
      <Title>News Manager Login</Title>
      <Subtitle>Access your news management dashboard</Subtitle>
      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <Label>Admin Email</Label>
          <Input
            type="email"
            placeholder="admin@kmaris.com"
            value={email}
            onChange={(e: { target: { value: React.SetStateAction<string> } }) =>
              setEmail(e.target.value)
            }
            required
          />
        </InputGroup>
        <InputGroup>
          <Label>Password</Label>
          <InputWrapper>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Enter admin password"
              value={password}
              onChange={(e: { target: { value: React.SetStateAction<string> } }) =>
                setPassword(e.target.value)
              }
              required
            />
            <PasswordIconButton
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </PasswordIconButton>
          </InputWrapper>
        </InputGroup>

        {loginError && <ErrorMessage>{loginError}</ErrorMessage>}

        <ForgotPassword href="#" onClick={onForgotPassword}>
          Forgot Password?
        </ForgotPassword>

        <SubmitButton type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Access Dashboard"}
        </SubmitButton>
      </Form>
    </FormRoot>
  );
}