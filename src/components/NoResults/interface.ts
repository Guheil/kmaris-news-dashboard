"use client";

import { ReactNode } from "react";

export interface NoResultsProps {
  icon?: ReactNode;
  title: string;
  text?: string | null;
}