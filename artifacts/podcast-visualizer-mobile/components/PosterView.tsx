import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useColors } from "@/hooks/useColors";
import { PosterAsset } from "@/types";

const POSTER_ACCENTS = [
  "#8B5CF6",
  "#F59E0B",
  "#10B981",
  "#3B82F6",
  "#EC4899",
  "#14B8A6",
  "#EF4444",
  "#F97316",
];

function getAccent(id: string) {
  const num = parseInt(id.replace(/\D/g, ""), 10) || 0;
  return POSTER_ACCENTS[num % POSTER_ACCENTS.length];
}

interface Props {
  poster: PosterAsset;
  title: string;
  podcastId: string;
}

export function PosterView({ poster, title, podcastId }: Props) {
  const colors = useColors();
  const accent = getAccent(podcastId);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={[styles.posterCard, { backgroundColor: "#0A0A0F", borderColor: accent + "33" }]}>
        <View style={[styles.posterHeader, { borderBottomColor: accent + "22" }]}>
          <View style={[styles.themeChip, { backgroundColor: accent + "20", borderColor: accent + "40" }]}>
            <Text style={[styles.themeText, { color: accent }]}>
              {poster.themeStyle.toUpperCase()}
            </Text>
          </View>
        </View>

        <View style={styles.posterBody}>
          <Text style={[styles.caption, { color: "#FFFFFF" }]}>
            {poster.caption}
          </Text>
          {poster.slogan ? (
            <Text style={[styles.slogan, { color: accent }]}>
              {poster.slogan}
            </Text>
          ) : null}
        </View>

        <View style={[styles.accentLine, { backgroundColor: accent }]} />

        <View style={styles.takeawaysSection}>
          <Text style={[styles.takeawaysLabel, { color: accent }]}>
            KEY INSIGHTS
          </Text>
          {poster.takeaways?.map((takeaway, i) => (
            <View key={i} style={styles.takeawayRow}>
              <View style={[styles.bullet, { backgroundColor: accent }]} />
              <Text style={[styles.takeaway, { color: "#E4E4E7" }]}>
                {takeaway}
              </Text>
            </View>
          ))}
        </View>

        <View style={[styles.posterFooter, { borderTopColor: accent + "22" }]}>
          <Text style={[styles.footerText, { color: accent + "88" }]}>
            {poster.imageType.toUpperCase()}
          </Text>
        </View>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  posterCard: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: "hidden",
  },
  posterHeader: {
    padding: 16,
    borderBottomWidth: 1,
  },
  themeChip: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
  },
  themeText: {
    fontSize: 10,
    fontFamily: "Inter_700Bold",
    letterSpacing: 1.5,
  },
  posterBody: {
    padding: 20,
    gap: 12,
  },
  caption: {
    fontSize: 26,
    fontFamily: "Inter_700Bold",
    lineHeight: 34,
    letterSpacing: -0.5,
  },
  slogan: {
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
    lineHeight: 24,
    fontStyle: "italic",
  },
  accentLine: {
    height: 2,
    marginHorizontal: 20,
    borderRadius: 1,
    marginBottom: 20,
  },
  takeawaysSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 12,
  },
  takeawaysLabel: {
    fontSize: 10,
    fontFamily: "Inter_700Bold",
    letterSpacing: 2,
    marginBottom: 4,
  },
  takeawayRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
  },
  bullet: {
    width: 5,
    height: 5,
    borderRadius: 3,
    marginTop: 8,
    flexShrink: 0,
  },
  takeaway: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    lineHeight: 22,
    flex: 1,
  },
  posterFooter: {
    borderTopWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  footerText: {
    fontSize: 10,
    fontFamily: "Inter_500Medium",
    letterSpacing: 1,
  },
});
