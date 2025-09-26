// interface.ts
export interface Category {
  _id: string;
  categoryName: string;
}

export interface BasicFormData {
  title: string;
  author: string;
  category: string;
  description: string;
  status: "draft" | "published" | "archived";
}

export interface BasicFormErrors {
  title?: string;
  author?: string;
  category?: string;
  description?: string;
}

export interface ArticleFormBasicInfoProps {
  formData: {
    title: string;
    author: string;
    category: string;
    status: "draft" | "published" | "archived";
    description: string;
  };
  errors: {
    title?: string;
    author?: string;
    category?: string;
    status?: string;
    description?: string;
  };
  categories: { _id: string; categoryName: string }[];
  onInputChange: (field: keyof ArticleFormBasicInfoProps["formData"], value: string) => void;
  isLoadingCategories?: boolean;
  categoryError?: string | null;
}
