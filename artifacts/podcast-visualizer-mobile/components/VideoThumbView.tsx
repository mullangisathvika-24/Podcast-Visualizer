import { Feather } from "@expo/vector-icons";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useColors } from "@/hooks/useColors";
import { ThumbnailAsset } from "@/types";

interface Props {
  thumbnail: ThumbnailAsset;
  title: string;
  podcastId: string;
}

const THUMB_ACCENTS = ["#8B5CF6", "#F59E0B", "#10B981", "#3B82F6", "#EC4899", "#14B8A6", "#EF4444", "#F97316"];

function getAccent(id: string) {
  const num = parseInt(id.replace(/\D/g, ""), 10) || 0;
  return THUMB_ACCENTS[num % THUMB_ACCENTS.length];
}

export function VideoThumbView({ thumbnail, title, podcastId }: Props) {
  const colors = useColors();
  const accent = getAccent(podcastId);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={[styles.thumbPreview, { backgroundColor: "#0A0A0F", borderColor: accent + "33" }]}>
        <View style={styles.thumbInner}>
          <View style={[styles.playBtn, { backgroundColor: accent }]}>
            <Feather name="play" size={32} color="#FFFFFF" />
          </View>
          <Text style={[styles.thumbCaption, { color: "#FFFFFF" }]}>
            {thumbnail.caption}
          </Text>
          <View style={[styles.badge, { backgroundColor: accent }]}>
            <Text style={styles.badgeText}>{thumbnail.badgeText}</Text>
          </View>
        </View>
        <View style={[styles.thumbFooter, { borderTopColor: accent + "33" }]}>
          <Text style={[styles.footerLabel, { color: accent }]}>FOCUS</Text>
          <Text style={[styles.footerValue, { color: "#E4E4E7" }]}>{thumbnail.focusElement}</Text>
        </View>
      </View>

      <View style={[styles.infoCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <Text style={[styles.infoLabel, { color: colors.mutedForeground }]}>Layout</Text>
        <Text style={[styles.infoValue, { color: colors.foreground }]}>
          {thumbnail.layoutDescription}
        </Text>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 16,
  },
  thumbPreview: {
    borderRadius: 16,
    borderWidth: 1,
    aspectRatio: 16 / 9,
    overflow: "hidden",
    justifyContent: "space-between",
  },
  thumbInner: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    gap: 12,
  },
  playBtn: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 4,
  },
  thumbCaption: {
    fontSize: 18,
    fontFamily: "Inter_700Bold",
    textAlign: "center",
    lineHeight: 26,
    letterSpacing: -0.3,
  },
  badge: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },
  badgeText: {
    fontSize: 12,
    fontFamily: "Inter_700Bold",
    color: "#FFFFFF",
    letterSpacing: 0.5,
  },
  thumbFooter: {
    padding: 14,
    borderTopWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  footerLabel: {
    fontSize: 10,
    fontFamily: "Inter_700Bold",
    letterSpacing: 1.5,
  },
  footerValue: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    flex: 1,
  },
  infoCard: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    gap: 6,
  },
  infoLabel: {
    fontSize: 11,
    fontFamily: "Inter_600SemiBold",
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  infoValue: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    lineHeight: 22,
  },
});
