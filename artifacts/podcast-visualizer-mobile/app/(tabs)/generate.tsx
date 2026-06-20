import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColors } from "@/hooks/useColors";
import { useGeneratePodcast } from "@/hooks/usePodcasts";

const TOPIC_SUGGESTIONS = [
  "AI and the future of work",
  "Building a startup from scratch",
  "Mindfulness for entrepreneurs",
  "Personal finance basics",
  "The creator economy",
  "Leadership in remote teams",
];

export default function GenerateScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [topic, setTopic] = useState("");
  const { mutateAsync, isPending, error, reset } = useGeneratePodcast();
  const topPad = Platform.OS === "web" ? 67 : insets.top;

  const handleGenerate = async () => {
    if (!topic.trim() || isPending) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    try {
      const result = await mutateAsync(topic.trim());
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      router.push(`/podcast/${result.id}`);
    } catch {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  };

  const handleSuggestion = (suggestion: string) => {
    setTopic(suggestion);
    reset();
    Haptics.selectionAsync();
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { paddingTop: topPad + 12 }]}>
        <Text style={[styles.subtitle, { color: colors.primary }]}>AI-POWERED</Text>
        <Text style={[styles.title, { color: colors.foreground }]}>Generate</Text>
      </View>

      <ScrollView
        contentContainerStyle={[
          styles.body,
          { paddingBottom: Platform.OS === "web" ? 100 : insets.bottom + 80 },
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.inputCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.inputLabel, { color: colors.mutedForeground }]}>
            PODCAST TOPIC
          </Text>
          <TextInput
            style={[styles.topicInput, { color: colors.foreground }]}
            placeholder="e.g. Building a startup from scratch..."
            placeholderTextColor={colors.mutedForeground}
            value={topic}
            onChangeText={(t) => { setTopic(t); reset(); }}
            multiline
            numberOfLines={3}
            returnKeyType="done"
            editable={!isPending}
          />
        </View>

        {error ? (
          <View style={[styles.errorBox, { backgroundColor: "#EF444422", borderColor: "#EF444444" }]}>
            <Feather name="alert-circle" size={16} color="#EF4444" />
            <Text style={[styles.errorText, { color: "#EF4444" }]}>
              {(error as Error).message || "Generation failed. Try again."}
            </Text>
          </View>
        ) : null}

        <Pressable
          testID="generate-button"
          style={({ pressed }) => [
            styles.generateBtn,
            {
              backgroundColor: (!topic.trim() || isPending)
                ? colors.muted
                : colors.primary,
              opacity: pressed ? 0.85 : 1,
              transform: [{ scale: pressed ? 0.97 : 1 }],
            },
          ]}
          onPress={handleGenerate}
          disabled={!topic.trim() || isPending}
        >
          {isPending ? (
            <ActivityIndicator color="#FFFFFF" size="small" />
          ) : (
            <Feather name="zap" size={18} color="#FFFFFF" />
          )}
          <Text style={styles.generateText}>
            {isPending ? "Generating..." : "Generate Podcast"}
          </Text>
        </Pressable>

        {isPending && (
          <Text style={[styles.generatingHint, { color: colors.mutedForeground }]}>
            Creating your podcast visualization with AI...
          </Text>
        )}

        <View style={styles.suggestionsSection}>
          <Text style={[styles.suggestionsLabel, { color: colors.mutedForeground }]}>
            TOPIC IDEAS
          </Text>
          <View style={styles.chips}>
            {TOPIC_SUGGESTIONS.map((s) => (
              <Pressable
                key={s}
                onPress={() => handleSuggestion(s)}
                style={({ pressed }) => [
                  styles.chip,
                  {
                    backgroundColor: topic === s ? colors.primary + "22" : colors.card,
                    borderColor: topic === s ? colors.primary + "66" : colors.border,
                    opacity: pressed ? 0.75 : 1,
                  },
                ]}
              >
                <Text style={[styles.chipText, { color: topic === s ? colors.primary : colors.foreground }]}>
                  {s}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={[styles.infoCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Feather name="info" size={14} color={colors.mutedForeground} />
          <Text style={[styles.infoText, { color: colors.mutedForeground }]}>
            Powered by Gemini AI. Generates a poster, article, and video thumbnail for any podcast topic.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  subtitle: {
    fontSize: 11,
    fontFamily: "Inter_700Bold",
    letterSpacing: 2,
  },
  title: {
    fontSize: 32,
    fontFamily: "Inter_700Bold",
    letterSpacing: -0.8,
  },
  body: {
    paddingHorizontal: 20,
    paddingTop: 4,
    gap: 16,
  },
  inputCard: {
    borderRadius: 14,
    borderWidth: 1,
    padding: 16,
    gap: 8,
  },
  inputLabel: {
    fontSize: 10,
    fontFamily: "Inter_700Bold",
    letterSpacing: 1.5,
  },
  topicInput: {
    fontSize: 16,
    fontFamily: "Inter_400Regular",
    lineHeight: 24,
    minHeight: 72,
    textAlignVertical: "top",
  },
  errorBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderRadius: 10,
    borderWidth: 1,
    padding: 12,
  },
  errorText: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    flex: 1,
  },
  generateBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingVertical: 16,
    borderRadius: 14,
  },
  generateText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
  },
  generatingHint: {
    textAlign: "center",
    fontSize: 13,
    fontFamily: "Inter_400Regular",
  },
  suggestionsSection: {
    gap: 12,
  },
  suggestionsLabel: {
    fontSize: 10,
    fontFamily: "Inter_700Bold",
    letterSpacing: 1.5,
  },
  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  chipText: {
    fontSize: 13,
    fontFamily: "Inter_500Medium",
  },
  infoCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    borderRadius: 12,
    borderWidth: 1,
    padding: 14,
  },
  infoText: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    lineHeight: 20,
    flex: 1,
  },
});
