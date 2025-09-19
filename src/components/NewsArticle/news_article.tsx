"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs, Typography } from "@mui/material";
import { NewsArticleProps } from "./interface";
import { Article } from "@/components/ArticleCard/interface";
import {
  ArticleSection,
  Container,
  MainContent,
  Sidebar,
  ArticleTitle,
  ArticleImage,
  ArticleBody,
  SidebarTitle,
  RelatedArticlesContainer, 
  BreadcrumbContainer,
} from "./elements";
import { ArticleCard } from "@/components/ArticleCard/ArticleCard";
import { FloatingDashboardButton } from "../ArticleCard/FloatingDashboardButton";

export function NewsArticle({ article, relatedArticles }: NewsArticleProps) {
  return (
    <ArticleSection>
      <Container>
        <MainContent>
          <BreadcrumbContainer>
            <Breadcrumbs aria-label="breadcrumb">
              <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                Home
              </Link>
              <Link href="/news-preview" style={{ textDecoration: 'none', color: 'inherit' }}>
                News
              </Link>
              <Typography color="text.primary">{article.title}</Typography>
            </Breadcrumbs>
          </BreadcrumbContainer>
          <ArticleTitle>{article.title}</ArticleTitle>
          <ArticleImage>
            <Image
              src={article.imageUrl}
              alt={article.title}
              fill
              style={{ objectFit: "cover" }}
            />
          </ArticleImage>
          <ArticleBody>
            <p>{article.summary}</p>
          </ArticleBody>
        </MainContent>
        <Sidebar>
          <SidebarTitle>Related News</SidebarTitle>
          <RelatedArticlesContainer>
            {relatedArticles.map((related: Article) => (
              <ArticleCard key={related.id} article={related} variant="list" truncate={true} />
            ))}
          </RelatedArticlesContainer>
        </Sidebar>
      </Container>
      <FloatingDashboardButton />
    </ArticleSection>
  );
}