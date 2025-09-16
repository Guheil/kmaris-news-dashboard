"use client";

import React from "react";
import { LoginProps } from "./interface";
import { PageWrapper, Container } from "./elements";
import { LoginForm } from "./LoginForm";
import { LoginImagePanel } from "./LoginImagePanel";

export function Login({
  onSubmit,
  onForgotPassword,
  isLoading,
  error,
}: LoginProps) {
  return (
    <PageWrapper>
      <Container>
        <LoginImagePanel />
        <LoginForm 
          onSubmit={onSubmit}              
          onForgotPassword={onForgotPassword}
          isLoading={isLoading}
          error={error}                     
        />
      </Container>
    </PageWrapper>
  );
}

export default Login;