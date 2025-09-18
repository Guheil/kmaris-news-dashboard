import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from '@/theme/theme';
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kmaris News Dashboard",
  description: "Dashboard for managing news",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        {children}
      </body>
    </html>
  );
}