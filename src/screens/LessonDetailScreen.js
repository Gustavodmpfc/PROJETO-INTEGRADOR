import { ScrollView, StyleSheet, Text } from 'react-native';
import { CircleHelp, CheckCircle2 } from 'lucide-react-native';
import AppButton from '../components/AppButton';
import InfoCard from '../components/InfoCard';
import ScreenHeader from '../components/ScreenHeader';
import YoutubePlayerComponent from '../components/YoutubePlayerComponent';
import { activities, lessons } from '../data/mockData';
import { commonStyles } from '../styles/commonStyles';
import { theme } from '../styles/theme';

export default function LessonDetailScreen({ route, navigation }) {
  const lesson = lessons.find((item) => item.id === route.params?.lessonId) || lessons[0];
  const quiz = activities.find((activity) => activity.aula_id === lesson.id);

  return (
    <ScrollView style={commonStyles.screen} contentContainerStyle={commonStyles.container}>
      <ScreenHeader title={lesson.titulo} subtitle={lesson.modulo} />
      <YoutubePlayerComponent videoId={lesson.video_youtube_id} />
      <InfoCard title="Resumo da aula" description={lesson.descricao}>
        <Text style={styles.body}>
          Reflita sobre o tema, anote suas duvidas e converse com seu catequista no proximo encontro.
        </Text>
      </InfoCard>
      <AppButton title="Responder quiz" icon={CircleHelp} onPress={() => navigation.navigate('Quiz', { lessonId: lesson.id })} />
      <Text style={styles.space} />
      <AppButton title="Marcar como estudada" icon={CheckCircle2} variant="secondary" onPress={() => navigation.navigate('Progress')} />
      {!quiz ? <InfoCard title="Quiz em preparacao" description="Esta aula ainda nao tem atividade cadastrada." /> : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  body: {
    color: theme.colors.text,
    fontSize: 15,
    lineHeight: 22,
    marginTop: theme.spacing.sm,
  },
  space: {
    height: theme.spacing.sm,
  },
});
