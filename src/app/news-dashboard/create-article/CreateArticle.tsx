// CreateArticle.tsx (refactored)
"use client";

import { FC, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Home, FileText, BarChart3, Plus, EyeIcon } from "lucide-react";
import Swal from "sweetalert2";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { Header } from "@/components/header/Header";
import { LoadingState } from "@/components/LoadingState/LoadingState";
import { ArticleFormBasicInfo } from "@/components/ArticleFormBasicInfo/ArticleFormBasicInfo";
import { MediaUploadSection } from "@/components/MediaUploadSection/MediaUploadSection";
import { ArticleFormActions } from "@/components/ArticleFormActions/ArticleFormActions";
import {
  CreateArticlePageProps,
  ArticleFormData,
  FormErrors,
  Category,
  BasicInfoFormData,
  MediaFormData,
} from "./interface";
import {
  CreateArticleRoot,
  MainContent,
  SidebarOverlay,
  FormContainer,
  FormHeader,
  FormTitle,
  FormSubtitle,
  ErrorMessage,
} from "./elements";
import { navSections, userName, userRoleConfig, userInitialConfig } from "@/config/navItems";

export const CreateArticlePage: FC<CreateArticlePageProps> = ({
  sidebarOpen,
  onSidebarToggle,
  isMobile = false,
}) => {
  const router = useRouter();

  const [formData, setFormData] = useState<ArticleFormData>({
    title: "",
    author: "",
    category: "",
    description: "",
    newsImage: "",
    newsVideo: "",
    videoUrl: "",
    status: "draft",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [categoryError, setCategoryError] = useState<string | null>(null);

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoadingCategories(true);
        const response = await fetch("/api/categories");
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${await response.text()}`);
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategoryError("Failed to load categories. Please try again.");
      } finally {
        setIsLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  const handleInputChange = (field: keyof ArticleFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleImageUpload = (file: File | null) => {
    if (!file) return;

    const validTypes = ["image/png", "image/jpeg", "image/jpg"];
    const maxSize = 5 * 1024 * 1024;

    if (!validTypes.includes(file.type)) {
      setSubmitError("Only PNG and JPG files are allowed");
      return;
    }
    if (file.size > maxSize) {
      setSubmitError("Image size must be less than 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setFormData((prev) => ({
        ...prev,
        newsImage: e.target?.result as string,
        newsVideo: "",
        videoUrl: "",
      }));
      setSubmitError(null);
    };
    reader.onerror = () => {
      setSubmitError("Failed to read image file");
    };
    reader.readAsDataURL(file);
  };

  const handleVideoUpload = (file: File | null) => {
    if (!file) return;

    const validTypes = ["video/mp4", "video/avi"];
    const maxSize = 50 * 1024 * 1024;

    if (!validTypes.includes(file.type)) {
      setSubmitError("Only MP4 and AVI files are allowed");
      return;
    }
    if (file.size > maxSize) {
      setSubmitError("Video size must be less than 50MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setFormData((prev) => ({
        ...prev,
        newsVideo: e.target?.result as string,
        newsImage: "",
        videoUrl: "",
      }));
      setSubmitError(null);
    };
    reader.onerror = () => {
      setSubmitError("Failed to read video file");
    };
    reader.readAsDataURL(file);
  };

  const handleVideoUrlChange = (value: string) => {
    const urlRegex = /^(https?:\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\-\.\/]*)*$/;
    if (value && !urlRegex.test(value)) {
      setErrors((prev) => ({
        ...prev,
        videoUrl: "Please enter a valid video URL",
      }));
    } else {
      setErrors((prev) => ({ ...prev, videoUrl: undefined }));
    }
    setFormData((prev) => ({
      ...prev,
      videoUrl: value,
      newsImage: "",
      newsVideo: "",
    }));
  };

  const removeMedia = () => {
    setFormData((prev) => ({
      ...prev,
      newsImage: "",
      newsVideo: "",
      videoUrl: "",
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

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

  const handleSubmit = async (status: "draft" | "published") => {
    if (!validateForm()) return;

    if (status === "published") {
      const result = await Swal.fire({
        title: "Ready to publish?",
        text: "Are you sure you want to publish this article?",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes, publish it",
        cancelButtonText: "No, keep editing",
      });

      if (!result.isConfirmed) return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const articleData = {
        ...formData,
        status,
        date: new Date().toISOString(),
        views: 0,
      };

      const response = await fetch("/api/create-article", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(articleData),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${await response.text()}`);
      }

      const result = await response.json();
      console.log("Article saved:", result);

      await Swal.fire({
        title: "Draft Saved",
        text: `Article ${
          status === "draft" ? "saved as draft" : "published"
        } successfully`,
        icon: "success",
        confirmButtonText: "OK",
        timer: 3000,
        timerProgressBar: true,
      });

      if (status === "published") {
        router.push("/news-dashboard/articles");
      } else {
        // Reset form for draft
        setFormData({
          title: "",
          author: "",
          category: "",
          description: "",
          newsImage: "",
          newsVideo: "",
          videoUrl: "",
          status: "draft",
        });
        setErrors({});
      }
    } catch (error) {
      console.error("Error saving article:", error);
      setSubmitError(
        error instanceof Error ? error.message : "Failed to save article"
      );
      await Swal.fire({
        title: "Oops!",
        text: "Error saving article. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOverlayClick = () => {
    if (isMobile) {
      onSidebarToggle();
    }
  };

  const goBack = () => {
    console.log("Navigate back to articles");
    router.push("/news-dashboard/articles");
  };

  const getVideoEmbedUrl = (url: string): string => {
    const youtubeRegex =
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const youtubeMatch = url.match(youtubeRegex);
    if (youtubeMatch) {
      return `https://www.youtube.com/embed/${youtubeMatch[1]}`;
    }

    const vimeoRegex = /(?:vimeo\.com\/|player\.vimeo\.com\/video\/)(\d+)/;
    const vimeoMatch = url.match(vimeoRegex);
    if (vimeoMatch) {
      return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
    }

    const dailymotionRegex =
      /(?:dailymotion\.com\/video\/|dailymotion\.com\/embed\/video\/)([a-zA-Z0-9]+)/;
    const dailymotionMatch = url.match(dailymotionRegex);
    if (dailymotionMatch) {
      return `https://www.dailymotion.com/embed/video/${dailymotionMatch[1]}`;
    }

    return url;
  };

  const handleSearch = (query: string) => {
    console.log("Search in create page:", query);
  };

  if (isLoadingCategories) {
    return (
      <CreateArticleRoot>
        <SidebarOverlay
          show={isMobile && sidebarOpen}
          onClick={handleOverlayClick}
        />
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
          <LoadingState message="Loading categories..." />
        </MainContent>
      </CreateArticleRoot>
    );
  }

  return (
    <CreateArticleRoot>
      <SidebarOverlay
        show={isMobile && sidebarOpen}
        onClick={handleOverlayClick}
      />
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
            <FormTitle>Create New Article</FormTitle>
            <FormSubtitle>
              Fill in the details below to create a new news article
            </FormSubtitle>
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
            isLoadingCategories={isLoadingCategories}
            categoryError={categoryError}
          />

          <MediaUploadSection
            formData={{
              newsImage: formData.newsImage,
              newsVideo: formData.newsVideo,
              videoUrl: formData.videoUrl,
            }}
            errors={errors}
            uploadError={submitError}
            onImageUpload={handleImageUpload}
            onVideoUpload={handleVideoUpload}
            onVideoUrlChange={handleVideoUrlChange}
            onRemoveMedia={removeMedia}
          />

          <ArticleFormActions
            saving={isSubmitting}
            onCancel={goBack}
            onSaveDraft={() => handleSubmit("draft")}
            onPublish={() => handleSubmit("published")}
            showPreview={true}
            showSaveDraft={true}
          />

          {submitError && (
            <ErrorMessage style={{ display: "block", marginTop: "16px" }}>
              {submitError}
            </ErrorMessage>
          )}
        </FormContainer>
      </MainContent>
    </CreateArticleRoot>
  );
};
