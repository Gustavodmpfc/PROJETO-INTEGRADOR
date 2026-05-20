import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import { AuthProvider } from './src/context/AuthContext';
import { theme } from './src/styles/theme';

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <StatusBar style="dark" backgroundColor={theme.colors.background} />
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}
