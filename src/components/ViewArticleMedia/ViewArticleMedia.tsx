"use client";

import { FC } from "react";
import { ViewArticleMediaProps } from "./interface";
import { ArticleMediaContainer, ArticleImage, ArticleVideo } from "./elements";

export const ViewArticleMedia: FC<ViewArticleMediaProps> = ({ videoUrl, newsVideo, newsImage, getVideoEmbedDetails }) => {
  return (
    <ArticleMediaContainer>
      {videoUrl ? (
        <ArticleVideo>
          {getVideoEmbedDetails(videoUrl).type === "video" ? (
            <video
              controls
              poster="{newsImage}"
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "12px",
                objectFit: "cover",
              }}
            >
              <source src={getVideoEmbedDetails(videoUrl).src} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <>
              <iframe
                width="100%"
                height="100%"
                src={getVideoEmbedDetails(videoUrl).src}
                title="Video Preview"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ borderRadius: "12px" }}
              />
              {/drive\.google\.com/.test(videoUrl) && (
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
      ) : newsVideo ? (
        <ArticleVideo>
          <video
            controls
            poster="{newsImage}"
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "12px",
              objectFit: "cover",
            }}
          >
            <source src={newsVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </ArticleVideo>
      ) : newsImage ? (
        <ArticleImage backgroundImage={newsImage} />
      ) : null}
    </ArticleMediaContainer>
  );
};

export default ViewArticleMedia;