"use client";

import { FC, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Home,
  FileText,
  Plus,
  BarChart3,
  EyeIcon,
} from "lucide-react";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { Header } from "@/components/header/Header";
import { NewsArticle, ViewArticlePageProps as ViewArticlePagePropsInterface } from "./interface";
import {
  ViewArticleRoot,
  MainContent,
  SidebarOverlay,
  ArticleContainer,
} from "./elements";
import { ViewArticleHeader } from "@/components/ViewArticleHeader/ViewArticleHeader";
import { ViewArticleMedia } from "@/components/ViewArticleMedia/ViewArticleMedia";
import { ViewArticleContent } from "@/components/ViewArticleContent/ViewArticleContent";
import { ViewArticleControls } from "@/components/ViewArticleControls/ViewArticleControls";
import { ViewArticleLoading } from "@/components/ViewArticleLoading/ViewArticleLoading";
import { ViewArticleError } from "@/components/ViewArticleError/ViewArticleError";
import { navSections, userInitialConfig, userName, userRoleConfig } from "@/config/navItems";

const getVideoEmbedDetails = (url: string) => {
  const normalizedUrl = url.startsWith("http") ? url : `https://${url}`;
  const directVideoRegex = /\.(mp4|avi|mov|wmv|flv|webm|ogv|mkv)$/i;
  if (directVideoRegex.test(normalizedUrl)) {
    return { type: "video" as const, src: normalizedUrl };
  }
  const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const youtubeMatch = normalizedUrl.match(youtubeRegex);
  if (youtubeMatch) {
    return { type: "iframe" as const, src: `https://www.youtube.com/embed/${youtubeMatch[1]}` };
  }
  const vimeoRegex = /(?:vimeo\.com\/|player\.vimeo\.com\/video\/)(\d+)/;
  const vimeoMatch = normalizedUrl.match(vimeoRegex);
  if (vimeoMatch) {
    return { type: "iframe" as const, src: `https://player.vimeo.com/video/${vimeoMatch[1]}` };
  }
  const dailymotionRegex = /(?:dailymotion\.com\/video\/|dailymotion\.com\/embed\/video\/)([a-zA-Z0-9]+)/;
  const dailymotionMatch = normalizedUrl.match(dailymotionRegex);
  if (dailymotionMatch) {
    return { type: "iframe" as const, src: `https://www.dailymotion.com/embed/video/${dailymotionMatch[1]}` };
  }
  const driveRegex = /\/file\/d\/([a-zA-Z0-9-_]+)(?:\/[^\/\s]*)?|open\?id=([a-zA-Z0-9-_]+)/;
  const driveMatch = normalizedUrl.match(driveRegex);
  if (driveMatch) {
    const fileId = driveMatch[1] || driveMatch[2];
    return { type: "iframe" as const, src: `https://drive.google.com/file/d/${fileId}/preview` };
  }
  return { type: "iframe" as const, src: normalizedUrl };
};

export const ViewArticlePage: FC<ViewArticlePagePropsInterface> = ({
  sidebarOpen,
  onSidebarToggle,
  isMobile = false,
  articleId,
}) => {
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
      <SidebarOverlay show={isMobile && sidebarOpen} onClick={handleOverlayClick} />
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={onSidebarToggle}
        navSections={navSections}
        userName={userName}
        userRole={userRoleConfig}
        userInitials={userInitialConfig}
        collapsible={!isMobile}
        navItems={[]}
      />
      <Header
        title="View Article"
        onMenuToggle={onSidebarToggle}
        onSearch={() => {}}
        userName={userName}
        userRole={userRoleConfig}
        userInitials={userInitialConfig}
        notifications={3}
        isSidebarOpen={sidebarOpen}
        isMobile={isMobile}
      />
      <MainContent sidebarOpen={sidebarOpen} isMobile={isMobile}>
        {loading && <ViewArticleLoading />}
        {error && !loading && <ViewArticleError error={error} />}
        {article && !loading && !error && (
          <ArticleContainer>
            <ViewArticleControls
              articleId={articleId}
              status={article.status}
              title={article.title}
              description={article.description}
              handleArchive={handleArchive}
            />
            <ViewArticleHeader
              title={article.title}
              date={article.date}
              author={article.author}
              views={article.views}
              readTime={article.readTime}
              status={article.status}
              formatDate={formatDate}
              formatViews={formatViews}
            />
            {(article.videoUrl || article.newsVideo || article.newsImage) && (
              <ViewArticleMedia
                videoUrl={article.videoUrl}
                newsVideo={article.newsVideo}
                newsImage={article.newsImage}
                getVideoEmbedDetails={getVideoEmbedDetails}
              />
            )}
            <ViewArticleContent description={article.description} />
          </ArticleContainer>
        )}
      </MainContent>
    </ViewArticleRoot>
  );
};

export default ViewArticlePage;