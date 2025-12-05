import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Platform } from 'react-native';
import { PaperProvider } from 'react-native-paper';
import 'react-native-reanimated';

import { paperTheme } from '@/constants/paper-theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { ErrorBoundary } from '@/components/ErrorBoundary';

// Import Figtree font for web platform
// Using Google Fonts CDN via index.html for better compatibility
// @fontsource/figtree is used as fallback
if (Platform.OS === 'web') {
  try {
    // Try to load fonts, but Google Fonts CDN in index.html is primary
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require('@fontsource/figtree/400.css');
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require('@fontsource/figtree/600.css');
  } catch (error) {
    // Fonts will load from Google Fonts CDN instead
    console.log('Using Google Fonts CDN for web fonts');
  }
}

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

// No need for initialRouteName - index.tsx is the default route

export default function RootLayout() {
  const colorScheme = useColorScheme();
  
  // Load Figtree font TTF files for mobile platforms
  // For web, @fontsource/figtree is imported above
  const [fontsLoaded] = useFonts(
    Platform.OS !== 'web'
      ? {
          // Load TTF files for mobile (iOS/Android)
          // Download from: https://fonts.google.com/specimen/Figtree
          // Place Regular and SemiBold TTF files in assets/fonts/
          'Figtree-Regular': require('@/assets/fonts/Figtree-Regular.ttf'),
          'Figtree-SemiBold': require('@/assets/fonts/Figtree-SemiBold.ttf'),
        }
      : {}
  );

  useEffect(() => {
    // Hide splash screen after fonts are loaded (or immediately on web)
    if (Platform.OS === 'web' || fontsLoaded) {
      const timer = setTimeout(() => {
        SplashScreen.hideAsync().catch((error) => {
          console.error('Error hiding splash screen:', error);
        });
      }, 100);
      return () => clearTimeout(timer);
    } else {
      // If fonts fail to load after 5 seconds, hide splash anyway
      const fallbackTimer = setTimeout(() => {
        console.warn('Fonts not loaded after 5s, hiding splash anyway');
        SplashScreen.hideAsync().catch((error) => {
          console.error('Error hiding splash screen:', error);
        });
      }, 5000);
      return () => clearTimeout(fallbackTimer);
    }
  }, [fontsLoaded]);

  return (
    <ErrorBoundary>
      <PaperProvider theme={paperTheme}>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="splash" />
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
  );
}

