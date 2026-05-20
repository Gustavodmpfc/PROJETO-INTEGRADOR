import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../styles/theme';

export default function AppButton({ title, onPress, variant = 'primary', icon: Icon, loading = false, disabled = false }) {
  const isSecondary = variant === 'secondary';
  const isDisabled = disabled || loading;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.wrap,
        isSecondary ? styles.secondary : styles.primary,
        pressed && styles.pressed,
        isDisabled && styles.disabled,
      ]}
    >
      <LinearGradient
        colors={isSecondary ? [theme.colors.softGreen, '#FFFFFF'] : [theme.colors.primary, theme.colors.primaryDark]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.button}
      >
        <View style={styles.content}>
          {loading ? (
            <ActivityIndicator color={isSecondary ? theme.colors.primaryDark : '#FFFFFF'} />
          ) : Icon ? (
            <Icon size={20} color={isSecondary ? theme.colors.primaryDark : '#FFFFFF'} />
          ) : null}
          <Text style={[styles.text, isSecondary && styles.secondaryText]}>{title}</Text>
        </View>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: {
    borderRadius: theme.radius.md,
    overflow: 'hidden',
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: theme.spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 52,
  },
  primary: {
    ...theme.shadows.button,
  },
  secondary: {
    borderColor: theme.colors.primary,
    borderWidth: 1,
    ...theme.shadows.soft,
  },
  pressed: {
    opacity: 0.86,
  },
  disabled: {
    opacity: 0.65,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryText: {
    color: theme.colors.primaryDark,
  },
});
