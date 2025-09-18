"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import { ApiArticle, Article } from "./interface";
import { ArticleCard } from "./ArticleCard";
import {
  NewsSection,
  Container,
  TopSection,
  ArticleList,
  BottomGrid,
  SectionDivider,
  SectionTitle,
  LatestArticlesGrid,
  LatestArticleCardLink,
  LatestImageWrapper,
  AuthorInfo,
  LatestMetaText,
  LatestTitle,
  LatestCategoryMeta,
  LatestCategory,
} from "./elements";

const LatestArticlesSection: React.FC<{ articles: Article[] }> = ({
  articles,
}) => (
  <div style={{ maxWidth: 1440 }}>
    <SectionTitle>Articles</SectionTitle>
    <LatestArticlesGrid>
      {articles.map((article) => (
        <LatestArticleCardLink
          key={article.id || article._id}
          href={`/News/${article.id || article._id}`}
        >
          <LatestImageWrapper>
            {article.newsImage ? (
              <Image
                src={
                  typeof article.newsImage === "string"
                    ? article.newsImage
                    : article.newsImage.url
                }
                alt={article.title}
                fill
                style={{ objectFit: "cover" }}
              />
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
                No Image
              </div>
            )}
          </LatestImageWrapper>
          {article.author && (
            <AuthorInfo>
              <LatestMetaText>{article.author}</LatestMetaText>
              <LatestMetaText>•</LatestMetaText>
              <LatestMetaText>{article.publishedAt}</LatestMetaText>
              <LatestMetaText>•</LatestMetaText>
              <LatestMetaText>{article.readTime || "3 mins"}</LatestMetaText>
            </AuthorInfo>
          )}
          <LatestTitle>{article.title}</LatestTitle>
          <LatestCategoryMeta>
            <LatestCategory>{article.category}</LatestCategory>
            <span style={{ margin: "0 8px" }}>|</span>
            <span>{article.readTime || "3 mins"}</span>
          </LatestCategoryMeta>
        </LatestArticleCardLink>
      ))}
    </LatestArticlesGrid>
  </div>
);

const VideoNewsSection: React.FC<{ videos: Article[] }> = ({ videos }) => (
  <div>
    <SectionTitle>News in Video</SectionTitle>
    <LatestArticlesGrid>
      {videos.map((video) => (
        <LatestArticleCardLink
          key={video.id || video._id}
          href={`/News/${video.id || video._id}`}
        >
          <LatestImageWrapper>
            {video.newsImage ? (
              <>
                <Image
                  src={
                    typeof video.newsImage === "string"
                      ? video.newsImage
                      : video.newsImage.url
                  }
                  alt={video.title}
                  fill
                  style={{ objectFit: "cover" }}
                />
                {video.newsVideo && (
                  <PlayCircleFilledIcon
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      color: "white",
                      fontSize: "48px",
                    }}
                  />
                )}
              </>
            ) : video.newsVideo ? (
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                }}
              >
                <video
                  controls
                  width="100%"
                  height="100%"
                  style={{ objectFit: "cover" }}
                >
                  <source
                    src={
                      typeof video.newsVideo === "string"
                        ? video.newsVideo
                        : video.newsVideo.url
                    }
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
                <PlayCircleFilledIcon
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    color: "white",
                    fontSize: "48px",
                  }}
                />
              </div>
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
          </LatestImageWrapper>
          <LatestTitle>{video.title}</LatestTitle>
          <LatestCategoryMeta>
            <LatestCategory>{video.category}</LatestCategory>
            <span style={{ margin: "0 8px" }}>|</span>
            <span>{video.readTime || "3 mins"}</span>
          </LatestCategoryMeta>
        </LatestArticleCardLink>
      ))}
    </LatestArticlesGrid>
  </div>
);

export default function News() {
  const [articles, setArticles] = useState<Article[]>([]);
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
        const formattedArticles: Article[] = data.map((article: ApiArticle) => ({
          _id: article._id || "",
          id: article._id || "",
          title: article.title || "",
          author: {
            name: article.author || "Unknown Author",
          },
          publishedAt: article.date
            ? new Date(article.date).toLocaleDateString()
            : new Date().toLocaleDateString(),
          date: article.date || new Date().toISOString(),
          imageUrl: article.newsImage || article.newsVideo || "/placeholder-image.jpg",
          newsImage: article.newsImage || undefined,
          newsVideo: article.newsVideo || undefined,
          readTime: article.readTime || "3 mins",
          category: article.category || "Uncategorized",
          description: article.description || "",
          summary: article.description || "",
          views: article.views || 0,
          status: article.status || "published",
          type: article.newsVideo ? "video" : "article",
        }));

        // Sort by date (latest first)
        const sortedArticles = formattedArticles.sort(
          (a, b) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
        );

        setArticles(sortedArticles);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return (
      <NewsSection>
        <Container>
          <div style={{ padding: "2rem", textAlign: "center" }}>
            Loading articles...
          </div>
        </Container>
      </NewsSection>
    );
  }

  if (error) {
    return (
      <NewsSection>
        <Container>
          <div style={{ padding: "2rem", textAlign: "center", color: "red" }}>
            Error loading articles: {error}
          </div>
        </Container>
      </NewsSection>
    );
  }

  // Filter and organize articles based on your database structure
  const publishedArticles = articles.filter(
    (article) => article.status === "published"
  );
  const mainArticles = publishedArticles.filter(
    (article) => !article.newsVideo
  );
  const latestArticles = publishedArticles.slice(0, 6);
  const videoNews = publishedArticles.filter((article) => article.newsVideo);

  const featuredArticle = mainArticles[0];
  const listArticles = mainArticles.slice(1, 4);
  const gridArticles = mainArticles.slice(4);

  return (
    <NewsSection>
      <Container>
        <TopSection>
          {featuredArticle && (
            <ArticleCard article={featuredArticle} variant="featured" />
          )}
          <ArticleList>
            {listArticles.map((article) => (
              <ArticleCard
                key={article.id || article._id}
                article={article}
                variant="list"
              />
            ))}
          </ArticleList>
        </TopSection>

        <BottomGrid>
          {gridArticles.map((article) => (
            <ArticleCard
              key={article.id || article._id}
              article={article}
              variant="grid"
            />
          ))}
        </BottomGrid>

        <SectionDivider />
        <LatestArticlesSection articles={latestArticles} />
        <SectionDivider />
        <VideoNewsSection videos={videoNews} />
      </Container>
    </NewsSection>
  );
}