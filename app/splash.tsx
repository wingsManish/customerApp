import React, { useEffect } from 'react';
import { View, StyleSheet, Text, StatusBar, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Logo } from '@/components/Logo';
import { getSession, hasValidSession, getNextRoute } from '@/services/sessionService';

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const checkSessionAndNavigate = async () => {
      try {
        // Check if user has a valid session
        const isValid = await hasValidSession();
        
        if (isValid) {
          // Get session to determine next route
          const session = await getSession();
          const nextRoute = getNextRoute(session);
          
          // Navigate to appropriate screen
          setTimeout(() => {
            router.replace(nextRoute);
          }, 1500);
        } else {
          // No valid session, go to welcome screen
          setTimeout(() => {
            router.replace('/welcome');
          }, 2000);
        }
      } catch (error) {
        console.error('Error checking session:', error);
        // On error, go to welcome screen
        setTimeout(() => {
          router.replace('/welcome');
        }, 2000);
      }
    };

    checkSessionAndNavigate();
  }, [router]);

  const fontFamilySemiBold = Platform.select({
    ios: 'Figtree-SemiBold',
    android: 'Figtree-SemiBold',
    web: 'Figtree',
    default: 'Figtree',
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#C8202F" />
      <View style={styles.content}>
        <Logo width={180} height={150} />
        <Text style={[styles.brandTitle, { fontFamily: fontFamilySemiBold }]}>TANZANIA</Text>
        <Text style={[styles.brandSubtitle, { fontFamily: fontFamilySemiBold }]}>LOGISTICS</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C8202F',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandTitle: {
    marginTop: 32,
    fontSize: 20,
    letterSpacing: 4,
    color: '#FFFFFF',
    fontWeight: Platform.OS === 'web' ? '600' : 'normal',
  },
  brandSubtitle: {
    marginTop: 4,
    fontSize: 28,
    letterSpacing: 2,
    color: '#FFFFFF',
    fontWeight: Platform.OS === 'web' ? '600' : 'normal',
  },
});

