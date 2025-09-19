"use client";

import React, { useState, useEffect, use } from "react";
import { notFound } from "next/navigation";
import { Article, ApiArticle } from "@/components/ArticleCard/interface";
import { NewsArticle } from "@/components/NewsArticle/news_article";
import ArticleLoadingScreen from "@/components/NewsArticle/ArticleLoadingScreen";
import { Header } from "@/components/HeaderNews/Header";

interface NewsArticlePageProps {
  params: Promise<{
    id: string;
  }>;
}

// Helper function to safely extract media URL
const getMediaDetails = (
  newsImage?:
    | string
    | { url: string; alt?: string; width?: number; height?: number },
  newsVideo?: string | { url: string; title?: string; duration?: number },
  videoUrl?: string
) => {
  if (videoUrl) {
    return { type: "video" as const, src: videoUrl };
  }

  if (newsImage) {
    if (typeof newsImage === "string") {
      return { type: "image" as const, src: newsImage };
    } else if (newsImage.url) {
      return { type: "image" as const, src: newsImage.url };
    }
  }

  if (newsVideo) {
    if (typeof newsVideo === "string") {
      return { type: "video" as const, src: newsVideo };
    } else if (newsVideo.url) {
      return { type: "video" as const, src: newsVideo.url };
    }
  }

  return { type: "placeholder" as const, src: "/placeholder-image.jpg" };
};

export default function NewsArticlePage({ params }: NewsArticlePageProps) {
  // Unwrap the params Promise using React.use()
  const { id } = use(params);

  const [article, setArticle] = useState<Article | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/articles");

        if (!response.ok) {
          throw new Error(`Failed to fetch articles: ${response.statusText}`);
        }

        const data = await response.json();

        // Format articles to match the expected Article interface
        const formattedArticles: Article[] = data.map(
          (article: ApiArticle) => ({
            _id: article._id || "",
            id: article._id || "",
            title: article.title || "",
            author: article.author || "Unknown Author",
            publishedAt: article.date
              ? new Date(article.date).toLocaleDateString()
              : new Date().toLocaleDateString(),
            date: article.date || new Date().toISOString(),
            imageUrl: getMediaDetails(
              article.newsImage,
              article.newsVideo,
              article.videoUrl
            ).src,
            newsImage: article.newsImage || "",
            newsVideo: article.newsVideo || "",
            videoUrl: article.videoUrl || "",
            readTime: article.readTime || "3 mins",
            category: article.category || "Uncategorized",
            description: article.description || "",
            summary: article.description || "",
            views: article.views || 0,
            status: article.status || "published",
            type: article.videoUrl || article.newsVideo ? "video" : "article",
          })
        );

        // Find the specific article by ID
        const foundArticle = formattedArticles.find(
          (a) => a.id === id || a._id === id
        );

        if (!foundArticle) {
          notFound();
          return;
        }

        setArticle(foundArticle);

        // Get related articles (exclude current article, limit to 4)
        const related = formattedArticles
          .filter((a) => a.id !== id && a._id !== id)
          .slice(0, 4);

        setRelatedArticles(related);
        setError(null);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "An error occurred";
        setError(errorMessage);
        console.error("Error fetching articles:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchArticles();
    }
  }, [id]);

  // Loading state
  if (loading) {
    return <ArticleLoadingScreen />;

  }

  // Error state
  if (error) {
    return (
      <div
        style={{
          padding: "2rem",
          textAlign: "center",
          color: "#ef4444",
          backgroundColor: "#fef2f2",
          border: "1px solid #fecaca",
          borderRadius: "8px",
          margin: "2rem auto",
          maxWidth: "600px",
        }}
      >
        <h3 style={{ margin: "0 0 1rem 0", fontSize: "18px", fontWeight: 600 }}>
          Unable to Load Article
        </h3>
        <p style={{ margin: 0, fontSize: "14px" }}>{error}</p>
      </div>
    );
  }

  // Article not found (this should trigger notFound() but adding as fallback)
  if (!article) {
    notFound();
    return null;
  }

  return (
    <>
      <Header />
      <NewsArticle article={article} relatedArticles={relatedArticles} />
    </>
  );
}
