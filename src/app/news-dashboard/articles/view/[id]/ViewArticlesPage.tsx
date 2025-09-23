"use client";

import { FC, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Home,
  FileText,
  Plus,
  ArrowLeft,
  Eye,
  Clock,
  User,
  Calendar,
  Tag,
  Edit,
  Archive,
  Share2,
  BarChart3,
  EyeIcon,
} from "lucide-react";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { Header } from "@/components/header/Header";
import { NewsArticle } from "../../interface";
import {
  ViewArticleRoot,
  MainContent,
  SidebarOverlay,
  ArticleContainer,
  BackButton,
  ArticleHeader,
  ArticleTitle,
  ArticleMeta,
  MetaItem,
  CategoryBadge,
  AuthorName,
  ArticleActions,
  ActionButton,
  ArticleMediaContainer,
  ArticleImage,
  ArticleVideo,
  ArticleContent,
  ArticleDescription,
  LoadingContainer,
  LoadingSpinner,
  ErrorContainer,
  ErrorIcon,
  ErrorTitle,
  ErrorMessage,
  RetryButton,
} from "./elements";

// Utility function for universal video embedding
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

interface ViewArticlePageProps {
  sidebarOpen: boolean;
  onSidebarToggle: () => void;
  isMobile?: boolean;
  articleId: string;
}

