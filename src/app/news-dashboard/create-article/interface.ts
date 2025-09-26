// interface.ts (updated)
export interface ArticleFormData {
  title: string;
  author: string;
  category: string; // Stores the category _id as a string
  description: string;
  newsImage: string;
  newsVideo: string;
  videoUrl: string;
  status: "draft" | "published";
}

export interface FormErrors {
  title?: string;
  author?: string;
  category?: string;
  description?: string;
  videoUrl?: string;
}

export interface CreateArticlePageProps {
  sidebarOpen: boolean;
  onSidebarToggle: () => void;
  isMobile?: boolean;
}

export interface Category {
  _id: string;
  categoryName: string;
}

// Add these for the new components
export interface BasicInfoFormData {
  title: string;
  author: string;
  category: string;
  description: string;
  status: "draft" | "published";
}

export interface MediaFormData {
  newsImage: string;
  newsVideo: string;
  videoUrl: string;
}