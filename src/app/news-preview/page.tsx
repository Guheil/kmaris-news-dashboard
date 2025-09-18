"use client";

import React from "react";
import News from "@/components/ArticleCard/News";
import { Header } from "@/components/HeaderNews/Header"; 

export default function NewsPage() {
  return (
    <>
      <Header />
      <News />
    </>
  );
}