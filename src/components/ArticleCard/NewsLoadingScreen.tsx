"use client";

import {
  LoadingContainer,
  TopLoadingSection,
  FeaturedSkeleton,
  FeaturedTitleSkeleton,
  FeaturedMetaSkeleton,
  FeaturedImageSkeleton,
  ListLoadingSkeleton,
  ListItemSkeleton,
  ListTextContent,
  ListTitleSkeleton,
  ListSummarySkeleton,
  ListMetaSkeleton,
  ListImageSkeleton,
  BottomGridSkeleton,
  GridCardSkeleton,
  SectionDividerSkeleton,
  SectionTitleSkeleton,
  LatestGridSkeleton,
  LatestCardSkeleton,
  LatestImageSkeleton,
  LatestTitleSkeleton,
  LatestMetaSkeleton,
  LoadingText,
  LoadingDots,
} from './NewsLoadingStyle';

export default function NewsLoadingScreen() {
  return (
    <LoadingContainer>
      {/* Loading indicator */}
      <LoadingText>Loading articles...</LoadingText>
      <LoadingDots>
        <span />
        <span />
        <span />
      </LoadingDots>

      {/* Top section skeleton */}
      <TopLoadingSection>
        {/* Featured article skeleton */}
        <FeaturedSkeleton>
          <div>
            <FeaturedTitleSkeleton />
            <FeaturedMetaSkeleton />
          </div>
          <FeaturedImageSkeleton />
        </FeaturedSkeleton>

        {/* List articles skeleton */}
        <ListLoadingSkeleton>
          {[1, 2, 3].map((item) => (
            <ListItemSkeleton key={item}>
              <ListTextContent>
                <ListTitleSkeleton />
                <ListSummarySkeleton />
                <ListSummarySkeleton style={{ width: '70%' }} />
                <ListMetaSkeleton />
              </ListTextContent>
              <ListImageSkeleton />
            </ListItemSkeleton>
          ))}
        </ListLoadingSkeleton>
      </TopLoadingSection>

      {/* Bottom grid skeleton */}
      <BottomGridSkeleton>
        {[1, 2].map((item) => (
          <GridCardSkeleton key={item} />
        ))}
      </BottomGridSkeleton>

      {/* Section divider */}
      <SectionDividerSkeleton />

      {/* Latest articles section */}
      <div>
        <SectionTitleSkeleton />
        <LatestGridSkeleton>
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <LatestCardSkeleton key={item}>
              <LatestImageSkeleton />
              <LatestTitleSkeleton />
              <LatestMetaSkeleton />
            </LatestCardSkeleton>
          ))}
        </LatestGridSkeleton>
      </div>

      {/* Another section divider */}
      <SectionDividerSkeleton />

      {/* Video news section */}
      <div>
        <SectionTitleSkeleton />
        <LatestGridSkeleton>
          {[1, 2, 3, 4].map((item) => (
            <LatestCardSkeleton key={item}>
              <LatestImageSkeleton />
              <LatestTitleSkeleton />
              <LatestMetaSkeleton />
            </LatestCardSkeleton>
          ))}
        </LatestGridSkeleton>
      </div>
    </LoadingContainer>
  );
}