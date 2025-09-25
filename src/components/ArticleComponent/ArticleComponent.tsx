// src/components/article-card/ArticleCard.tsx
"use client";

import { FC } from "react";
import { Eye, Edit, Archive, RotateCcw, Trash2, FileText, Calendar } from "lucide-react";
import { ArticleCardProps, NewsArticle, ViewMode, Category } from "./interface";
import {
  ArticleComponent,
  ArticleContent,
  ArticleImage,
  ArticleHeader,
  ArticleTitle,
  ArticleActions,
  ActionButton,
  ArticleMeta,
  MetaItem,
  CategoryBadge,
  ArticleDescription,
} from "./elements";

// Utility function to truncate text
const truncateText = (text: string, limit: number): string => {
  if (!text) return "";
  return text.length > limit ? `${text.slice(0, limit)}...` : text;
};

// Utility function to get video embed details
const getVideoEmbedDetails = (url: string) => {
  // Helper to normalize URL (add https:// if missing)
  const normalizedUrl = url.startsWith("http") ? url : `https://${url}`;

  // Direct video file check (e.g., .mp4, .webm)
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

  // Fallback: Generic iframe for other URLs
  return { type: "iframe" as const, src: normalizedUrl };
};

export const ArticleCard: FC<ArticleCardProps> = ({
  article,
  viewMode,
  categories,
  onEdit,
  onArchive,
  onView,
  onRestore,
  onDelete,
}) => {
  const titleLimit = viewMode === "grid" ? 60 : 80;
  const descriptionLimit = viewMode === "grid" ? 120 : 150;
  const isArchived = article.status === "archived";

  const categoryObj = categories.find(cat => cat._id === article.category);
  const categoryName = categoryObj?.categoryName || article.category;

  const videoEmbedDetails = article.videoUrl
    ? getVideoEmbedDetails(article.videoUrl)
    : null;

  return (
    <ArticleComponent viewMode={viewMode} isArchived={isArchived}>
      <ArticleImage
        backgroundImage={article.newsImage}
        viewMode={viewMode}
        hasVideo={!!article.newsVideo || !!article.videoUrl}
        isArchived={isArchived}
      >
        {videoEmbedDetails ? (
          videoEmbedDetails.type === "video" ? (
            <video
              width="100%"
              height="100%"
              src={videoEmbedDetails.src}
              controls
              style={{ borderRadius: "8px", objectFit: "cover" }}
            >
              Your browser does not support the video tag.
            </video>
          ) : (
            <>
              <iframe
                width="100%"
                height="100%"
                src={videoEmbedDetails.src}
                title="Video Preview"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ borderRadius: "8px" }}
              />
              {/drive\.google\.com/.test(article.videoUrl) && (
                <div
                  style={{
                    fontSize: "10px",
                    color: "#64748b",
                    textAlign: "center",
                    marginTop: "4px",
                  }}
                >
                  Drive: Must be publicly shared
                </div>
              )}
            </>
          )
        ) : !article.newsImage && !article.newsVideo ? (
          <FileText size={32} />
        ) : null}
      </ArticleImage>

      <ArticleContent viewMode={viewMode}>
        <ArticleHeader>
          <ArticleTitle title={article.title} isArchived={isArchived}>
            {truncateText(article.title, titleLimit)}
          </ArticleTitle>
          <ArticleActions>
            <ActionButton
              variant="view"
              onClick={() => onView(article._id)}
              title="View Article"
            >
              <Eye size={16} />
            </ActionButton>
            {isArchived ? (
              <>
                <ActionButton
                  variant="restore"
                  onClick={() => onRestore?.(article._id)}
                  title="Restore Article"
                >
                  <RotateCcw size={16} />
                </ActionButton>
                <ActionButton
                  variant="delete"
                  onClick={() => onDelete?.(article._id)}
                  title="Delete Permanently"
                >
                  <Trash2 size={16} />
                </ActionButton>
              </>
            ) : (
              <>
                <ActionButton
                  variant="edit"
                  onClick={() => onEdit(article._id)}
                  title="Edit Article"
                >
                  <Edit size={16} />
                </ActionButton>
                <ActionButton
                  variant="archive"
                  onClick={() => onArchive(article._id)}
                  title="Archive Article"
                >
                  <Archive size={16} />
                </ActionButton>
              </>
            )}
          </ArticleActions>
        </ArticleHeader>

        <ArticleMeta>
          <CategoryBadge category={categoryName}>
            {categoryName}
          </CategoryBadge>
          <MetaItem>
            <Calendar size={14} />
            {new Date(article.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </MetaItem>
          {article.views !== undefined && (
            <MetaItem>
              <Eye size={14} />
              {article.views.toLocaleString()}
            </MetaItem>
          )}
          {article.readTime && (
            <MetaItem>
              <Calendar size={14} />
              {article.readTime}
            </MetaItem>
          )}
        </ArticleMeta>

        <ArticleDescription viewMode={viewMode} isArchived={isArchived}>
          {truncateText(article.description, descriptionLimit)}
        </ArticleDescription>
      </ArticleContent>
    </ArticleComponent>
  );
};

export default ArticleCard;