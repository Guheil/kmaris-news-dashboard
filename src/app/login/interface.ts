import { MouseEvent } from "react";

export interface LoginProps {
  onSubmit?: (email: string, password: string) => void;
  onForgotPassword?: (event: MouseEvent<HTMLAnchorElement>) => void;
  onSignUp?: (event: MouseEvent<HTMLAnchorElement>) => void;
  isLoading?: boolean;
  error?: string | null;
}

export interface User {
  email: string;
  role: string;
}

export interface Session {
  user: User;
  sessionId: string;
  expiresAt: number;
}
