import { useCallback, useMemo, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { CircleAlert, Video } from 'lucide-react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import { theme } from '../styles/theme';

export default function YoutubePlayerComponent({ videoId }) {
  const { width } = useWindowDimensions();
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const [hasError, setHasError] = useState(false);

  const playerWidth = Math.max(width - theme.spacing.md * 2, 280);
  const playerHeight = useMemo(() => Math.round(playerWidth * 0.56), [playerWidth]);

  const handleReady = useCallback(() => {
    setReady(true);
    setHasError(false);
  }, []);

  const handleChangeState = useCallback((state) => {
    if (state === 'playing') {
      setPlaying(true);
    }

    if (state === 'paused' || state === 'ended') {
      setPlaying(false);
    }
  }, []);

  const handleError = useCallback(() => {
    setPlaying(false);
    setHasError(true);
  }, []);

  if (!videoId) {
    return (
      <LinearGradient colors={[theme.colors.softGold, '#FFFFFF']} style={styles.placeholder}>
        <Video size={28} color={theme.colors.primaryDark} />
        <Text style={styles.placeholderTitle}>Video em breve</Text>
        <Text style={styles.placeholderText}>Esta aula ainda nao possui video cadastrado.</Text>
      </LinearGradient>
    );
  }

  if (hasError) {
    return (
      <View style={styles.errorBox}>
        <CircleAlert size={28} color={theme.colors.warning} />
        <Text style={styles.placeholderTitle}>Nao foi possivel carregar o video</Text>
        <Text style={styles.placeholderText}>Verifique sua conexao e tente abrir a aula novamente.</Text>
      </View>
    );
  }

  return (
    <View style={styles.card}>
      <View style={styles.playerWrap}>
        <YoutubePlayer
          height={playerHeight}
          play={playing}
          videoId={videoId}
          onReady={handleReady}
          onChangeState={handleChangeState}
          onError={handleError}
          webViewStyle={styles.webView}
          initialPlayerParams={{
            controls: true,
            modestbranding: true,
            rel: false,
          }}
        />
      </View>

      {!ready ? (
        <View style={[styles.loading, { height: playerHeight }]}>
          <ActivityIndicator color={theme.colors.primary} />
          <Text style={styles.loadingText}>Carregando video...</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: theme.radius.md,
    overflow: 'hidden',
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: theme.spacing.md,
    ...theme.shadows.soft,
  },
  playerWrap: {
    backgroundColor: '#000000',
  },
  webView: {
    backgroundColor: '#000000',
  },
  loading: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.sm,
    backgroundColor: theme.colors.softGreen,
  },
  loadingText: {
    color: theme.colors.muted,
    fontSize: 14,
    fontWeight: '700',
  },
  placeholder: {
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.md,
    minHeight: 170,
    ...theme.shadows.soft,
  },
  errorBox: {
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.md,
    minHeight: 170,
    backgroundColor: theme.colors.surface,
    ...theme.shadows.soft,
  },
  placeholderTitle: {
    color: theme.colors.text,
    fontSize: 18,
    fontWeight: '800',
    marginTop: theme.spacing.sm,
    textAlign: 'center',
  },
  placeholderText: {
    color: theme.colors.muted,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 4,
    textAlign: 'center',
  },
});
