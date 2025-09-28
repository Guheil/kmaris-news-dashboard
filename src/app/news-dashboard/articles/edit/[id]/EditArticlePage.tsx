// EditArticlePage.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Home,
  FileText,
  Plus,
  ArchiveIcon,
  EyeIcon,
  BarChart3,
} from "lucide-react";
import Swal from "sweetalert2";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { Header } from "@/components/header/Header";
import { ArticleFormBasicInfo } from "@/components/ArticleFormBasicInfo/ArticleFormBasicInfo";
import { MediaUploadSection } from "@/components/MediaUploadSection/MediaUploadSection";
import { ArticleFormActions } from "@/components/ArticleFormActions/ArticleFormActions";
import { LoadingState } from "@/components/LoadingState/LoadingState";
import {
  EditArticleRoot,
  SidebarOverlay,
  MainContent,
  FormContainer,
  FormHeader,
  FormTitle,
  FormSubtitle,
  ErrorMessage,
} from "./elements";
import {
  EditArticlePageProps,
  EditArticleFormData,
  Category,
} from "./interface";
import { navSections, userName, userRoleConfig, userInitialConfig } from "@/config/navItems";

export const EditArticlePage: React.FC<EditArticlePageProps> = ({
  sidebarOpen,
  onSidebarToggle,
  isMobile,
  articleId,
}) => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [categories, setCategories] = useState<Category[]>([]);
  
  const [formData, setFormData] = useState<EditArticleFormData>({
    title: "",
    author: "",
    category: "",
    description: "",
    status: "draft",
    newsImage: null,
    newsVideo: null,
    videoUrl: "",
  });

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories");
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${await response.text()}`);
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Fetch article data on component mount
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/articles/${articleId}`);
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ error: "Unknown error" }));
          throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
        }
        const data = await response.json();
        setFormData({
          title: data.title || "",
          author: data.author || "",
          category: data.category || "",
          description: data.description || "",
          status: data.status || "draft",
          newsImage: data.newsImage || null,
          newsVideo: data.newsVideo || null,
          videoUrl: data.videoUrl || "",
        });
      } catch {
        setSubmitError("Failed to load article");
      } finally {
        setLoading(false);
      }
    };

    if (articleId) {
      fetchArticle();
    }
  }, [articleId]);

  const handleInputChange = (field: keyof EditArticleFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleImageUpload = (file: File | null) => {
    if (!file) {
      setUploadError("No file selected");
      return;
    }

    const validTypes = ["image/png", "image/jpeg", "image/jpg"];
    const maxSize = 5 * 1024 * 1024;
    if (!validTypes.includes(file.type)) {
      setUploadError("Only PNG and JPG files are allowed");
      return;
    }
    if (file.size > maxSize) {
      setUploadError("Image size must be less than 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result as string;
      setFormData((prev) => ({
        ...prev,
        newsImage: base64String,
        newsVideo: null,
        videoUrl: "",
      }));
      setUploadError(null);
    };
    reader.onerror = () => {
      setUploadError("Failed to read image file");
    };
    reader.readAsDataURL(file);
  };

  const handleVideoUpload = (file: File | null) => {
    if (!file) {
      setUploadError("No file selected");
      return;
    }

    const validTypes = ["video/mp4", "video/avi"];
    const maxSize = 50 * 1024 * 1024;
    if (!validTypes.includes(file.type)) {
      setUploadError("Only MP4 and AVI files are allowed");
      return;
    }
    if (file.size > maxSize) {
      setUploadError("Video size must be less than 50MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result as string;
      setFormData((prev) => ({
        ...prev,
        newsVideo: base64String,
        newsImage: null,
        videoUrl: "",
      }));
      setUploadError(null);
    };
    reader.onerror = () => {
      setUploadError("Failed to read video file");
    };
    reader.readAsDataURL(file);
  };

  const handleVideoUrlChange = (value: string) => {
    const supportedRegex = /^(https?:\/\/)?((www\.)?(youtube\.com|youtu\.be|vimeo\.com|player\.vimeo\.com|dailymotion\.com|www\.dailymotion\.com|drive\.google\.com)|.*\.(mp4|avi|mov|wmv|flv|webm|ogv|mkv))/i;
    if (value && !supportedRegex.test(value)) {
      setErrors((prev) => ({ ...prev, videoUrl: "Please enter a valid video URL (YouTube, Vimeo, Dailymotion, Google Drive, or direct video link)" }));
    } else {
      setErrors((prev) => ({ ...prev, videoUrl: "" }));
    }
    setFormData((prev) => ({
      ...prev,
      videoUrl: value,
      newsImage: null,
      newsVideo: null,
    }));
  };

  const handleRemoveMedia = () => {
    setFormData((prev) => ({
      ...prev,
      newsImage: null,
      newsVideo: null,
      videoUrl: "",
    }));
    setUploadError(null);
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }
    if (!formData.author.trim()) {
      newErrors.author = "Author is required";
    }
    if (!formData.category) {
      newErrors.category = "Category is required";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.trim().length < 50) {
      newErrors.description = "Description must be at least 50 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async (status: "draft" | "published") => {
    if (!validateForm()) return;

    try {
      setSaving(true);
      setSubmitError(null);

      const updateData: EditArticleFormData = {
        title: formData.title,
        author: formData.author,
        category: formData.category,
        description: formData.description,
        status,
        newsImage: formData.newsImage,
        newsVideo: formData.newsVideo,
        videoUrl: formData.videoUrl,
      };

      const response = await fetch(`/api/articles/${articleId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        throw new Error("Failed to update article");
      }

      await Swal.fire({
        title: "Success!",
        text: `Article ${status === "draft" ? "saved as draft" : "published"} successfully!`,
        icon: "success",
        confirmButtonText: "OK",
        timer: 3000,
        timerProgressBar: true,
      });
      router.push("/news-dashboard/articles");
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "An error occurred");
      await Swal.fire({
        title: "Error!",
        text: submitError || "Failed to update article. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setSaving(false);
    }
  };

  const handlePreview = () => {
    window.open(`/preview/article/${articleId}`, "_blank");
  };

  const handleBack = () => {
    router.push("/news-dashboard/articles");
  };

  const handleOverlayClick = () => {
    if (isMobile) {
      onSidebarToggle();
    }
  };

  const handleSearch = (query: string) => {
    console.log("Search in edit page:", query);
  };

  if (loading) {
    return (
      <EditArticleRoot>
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
          <LoadingState message="Loading article..." />
        </MainContent>
      </EditArticleRoot>
    );
  }

  return (
    <EditArticleRoot>
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
        <FormContainer>
          <FormHeader>
            <FormTitle>Edit Article</FormTitle>
            <FormSubtitle>Update the article details below and save your changes</FormSubtitle>
          </FormHeader>

          <ArticleFormBasicInfo
            formData={{
              title: formData.title,
              author: formData.author,
              category: formData.category,
              description: formData.description,
              status: formData.status,
            }}
            errors={errors}
            categories={categories}
            onInputChange={handleInputChange}
          />

          <MediaUploadSection
            formData={{
              newsImage: formData.newsImage,
              newsVideo: formData.newsVideo,
              videoUrl: formData.videoUrl,
            }}
            errors={errors}
            uploadError={uploadError}
            onImageUpload={handleImageUpload}
            onVideoUpload={handleVideoUpload}
            onVideoUrlChange={handleVideoUrlChange}
            onRemoveMedia={handleRemoveMedia}
          />

          <ArticleFormActions
            saving={saving}
            onCancel={handleBack}
            onPreview={handlePreview}
            onSaveDraft={() => handleSave("draft")}
            onPublish={() => handleSave("published")}
            showPreview={false}
            showSaveDraft={false}
          />

          {submitError && (
            <ErrorMessage style={{ display: "block", marginTop: "16px" }}>
              {submitError}
            </ErrorMessage>
          )}
        </FormContainer>
      </MainContent>
    </EditArticleRoot>
  );
};

export default EditArticlePage;