"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { ImageIcon, Video, X } from "lucide-react";
import {
  SectionTitle,
  MediaUploadContainer,
  MediaUploadBox,
  FormField,
  Label,
  Input,
  ErrorMessage,
} from "./elements";
import { MediaUploadSectionProps } from "./interface";
import { VideoEmbed } from "../VideoEmbed/VideoEmbed";

export const MediaUploadSection: React.FC<MediaUploadSectionProps> = ({
  formData,
  errors,
  uploadError,
  onImageUpload,
  onVideoUpload,
  onVideoUrlChange,
  onRemoveMedia,
}) => {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    onImageUpload(file || null);
  };

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    onVideoUpload(file || null);
  };

  const removeMedia = () => {
    onRemoveMedia();
    if (imageInputRef.current) imageInputRef.current.value = "";
    if (videoInputRef.current) videoInputRef.current.value = "";
  };

  return (
    <div style={{ marginBottom: "32px" }}>
      <SectionTitle>Media</SectionTitle>
      {uploadError && <ErrorMessage style={{ marginBottom: "16px" }}>{uploadError}</ErrorMessage>}
      
      <MediaUploadContainer>
        {/* Image Upload */}
        <div>
          <input
            ref={imageInputRef}
            type="file"
            accept="image/png,image/jpeg,image/jpg"
            onChange={handleImageUpload}
            style={{ display: "none" }}
          />
          <MediaUploadBox
            hasMedia={!!formData.newsImage}
            onClick={() => !formData.newsVideo && !formData.videoUrl && imageInputRef.current?.click()}
          >
            {formData.newsImage ? (
              <div style={{ position: "relative", borderRadius: "8px", overflow: "hidden", height: "100%", width: "100%" }}>
                <Image
                  src={formData.newsImage}
                  alt="Preview"
                  width={300}
                  height={200}
                  style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "8px" }}
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeMedia();
                  }}
                  style={{
                    position: "absolute",
                    top: "8px",
                    right: "8px",
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    border: "none",
                    backgroundColor: "rgba(0,0,0,0.7)",
                    color: "white",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <X size={12} />
                </button>
              </div>
            ) : (
              <>
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    backgroundColor: "#f1f5f9",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 12px",
                    color: "#64748b",
                  }}
                >
                  <ImageIcon size={20} />
                </div>
                <div style={{ fontSize: "14px", color: "#64748b", fontWeight: 500, marginBottom: "4px" }}>
                  Upload Image
                </div>
                <div style={{ fontSize: "12px", color: "#94a3b8" }}>PNG, JPG up to 5MB</div>
              </>
            )}
          </MediaUploadBox>
        </div>

        {/* Video Upload */}
        <div>
          <input
            ref={videoInputRef}
            type="file"
            accept="video/mp4,video/avi"
            onChange={handleVideoUpload}
            style={{ display: "none" }}
          />
          <MediaUploadBox
            hasMedia={!!formData.newsVideo}
            onClick={() => !formData.newsImage && !formData.videoUrl && videoInputRef.current?.click()}
          >
            {formData.newsVideo ? (
              <div style={{ position: "relative", borderRadius: "8px", overflow: "hidden", height: "100%", width: "100%" }}>
                <video
                  src={formData.newsVideo}
                  controls
                  style={{ width: "100%", height: "100%", borderRadius: "8px" }}
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeMedia();
                  }}
                  style={{
                    position: "absolute",
                    top: "8px",
                    right: "8px",
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    border: "none",
                    backgroundColor: "rgba(0,0,0,0.7)",
                    color: "white",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <X size={12} />
                </button>
              </div>
            ) : (
              <>
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    backgroundColor: "#f1f5f9",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 12px",
                    color: "#64748b",
                  }}
                >
                  <Video size={20} />
                </div>
                <div style={{ fontSize: "14px", color: "#64748b", fontWeight: 500, marginBottom: "4px" }}>
                  Upload Video
                </div>
                <div style={{ fontSize: "12px", color: "#94a3b8" }}>MP4, AVI up to 50MB</div>
              </>
            )}
          </MediaUploadBox>
        </div>
      </MediaUploadContainer>

      {/* Video URL Input */}
      <FormField fullWidth style={{ marginTop: "20px" }}>
        <Label>Video URL</Label>
        <Input
          type="text"
          placeholder="Enter video URL (YouTube, Vimeo, Google Drive, or direct link)..."
          value={formData.videoUrl}
          onChange={(e) => onVideoUrlChange(e.target.value)}
        />
        {errors.videoUrl && <ErrorMessage>{errors.videoUrl}</ErrorMessage>}
        
        {formData.videoUrl && !errors.videoUrl && (
          <VideoEmbed 
            url={formData.videoUrl} 
            onRemove={removeMedia}
          />
        )}
      </FormField>
    </div>
  );
};