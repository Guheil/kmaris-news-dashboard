// app/news-dashboard/edit/[id]/EditArticlePage.tsx
"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Home,
  FileText,
  Plus,
  Save,
  Eye,
  Upload,
  Image as ImageIcon,
  Video,
  X,
  ArrowLeft,
  ArchiveIcon,
  Loader2,
} from "lucide-react";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { Header } from "@/components/header/Header";
import {
  FormField,
  Select,
  RequiredIndicator,
  Label,
  MediaUploadBox,
  Button,
  EditArticleRoot,
  SidebarOverlay,
  MainContent,
  FormHeader,
  FormTitle,
  FormSubtitle,
  SectionTitle,
  FormGrid,
  ErrorMessage,
  MediaUploadContainer,
  TextArea,
  Input,
} from "./elements";
import { EditArticleFormData } from "./interface";
import { EditArticlePageProps } from "./interface";

export const EditArticlePage: React.FC<EditArticlePageProps> = ({
  sidebarOpen,
  onSidebarToggle,
  isMobile,
  articleId,
}) => {
  const router = useRouter();
  const imageInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const [formData, setFormData] = useState<EditArticleFormData>({
    title: "",
    author: "",
    category: "",
    description: "",
    status: "draft",
    newsImage: null,
    newsVideo: null,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const categories = [
    "Technology",
    "Environment",
    "Finance",
    "Science",
    "Sports",
    "Health",
  ];

  // Fetch article data from MongoDB
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/articles/${articleId}`);
        if (!response.ok) {
          const errorData = await response
            .json()
            .catch(() => ({ error: "Unknown error" }));
          throw new Error(
            errorData.error || `HTTP ${response.status}: ${response.statusText}`
          );
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
        });
        setError(null);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "An error occurred";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    if (articleId) {
      fetchArticle();
    }
  }, [articleId]);

  const handleInputChange = (
    field: keyof EditArticleFormData,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      setUploadError("No file selected");
      return;
    }

    // Validate file type and size (e.g., max 5MB)
    const validTypes = ["image/png", "image/jpeg", "image/jpg"];
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (!validTypes.includes(file.type)) {
      setUploadError("Only PNG and JPG files are allowed");
      return;
    }
    if (file.size > maxSize) {
      setUploadError("Image size must be less than 5MB");
      return;
    }

    // Use FileReader to convert image to base64
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result as string;
      setFormData((prev) => ({
        ...prev,
        newsImage: base64String,
        newsVideo: null, // Clear video if image is uploaded
      }));
      setUploadError(null);
    };
    reader.onerror = () => {
      setUploadError("Failed to read image file");
    };
    reader.readAsDataURL(file);
  };

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      setUploadError("No file selected");
      return;
    }

    // Validate file type and size (e.g., max 50MB)
    const validTypes = ["video/mp4", "video/avi"];
    const maxSize = 50 * 1024 * 1024; // 50MB in bytes
    if (!validTypes.includes(file.type)) {
      setUploadError("Only MP4 and AVI files are allowed");
      return;
    }
    if (file.size > maxSize) {
      setUploadError("Video size must be less than 50MB");
      return;
    }

    // Use FileReader to convert video to base64
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result as string;
      setFormData((prev) => ({
        ...prev,
        newsVideo: base64String,
        newsImage: null, // Clear image if video is uploaded
      }));
      setUploadError(null);
    };
    reader.onerror = () => {
      setUploadError("Failed to read video file");
    };
    reader.readAsDataURL(file);
  };

  const removeMedia = () => {
    setFormData((prev) => ({
      ...prev,
      newsImage: null,
      newsVideo: null,
    }));
    if (imageInputRef.current) imageInputRef.current.value = "";
    if (videoInputRef.current) videoInputRef.current.value = "";
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
      };

      const response = await fetch(`/api/articles/${articleId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        throw new Error("Failed to update article");
      }

      alert(
        `Article ${
          status === "draft" ? "saved as draft" : "published"
        } successfully!`
      );
      router.push("/news-dashboard/articles");
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "An error occurred");
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
          title="Edit Article"
          onMenuToggle={onSidebarToggle}
          onSearch={handleSearch}
          userName="John Doe"
          userRole="Editor"
          userInitials="JD"
          notifications={3}
          isSidebarOpen={sidebarOpen}
          isMobile={isMobile}
        />
        <MainContent sidebarOpen={sidebarOpen} isMobile={isMobile}>
          <div
            style={{
              maxWidth: "800px",
              margin: "0 auto",
              backgroundColor: "#ffffff",
              borderRadius: "16px",
              padding: "32px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              border: "1px solid rgba(0,0,0,0.05)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "400px",
              flexDirection: "column",
              gap: "16px",
              color: "#64748b",
            }}
          >
            <Loader2 size={32} className="animate-spin" />
            <span>Loading article...</span>
          </div>
        </MainContent>
      </EditArticleRoot>
    );
  }

  return (
    <EditArticleRoot>
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
              },
              {
                icon: <ArchiveIcon size={20} />,
                text: "Archive",
                href: "/news-dashboard/archive-news",
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
        title="Edit Article"
        onMenuToggle={onSidebarToggle}
        onSearch={handleSearch}
        userName="John Doe"
        userRole="Editor"
        userInitials="JD"
        notifications={3}
        isSidebarOpen={sidebarOpen}
        isMobile={isMobile}
      />
      <MainContent sidebarOpen={sidebarOpen} isMobile={isMobile}>
        <div
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            backgroundColor: "#ffffff",
            borderRadius: "16px",
            padding: "32px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            border: "1px solid rgba(0,0,0,0.05)",
          }}
        >
          <FormHeader>
            <FormTitle>Edit Article</FormTitle>
            <FormSubtitle>
              Update the article details below and save your changes
            </FormSubtitle>
          </FormHeader>
          <div style={{ marginBottom: "32px" }}>
            <SectionTitle>Basic Information</SectionTitle>
            <FormGrid>
              <FormField>
                <Label>
                  Title <RequiredIndicator />
                </Label>
                <Input
                  type="text"
                  placeholder="Enter article title..."
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                />
                {errors.title && <ErrorMessage>{errors.title}</ErrorMessage>}
              </FormField>
              <FormField>
                <Label>
                  Author <RequiredIndicator />
                </Label>
                <Input
                  type="text"
                  placeholder="Author name..."
                  value={formData.author}
                  onChange={(e) => handleInputChange("author", e.target.value)}
                />
                {errors.author && <ErrorMessage>{errors.author}</ErrorMessage>}
              </FormField>
              <FormField>
                <Label>
                  Category <RequiredIndicator />
                </Label>
                <Select
                  value={formData.category}
                  onChange={(e) =>
                    handleInputChange("category", e.target.value)
                  }
                >
                  <option value="">Select category...</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </Select>
                {errors.category && (
                  <ErrorMessage>{errors.category}</ErrorMessage>
                )}
              </FormField>
              <FormField>
                <Label>
                  Status <RequiredIndicator />
                </Label>
                <Select
                  value={formData.status}
                  onChange={(e) =>
                    handleInputChange(
                      "status",
                      e.target.value as EditArticleFormData["status"]
                    )
                  }
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </Select>
              </FormField>
              <FormField fullWidth>
                <Label>
                  Description <RequiredIndicator />
                </Label>
                <TextArea
                  placeholder="Enter article description..."
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                />
                {errors.description && (
                  <ErrorMessage>{errors.description}</ErrorMessage>
                )}
              </FormField>
            </FormGrid>
          </div>
          <div style={{ marginBottom: "32px" }}>
            <SectionTitle>Media</SectionTitle>
            {uploadError && (
              <ErrorMessage style={{ marginBottom: "16px" }}>
                {uploadError}
              </ErrorMessage>
            )}
            <MediaUploadContainer>
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
                  onClick={() =>
                    !formData.newsVideo && imageInputRef.current?.click()
                  }
                >
                  {formData.newsImage ? (
                    <div
                      style={{
                        position: "relative",
                        borderRadius: "8px",
                        overflow: "hidden",
                        marginTop: "12px",
                      }}
                    >
                      <img
                        src={formData.newsImage}
                        alt="Preview"
                        style={{
                          width: "100%",
                          height: "100px",
                          objectFit: "cover",
                          borderRadius: "8px",
                        }}
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
                      <div
                        style={{
                          fontSize: "14px",
                          color: "#64748b",
                          fontWeight: 500,
                          marginBottom: "4px",
                        }}
                      >
                        Upload Image
                      </div>
                      <div style={{ fontSize: "12px", color: "#94a3b8" }}>
                        PNG, JPG up to 5MB
                      </div>
                    </>
                  )}
                </MediaUploadBox>
              </div>
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
                  onClick={() =>
                    !formData.newsImage && videoInputRef.current?.click()
                  }
                >
                  {formData.newsVideo ? (
                    <div
                      style={{
                        position: "relative",
                        borderRadius: "8px",
                        overflow: "hidden",
                        marginTop: "12px",
                      }}
                    >
                      <video
                        src={formData.newsVideo}
                        controls
                        style={{
                          width: "100%",
                          height: "100px",
                          borderRadius: "8px",
                        }}
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
                      <div
                        style={{
                          fontSize: "14px",
                          color: "#64748b",
                          fontWeight: 500,
                          marginBottom: "4px",
                        }}
                      >
                        Upload Video
                      </div>
                      <div style={{ fontSize: "12px", color: "#94a3b8" }}>
                        MP4, AVI up to 50MB
                      </div>
                    </>
                  )}
                </MediaUploadBox>
              </div>
            </MediaUploadContainer>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "12px",
              marginTop: "32px",
              paddingTop: "24px",
              borderTop: "1px solid #f1f5f9",
            }}
          >
            <Button variant="outline" onClick={handleBack} disabled={saving}>
              <ArrowLeft size={16} />
              Cancel
            </Button>
            <Button
              variant="secondary"
              onClick={handlePreview}
              disabled={saving}
            >
              <Eye size={16} />
              Preview
            </Button>
            <Button
              variant="secondary"
              onClick={() => handleSave("draft")}
              disabled={saving}
            >
              {saving ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Save size={16} />
              )}
              Save Draft
            </Button>
            <Button
              variant="primary"
              onClick={() => handleSave("published")}
              disabled={saving}
            >
              {saving ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Eye size={16} />
              )}
              {saving ? "Saving..." : "Update Article"}
            </Button>
          </div>
          {submitError && (
            <ErrorMessage style={{ display: "block", marginTop: "16px" }}>
              {submitError}
            </ErrorMessage>
          )}
        </div>
      </MainContent>
    </EditArticleRoot>
  );
};

export default EditArticlePage;
