"use client";

import React from "react";
import Image from "next/image";
import { ArticleCardProps } from "./interface";
import {
  FeaturedArticleRoot,
  FeaturedTitle,
  FeaturedMeta,
  FeaturedCategory,
  FeaturedImageWrapper,
  ListItemRoot,
  ListItemTextContent,
  ListItemTitle,
  ListItemSummary,
  ListItemMeta,
  ListItemCategory,
  ListItemImageWrapper,
  GridCardRoot,
  GridCardOverlay,
  GridCardTitle,
  GridCardMeta,
  GridCardCategory,
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

export function ArticleCard({ article, variant, truncate = true }: ArticleCardProps) {
  // Determine if there's a video URL and get embed details
  const videoEmbedDetails = article.videoUrl ? getVideoEmbedDetails(article.videoUrl) : null;
  const hasVideoUrl = !!article.videoUrl;

  // For image fallback, use imageUrl if no videoUrl
  const imageUrl = hasVideoUrl ? null : article.imageUrl;

  if (variant === "featured") {
    return (
      <FeaturedArticleRoot href={`/News/${article.id}`}>
        <div>
          <FeaturedTitle>{article.title}</FeaturedTitle>
          <FeaturedMeta>
            <FeaturedCategory>{article.category}</FeaturedCategory>
            <span>|</span>
            <span>{article.readTime}</span>
          </FeaturedMeta>
        </div>
        <FeaturedImageWrapper>
          {hasVideoUrl && videoEmbedDetails ? (
            videoEmbedDetails.type === "video" ? (
              <video
                src={videoEmbedDetails.src}
                controls
                style={{ 
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%", 
                  height: "100%", 
                  objectFit: "cover", 
                  borderRadius: "12px" 
                }}
              >
                Your browser does not support the video tag.
              </video>
            ) : (
              <iframe
                src={videoEmbedDetails.src}
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
            )
          ) : (
            <Image
              src={imageUrl || "/placeholder-image.jpg"}
              alt={article.title}
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 69vw, 50vw"
              priority
            />
          )}
        </FeaturedImageWrapper>
      </FeaturedArticleRoot>
    );
  }

  if (variant === "list") {
    const truncatedSummary = truncate && article.summary
      ? article.summary.split(" ").slice(0, 20).join(" ") +
        (article.summary.split(" ").length > 20 ? "..." : "")
      : article.summary;

    return (
      <ListItemRoot href={`/News/${article.id}`}>
        <ListItemTextContent>
          <ListItemTitle>{article.title}</ListItemTitle>
          {truncatedSummary && <ListItemSummary>{truncatedSummary}</ListItemSummary>}
          <ListItemMeta>
            <ListItemCategory>{article.category}</ListItemCategory>
            <span>|</span>
            <span>{article.readTime}</span>
          </ListItemMeta>
        </ListItemTextContent>
        <ListItemImageWrapper>
          {hasVideoUrl && videoEmbedDetails ? (
            videoEmbedDetails.type === "video" ? (
              <video
                src={videoEmbedDetails.src}
                controls
                style={{ 
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%", 
                  height: "100%", 
                  objectFit: "cover", 
                  borderRadius: "8px" 
                }}
              >
                Your browser does not support the video tag.
              </video>
            ) : (
              <iframe
                src={videoEmbedDetails.src}
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
                  borderRadius: "8px",
                  border: "none"
                }}
              />
            )
          ) : (
            <Image
              src={imageUrl || "/placeholder-image.jpg"}
              alt={article.title}
              fill
              style={{ objectFit: "cover" }}
              sizes="120px"
            />
          )}
        </ListItemImageWrapper>
      </ListItemRoot>
    );
  }

  if (variant === "grid") {
    return (
      <GridCardRoot href={`/News/${article.id}`}>
        {hasVideoUrl && videoEmbedDetails ? (
          <>
            {videoEmbedDetails.type === "video" ? (
              <video
                src={videoEmbedDetails.src}
                controls
                style={{ 
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%", 
                  height: "100%", 
                  objectFit: "cover",
                  borderRadius: "12px"
                }}
              >
                Your browser does not support the video tag.
              </video>
            ) : (
              <iframe
                src={videoEmbedDetails.src}
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
                  border: "none",
                  borderRadius: "12px"
                }}
              />
            )}
            <GridCardOverlay>
              <GridCardTitle>{article.title}</GridCardTitle>
              <GridCardMeta>
                <GridCardCategory>{article.category}</GridCardCategory>
                <span>|</span>
                <span>{article.readTime}</span>
              </GridCardMeta>
            </GridCardOverlay>
          </>
        ) : (
          <>
            <Image
              src={imageUrl || "/placeholder-image.jpg"}
              alt={article.title}
              fill
              style={{ objectFit: "cover" }}
              sizes="(max-width: 640px) 100vw, 50vw"
            />
            <GridCardOverlay>
              <GridCardTitle>{article.title}</GridCardTitle>
              <GridCardMeta>
                <GridCardCategory>{article.category}</GridCardCategory>
                <span>|</span>
                <span>{article.readTime}</span>
              </GridCardMeta>
            </GridCardOverlay>
          </>
        )}
      </GridCardRoot>
    );
  }

  return null;
}