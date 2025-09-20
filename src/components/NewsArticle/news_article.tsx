"use client";

import React, { useState, useEffect, JSX } from "react";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs, Typography } from "@mui/material";
import { NewsArticleProps, Category } from "./interface";
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
  ErrorContainer, // New styled component for error UI
} from "./elements";
import { ArticleCard } from "@/components/ArticleCard/ArticleCard";
import { FloatingDashboardButton } from "../ArticleCard/FloatingDashboardButton";
import ArticleLoadingScreen from "./ArticleLoadingScreen";

export function NewsArticle({ article: initialArticle, relatedArticles: initialRelatedArticles }: NewsArticleProps): JSX.Element {
  const [article, setArticle] = useState<Article | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async (): Promise<void> => {
      try {
        setLoading(true);
        const response = await fetch("/api/categories");
        if (!response.ok) {
          throw new Error(`Failed to fetch categories: ${response.statusText}`);
        }
        const categoriesData: Category[] = await response.json();

        // Create category map
        const categoryMap: Record<string, string> = {};
        categoriesData.forEach((cat) => {
          categoryMap[cat._id] = cat.categoryName;
        });

        // Resolve categories for main article
        const resolvedArticle: Article = {
          ...initialArticle,
          category: categoryMap[initialArticle.category] || initialArticle.category || "Uncategorized",
        };

        // Resolve categories for related articles
        const resolvedRelatedArticles: Article[] = initialRelatedArticles.map((related) => ({
          ...related,
          category: categoryMap[related.category] || related.category || "Uncategorized",
        }));

        setArticle(resolvedArticle);
        setRelatedArticles(resolvedRelatedArticles);
        setError(null);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "An error occurred while fetching categories";
        setError(errorMessage);
        setArticle(initialArticle);
        setRelatedArticles(initialRelatedArticles);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [initialArticle, initialRelatedArticles]);

  if (loading) {
    return <ArticleLoadingScreen />;
  }

  if (error || !article) {
    return (
      <ArticleSection>
        <Container>
          <ErrorContainer>
            <h3>Unable to Load Article</h3>
            <p>{error || "Article data is missing"}</p>
          </ErrorContainer>
        </Container>
        <FloatingDashboardButton />
      </ArticleSection>
    );
  }

  return (
    <ArticleSection>
      <Container>
        <MainContent>
          <BreadcrumbContainer>
            <Breadcrumbs aria-label="breadcrumb">
              <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
                Home
              </Link>
              <Link href="/news-preview" style={{ textDecoration: "none", color: "inherit" }}>
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