"use client";

import { FC } from "react";
import { useRouter } from "next/navigation";
import { ViewArticleControlsProps } from "./interface";
import { BackButton, ArticleActions, ActionButton } from "./elements";
import { ArrowLeft, Edit, Archive, Share2 } from "lucide-react";

export const ViewArticleControls: FC<ViewArticleControlsProps> = ({
  articleId,
  status,
  title,
  description,
  handleArchive,
}) => {
  const router = useRouter();

  const handleBack = () => {
    router.push("/news-dashboard/articles");
  };

  const handleEdit = () => {
    router.push(`/news-dashboard/articles/edit/${articleId}`);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url: window.location.href,
        });
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <>
      <BackButton onClick={handleBack}>
        <ArrowLeft size={20} />
        Back to Articles
      </BackButton>
      <ArticleActions>
        <ActionButton variant="edit" onClick={handleEdit}>
          <Edit size={16} />
          Edit Article
        </ActionButton>
        <ActionButton
          variant="archive"
          onClick={handleArchive}
          disabled={status === "archived"}
        >
          <Archive size={16} />
          {status === "archived" ? "Archived" : "Archive"}
        </ActionButton>
        <ActionButton variant="share" onClick={handleShare}>
          <Share2 size={16} />
          Share
        </ActionButton>
      </ArticleActions>
    </>
  );
};

export default ViewArticleControls;