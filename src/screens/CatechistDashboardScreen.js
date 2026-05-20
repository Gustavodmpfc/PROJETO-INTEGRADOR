import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Megaphone, UsersRound, UserRound, ListOrdered } from 'lucide-react-native';
import AppButton from '../components/AppButton';
import InfoCard from '../components/InfoCard';
import ScreenHeader from '../components/ScreenHeader';
import { lessons, students } from '../data/mockData';
import { commonStyles } from '../styles/commonStyles';
import { theme } from '../styles/theme';

export default function CatechistDashboardScreen({ navigation }) {
  const average = students.reduce((sum, student) => sum + student.progresso, 0) / students.length;

  return (
    <ScrollView style={commonStyles.screen} contentContainerStyle={commonStyles.container}>
      <ScreenHeader title="Painel do catequista" subtitle="Gerencie turma, alunos, comunicados e ordem das aulas." />

      <View style={styles.stats}>
        <InfoCard title={`${students.length}`} description="Alunos vinculados" />
        <InfoCard title={`${Math.round(average)}%`} description="Media da turma" />
      </View>

      <View style={styles.grid}>
        <AppButton title="Ver alunos" icon={UsersRound} onPress={() => navigation.navigate('Students')} />
        <AppButton title="Comunicados" icon={Megaphone} variant="secondary" onPress={() => navigation.navigate('Announcements')} />
        <AppButton title="Perfil" icon={UserRound} variant="secondary" onPress={() => navigation.navigate('Profile')} />
      </View>

      <InfoCard title="Organizacao das aulas" description="Estrutura simulada para ordenar a trilha da turma." tone="gold">
        {lessons.map((lesson) => (
          <View key={lesson.id} style={styles.lessonRow}>
            <ListOrdered size={18} color={theme.colors.primaryDark} />
            <Text style={styles.lessonText}>{lesson.ordem}. {lesson.titulo}</Text>
          </View>
        ))}
      </InfoCard>

      <InfoCard title="Criar comunicado" description="Formulario visual para a proxima integracao com Supabase.">
        <TextInput style={styles.input} placeholder="Titulo do comunicado" />
        <TextInput style={[styles.input, styles.textArea]} placeholder="Mensagem para a turma" multiline />
        <AppButton title="Publicar comunicado simulado" icon={Megaphone} />
      </InfoCard>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  stats: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  grid: {
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.md,
  },
  lessonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    paddingVertical: theme.spacing.sm,
    borderBottomColor: theme.colors.border,
    borderBottomWidth: 1,
  },
  lessonText: {
    color: theme.colors.text,
    flex: 1,
    fontSize: 15,
    fontWeight: '700',
  },
  input: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderWidth: 1,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    marginTop: theme.spacing.sm,
    fontSize: 15,
  },
  textArea: {
    minHeight: 96,
    textAlignVertical: 'top',
  },
});
