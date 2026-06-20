import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import React from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useColors } from "@/hooks/useColors";
import { PodcastAsset } from "@/types";

const ACCENT_COLORS = [
  "#8B5CF6",
  "#F59E0B",
  "#10B981",
  "#3B82F6",
  "#EC4899",
  "#14B8A6",
  "#EF4444",
  "#F97316",
  "#6366F1",
  "#84CC16",
];

function getAccentColor(id: string): string {
  const num = parseInt(id.replace(/\D/g, ""), 10) || 0;
  return ACCENT_COLORS[num % ACCENT_COLORS.length];
}

interface Props {
  podcast: PodcastAsset;
  index: number;
}

export function PodcastCard({ podcast, index }: Props) {
  const colors = useColors();
  const accent = getAccentColor(podcast.id);

  const handlePress = () => {
    Haptics.selectionAsync();
    router.push(`/podcast/${podcast.id}`);
  };

  return (
    <Pressable
      testID={`podcast-card-${podcast.id}`}
      onPress={handlePress}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
          opacity: pressed ? 0.85 : 1,
          transform: [{ scale: pressed ? 0.98 : 1 }],
        },
      ]}
    >
      <View style={[styles.accentBar, { backgroundColor: accent }]} />
      <View style={styles.content}>
        {podcast.artworkUrl ? (
          <Image
            source={{ uri: podcast.artworkUrl }}
            style={[styles.artwork, { backgroundColor: colors.muted }]}
            resizeMode="cover"
          />
        ) : (
          <View style={[styles.artwork, { backgroundColor: colors.muted, alignItems: "center", justifyContent: "center" }]}>
            <Feather name="headphones" size={24} color={accent} />
          </View>
        )}
        <View style={styles.meta}>
          <View style={[styles.categoryBadge, { backgroundColor: accent + "22", borderColor: accent + "44" }]}>
            <Text style={[styles.category, { color: accent }]} numberOfLines={1}>
              {podcast.category}
            </Text>
          </View>
          <Text style={[styles.title, { color: colors.foreground }]} numberOfLines={2}>
            {podcast.title}
          </Text>
          <View style={styles.footer}>
            <Text style={[styles.creator, { color: colors.mutedForeground }]} numberOfLines={1}>
              {podcast.creatorName}
            </Text>
            {podcast.audioDuration && (
              <View style={styles.duration}>
                <Feather name="clock" size={11} color={colors.mutedForeground} />
                <Text style={[styles.durationText, { color: colors.mutedForeground }]}>
                  {podcast.audioDuration}
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 12,
    overflow: "hidden",
    flexDirection: "row",
  },
  accentBar: {
    width: 3,
  },
  content: {
    flex: 1,
    flexDirection: "row",
    padding: 14,
    gap: 12,
    alignItems: "center",
  },
  artwork: {
    width: 72,
    height: 72,
    borderRadius: 10,
    flexShrink: 0,
  },
  meta: {
    flex: 1,
    gap: 6,
  },
  categoryBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 20,
    borderWidth: 1,
  },
  category: {
    fontSize: 10,
    fontFamily: "Inter_600SemiBold",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 15,
    fontFamily: "Inter_600SemiBold",
    lineHeight: 20,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  creator: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    flex: 1,
  },
  duration: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  durationText: {
    fontSize: 11,
    fontFamily: "Inter_400Regular",
  },
});
