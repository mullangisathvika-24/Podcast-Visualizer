/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface PosterAsset {
  caption: string;
  slogan?: string;
  imageType: string;
  themeStyle: string;
  takeaways: string[];
}

export interface ArticleAsset {
  summary: string;
  overview: string;
  sections: {
    heading: string;
    content: string;
  }[];
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

export interface UserSession {
  isLoggedIn: boolean;
  username: string;
  email: string;
}
