"use client";

import React, { useState, useEffect, JSX } from "react";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs, Typography } from "@mui/material";
import { NewsArticleProps, Category } from "./interface";
import { Article } from "@/components/ArticleCard/interface";
import { incrementArticleViews } from "@/components/ArticleCard/trackViews"; // Import view tracking
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
  ErrorContainer,
} from "./elements";
import { ArticleCard } from "@/components/ArticleCard/ArticleCard";
import { FloatingDashboardButton } from "../ArticleCard/FloatingDashboardButton";
import ArticleLoadingScreen from "./ArticleLoadingScreen";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";

// Helper function to safely extract media URL or embed details (from News.tsx)
const getMediaDetails = (
  newsImage?: string | { url: string; alt?: string; width?: number; height?: number },
  newsVideo?: string | { url: string; title?: string; duration?: number },
  videoUrl?: string
) => {
  if (videoUrl) {
    const embedDetails = getVideoEmbedDetails(videoUrl);
    return { type: embedDetails.type, src: embedDetails.src, isEmbed: true };
  }

  if (newsImage) {
    if (typeof newsImage === 'string') {
      return { type: "image" as const, src: newsImage, isEmbed: false };
    } else if (newsImage.url) {
      return { type: "image" as const, src: newsImage.url, isEmbed: false };
    }
  }

  if (newsVideo) {
    if (typeof newsVideo === 'string') {
      return { type: "video" as const, src: newsVideo, isEmbed: false };
    } else if (newsVideo.url) {
      return { type: "video" as const, src: newsVideo.url, isEmbed: false };
    }
  }

  return { type: "placeholder" as const, src: '/placeholder-image.jpg', isEmbed: false };
};

// Utility function for universal video embedding (from News.tsx)
const getVideoEmbedDetails = (url: string) => {
  const normalizedUrl = url.startsWith("http") ? url : `https://${url}`;

  // Direct video file check
  const directVideoRegex = /\.(mp4|avi|mov|wmv|flv|webm|ogv|mkv)$/i;
  if (directVideoRegex.test(normalizedUrl)) {
    return { type: "video" as const, src: normalizedUrl };
  }

  // YouTube
  const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const youtubeMatch = normalizedUrl.match(youtubeRegex);
  if (youtubeMatch) {
    return { type: "iframe" as const, src: `https://www.youtube.com/embed/${youtubeMatch[1]}` };
  }

  // Vimeo
  const vimeoRegex = /(?:vimeo\.com\/|player\.vimeo\.com\/video\/)(\d+)/;
  const vimeoMatch = normalizedUrl.match(vimeoRegex);
  if (vimeoMatch) {
    return { type: "iframe" as const, src: `https://player.vimeo.com/video/${vimeoMatch[1]}` };
  }

  // Dailymotion
  const dailymotionRegex = /(?:dailymotion\.com\/video\/|dailymotion\.com\/embed\/video\/)([a-zA-Z0-9]+)/;
  const dailymotionMatch = normalizedUrl.match(dailymotionRegex);
  if (dailymotionMatch) {
    return { type: "iframe" as const, src: `https://www.dailymotion.com/embed/video/${dailymotionMatch[1]}` };
  }

  // Google Drive
  const driveRegex = /\/file\/d\/([a-zA-Z0-9-_]+)(?:\/[^\/\s]*)?|open\?id=([a-zA-Z0-9-_]+)/;
  const driveMatch = normalizedUrl.match(driveRegex);
  if (driveMatch) {
    const fileId = driveMatch[1] || driveMatch[2];
    return { type: "iframe" as const, src: `https://drive.google.com/file/d/${fileId}/preview` };
  }

  // Fallback
  return { type: "iframe" as const, src: normalizedUrl };
};

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

        // Increment views for the article
        await incrementArticleViews(initialArticle.id || initialArticle._id, resolvedArticle);
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

  // Determine media details for the article
  const mediaDetails = getMediaDetails(article.newsImage, article.newsVideo, article.videoUrl);
  const hasMedia = mediaDetails.type !== "placeholder";

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
            {hasMedia ? (
              mediaDetails.isEmbed && mediaDetails.type === "iframe" ? (
                <iframe
                  src={mediaDetails.src}
                  title={article.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    borderRadius: "12px",
                    border: "none",
                  }}
                />
              ) : mediaDetails.type === "video" ? (
                <>
                  <video
                    src={mediaDetails.src}
                    controls={false}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "12px",
                    }}
                  />
                  <PlayCircleFilledIcon
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      color: "white",
                      fontSize: "48px",
                      zIndex: 1,
                    }}
                  />
                </>
              ) : (
                <Image
                  src={mediaDetails.src}
                  alt={article.title}
                  fill
                  style={{ objectFit: "cover" }}
                />
              )
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: "#f3f4f6",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#6b7280",
                }}
              >
                No Media
              </div>
            )}
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