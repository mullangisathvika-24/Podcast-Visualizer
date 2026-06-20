import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { PodcastAsset } from "@/types";

const getBaseUrl = () => {
  const domain = process.env.EXPO_PUBLIC_DOMAIN;
  if (domain) return `https://${domain}`;
  return "";
};

export function usePodcasts() {
  return useQuery<PodcastAsset[]>({
    queryKey: ["podcasts"],
    queryFn: async () => {
      const res = await fetch(`${getBaseUrl()}/api/podcasts`);
      if (!res.ok) throw new Error("Failed to fetch podcasts");
      const json = await res.json();
      return (json.data ?? json) as PodcastAsset[];
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useGeneratePodcast() {
  const queryClient = useQueryClient();
  return useMutation<PodcastAsset, Error, string>({
    mutationFn: async (topic: string) => {
      const res = await fetch(`${getBaseUrl()}/api/generate-podcast`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error((err as any).error || "Failed to generate podcast");
      }
      const json = await res.json();
      return (json.data ?? json) as PodcastAsset;
    },
    onSuccess: (newPodcast) => {
      queryClient.setQueryData<PodcastAsset[]>(["podcasts"], (old) =>
        old ? [newPodcast, ...old] : [newPodcast]
      );
    },
  });
}
