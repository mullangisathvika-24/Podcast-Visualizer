export interface PosterAsset {
  caption: string;
  slogan?: string;
  imageType: string;
  themeStyle: string;
  takeaways: string[];
}

export interface ArticleSection {
  heading: string;
  content: string;
}

export interface ArticleAsset {
  summary: string;
  overview: string;
  sections: ArticleSection[];
  conclusion: string;
}

export interface ThumbnailAsset {
  caption: string;
  layoutDescription: string;
  focusElement: string;
  badgeText: string;
}

export interface PodcastAsset {
  id: string;
  title: string;
  creatorName: string;
  sourceUrl: string;
  artworkUrl: string;
  category: string;
  audioDuration?: string;
  playbackUrl?: string;
  poster: PosterAsset;
  article: ArticleAsset;
  thumbnail: ThumbnailAsset;
}
