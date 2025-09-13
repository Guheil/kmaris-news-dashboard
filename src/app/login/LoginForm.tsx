"use client";

import React, { useState } from "react";
import Image from "next/image";
import Swal from "sweetalert2";
import { styled } from "@mui/material/styles";
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
  Divider,
  SignUpButton,
  GoBackButton,
} from "./elements";
import { LoginProps } from "./interface";

export function LoginForm({
  onSignUp,
  onForgotPassword,
  isLoading,
}: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    // Hardcoded credentials for testing
    const hardcodedEmail = "testuser@example.com";
    const hardcodedPassword = "123";
    const user = { email: hardcodedEmail, role: "admin" }; 
    const sessionId = "mock-session-12345";

    try {
      if (email === hardcodedEmail && password === hardcodedPassword) {
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("sessionId", sessionId);

        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: "Redirecting...",
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          if (user.role === "admin") {
            window.location.href = "/news-dashboard";

          } else {
            window.location.href = `https://accessuserdashboard.vercel.app/`;
          }
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Invalid email or password.",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong! Please try again later.",
      });
    }
  };

  const handleGoToHomepage = () => {
    window.location.href = "https://kmaris.netlify.app/";
  };

  return (
    <FormRoot>
      <Title>Welcome Back</Title>
      <Subtitle>Login into your account</Subtitle>
      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <Label>Email</Label>
          <Input
            type="email"
            placeholder="sample@gmail.com"
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
              placeholder="Enter your password"
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

        <ForgotPassword href="#" onClick={onForgotPassword}>
          Forgot Password?
        </ForgotPassword>

        <SubmitButton type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login now"}
        </SubmitButton>

        <Divider>OR</Divider>

        <SignUpButton type="button" onClick={onSignUp}>
          Sign up now
        </SignUpButton>

        <GoBackButton type="button" onClick={handleGoToHomepage}>
          Return to Homepage
        </GoBackButton>
      </Form>
    </FormRoot>
  );
}