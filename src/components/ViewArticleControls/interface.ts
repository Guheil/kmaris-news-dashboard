export interface ViewArticleControlsProps {
  articleId: string;
  status: "published" | "archived";
  title: string;
  description: string;
  handleArchive: () => void;
}