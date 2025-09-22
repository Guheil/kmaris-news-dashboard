"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import { Article, ApiArticle, Category } from "./interface"; // Import Category
import { ArticleCard } from "./ArticleCard";
import { FloatingDashboardButton } from './FloatingDashboardButton';
import NewsLoadingScreen from "./NewsLoadingScreen";
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

// Helper function to safely extract media URL or embed details (unchanged)
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

// Utility function for universal video embedding (unchanged)
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

// LatestArticlesSection component (unchanged, but now uses resolved category names)
const LatestArticlesSection: React.FC<{ articles: Article[] }> = ({
  articles,
}) => (
  <div style={{ maxWidth: 1440 }}>
    <SectionTitle>Articles</SectionTitle>
    <LatestArticlesGrid>
      {articles.map((article) => {
        const mediaDetails = getMediaDetails(article.newsImage, article.newsVideo, article.videoUrl);
        const hasMedia = mediaDetails.type !== "placeholder";

        return (
          <LatestArticleCardLink key={article.id || article._id} href={`/News/${article.id || article._id}`}>
            <LatestImageWrapper>
              {hasMedia ? (
                mediaDetails.isEmbed && mediaDetails.type === "iframe" ? (
                  <iframe
                    src={mediaDetails.src as string}
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
                      border: "none"
                    }}
                  />
                ) : mediaDetails.type === "video" ? (
                  <>
                    <video
                      src={mediaDetails.src as string}
                      controls={false}
                      style={{ 
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%", 
                        height: "100%", 
                        objectFit: "cover", 
                        borderRadius: "12px" 
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
                    src={mediaDetails.src as string}
                    alt={article.title}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                )
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
        );
      })}
    </LatestArticlesGrid>
  </div>
);

// VideoNewsSection component (similarly unchanged)
const VideoNewsSection: React.FC<{ videos: Article[] }> = ({ videos }) => (
  <div>
    <SectionTitle>News in Video</SectionTitle>
    <LatestArticlesGrid>
      {videos.map((video) => {
        const mediaDetails = getMediaDetails(video.newsImage, video.newsVideo, video.videoUrl);
        const hasMedia = mediaDetails.type !== "placeholder";

        return (
          <LatestArticleCardLink key={video.id || video._id} href={`/News/${video.id || video._id}`}>
            <LatestImageWrapper>
              {hasMedia ? (
                mediaDetails.isEmbed && mediaDetails.type === "iframe" ? (
                  <iframe
                    src={mediaDetails.src as string}
                    title={video.title}
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
                      border: "none"
                    }}
                  />
                ) : mediaDetails.type === "video" ? (
                  <>
                    <video
                      src={mediaDetails.src as string}
                      controls={false}
                      style={{ 
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%", 
                        height: "100%", 
                        objectFit: "cover", 
                        borderRadius: "12px" 
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
                    src={mediaDetails.src as string}
                    alt={video.title}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                )
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
  const [categories, setCategories] = useState<Category[]>([]); // New state for categories
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch articles and categories in parallel
        const [articlesResponse, categoriesResponse] = await Promise.all([
          fetch('/api/articles'),
          fetch('/api/categories')
        ]);

        if (!articlesResponse.ok) {
          throw new Error(`Failed to fetch articles: ${articlesResponse.statusText}`);
        }
        if (!categoriesResponse.ok) {
          throw new Error(`Failed to fetch categories: ${categoriesResponse.statusText}`);
        }

        const articlesData = await articlesResponse.json();
        const categoriesData: Category[] = await categoriesResponse.json();

        // Create category map: _id -> categoryName
        const categoryMap: Record<string, string> = {};
        categoriesData.forEach(cat => {
          categoryMap[cat._id] = cat.categoryName;
        });

        // Format articles, resolving category _id to name
        const formattedArticles: Article[] = articlesData.map((article: ApiArticle) => ({
          _id: article._id || "",
          id: article._id || "",
          title: article.title || "",
          author: article.author || "Unknown Author",
          publishedAt: article.date ? new Date(article.date).toLocaleDateString() : new Date().toLocaleDateString(),
          date: article.date || new Date().toISOString(),
          imageUrl: getMediaDetails(article.newsImage, article.newsVideo, article.videoUrl).src,
          newsImage: article.newsImage || '',
          newsVideo: article.newsVideo || '',
          videoUrl: article.videoUrl || '',
          readTime: article.readTime || "3 mins",
          category: categoryMap[article.category || ''] || article.category || "Uncategorized", // Resolve here
          description: article.description || "",
          summary: article.description || "",
          views: article.views || 0,
          status: article.status || "published",
          type: article.videoUrl || article.newsVideo ? 'video' : 'article'
        }));

        // Sort by date (latest first)
        const sortedArticles = formattedArticles.sort((a: Article, b: Article) => {
          const dateA = new Date(a.date).getTime();
          const dateB = new Date(b.date).getTime();
          return dateB - dateA;
        });

        setArticles(sortedArticles);
        setCategories(categoriesData); // Store for potential future use (e.g., filters)
        setError(null);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An error occurred while fetching data';
        setError(errorMessage);
        // If categories fail, articles can still load with raw category strings
        // (You could add separate error state for categories if needed)
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <NewsSection>
        <NewsLoadingScreen />
        <FloatingDashboardButton />
      </NewsSection>
    );
  }

  if (error) {
    return (
      <NewsSection>
        <Container>
          <div style={{
            padding: '2rem',
            textAlign: 'center',
            color: '#ef4444',
            backgroundColor: '#fef2f2',
            border: '1px solid #fecaca',
            borderRadius: '8px',
            margin: '2rem 0'
          }}>
            <h3 style={{ margin: '0 0 1rem 0', fontSize: '18px', fontWeight: 600 }}>
              Unable to Load Articles
            </h3>
            <p style={{ margin: 0, fontSize: '14px' }}>
              {error}
            </p>
          </div>
        </Container>
        <FloatingDashboardButton />
      </NewsSection>
    );
  }

  // Filter and organize articles (unchanged)
  const publishedArticles = articles.filter(article => article.status === 'published');
  const featuredArticle = publishedArticles[0];
  const mainArticles = publishedArticles.filter(article => !article.videoUrl && !article.newsVideo);
  const listArticles = mainArticles.slice(0, 3);
  const gridArticles = mainArticles.slice(3, 5);
  const latestArticles = publishedArticles.slice(0, 6);
  const videoNews = publishedArticles.filter(article => article.videoUrl || article.newsVideo);

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
      <FloatingDashboardButton />
    </NewsSection>
  );
}