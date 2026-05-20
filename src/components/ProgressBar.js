import { StyleSheet, View } from 'react-native';
import { theme } from '../styles/theme';

export default function ProgressBar({ value }) {
  return (
    <View style={styles.track}>
      <View style={[styles.fill, { width: `${Math.min(value, 100)}%` }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    height: 9,
    backgroundColor: '#EFE6DA',
    borderRadius: 20,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: theme.colors.primary,
    borderRadius: 20,
  },
});
