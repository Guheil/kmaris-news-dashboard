export interface ViewArticleMediaProps {
  videoUrl?: string;
  newsVideo?: string | null;
  newsImage?: string | null;
  getVideoEmbedDetails: (url: string) => { type: "video" | "iframe"; src: string };
}