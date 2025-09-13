"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Login from "@/app/login/login";

export default function LoginPage() {
  const router = useRouter();

  // Hardcoded account
  const hardcodedUser = {
    username: "testuser",
    password: "password123",
  };

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: { username: string; password: string }) => {
    setIsLoading(true);
    setError(null);

    // Fake "auth"
    setTimeout(() => {
      if (
        data.username === hardcodedUser.username &&
        data.password === hardcodedUser.password
      ) {
        // ✅ redirect to dashboard
        router.push("/news-dashboard");
      } else {
        setError("❌ Invalid username or password");
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Login
      onSubmit={handleSubmit}
      onSignUp={() => alert("Sign up clicked")}
      onForgotPassword={() => alert("Forgot password clicked")}
      isLoading={isLoading}
      error={error || undefined}
    />
  );
}
