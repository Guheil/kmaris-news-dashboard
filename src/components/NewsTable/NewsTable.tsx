import { FC } from "react";
import Link from "next/link";
import { Eye, Search } from "lucide-react";
import { NewsTableProps } from "./interface";
import {
  NewsTableRoot,
  NewsTableContent,
  NewsTableHeader,
  NewsTableRow,
  NewsTitle,
  NewsTitleText,
  NewsAuthor,
  NewsDate,
  NewsViews,
  ActionButtons,
  ActionButton,
  CategoryBadge,
  SearchResultsHeader,
  SearchResultsCount,
  SearchQuery,
  ClearSearchButton,
  NoResults,
  NoResultsIcon,
  NoResultsTitle,
  NoResultsText,
} from "./elements";
import { MediaPreview } from "@/components/MediaPreview/MediaPreview";

export const NewsTable: FC<NewsTableProps> = ({
  articles,
  searchQuery,
  clearSearch,
  getCategoryName,
}) => {
  const totalArticles = articles.length;
  const displayedNews = articles.slice(0, 5);

  return (
    <NewsTableRoot>
      <NewsTableContent>
        {searchQuery && (
          <SearchResultsHeader>
            <SearchResultsCount>
              {totalArticles} result{totalArticles !== 1 ? "s" : ""} for{" "}
              <SearchQuery>&quot;{searchQuery}&quot;</SearchQuery>
            </SearchResultsCount>
            <ClearSearchButton onClick={clearSearch}>
              Clear Search
            </ClearSearchButton>
          </SearchResultsHeader>
        )}
        {totalArticles > 0 ? (
          <>
            <NewsTableHeader>
              <div>Article</div>
              <div>Author</div>
              <div>Date</div>
              <div>Views</div>
              <div>Actions</div>
            </NewsTableHeader>
            {displayedNews.map((article) => (
              <NewsTableRow key={article._id}>
                <NewsTitle>
                  <MediaPreview article={article} />
                  <div>
                    <NewsTitleText>{article.title}</NewsTitleText>
                    <CategoryBadge category={getCategoryName(article.category)}>
                      {getCategoryName(article.category)}
                    </CategoryBadge>
                  </div>
                </NewsTitle>
                <NewsAuthor>{article.author}</NewsAuthor>
                <NewsDate>
                  {new Date(article.date).toLocaleDateString()}
                </NewsDate>
                <NewsViews>
                  <Eye size={14} />
                  {(article.views || 0).toLocaleString()}
                </NewsViews>
                <ActionButtons>
                  <Link href={`/news-dashboard/articles/view/${article._id}`}>
                    <ActionButton variant="view" title="View Article">
                      <Eye size={14} />
                    </ActionButton>
                  </Link>
                  <Link href={`/news-dashboard/articles/edit/${article._id}`}>
                    <ActionButton variant="edit" title="Edit Article">
                      <Eye size={14} />
                    </ActionButton>
                  </Link>
                </ActionButtons>
              </NewsTableRow>
            ))}
          </>
        ) : (
          <NoResults>
            <NoResultsIcon>
              <Search size={28} />
            </NoResultsIcon>
            <NoResultsTitle>No articles found</NoResultsTitle>
            <NoResultsText>
              We couldn&apos;t find any articles matching &quot;{searchQuery}
              &quot;.
              <br />
              Try adjusting your search terms or browse all articles.
            </NoResultsText>
          </NoResults>
        )}
      </NewsTableContent>
    </NewsTableRoot>
  );
};