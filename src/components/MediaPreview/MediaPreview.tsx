import { FC } from "react";
import { FileText, Play } from "lucide-react";
import { MediaPreviewProps } from "./interface";
import { MediaPreviewContainer, NewsImage, MediaPlaceholder } from "./elements";

export const MediaPreview: FC<MediaPreviewProps> = ({ article }) => {
  return (
    <MediaPreviewContainer>
      {article.newsImage ? (
        <NewsImage src={article.newsImage} alt={article.title} />
      ) : article.newsVideo ? (
        <MediaPlaceholder type="video">
          <Play size={16} />
        </MediaPlaceholder>
      ) : (
        <MediaPlaceholder type="document">
          <FileText size={16} />
        </MediaPlaceholder>
      )}
    </MediaPreviewContainer>
  );
};