import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { ScreenWrapper, Card, OrnamentalDivider } from '../components/ui';
import { COLORS, SPACING, TYPOGRAPHY, RADIUS, LAYOUT } from '../constants/theme';
import { useAppStore } from '../store/useAppStore';

export function ProfileScreen() {
  const { progress } = useAppStore();

  const settings = [
    { icon: '🔔', label: 'Notifications', value: 'On' },
    { icon: '🌙', label: 'Theme', value: 'Dark' },
    { icon: '🔤', label: 'Font Size', value: 'Medium' },
    { icon: '🗣️', label: 'TTS Voice', value: 'Default' },
    { icon: '📊', label: 'Analytics', value: '' },
    { icon: '💾', label: 'Export Data', value: '' },
    { icon: '❓', label: 'About Chokhmah', value: 'v1.0.0' },
  ];

  return (
    <ScreenWrapper showConstellation={false}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.title}>Profile</Text>

        {/* User Stats Summary */}
        <Card style={styles.profileCard}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarEmoji}>👑</Text>
          </View>
          <Text style={styles.userName}>Wisdom Seeker</Text>
          <Text style={styles.userLevel}>Level {progress.level} · {progress.currentStreak} day streak</Text>

          <OrnamentalDivider />

          <View style={styles.miniStats}>
            <View style={styles.miniStat}>
              <Text style={styles.miniStatValue}>{progress.totalQuestionsAnswered}</Text>
              <Text style={styles.miniStatLabel}>Questions</Text>
            </View>
            <View style={styles.miniStat}>
              <Text style={styles.miniStatValue}>{progress.retentionRate}%</Text>
              <Text style={styles.miniStatLabel}>Retention</Text>
            </View>
            <View style={styles.miniStat}>
              <Text style={styles.miniStatValue}>{(progress.totalMinutesLearned / 60).toFixed(1)}h</Text>
              <Text style={styles.miniStatLabel}>Learned</Text>
            </View>
          </View>
        </Card>

        {/* Settings */}
        <Text style={styles.sectionTitle}>Settings</Text>

        {settings.map((setting, idx) => (
          <Pressable key={idx} style={styles.settingRow}>
            <Text style={styles.settingIcon}>{setting.icon}</Text>
            <Text style={styles.settingLabel}>{setting.label}</Text>
            <Text style={styles.settingValue}>{setting.value}</Text>
            <Text style={styles.settingArrow}>›</Text>
          </Pressable>
        ))}

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={styles.appName}>✦ Chokhmah ✦</Text>
          <Text style={styles.appTagline}>Hebrew for "Wisdom"</Text>
          <Text style={styles.appVersion}>100% Free · All Features Unlocked</Text>
        </View>

        <View style={{ height: LAYOUT.tabBarHeight + SPACING.lg }} />
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  scrollContent: { paddingTop: SPACING.xl },
  title: { ...TYPOGRAPHY.displayLg, marginBottom: SPACING.lg },
  profileCard: { alignItems: 'center', marginBottom: SPACING.lg },
  avatarCircle: {
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: COLORS.primary,
    alignItems: 'center', justifyContent: 'center',
    marginBottom: SPACING.md,
  },
  avatarEmoji: { fontSize: 36 },
  userName: { ...TYPOGRAPHY.heading },
  userLevel: { ...TYPOGRAPHY.caption, color: COLORS.gold, marginTop: SPACING.xs },
  miniStats: { flexDirection: 'row', justifyContent: 'space-around', width: '100%' },
  miniStat: { alignItems: 'center' },
  miniStatValue: { ...TYPOGRAPHY.displaySm, color: COLORS.gold, fontSize: 22 },
  miniStatLabel: { ...TYPOGRAPHY.micro },
  sectionTitle: {
    ...TYPOGRAPHY.subheading,
    color: COLORS.textSecondary,
    marginBottom: SPACING.md,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.divider,
  },
  settingIcon: { fontSize: 20, width: 32 },
  settingLabel: { ...TYPOGRAPHY.body, flex: 1 },
  settingValue: { ...TYPOGRAPHY.caption, color: COLORS.textMuted, marginRight: SPACING.sm },
  settingArrow: { ...TYPOGRAPHY.heading, color: COLORS.textMuted, fontSize: 20 },
  appInfo: {
    alignItems: 'center',
    paddingVertical: SPACING.xxl,
  },
  appName: { ...TYPOGRAPHY.heading, color: COLORS.gold },
  appTagline: { ...TYPOGRAPHY.caption, fontStyle: 'italic', marginTop: SPACING.xs },
  appVersion: { ...TYPOGRAPHY.micro, marginTop: SPACING.xs },
});
