import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { CircleAlert, CircleCheck } from 'lucide-react-native';
import InfoCard from '../components/InfoCard';
import ProgressBar from '../components/ProgressBar';
import ScreenHeader from '../components/ScreenHeader';
import { students } from '../data/mockData';
import { commonStyles } from '../styles/commonStyles';
import { theme } from '../styles/theme';

export default function StudentsScreen() {
  return (
    <ScrollView style={commonStyles.screen} contentContainerStyle={commonStyles.container}>
      <ScreenHeader title="Alunos da turma" subtitle="Acompanhamento simulado do progresso individual." />
      {students.map((student) => (
        <InfoCard key={student.id} title={student.nome} description={`Ultimo acesso: ${student.ultimoAcesso}`}>
          <View style={styles.statusRow}>
            {student.status === 'ativo' ? (
              <CircleCheck size={18} color={theme.colors.success} />
            ) : (
              <CircleAlert size={18} color={theme.colors.warning} />
            )}
            <Text style={styles.status}>{student.status === 'ativo' ? 'Acesso ativo' : 'Pagamento pendente'}</Text>
            <Text style={styles.percent}>{student.progresso}%</Text>
          </View>
          <ProgressBar value={student.progresso} />
        </InfoCard>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
    marginVertical: theme.spacing.sm,
  },
  status: {
    color: theme.colors.muted,
    flex: 1,
    fontSize: 14,
  },
  percent: {
    color: theme.colors.primaryDark,
    fontWeight: '800',
  },
});
