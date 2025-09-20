"use client";

import { FC, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Home,
  FileText,
  BarChart3,
  Plus,
  Save,
  Edit2,
  Trash2,
  X,
  Tag,
  EyeIcon,
} from "lucide-react";
import Swal from "sweetalert2";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { Header } from "@/components/header/Header";
import {
  ManageCategoriesPageProps,
  Category,
  CategoryFormData,
  FormErrors,
} from "./interface";
import {
  ManageCategoriesRoot,
  MainContent,
  SidebarOverlay,
  PageContainer,
  PageHeader,
  PageTitle,
  PageSubtitle,
  ContentSection,
  CreateSection,
  CreateSectionTitle,
  FormGrid,
  FormField,
  Label,
  RequiredIndicator,
  Input,
  ErrorMessage,
  ActionButtons,
  Button,
  CategoriesSection,
  CategoriesSectionTitle,
  CategoriesGrid,
  CategoryCard,
  CategoryName,
  CategoryActions,
  IconButton,
  EmptyState,
  EmptyStateIcon,
  EmptyStateText,
  EmptyStateSubtext,
} from "./elements";

export const ManageCategoriesPage: FC<ManageCategoriesPageProps> = ({
  sidebarOpen,
  onSidebarToggle,
  isMobile = false,
}) => {
  const router = useRouter();

  const [formData, setFormData] = useState<CategoryFormData>({
    categoryName: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  // Fetch categories
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
      await Swal.fire({
        title: "Error",
        text: "Failed to load categories. Please refresh the page.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setIsLoadingCategories(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleInputChange = (field: keyof CategoryFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.categoryName.trim()) {
      newErrors.categoryName = "Category name is required";
    } else if (formData.categoryName.trim().length < 2) {
      newErrors.categoryName = "Category name must be at least 2 characters";
    } else {
      // Check for duplicate category names (case-insensitive)
      const isDuplicate = categories.some(
        (category) =>
          category.categoryName.toLowerCase() === formData.categoryName.trim().toLowerCase() &&
          category._id !== editingCategory?._id
      );
      if (isDuplicate) {
        newErrors.categoryName = "A category with this name already exists";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const url = editingCategory ? `/api/categories/${editingCategory._id}` : "/api/categories";
      const method = editingCategory ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ categoryName: formData.categoryName.trim() }),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${await response.text()}`);
      }

      await Swal.fire({
        title: "Success!",
        text: `Category ${editingCategory ? "updated" : "created"} successfully`,
        icon: "success",
        confirmButtonText: "OK",
        timer: 2000,
        timerProgressBar: true,
      });

      // Reset form
      setFormData({ categoryName: "" });
      setEditingCategory(null);
      setErrors({});

      // Refresh categories
      await fetchCategories();
    } catch (error) {
      console.error("Error saving category:", error);
      await Swal.fire({
        title: "Error",
        text: `Failed to ${editingCategory ? "update" : "create"} category. Please try again.`,
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setFormData({ categoryName: category.categoryName });
    setErrors({});
  };

  const handleCancelEdit = () => {
    setEditingCategory(null);
    setFormData({ categoryName: "" });
    setErrors({});
  };

  const handleDelete = async (category: Category) => {
    const result = await Swal.fire({
      title: "Delete Category",
      text: `Are you sure you want to delete "${category.categoryName}"? This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#ef4444",
    });

    if (!result.isConfirmed) return;

    try {
      const response = await fetch(`/api/categories/${category._id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${await response.text()}`);
      }

      await Swal.fire({
        title: "Deleted!",
        text: "Category deleted successfully",
        icon: "success",
        confirmButtonText: "OK",
        timer: 2000,
        timerProgressBar: true,
      });

      // Refresh categories
      await fetchCategories();
    } catch (error) {
      console.error("Error deleting category:", error);
      await Swal.fire({
        title: "Error",
        text: "Failed to delete category. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleOverlayClick = () => {
    if (isMobile) {
      onSidebarToggle();
    }
  };

  return (
    <ManageCategoriesRoot>
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
                href: "news-dashboard/create-article",
                },
              {
                icon: <BarChart3 size={20} />,
                text: "Analytics",
                href: "/news-dashboard/analytics",
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
        title="Manage Categories"
        onMenuToggle={onSidebarToggle}
        userName="John Doe"
        userRole="Editor"
        userInitials="JD"
        notifications={3}
        isSidebarOpen={sidebarOpen}
        isMobile={isMobile}
      />
      <MainContent sidebarOpen={sidebarOpen} isMobile={isMobile}>
        <PageContainer>
          <PageHeader>
            <PageTitle>Manage Categories</PageTitle>
            <PageSubtitle>
              Create and manage article categories for better content organization
            </PageSubtitle>
          </PageHeader>

          <ContentSection>
            <CreateSection>
              <CreateSectionTitle>
                {editingCategory ? "Edit Category" : "Create New Category"}
              </CreateSectionTitle>
              <FormGrid>
                <FormField>
                  <Label>
                    Category Name <RequiredIndicator>*</RequiredIndicator>
                  </Label>
                  <Input
                    type="text"
                    placeholder="Enter category name..."
                    value={formData.categoryName}
                    onChange={(e) => handleInputChange("categoryName", e.target.value)}
                    error={!!errors.categoryName}
                  />
                  {errors.categoryName && (
                    <ErrorMessage>{errors.categoryName}</ErrorMessage>
                  )}
                </FormField>
              </FormGrid>
              <ActionButtons>
                {editingCategory && (
                  <Button
                    variant="outline"
                    onClick={handleCancelEdit}
                    disabled={isSubmitting}
                  >
                    <X size={16} />
                    Cancel
                  </Button>
                )}
                <Button
                  variant="primary"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  <Save size={16} />
                  {editingCategory ? "Update Category" : "Create Category"}
                </Button>
              </ActionButtons>
            </CreateSection>

            <CategoriesSection>
              <CategoriesSectionTitle>
                Existing Categories ({categories.length})
              </CategoriesSectionTitle>
              
              {isLoadingCategories ? (
                <EmptyState>
                  <EmptyStateText>Loading categories...</EmptyStateText>
                </EmptyState>
              ) : categories.length === 0 ? (
                <EmptyState>
                  <EmptyStateIcon>
                    <Tag size={48} />
                  </EmptyStateIcon>
                  <EmptyStateText>No categories found</EmptyStateText>
                  <EmptyStateSubtext>
                    Create your first category to get started with organizing your articles
                  </EmptyStateSubtext>
                </EmptyState>
              ) : (
                <CategoriesGrid>
                  {categories.map((category) => (
                    <CategoryCard key={category._id}>
                      <CategoryName>{category.categoryName}</CategoryName>
                      <CategoryActions>
                        <IconButton
                          onClick={() => handleEdit(category)}
                          title="Edit category"
                        >
                          <Edit2 size={16} />
                        </IconButton>
                        <IconButton
                          onClick={() => handleDelete(category)}
                          variant="danger"
                          title="Delete category"
                        >
                          <Trash2 size={16} />
                        </IconButton>
                      </CategoryActions>
                    </CategoryCard>
                  ))}
                </CategoriesGrid>
              )}
            </CategoriesSection>
          </ContentSection>
        </PageContainer>
      </MainContent>
    </ManageCategoriesRoot>
  );
};