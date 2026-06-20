import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useColors } from "@/hooks/useColors";
import { ArticleAsset } from "@/types";

interface Props {
  article: ArticleAsset;
  title: string;
  creator: string;
}

export function ArticleView({ article, title, creator }: Props) {
  const colors = useColors();

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Text style={[styles.articleTitle, { color: colors.foreground }]}>
        {title}
      </Text>
      <Text style={[styles.byline, { color: colors.mutedForeground }]}>
        by {creator}
      </Text>

      <View style={[styles.divider, { backgroundColor: colors.border }]} />

      <Text style={[styles.summary, { color: colors.foreground }]}>
        {article.summary}
      </Text>

      {article.overview ? (
        <Text style={[styles.overview, { color: colors.mutedForeground }]}>
          {article.overview}
        </Text>
      ) : null}

      {article.sections?.map((section, i) => (
        <View key={i} style={styles.section}>
          <Text style={[styles.sectionHeading, { color: colors.primary }]}>
            {section.heading}
          </Text>
          <Text style={[styles.sectionContent, { color: colors.foreground }]}>
            {section.content}
          </Text>
        </View>
      ))}

      {article.conclusion ? (
        <View style={[styles.conclusionBox, { backgroundColor: colors.primary + "15", borderColor: colors.primary + "40", borderWidth: 1 }]}>
          <Text style={[styles.conclusionLabel, { color: colors.primary }]}>
            KEY TAKEAWAY
          </Text>
          <Text style={[styles.conclusionText, { color: colors.foreground }]}>
            {article.conclusion}
          </Text>
        </View>
      ) : null}

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  articleTitle: {
    fontSize: 22,
    fontFamily: "Inter_700Bold",
    lineHeight: 30,
    marginBottom: 6,
  },
  byline: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    marginBottom: 16,
  },
  divider: {
    height: 1,
    marginBottom: 20,
  },
  summary: {
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
    lineHeight: 24,
    marginBottom: 12,
  },
  overview: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    lineHeight: 22,
    marginBottom: 24,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeading: {
    fontSize: 15,
    fontFamily: "Inter_700Bold",
    marginBottom: 8,
  },
  sectionContent: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    lineHeight: 22,
  },
  conclusionBox: {
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
  },
  conclusionLabel: {
    fontSize: 10,
    fontFamily: "Inter_700Bold",
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  conclusionText: {
    fontSize: 14,
    fontFamily: "Inter_500Medium",
    lineHeight: 22,
  },
});
