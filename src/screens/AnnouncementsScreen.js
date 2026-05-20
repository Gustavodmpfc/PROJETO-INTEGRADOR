import { ScrollView, StyleSheet, Text, TextInput } from 'react-native';
import { Megaphone } from 'lucide-react-native';
import AppButton from '../components/AppButton';
import InfoCard from '../components/InfoCard';
import ScreenHeader from '../components/ScreenHeader';
import { announcements } from '../data/mockData';
import { commonStyles } from '../styles/commonStyles';
import { theme } from '../styles/theme';

export default function AnnouncementsScreen() {
  return (
    <ScrollView style={commonStyles.screen} contentContainerStyle={commonStyles.container}>
      <ScreenHeader title="Comunicados" subtitle="Avisos importantes da paroquia e da turma." />
      {announcements.map((item) => (
        <InfoCard key={item.id} title={item.titulo} description={item.mensagem}>
          <Text style={styles.date}>{item.data}</Text>
        </InfoCard>
      ))}

      <InfoCard title="Novo comunicado" description="Campo simulado para catequistas publicarem avisos." tone="gold">
        <TextInput style={styles.input} placeholder="Titulo" />
        <TextInput style={[styles.input, styles.textArea]} placeholder="Mensagem" multiline />
        <AppButton title="Salvar aviso simulado" icon={Megaphone} />
      </InfoCard>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  date: {
    color: theme.colors.accent,
    fontSize: 13,
    fontWeight: '800',
    marginTop: theme.spacing.sm,
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
    minHeight: 92,
    textAlignVertical: 'top',
  },
});
