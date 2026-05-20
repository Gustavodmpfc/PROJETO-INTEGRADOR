import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { CheckCircle2 } from 'lucide-react-native';
import AppButton from '../components/AppButton';
import InfoCard from '../components/InfoCard';
import ScreenHeader from '../components/ScreenHeader';
import { activities } from '../data/mockData';
import { commonStyles } from '../styles/commonStyles';
import { theme } from '../styles/theme';

export default function QuizScreen({ route, navigation }) {
  const activity = useMemo(() => {
    return activities.find((item) => item.aula_id === route.params?.lessonId) || activities[0];
  }, [route.params?.lessonId]);
  const [selected, setSelected] = useState(null);
  const answered = selected !== null;
  const correct = selected === activity.resposta_correta;

  return (
    <ScrollView style={commonStyles.screen} contentContainerStyle={commonStyles.container}>
      <ScreenHeader title="Quiz da aula" subtitle={activity.pergunta} />
      <View style={styles.options}>
        {activity.alternativas.map((option, index) => (
          <Pressable
            key={option}
            onPress={() => setSelected(index)}
            style={[
              styles.option,
              selected === index && styles.selected,
              answered && index === activity.resposta_correta && styles.correct,
            ]}
          >
            <Text style={styles.optionText}>{String.fromCharCode(65 + index)}. {option}</Text>
          </Pressable>
        ))}
      </View>

      {answered ? (
        <InfoCard
          title={correct ? 'Resposta correta' : 'Continue estudando'}
          description={correct ? 'Muito bem. Sua resposta foi registrada no prototipo.' : 'Revise o video e tente novamente.'}
          tone={correct ? 'gold' : 'default'}
        />
      ) : null}

      <AppButton title="Finalizar atividade" icon={CheckCircle2} onPress={() => navigation.navigate('Progress')} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  options: {
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.md,
  },
  option: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderWidth: 1,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
  },
  selected: {
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.softGreen,
  },
  correct: {
    borderColor: theme.colors.success,
  },
  optionText: {
    color: theme.colors.text,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '600',
  },
});
