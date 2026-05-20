import { Pressable, StyleSheet, Text, View } from 'react-native';
import { BookOpen, CheckCircle2, Clock } from 'lucide-react-native';
import { theme } from '../styles/theme';
import ProgressBar from './ProgressBar';

export default function LessonCard({ lesson, onPress }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <View style={styles.iconBox}>
        {lesson.concluida ? (
          <CheckCircle2 size={26} color={theme.colors.success} />
        ) : (
          <BookOpen size={26} color={theme.colors.primaryDark} />
        )}
      </View>
      <View style={styles.content}>
        <Text style={styles.module}>{lesson.modulo}</Text>
        <Text style={styles.title}>{lesson.ordem}. {lesson.titulo}</Text>
        <Text style={styles.description}>{lesson.descricao}</Text>
        <View style={styles.meta}>
          <Clock size={15} color={theme.colors.muted} />
          <Text style={styles.metaText}>{lesson.duracao}</Text>
        </View>
        <ProgressBar value={lesson.percentual} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.md,
    flexDirection: 'row',
    gap: theme.spacing.md,
    marginBottom: theme.spacing.md,
    ...theme.shadows.soft,
  },
  pressed: {
    opacity: 0.85,
  },
  iconBox: {
    backgroundColor: theme.colors.softGreen,
    borderRadius: theme.radius.md,
    height: 52,
    width: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
  module: {
    color: theme.colors.accent,
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  title: {
    color: theme.colors.text,
    fontSize: 18,
    fontWeight: '800',
    marginTop: 2,
  },
  description: {
    color: theme.colors.muted,
    fontSize: 14,
    lineHeight: 20,
    marginVertical: 8,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 8,
  },
  metaText: {
    color: theme.colors.muted,
    fontSize: 13,
  },
});
