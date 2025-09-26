// interface.ts
export interface ArticleFormActionsProps {
  saving: boolean;
  onCancel: () => void;
  onPreview?: () => void;
  onSaveDraft?: () => void;
  onPublish: () => void;
  showPreview?: boolean;
  showSaveDraft?: boolean;
}