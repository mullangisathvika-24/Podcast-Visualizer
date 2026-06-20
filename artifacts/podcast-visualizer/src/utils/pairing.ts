import { PodcastAsset, PosterAsset, ArticleAsset, ThumbnailAsset } from "../types";

export interface ChronologicalPair {
  id: string;
  index: number; // Strictly chronological 1, 2, 3...
  title: string;
  poster: PosterAsset;
  article: ArticleAsset & {
    body?: string[];
    takeaway?: string;
  };
  thumbnail?: ThumbnailAsset;
}

// Memory-backed registry to store paired assets in strict chronological sequence.
const chronologicalRegistry: ChronologicalPair[] = [];

/**
 * Registers an episode pairing and locks in its 1-indexed chronological position.
 * Prevents mismatched relationships by grouping the poster and article permanently.
 */
export function registerChronoPair(podcast: PodcastAsset, indexValue?: number): ChronologicalPair {
  const existing = chronologicalRegistry.find((p) => p.id === podcast.id);
  if (existing) {
    return existing;
  }

  // Next index in sequence (chronological)
  const nextIdx = indexValue !== undefined ? indexValue : (chronologicalRegistry.length + 1);

  // Safely map body & takeaway if they exist elsewhere (e.g., from ArticleDigest)
  const pair: ChronologicalPair = {
    id: podcast.id,
    index: nextIdx,
    title: podcast.title,
    poster: podcast.poster,
    article: {
      ...podcast.article,
      sections: podcast.article?.sections || [],
      summary: podcast.article?.summary || podcast.poster?.caption || "",
      overview: podcast.article?.overview || "",
      conclusion: podcast.article?.conclusion || "",
    },
    thumbnail: podcast.thumbnail
  };

  chronologicalRegistry.push(pair);
  
  // Enforce chronological sorting by index strictly to block any temporary or user-induced reordering from breaking sequence.
  chronologicalRegistry.sort((a, b) => a.index - b.index);

  return pair;
}

/**
 * Retrieves the complete set of linked pairings in exact chronological order.
 * Strictly guarantees that list sequences are never reordered.
 */
export function getChronologicalPairs(): ChronologicalPair[] {
  return [...chronologicalRegistry];
}

/**
 * Retrieves a single pairing by its unique ID.
 * This ensures absolute relationship lockstep—preventing any mismatch between
 * the active poster and active article detail view.
 */
export function getPairById(id: string): ChronologicalPair | undefined {
  return chronologicalRegistry.find((p) => p.id === id);
}

/**
 * Clears the registry (useful if podcasts list gets updated).
 */
export function clearRegistry() {
  chronologicalRegistry.length = 0;
}
