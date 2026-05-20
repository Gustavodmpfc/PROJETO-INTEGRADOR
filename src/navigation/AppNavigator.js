import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ParishCodeScreen from '../screens/ParishCodeScreen';
import StudentDashboardScreen from '../screens/StudentDashboardScreen';
import LessonsScreen from '../screens/LessonsScreen';
import LessonDetailScreen from '../screens/LessonDetailScreen';
import QuizScreen from '../screens/QuizScreen';
import ProgressScreen from '../screens/ProgressScreen';
import AnnouncementsScreen from '../screens/AnnouncementsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { useAuth } from '../context/AuthContext';
import { theme } from '../styles/theme';

const Stack = createNativeStackNavigator();

const screenOptions = {
  headerStyle: { backgroundColor: theme.colors.background },
  headerShadowVisible: false,
  headerTintColor: theme.colors.text,
  headerTitleStyle: { fontWeight: '800' },
  contentStyle: { backgroundColor: theme.colors.background },
};

function LoadingScreen() {
  return (
    <View style={styles.loading}>
      <ActivityIndicator size="large" color={theme.colors.primary} />
      <Text style={styles.loadingText}>Carregando sessao...</Text>
    </View>
  );
}

function PublicStack() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Entrar' }} />
      <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Cadastro' }} />
    </Stack.Navigator>
  );
}

function ParishStack() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="ParishCode" component={ParishCodeScreen} options={{ title: 'Codigo da paroquia' }} />
      <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Perfil' }} />
    </Stack.Navigator>
  );
}

function StudentStack() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="StudentDashboard" component={StudentDashboardScreen} options={{ title: 'Painel do aluno' }} />
      <Stack.Screen name="Lessons" component={LessonsScreen} options={{ title: 'Aulas' }} />
      <Stack.Screen name="LessonDetail" component={LessonDetailScreen} options={{ title: 'Detalhe da aula' }} />
      <Stack.Screen name="Quiz" component={QuizScreen} options={{ title: 'Quiz' }} />
      <Stack.Screen name="Progress" component={ProgressScreen} options={{ title: 'Progresso' }} />
      <Stack.Screen name="Announcements" component={AnnouncementsScreen} options={{ title: 'Comunicados' }} />
      <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Perfil' }} />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  const { loading, isLoggedIn, profile } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  if (!isLoggedIn) {
    return <PublicStack />;
  }

  if (!profile?.paroquia_id) {
    return <ParishStack />;
  }

  return <StudentStack />;
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.background,
    gap: theme.spacing.sm,
  },
  loadingText: {
    color: theme.colors.muted,
    fontSize: 15,
  },
});