export const ViewArticlePage: FC<ViewArticlePageProps> = ({
  sidebarOpen,
  onSidebarToggle,
  isMobile = false,
  articleId,
}) => {
  const router = useRouter();
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch article data
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/articles/${articleId}`);

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error("Article not found");
          } else {
            throw new Error("Failed to fetch article");
          }
        }

        const data = await response.json();
        setArticle(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (articleId) {
      fetchArticle();
    }
  }, [articleId]);

  const handleBack = () => {
    router.push("/news-dashboard/articles");
  };

  const handleEdit = () => {
    router.push(`/news-dashboard/articles/edit/${articleId}`);
  };

  const handleArchive = async () => {
    try {
      const response = await fetch(`/api/articles/${articleId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...article,
          status: "archived",
        }),
      });

      if (response.ok) {
        setArticle((prev) => (prev ? { ...prev, status: "archived" } : null));
      }
    } catch (err) {
      console.error("Error archiving article:", err);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article?.title,
          text: article?.description,
          url: window.location.href,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const handleOverlayClick = () => {
    if (isMobile) {
      onSidebarToggle();
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatViews = (views: number | undefined) => {
    if (!views) return "0";
    return views.toLocaleString();
  };

  return (
    <ViewArticleRoot>
      {/* Mobile overlay */}
      <SidebarOverlay
        show={isMobile && sidebarOpen}
        onClick={handleOverlayClick}
      />

      <Sidebar
        isOpen={sidebarOpen}
        onToggle={onSidebarToggle}
        navSections={[
          {
            title: "Overview",
            items: [
              {
                icon: <Home size={20} />,
                text: "Dashboard",
                href: "/news-dashboard",
              },
            ],
          },
          {
            title: "News Management",
            items: [
              {
                icon: <FileText size={20} />,
                text: "All Articles",
                href: "/news-dashboard/articles",
                active: true,
              },
              {
                icon: <Plus size={20} />,
                text: "Create Article",
                href: "/news-dashboard/create-article",
              },
              {
                icon: <BarChart3 size={20} />,
                text: "Analytics",
                href: "/news-dashboard/analytics",
                active: false,
              },
            ],
          },
          {
            title: "Preview",
            items: [
              {
                icon: <EyeIcon size={20} />,
                text: "News Preview",
                href: "/news-preview",
                active: false,
              },
            ],
          },
        ]}
        userName="John Doe"
        userRole="Editor"
        userInitials="JD"
        collapsible={!isMobile}
        navItems={[]}
      />

      <Header
        title="View Article"
        onMenuToggle={onSidebarToggle}
        onSearch={() => {}}
        userName="John Doe"
        userRole="Editor"
        userInitials="JD"
        notifications={3}
        isSidebarOpen={sidebarOpen}
        isMobile={isMobile}
      />

      <MainContent sidebarOpen={sidebarOpen} isMobile={isMobile}>
        {/* Loading State */}
        {loading && (
          <LoadingContainer>
            <LoadingSpinner />
            <div>Loading article...</div>
          </LoadingContainer>
        )}

        {/* Error State */}
        {error && !loading && (
          <ErrorContainer>
            <ErrorIcon>
              <FileText size={48} />
            </ErrorIcon>
            <ErrorTitle>Error Loading Article</ErrorTitle>
            <ErrorMessage>{error}</ErrorMessage>
            <RetryButton onClick={() => window.location.reload()}>
              Try Again
            </RetryButton>
          </ErrorContainer>
        )}

        {/* Article Content */}
        {article && !loading && !error && (
          <ArticleContainer>
            {/* Back Button */}
            <BackButton onClick={handleBack}>
              <ArrowLeft size={20} />
              Back to Articles
            </BackButton>

            {/* Article Header */}
            <ArticleHeader>
              <ArticleTitle>{article.title}</ArticleTitle>

              <ArticleMeta>
                <MetaItem>
                  <Calendar size={16} />
                  {formatDate(article.date)}
                </MetaItem>

                <MetaItem>
                  <User size={16} />
                  <AuthorName>{article.author}</AuthorName>
                </MetaItem>

                {article.views !== undefined && (
                  <MetaItem>
                    <Eye size={16} />
                    {formatViews(article.views)} views
                  </MetaItem>
                )}

                {article.readTime && (
                  <MetaItem>
                    <Clock size={16} />
                    {article.readTime}
                  </MetaItem>
                )}
                {article.status && (
                  <CategoryBadge category={`status-${article.status}`}>
                    {/* {article.status === "archived" ?  : } */}
                    {article.status.charAt(0).toUpperCase() + article.status.slice(1)}
                  </CategoryBadge>
                )}
              </ArticleMeta>

              {/* Article Actions */}
              <ArticleActions>
                <ActionButton variant="edit" onClick={handleEdit}>
                  <Edit size={16} />
                  Edit Article
                </ActionButton>

                <ActionButton
                  variant="archive"
                  onClick={handleArchive}
                  disabled={article.status === "archived"}
                >
                  <Archive size={16} />
                  {article.status === "archived" ? "Archived" : "Archive"}
                </ActionButton>
                <ActionButton variant="share" onClick={handleShare}>
                  <Share2 size={16} />
                  Share
                </ActionButton>
              </ArticleActions>
            </ArticleHeader>

            {/* Media Content */}
            {(article.videoUrl || article.newsVideo || article.newsImage) && (
              <ArticleMediaContainer>
                {article.videoUrl ? (
                  <ArticleVideo>
                    {getVideoEmbedDetails(article.videoUrl).type === "video" ? (
                      <video
                        controls
                        poster={article.newsImage}
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: "12px",
                          objectFit: "cover",
                        }}
                      >
                        <source
                          src={getVideoEmbedDetails(article.videoUrl).src}
                          type="video/mp4"
                        />
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <>
                        <iframe
                          width="100%"
                          height="100%"
                          src={getVideoEmbedDetails(article.videoUrl).src}
                          title="Video Preview"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          style={{ borderRadius: "12px" }}
                        />
                        {/drive\.google\.com/.test(article.videoUrl) && (
                          <div
                            style={{
                              fontSize: "12px",
                              color: "#64748b",
                              textAlign: "center",
                              marginTop: "8px",
                            }}
                          >
                            Google Drive: Must be publicly shared
                          </div>
                        )}
                      </>
                    )}
                  </ArticleVideo>
                ) : article.newsVideo ? (
                  <ArticleVideo>
                    <video
                      controls
                      poster={article.newsImage}
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "12px",
                        objectFit: "cover",
                      }}
                    >
                      <source src={article.newsVideo} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </ArticleVideo>
                ) : article.newsImage ? (
                  <ArticleImage backgroundImage={article.newsImage} />
                ) : null}
              </ArticleMediaContainer>
            )}

            {/* Article Description/Content */}
            <ArticleContent>
              <ArticleDescription>{article.description}</ArticleDescription>
            </ArticleContent>
          </ArticleContainer>
        )}
      </MainContent>
    </ViewArticleRoot>
  );
};

export default ViewArticlePage;