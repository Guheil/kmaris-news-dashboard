"use client";

import { Header } from "@/components/HeaderNews/Header";
import {
  LoadingText,
  LoadingDots,
} from '@/components/ArticleCard/NewsLoadingStyle';
import {
  ArticleLoadingContainer,
  ArticleLoadingContent,
  ArticleLoadingWrapper,
  BreadcrumbLoadingSkeleton,
  ArticleTitleLoadingSkeleton,
  ArticleImageLoadingSkeleton,
  ArticleBodyLoadingSkeleton,
  ArticleBodyLineSkeleton,
  SidebarLoadingWrapper,
  SidebarTitleLoadingSkeleton,
  RelatedArticleLoadingSkeleton,
  RelatedArticleItemSkeleton,
  RelatedArticleImageSkeleton,
  RelatedArticleContentSkeleton,
  RelatedArticleTitleSkeleton,
  RelatedArticleMetaSkeleton,
} from './ArticleLoadingStyle';

export default function ArticleLoadingScreen() {
  return (
    <ArticleLoadingContainer>
      {/* Include the header */}
      <Header />
      
      <ArticleLoadingContent>
        {/* Loading indicator */}
        <LoadingText>Loading article...</LoadingText>
        <LoadingDots>
          <span />
          <span />
          <span />
        </LoadingDots>

        {/* Main article loading layout */}
        <ArticleLoadingWrapper>
          {/* Main content skeleton */}
          <div>
            {/* Breadcrumb skeleton */}
            <BreadcrumbLoadingSkeleton />
            
            {/* Article title skeleton */}
            <ArticleTitleLoadingSkeleton />
            
            {/* Article image skeleton */}
            <ArticleImageLoadingSkeleton />
            
            {/* Article body skeleton */}
            <ArticleBodyLoadingSkeleton>
              <ArticleBodyLineSkeleton />
              <ArticleBodyLineSkeleton style={{ width: '95%' }} />
              <ArticleBodyLineSkeleton style={{ width: '88%' }} />
              <ArticleBodyLineSkeleton style={{ width: '92%' }} />
              <ArticleBodyLineSkeleton style={{ width: '85%' }} />
              <ArticleBodyLineSkeleton style={{ width: '90%' }} />
              <ArticleBodyLineSkeleton style={{ width: '75%' }} />
            </ArticleBodyLoadingSkeleton>
          </div>

          {/* Sidebar skeleton */}
          <SidebarLoadingWrapper>
            <SidebarTitleLoadingSkeleton />
            
            <RelatedArticleLoadingSkeleton>
              {[1, 2, 3, 4].map((item) => (
                <RelatedArticleItemSkeleton key={item}>
                  <RelatedArticleImageSkeleton />
                  <RelatedArticleContentSkeleton>
                    <RelatedArticleTitleSkeleton />
                    <RelatedArticleTitleSkeleton style={{ width: '70%' }} />
                    <RelatedArticleMetaSkeleton />
                  </RelatedArticleContentSkeleton>
                </RelatedArticleItemSkeleton>
              ))}
            </RelatedArticleLoadingSkeleton>
          </SidebarLoadingWrapper>
        </ArticleLoadingWrapper>
      </ArticleLoadingContent>
    </ArticleLoadingContainer>
  );
}