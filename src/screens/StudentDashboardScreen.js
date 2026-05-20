import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Bell, BookOpen, ChartNoAxesCombined, UserRound } from 'lucide-react-native';
import AppButton from '../components/AppButton';
import InfoCard from '../components/InfoCard';
import ProgressBar from '../components/ProgressBar';
import ScreenHeader from '../components/ScreenHeader';
import { useAuth } from '../context/AuthContext';
import { announcements, currentUser, lessons } from '../data/mockData';
import { formatPercent } from '../utils/formatters';
import { commonStyles } from '../styles/commonStyles';
import { theme } from '../styles/theme';

export default function StudentDashboardScreen({ navigation }) {
  const { profile, user } = useAuth();
  const userName = profile?.nome || user?.user_metadata?.nome || currentUser.nome;
  const className = profile?.paroquias?.nome || currentUser.turma;
  const average = lessons.reduce((sum, item) => sum + item.percentual, 0) / lessons.length;
  const nextLesson = lessons.find((lesson) => !lesson.concluida) || lessons[0];

  return (
    <ScrollView style={commonStyles.screen} contentContainerStyle={commonStyles.container}>
      <ScreenHeader title={`Ola, ${userName.split(' ')[0]}`} subtitle={className} />

      <InfoCard title="Seu caminho esta em andamento" description={`${formatPercent(average)} do percurso concluido`}>
        <View style={styles.progressWrap}>
          <ProgressBar value={average} />
        </View>
      </InfoCard>

      <InfoCard title="Proxima aula" description={nextLesson.titulo} tone="gold">
        <Text style={styles.text}>{nextLesson.descricao}</Text>
      </InfoCard>

      <View style={styles.grid}>
        <AppButton title="Ver aulas" icon={BookOpen} onPress={() => navigation.navigate('Lessons')} />
        <AppButton title="Progresso" icon={ChartNoAxesCombined} variant="secondary" onPress={() => navigation.navigate('Progress')} />
        <AppButton title="Comunicados" icon={Bell} variant="secondary" onPress={() => navigation.navigate('Announcements')} />
        <AppButton title="Perfil" icon={UserRound} variant="secondary" onPress={() => navigation.navigate('Profile')} />
      </View>

      <InfoCard title={announcements[0].titulo} description={announcements[0].mensagem} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  progressWrap: {
    marginTop: theme.spacing.md,
  },
  text: {
    color: theme.colors.text,
    fontSize: 15,
    lineHeight: 22,
    marginTop: theme.spacing.sm,
  },
  grid: {
    gap: theme.spacing.sm,
    marginBottom: theme.spacing.md,
  },
});
