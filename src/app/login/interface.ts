import { MouseEvent } from "react";

export interface LoginProps {
  onSubmit?: (email: string, password: string) => void;
  onForgotPassword?: (event: MouseEvent<HTMLAnchorElement>) => void;
  isLoading?: boolean;
  error?: string | null;
}