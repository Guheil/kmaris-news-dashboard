// interface.ts
export interface MediaFormData {
  newsImage: string | null;
  newsVideo: string | null;
  videoUrl: string;
}

export interface MediaFormErrors {
  videoUrl?: string;
}

export interface MediaUploadSectionProps {
  formData: MediaFormData;
  errors: MediaFormErrors;
  uploadError: string | null;
  onImageUpload: (file: File | null) => void;
  onVideoUpload: (file: File | null) => void;
  onVideoUrlChange: (url: string) => void;
  onRemoveMedia: () => void;
}