export interface Category {
  _id: string;
  categoryName: string;
}

export interface CategoryFormData {
  categoryName: string;
}

export interface FormErrors {
  categoryName?: string;
}

export interface ManageCategoriesPageProps {
  sidebarOpen: boolean;
  onSidebarToggle: () => void;
  isMobile?: boolean;
}