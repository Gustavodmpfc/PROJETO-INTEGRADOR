import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { CircleCheck, CreditCard, LogOut, Mail, MapPin, UserRound } from 'lucide-react-native';
import AppButton from '../components/AppButton';
import InfoCard from '../components/InfoCard';
import ScreenHeader from '../components/ScreenHeader';
import { currentUser } from '../data/mockData';
import { useAuth } from '../context/AuthContext';
import { getInitials } from '../utils/formatters';
import { commonStyles } from '../styles/commonStyles';
import { theme } from '../styles/theme';

export default function ProfileScreen() {
  const { signOut, user, profile } = useAuth();
  const [loading, setLoading] = useState(false);
  const name = profile?.nome || user?.user_metadata?.nome || currentUser.nome;
  const email = profile?.email || user?.email || currentUser.email;
  const parish = profile?.paroquias;
  const userType = profile?.tipo_usuario || 'aluno';
  const accessStatus = 'acesso_ativo';

  async function handleLogout() {
    setLoading(true);
    await signOut();
    setLoading(false);
  }

  return (
    <ScrollView style={commonStyles.screen} contentContainerStyle={commonStyles.container}>
      <ScreenHeader title="Perfil" subtitle="Dados do usuario conectado pelo Supabase." />
      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Text style={styles.initials}>{getInitials(name)}</Text>
        </View>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.role}>{userType === 'aluno' ? 'Catequizando' : userType}</Text>
      </View>

      <InfoCard title="Informacoes">
        <View style={styles.row}>
          <Mail size={18} color={theme.colors.primaryDark} />
          <Text style={styles.text}>{email}</Text>
        </View>
        <View style={styles.row}>
          <MapPin size={18} color={theme.colors.primaryDark} />
          <Text style={styles.text}>
            {parish ? `${parish.nome} - ${parish.cidade || 'Cidade nao informada'}` : 'Paroquia ainda nao vinculada'}
          </Text>
        </View>
        <View style={styles.row}>
          <UserRound size={18} color={theme.colors.primaryDark} />
          <Text style={styles.text}>Tipo: {userType}</Text>
        </View>
      </InfoCard>

      <InfoCard title="Acesso e pagamento" description="Pagamento real ainda nao foi implementado. Futuramente pode usar Google Play Billing." tone="gold">
        <View style={styles.row}>
          {accessStatus === 'acesso_ativo' ? (
            <CircleCheck size={18} color={theme.colors.success} />
          ) : (
            <CreditCard size={18} color={theme.colors.warning} />
          )}
          <Text style={styles.text}>{accessStatus === 'acesso_ativo' ? 'Acesso ativo' : 'Pagamento pendente'}</Text>
        </View>
      </InfoCard>

      <AppButton title="Sair da conta" icon={LogOut} variant="secondary" loading={loading} onPress={handleLogout} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  profileCard: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.lg,
    padding: theme.spacing.lg,
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  avatar: {
    width: 74,
    height: 74,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.sm,
  },
  initials: {
    color: theme.colors.primaryDark,
    fontSize: 24,
    fontWeight: '900',
  },
  name: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '900',
  },
  role: {
    color: '#EAF3EC',
    fontSize: 14,
    marginTop: 4,
    textTransform: 'capitalize',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    marginTop: theme.spacing.sm,
  },
  text: {
    color: theme.colors.text,
    flex: 1,
    fontSize: 15,
    lineHeight: 21,
  },
});
