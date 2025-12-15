import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PaperProvider } from 'react-native-paper';
import 'react-native-reanimated';

import { paperTheme } from '@/constants/paper-theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { ErrorBoundary } from '@/components/ErrorBoundary';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

// No need for initialRouteName - index.tsx is the default route

export default function RootLayout() {
  const colorScheme = useColorScheme();
  
  // Load Figtree font TTF files for all platforms (local assets)
  const [_fontsLoaded] = useFonts({
    'Figtree-Regular': require('@/assets/fonts/Figtree-Regular.ttf'),
    'Figtree-Medium': require('@/assets/fonts/Figtree-Medium.ttf'),
    'Figtree-SemiBold': require('@/assets/fonts/Figtree-SemiBold.ttf'),
  });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ErrorBoundary>
        <PaperProvider theme={paperTheme}>
          <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="index" />
              <Stack.Screen name="welcome" />
              <Stack.Screen name="login" />
              <Stack.Screen name="otp-verification" />
              <Stack.Screen name="user-type-selection" />
              <Stack.Screen name="select-company" />
              <Stack.Screen name="personal-info" />
              <Stack.Screen name="company-details" />
              <Stack.Screen name="company-profile" />
              <Stack.Screen name="contact-info" />
              <Stack.Screen name="bank-details" />
              <Stack.Screen name="upload-documents" />
              <Stack.Screen name="emergency-info" />
              <Stack.Screen name="login-success" />
              <Stack.Screen name="company-success" />
              <Stack.Screen name="home" />
              <Stack.Screen name="orders" />
              <Stack.Screen name="quotes" />
              <Stack.Screen name="trips" />
              <Stack.Screen name="trips/[tripId]" />
              <Stack.Screen name="invoice" />
              <Stack.Screen name="profile" />
            </Stack>
            <StatusBar style="auto" />
          </ThemeProvider>
        </PaperProvider>
      </ErrorBoundary>
    </GestureHandlerRootView>
  );
}

