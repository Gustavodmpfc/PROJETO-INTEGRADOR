import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../styles/theme';

export default function InfoCard({ title, description, children, tone = 'default' }) {
  const gradientColors = tone === 'gold'
    ? [theme.colors.softGold, '#FFFFFF']
    : [theme.colors.surface, theme.colors.glow];

  return (
    <View style={styles.shadowWrap}>
      <LinearGradient colors={gradientColors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.card}>
        <Text style={styles.title}>{title}</Text>
        {description ? <Text style={styles.description}>{description}</Text> : null}
        {children}
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  shadowWrap: {
    borderRadius: theme.radius.md,
    marginBottom: theme.spacing.md,
    ...theme.shadows.soft,
  },
  card: {
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.md,
    overflow: 'hidden',
  },
  title: {
    color: theme.colors.text,
    fontSize: 18,
    fontWeight: '800',
  },
  description: {
    color: theme.colors.muted,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 5,
  },
});
