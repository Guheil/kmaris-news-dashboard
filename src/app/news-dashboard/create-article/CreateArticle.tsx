"use client";

import { FC, useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Home,
  FileText,
  BarChart3,
  Plus,
  Save,
  Eye,
  Image as ImageIcon,
  Video,
  X,
  ArrowLeft,
  EyeIcon,
} from "lucide-react";
import Swal from "sweetalert2";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { Header } from "@/components/header/Header";
import {
  CreateArticlePageProps,
  ArticleFormData,
  FormErrors,
  Category,
} from "./interface";
import {
  CreateArticleRoot,
  MainContent,
  SidebarOverlay,
  FormContainer,
  FormHeader,
  FormTitle,
  FormSubtitle,
  FormSection,
  SectionTitle,
  FormGrid,
  FormField,
  Label,
  RequiredIndicator,
  Input,
  Select,
  Textarea,
  ErrorMessage,
  MediaUploadContainer,
  MediaUploadBox,
  MediaUploadIcon,
  MediaUploadText,
  MediaUploadSubtext,
  MediaPreview,
  MediaPreviewImage,
  MediaRemoveButton,
  ActionButtons,
  Button,
} from "./elements";


export const CreateArticlePage: FC<CreateArticlePageProps> = ({
  sidebarOpen,
  onSidebarToggle,
  isMobile = false,
}) => {
  const router = useRouter();
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

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

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData((prev) => ({
          ...prev,
          newsImage: e.target?.result as string,
          newsVideo: "",
          videoUrl: "",
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFormData((prev) => ({
        ...prev,
        newsVideo: url,
        newsImage: "",
        videoUrl: "",
      }));
    }
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
    if (imageInputRef.current) imageInputRef.current.value = "";
    if (videoInputRef.current) videoInputRef.current.value = "";
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
        text: `Article ${status === "draft" ? "saved as draft" : "published"} successfully`,
        icon: "success",
        confirmButtonText: "OK",
        timer: 3000,
        timerProgressBar: true,
      });

      if (status === "published") {
        router.push("/news-dashboard/articles");
      } else {
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
    const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const youtubeMatch = url.match(youtubeRegex);
    if (youtubeMatch) {
      return `https://www.youtube.com/embed/${youtubeMatch[1]}`;
    }

    const vimeoRegex = /(?:vimeo\.com\/|player\.vimeo\.com\/video\/)(\d+)/;
    const vimeoMatch = url.match(vimeoRegex);
    if (vimeoMatch) {
      return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
    }

    const dailymotionRegex = /(?:dailymotion\.com\/video\/|dailymotion\.com\/embed\/video\/)([a-zA-Z0-9]+)/;
    const dailymotionMatch = url.match(dailymotionRegex);
    if (dailymotionMatch) {
      return `https://www.dailymotion.com/embed/video/${dailymotionMatch[1]}`;
    }

    return url;
  };

  return (
    <CreateArticleRoot>
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
              },
              {
                icon: <Plus size={20} />,
                text: "Create Article",
                href: "/news-dashboard/create-article",
                active: true,
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
        title="Create Article"
        onMenuToggle={onSidebarToggle}
        userName="John Doe"
        userRole="Editor"
        userInitials="JD"
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
          <FormSection>
            <SectionTitle>Basic Information</SectionTitle>
            <FormGrid>
              <FormField fullWidth>
                <Label>
                  Title <RequiredIndicator>*</RequiredIndicator>
                </Label>
                <Input
                  type="text"
                  placeholder="Enter article title..."
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  error={!!errors.title}
                />
                {errors.title && <ErrorMessage>{errors.title}</ErrorMessage>}
              </FormField>
              <FormField>
                <Label>
                  Author <RequiredIndicator>*</RequiredIndicator>
                </Label>
                <Input
                  type="text"
                  placeholder="Author name..."
                  value={formData.author}
                  onChange={(e) => handleInputChange("author", e.target.value)}
                  error={!!errors.author}
                />
                {errors.author && <ErrorMessage>{errors.author}</ErrorMessage>}
              </FormField>
              <FormField>
                <Label>
                  Category <RequiredIndicator>*</RequiredIndicator>
                </Label>
                <Select
                  value={formData.category}
                  onChange={(e) =>
                    handleInputChange("category", e.target.value)
                  }
                  error={!!errors.category}
                  disabled={isLoadingCategories || !!categoryError}
                >
                  <option value="">
                    {isLoadingCategories
                      ? "Loading categories..."
                      : categoryError
                      ? "Error loading categories"
                      : "Select category..."}
                  </option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.categoryName}
                    </option>
                  ))}
                </Select>
                {errors.category && (
                  <ErrorMessage>{errors.category}</ErrorMessage>
                )}
                {categoryError && (
                  <ErrorMessage>{categoryError}</ErrorMessage>
                )}
              </FormField>
              <FormField fullWidth>
                <Label>
                  Description <RequiredIndicator>*</RequiredIndicator>
                </Label>
                <Textarea
                  placeholder="Enter article description..."
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  error={!!errors.description}
                />
                {errors.description && (
                  <ErrorMessage>{errors.description}</ErrorMessage>
                )}
              </FormField>
            </FormGrid>
          </FormSection>
          <FormSection>
            <SectionTitle>Media</SectionTitle>
            <MediaUploadContainer>
              <div>
                <input
                  ref={imageInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: "none" }}
                />
                <MediaUploadBox
                  hasMedia={!!formData.newsImage}
                  onClick={() =>
                    !formData.newsVideo &&
                    !formData.videoUrl &&
                    imageInputRef.current?.click()
                  }
                >
                  {formData.newsImage ? (
                    <MediaPreview>
                      <MediaPreviewImage
                        src={formData.newsImage}
                        alt="Preview"
                      />
                      <MediaRemoveButton
                        onClick={(e) => {
                          e.stopPropagation();
                          removeMedia();
                        }}
                      >
                        <X size={12} />
                      </MediaRemoveButton>
                    </MediaPreview>
                  ) : (
                    <>
                      <MediaUploadIcon>
                        <ImageIcon size={20} />
                      </MediaUploadIcon>
                      <MediaUploadText>Upload Image</MediaUploadText>
                      <MediaUploadSubtext>
                        PNG, JPG up to 5MB
                      </MediaUploadSubtext>
                    </>
                  )}
                </MediaUploadBox>
              </div>
              <div>
                <input
                  ref={videoInputRef}
                  type="file"
                  accept="video/*"
                  onChange={handleVideoUpload}
                  style={{ display: "none" }}
                />
                <MediaUploadBox
                  hasMedia={!!formData.newsVideo}
                  onClick={() =>
                    !formData.newsImage &&
                    !formData.videoUrl &&
                    videoInputRef.current?.click()
                  }
                >
                  {formData.newsVideo ? (
                    <MediaPreview>
                      <div
                        style={{
                          width: "100%",
                          height: "100px",
                          backgroundColor: "#f1f5f9",
                          borderRadius: "8px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "#64748b",
                        }}
                      >
                        <Video size={24} />
                      </div>
                      <MediaRemoveButton
                        onClick={(e) => {
                          e.stopPropagation();
                          removeMedia();
                        }}
                      >
                        <X size={12} />
                      </MediaRemoveButton>
                    </MediaPreview>
                  ) : (
                    <>
                      <MediaUploadIcon>
                        <Video size={20} />
                      </MediaUploadIcon>
                      <MediaUploadText>Upload Video</MediaUploadText>
                      <MediaUploadSubtext>
                        MP4, AVI up to 50MB
                      </MediaUploadSubtext>
                    </>
                  )}
                </MediaUploadBox>
              </div>
            </MediaUploadContainer>
            <FormField fullWidth style={{ marginTop: "20px" }}>
              <Label>Video URL (YouTube, Vimeo, Dailymotion, etc.)</Label>
              <Input
                type="text"
                placeholder="Enter video URL..."
                value={formData.videoUrl}
                onChange={(e) => handleVideoUrlChange(e.target.value)}
                error={!!errors.videoUrl}
              />
              {errors.videoUrl && <ErrorMessage>{errors.videoUrl}</ErrorMessage>}
              {formData.videoUrl && !errors.videoUrl && (
                <MediaPreview style={{ marginTop: "12px" }}>
                  <iframe
                    width="100%"
                    height="100px"
                    src={getVideoEmbedUrl(formData.videoUrl)}
                    title="Video Preview"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ borderRadius: "8px" }}
                  />
                  <MediaRemoveButton
                    onClick={(e) => {
                      e.stopPropagation();
                      removeMedia();
                    }}
                  >
                    <X size={12} />
                  </MediaRemoveButton>
                </MediaPreview>
              )}
            </FormField>
          </FormSection>
          <ActionButtons>
            <Button variant="outline" onClick={goBack} disabled={isSubmitting}>
              <ArrowLeft size={16} />
              Cancel
            </Button>
            <Button
              variant="secondary"
              onClick={() => handleSubmit("draft")}
              disabled={isSubmitting}
            >
              <Save size={16} />
              Save Draft
            </Button>
            <Button
              variant="primary"
              onClick={() => handleSubmit("published")}
              disabled={isSubmitting}
            >
              <Eye size={16} />
              Publish Article
            </Button>
          </ActionButtons>
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