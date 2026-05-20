import { ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native';
import { BlurView } from 'expo-blur';
import { BookOpen, LogIn, UserPlus } from 'lucide-react-native';
import AppButton from '../components/AppButton';
import { commonStyles } from '../styles/commonStyles';
import { theme } from '../styles/theme';

export default function WelcomeScreen({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container} style={commonStyles.screen}>
      <ImageBackground
        source={{ uri: 'https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80&w=1200&auto=format&fit=crop' }}
        imageStyle={styles.heroImage}
        style={styles.hero}
      >
        <View style={styles.overlay}>
          <BlurView intensity={18} tint="dark" style={styles.blurPanel}>
            <View style={styles.logo}>
              <BookOpen size={34} color="#FFFFFF" />
            </View>
            <Text style={styles.title}>Caminho da Fe</Text>
            <Text style={styles.phrase}>Aprendendo, caminhando e vivendo a fe</Text>
          </BlurView>
        </View>
      </ImageBackground>

      <View style={styles.actions}>
        <AppButton title="Entrar" icon={LogIn} onPress={() => navigation.navigate('Login')} />
        <AppButton title="Criar conta" icon={UserPlus} variant="secondary" onPress={() => navigation.navigate('Register')} />
      </View>

      <Text style={styles.footer}>Plataforma de apoio para catequizandos.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: theme.colors.glow,
    padding: theme.spacing.md,
    justifyContent: 'center',
  },
  hero: {
    minHeight: 430,
    borderRadius: theme.radius.lg,
    overflow: 'hidden',
    justifyContent: 'flex-end',
    ...theme.shadows.soft,
  },
  heroImage: {
    borderRadius: theme.radius.lg,
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: theme.spacing.lg,
    backgroundColor: 'rgba(38, 51, 43, 0.30)',
  },
  blurPanel: {
    borderRadius: theme.radius.lg,
    overflow: 'hidden',
    padding: theme.spacing.md,
    backgroundColor: 'rgba(38, 51, 43, 0.18)',
  },
  logo: {
    height: 64,
    width: 64,
    borderRadius: 18,
    backgroundColor: 'rgba(94, 140, 106, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.md,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 38,
    fontWeight: '900',
  },
  phrase: {
    color: '#FFF8EB',
    fontSize: 17,
    lineHeight: 24,
    marginTop: theme.spacing.xs,
  },
  actions: {
    gap: theme.spacing.sm,
    marginTop: theme.spacing.lg,
  },
  footer: {
    color: theme.colors.muted,
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    marginTop: theme.spacing.md,
  },
});
