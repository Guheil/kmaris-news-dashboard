"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import { Article, ApiArticle } from "./interface";
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

// Helper function to safely extract image/video URL
const getMediaUrl = (
  newsImage?: string | { url: string; alt?: string; width?: number; height?: number },
  newsVideo?: string | { url: string; title?: string; duration?: number }
): string => {
  if (newsImage) {
    if (typeof newsImage === 'string') {
      return newsImage;
    } else if (newsImage.url) {
      return newsImage.url;
    }
  }
  
  if (newsVideo) {
    if (typeof newsVideo === 'string') {
      return newsVideo;
    } else if (newsVideo.url) {
      return newsVideo.url;
    }
  }
  
  return '/placeholder-image.jpg';
};

const LatestArticlesSection: React.FC<{ articles: Article[] }> = ({
  articles,
}) => (
  <div style={{ maxWidth: 1440 }}>
    <SectionTitle>Articles</SectionTitle>
    <LatestArticlesGrid>
      {articles.map((article) => {
        const mediaUrl = getMediaUrl(article.newsImage, article.newsVideo);
        const hasMedia = (article.newsImage || article.newsVideo);
        
        return (
          <LatestArticleCardLink key={article.id || article._id} href={`/News/${article.id || article._id}`}>
            <LatestImageWrapper>
              {hasMedia ? (
                <Image
                  src={mediaUrl}
                  alt={article.title}
                  fill
                  style={{ objectFit: "cover" }}
                />
              ) : (
                <div style={{
                  width: '100%',
                  height: '100%',
                  backgroundColor: '#f3f4f6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#6b7280'
                }}>
                  No Image
                </div>
              )}
            </LatestImageWrapper>
            {article.author && (
              <AuthorInfo>
                <LatestMetaText>{article.author}</LatestMetaText>
                <LatestMetaText>â€¢</LatestMetaText>
                <LatestMetaText>{article.publishedAt}</LatestMetaText>
                <LatestMetaText>â€¢</LatestMetaText>
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
        );
      })}
    </LatestArticlesGrid>
  </div>
);

const VideoNewsSection: React.FC<{ videos: Article[] }> = ({ videos }) => (
  <div>
    <SectionTitle>News in Video</SectionTitle>
    <LatestArticlesGrid>
      {videos.map((video) => {
        const mediaUrl = getMediaUrl(video.newsImage, video.newsVideo);
        const hasMedia = (video.newsImage || video.newsVideo);
        
        return (
          <LatestArticleCardLink key={video.id || video._id} href={`/News/${video.id || video._id}`}>
            <LatestImageWrapper>
              {hasMedia ? (
                <>
                  <Image
                    src={mediaUrl}
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
              ) : (
                <div style={{
                  width: '100%',
                  height: '100%',
                  backgroundColor: '#f3f4f6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#6b7280'
                }}>
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
        );
      })}
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
        const response = await fetch('/api/articles');
        if (!response.ok) {
          throw new Error(`Failed to fetch articles: ${response.statusText}`);
        }
        const data = await response.json();
        
        // Format articles to match the expected Article interface
        const formattedArticles = data.map((article: ApiArticle) => ({
          _id: article._id || "",
          id: article._id || "",
          title: article.title || "",
          author: article.author || "Unknown Author",
          publishedAt: article.date ? new Date(article.date).toLocaleDateString() : new Date().toLocaleDateString(),
          date: article.date || new Date().toISOString(),
          imageUrl: getMediaUrl(article.newsImage, article.newsVideo),
          newsImage: article.newsImage || '',
          newsVideo: article.newsVideo || '',
          readTime: article.readTime || "3 mins",
          category: article.category || "Uncategorized",
          description: article.description || "",
          summary: article.description || "",
          views: article.views || 0,
          status: article.status || "published",
          type: article.newsVideo ? 'video' : 'article'
        }));

        // Sort by date (latest first)
        const sortedArticles = formattedArticles.sort((a: Article, b: Article) => {
          const dateA = new Date(a.date).getTime();
          const dateB = new Date(b.date).getTime();
          return dateB - dateA;
        });

        setArticles(sortedArticles);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
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
          <div style={{ padding: '2rem', textAlign: 'center' }}>
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
          <div style={{ padding: '2rem', textAlign: 'center', color: 'red' }}>
            Error loading articles: {error}
          </div>
        </Container>
      </NewsSection>
    );
  }

  // Filter and organize articles
  const publishedArticles = articles.filter(article => article.status === 'published');
  const mainArticles = publishedArticles.filter(article => !article.newsVideo);
  const latestArticles = publishedArticles.slice(0, 6);
  const videoNews = publishedArticles.filter(article => article.newsVideo);

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
              <ArticleCard key={article.id || article._id} article={article} variant="list" />
            ))}
          </ArticleList>
        </TopSection>

        <BottomGrid>
          {gridArticles.map((article) => (
            <ArticleCard key={article.id || article._id} article={article} variant="grid" />
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