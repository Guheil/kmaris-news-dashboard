// VideoEmbed.tsx
"use client";

import React from "react";
import { X } from "lucide-react";
import { VideoEmbedProps } from "./interface";
import { VideoContainer, RemoveButton, GoogleDriveNote, VideoFrame, IFrame } from "./elements";

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

export const VideoEmbed: React.FC<VideoEmbedProps> = ({ url, onRemove }) => {
  const videoDetails = getVideoEmbedDetails(url);
  const isGoogleDrive = /drive\.google\.com/.test(url);

  return (
    <VideoContainer>
      {videoDetails.type === "video" ? (
        <VideoFrame
          src={videoDetails.src}
          controls
        />
      ) : (
        <>
          <IFrame
            src={videoDetails.src}
            title="Video Preview"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          {isGoogleDrive && (
            <GoogleDriveNote>
              Google Drive: Must be publicly shared
            </GoogleDriveNote>
          )}
        </>
      )}
      <RemoveButton
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
        size="small"
      >
        <X size={12} />
      </RemoveButton>
    </VideoContainer>
  );
};
