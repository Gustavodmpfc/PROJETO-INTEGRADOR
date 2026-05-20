import { ScrollView } from 'react-native';
import LessonCard from '../components/LessonCard';
import ScreenHeader from '../components/ScreenHeader';
import { lessons } from '../data/mockData';
import { commonStyles } from '../styles/commonStyles';

export default function LessonsScreen({ navigation }) {
  return (
    <ScrollView style={commonStyles.screen} contentContainerStyle={commonStyles.container}>
      <ScreenHeader title="Aulas da catequese" subtitle="Acompanhe os modulos, videos e atividades." />
      {lessons.map((lesson) => (
        <LessonCard
          key={lesson.id}
          lesson={lesson}
          onPress={() => navigation.navigate('LessonDetail', { lessonId: lesson.id })}
        />
      ))}
    </ScrollView>
  );
}
