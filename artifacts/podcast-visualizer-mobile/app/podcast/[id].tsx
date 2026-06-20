import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ArticleView } from "@/components/ArticleView";
import { PosterView } from "@/components/PosterView";
import { VideoThumbView } from "@/components/VideoThumbView";
import { useColors } from "@/hooks/useColors";
import { usePodcasts } from "@/hooks/usePodcasts";

type Tab = "poster" | "article" | "video";

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: "poster", label: "Poster", icon: "image" },
  { id: "article", label: "Article", icon: "file-text" },
  { id: "video", label: "Video", icon: "play-circle" },
];

export default function PodcastDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<Tab>("poster");
  const { data: podcasts, isLoading } = usePodcasts();

  const podcast = podcasts?.find((p) => p.id === id);
  const topPad = Platform.OS === "web" ? 67 : insets.top;

  const handleTabPress = (tab: Tab) => {
    Haptics.selectionAsync();
    setActiveTab(tab);
  };

  if (isLoading) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <ActivityIndicator color={colors.primary} size="large" />
      </View>
    );
  }

  if (!podcast) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <Feather name="alert-circle" size={40} color={colors.mutedForeground} />
        <Text style={[styles.notFoundText, { color: colors.foreground }]}>
          Podcast not found
        </Text>
        <Pressable
          style={[styles.backBtn, { backgroundColor: colors.primary }]}
          onPress={() => router.back()}
        >
          <Text style={styles.backBtnText}>Go back</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.topBar, { paddingTop: topPad + 8, borderBottomColor: colors.border }]}>
        <Pressable
          style={({ pressed }) => [styles.backIconBtn, { opacity: pressed ? 0.6 : 1 }]}
          onPress={() => router.back()}
          testID="back-button"
        >
          <Feather name="arrow-left" size={22} color={colors.foreground} />
        </Pressable>
        <View style={styles.topBarMeta}>
          <Text style={[styles.topBarCategory, { color: colors.primary }]} numberOfLines={1}>
            {podcast.category}
          </Text>
        </View>
        {podcast.artworkUrl ? (
          <Image
            source={{ uri: podcast.artworkUrl }}
            style={styles.topBarArtwork}
            resizeMode="cover"
          />
        ) : (
          <View style={[styles.topBarArtwork, { backgroundColor: colors.card }]}>
            <Feather name="headphones" size={16} color={colors.primary} />
          </View>
        )}
      </View>

      <View style={[styles.titleSection, { borderBottomColor: colors.border }]}>
        <Text style={[styles.podcastTitle, { color: colors.foreground }]} numberOfLines={3}>
          {podcast.title}
        </Text>
        <Text style={[styles.creator, { color: colors.mutedForeground }]}>
          {podcast.creatorName}
        </Text>
      </View>

      <View style={[styles.tabBar, { borderBottomColor: colors.border }]}>
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <Pressable
              key={tab.id}
              style={[
                styles.tabBtn,
                isActive && { borderBottomColor: colors.primary, borderBottomWidth: 2 },
              ]}
              onPress={() => handleTabPress(tab.id)}
            >
              <Feather
                name={tab.icon as any}
                size={16}
                color={isActive ? colors.primary : colors.mutedForeground}
              />
              <Text
                style={[
                  styles.tabLabel,
                  { color: isActive ? colors.primary : colors.mutedForeground },
                  isActive && { fontFamily: "Inter_600SemiBold" },
                ]}
              >
                {tab.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <View style={[styles.tabContent, { paddingBottom: Platform.OS === "web" ? 34 : 0 }]}>
        {activeTab === "poster" && (
          <PosterView poster={podcast.poster} title={podcast.title} podcastId={podcast.id} />
        )}
        {activeTab === "article" && (
          <ArticleView
            article={podcast.article}
            title={podcast.title}
            creator={podcast.creatorName}
          />
        )}
        {activeTab === "video" && (
          <VideoThumbView
            thumbnail={podcast.thumbnail}
            title={podcast.title}
            podcastId={podcast.id}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  notFoundText: {
    fontSize: 16,
    fontFamily: "Inter_500Medium",
  },
  backBtn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 4,
  },
  backBtnText: {
    color: "#fff",
    fontFamily: "Inter_600SemiBold",
    fontSize: 14,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    gap: 12,
  },
  backIconBtn: {
    padding: 4,
  },
  topBarMeta: {
    flex: 1,
  },
  topBarCategory: {
    fontSize: 11,
    fontFamily: "Inter_600SemiBold",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  topBarArtwork: {
    width: 36,
    height: 36,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  titleSection: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    gap: 4,
  },
  podcastTitle: {
    fontSize: 18,
    fontFamily: "Inter_700Bold",
    lineHeight: 24,
  },
  creator: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
  },
  tabBar: {
    flexDirection: "row",
    borderBottomWidth: 1,
  },
  tabBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    gap: 6,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  tabLabel: {
    fontSize: 13,
    fontFamily: "Inter_500Medium",
  },
  tabContent: {
    flex: 1,
  },
});
